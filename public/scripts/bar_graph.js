$(document).ready(function() {
  const ratingTypes = ratings.map(rating => {
    return rating.type;
  });

  // make variables to store margin, width, and height
  const margin = { top: 50, right: 20, bottom: 50, left: 150 };
  const fullWidth = 500;
  const fullHeight = 500;
  const width = fullWidth - margin.right - margin.left;
  const height = fullHeight - margin.top - margin.bottom;

  const svg = d3
    .select("#ratings-bar-graph")
    .append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const typeScale = d3
    .scaleBand()
    .domain(ratingTypes)
    .range([0, height])
    .paddingInner(0.1);

  const bandwidth = typeScale.bandwidth();

  const ratingScale = d3.scaleLinear().domain([0, 10]).range([0, width]).nice();

  const barHolder = svg.append("g").classed("bar-holder", true);

  barHolder
    .attr("font-size", 20)
    .selectAll("rect.bar")
    .data(ratings)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", 0)
    .attr("width", function(d) {
      return ratingScale(d.avg);
    })
    .attr("y", function(d) {
      return typeScale(d.type);
    })
    .attr("height", bandwidth)
    .style("fill", function(d, i) {
      return `rgb(${255 - Math.round(d.avg * 25.5)},
        ${255 - Math.round(d.avg * 25.5)}, 255)`;
    });

  const xAxis = d3.axisBottom(ratingScale);
  const yAxis = d3.axisLeft(typeScale);

  svg
    .append("g")
    .classed("x axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g").classed("y axis", true).call(yAxis);

  svg.select(".x.axis").selectAll("text").style("font-size", "16px");
  svg.select(".y.axis").selectAll("text").style("font-size", "16px");
});
