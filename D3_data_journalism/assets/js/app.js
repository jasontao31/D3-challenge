// Set up Chart
var svgWidth = 900;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 30,
    bottom: 60,
    left: 45
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data
d3.csv("assets/data/data.csv").then(function(hData) {
    hData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
});

// Create Scales
const xScale = d3.scaleLinear()
    .domain(d3.extent(hData, d => d.age))
    .range([0, width])
    .nice(); 

const yScale = d3.scaleLinear()
    .domain([6,d3.max(hData, d => d.smokes)])
    .range([height, 0]);

// Create Axis
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
chartGroup.append("g").call(yAxis);

// Scatterplot
chartGroup.selectAll("circle")
.data(hData)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.age))
.attr("cy", d=>yScale(d.smokes))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.70);

// Add Text to Circles
chartGroup.append("g")
    .selectAll('text')
    .data(hData)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x",d=>xScale(d.age))
    .attr("y",d=>yScale(d.smokes))
    .classed(".stateText", true)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "9px")
    .style("font-weight", "bold")
    .attr("alignment-baseline", "central");

// axis titles
chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .text("Age (Median)");

chartGroup.append("text")
    .attr("y", 0 - ((margin.left / 2) + 2))
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .attr("transform", "rotate(-90)")
    .text("Smokers (%)");
});
