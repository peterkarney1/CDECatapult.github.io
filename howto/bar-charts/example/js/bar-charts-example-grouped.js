function groupedBarChart () {

  // Set size and margins
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 485 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // Set up x scale
  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], .4);

  var x1 = d3.scale.ordinal();

  // Set up y scale
  var y = d3.scale.linear()
      .range([height, 0]);

  // Set up colors
  var color = d3.scale.ordinal()
      .range(["#f9a65a", "#79c36a"]);

  // Configure the x axis
  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");

  // Configure the y axis
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));

  // Create the SVG canvas
  var svg = d3.select(".svg-holder-grouped").append("svg")
    .attr("viewBox", "0 0 485 400")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Load in data
  d3.csv("data/bar-charts-example-grouped-data.csv", function(error, data) {
    var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Area"; });

    data.forEach(function(d) {
      d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

    // Examine the data and configure axes
    x0.domain(data.map(function(d) { return d.Area; }));
    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

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
        .attr("transform", function(d) { return "translate(" + x0(d.Area) + ",0)"; });

    // Draw bars
    area.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.name); });

    // Draw the legend
    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
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

groupedBarChart ();
