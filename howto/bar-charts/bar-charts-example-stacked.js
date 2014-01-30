function stackedBarChart () {

 // Set size and margins
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 485 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // Set up x scale
  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .5);

  // Set up y scale
  var y = d3.scale.linear()
      .rangeRound([height, 0]);

  // Set up colors
  var color = d3.scale.ordinal()
      .range(["#f9a65a", "#79c36a"]);

  // Configure the x axis
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  // Configure the y axis
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

  // Create the SVG canvas
  var svg = d3.select(".svg-holder-stacked").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Load in data
  d3.csv("bar-charts-example-stacked-data.csv", function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Area"; }));

    data.forEach(function(d) {
      var y0 = 0;
      d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.ages[d.ages.length - 1].y1;
    });

    // Sort the data by total number
    data.sort(function(a, b) { return b.total - a.total; });

    // Examine the data and configure axes
    x.domain(data.map(function(d) { return d.Area; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    // Draw the x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Draw the y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("class", "label")
        .style("text-anchor", "end")
        .text("Population");

    // Create an SVG group for each area
    var area = svg.selectAll(".area")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.Area) + ",0)"; });

    // Draw bars
    area.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name); });

    // Draw the legend
    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  });

};

stackedBarChart();
