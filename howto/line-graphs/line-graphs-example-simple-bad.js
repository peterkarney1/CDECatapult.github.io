
function simpleLineGraphBad () {

// Set margins and size
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 485 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//var parseDate = d3.time.format("%d-%b-%y").parse;

// Set size of x axis
var x = d3.scale.linear()
    .range([0, width]);

// Set size of y axis
var y = d3.scale.linear()
    .range([height, 0]);

// Set position of x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Set position of y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.timeinsec); })
    .y(function(d) { return y(d.speed); });

// Create the SVG canvas
var svg = d3.select(".svg-holder-simple-bad").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function make_x_axis() {        
    return d3.svg.axis()
        .scale(x)
         .orient("bottom")
         .ticks(5)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
}

// Load in data and draw line graph
d3.tsv("line-graphs-example-simple-data.tsv", function(error, data) {

  data.forEach(function(d) {
    d.timeinsec
  });

  x.domain(d3.extent(data, function(d) { return d.timeinsec; }));
  y.domain(d3.extent(data, function(d) { return d.speed; }));

      svg.append("g")
      // Draw vertical grid lines   
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

    svg.append("g")   
      // Draw horizontal grid lines      
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )

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
      .style("text-anchor", "end")
      .text("Speed (m/s)");

  // Draw the line
  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});

}

simpleLineGraphBad();
