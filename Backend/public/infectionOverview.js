var minDate = d3.min(diseaseData, d => d.date);
var startDate = minDate;
var maxDate = d3.max(diseaseData, d => d.date);

//parameters for SVG
var width = 600;
var height = 600;
var barPadding = 3;
var padding = 50;
var numBars = 5; // total 5 attributes
var barWidth = width / numBars - barPadding;
var maxNum = d3.max(diseaseData, d => d.number);

var yScale = d3
  .scaleLinear()
  .domain([0, maxNum])
  .range([height, padding]);

// draw SVG
var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);

//set input value
d3.select("input")
  .property("min", minDate)
  .property("max", maxDate)
  .property("value", minDate);

// add y axis
svg
  .append("g")
  .attr("transform", "translate(50,-4)")
  .classed("y-axis", true)
  .call(d3.axisLeft(yScale));

//add title
svg
  .append("text")
  .classed("title", true)
  .attr("x", width / 2)
  .attr("y", 30)
  .style("font-size", "1.5em")
  .style("font-weight", "500")
  .style("text-anchor", "middle")
  .text("Coronavirus Infection Overview in 2020-02-01");

makeGraph(minDate);

// 手动调整range 查看信息
d3.select("input").on("input", function() {
  //清除定时器
  clearInterval(intervalId);
  //手动调整时间
  var date = +d3.event.target.value;
  updateGraph(date);
});

/**
 * all the below are functions needed in the animation
 *
 */
function makeGraph(date) {
  svg
    .selectAll("rect")
    .data(diseaseData.filter(d => d.date === date))
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", d => height - yScale(d.number))
    .attr("y", d => yScale(d.number) - 2.5)
    .attr("x", (d, i) => (barWidth + barPadding) * i + padding)
    //set color for different attribute
    .attr("fill", (d, i) => {
      switch (i) {
        case 0:
          return "brown";
        case 1:
          return "lightcoral";
        case 2:
          return "aquamarine";
        case 3:
          return "black";
        case 4:
          return "darkorange";
      }
    });
}

function updateGraph(date) {
  d3.selectAll("rect")
    .data(diseaseData.filter(d => d.date === date))
    .transition()
    .duration(300)
    .attr("height", d => height - yScale(d.number))
    .attr("y", d => yScale(d.number) - 2.5);

  if (date <= 20200213) {
    d3.select(".title").text(
      "Coronavirus Infection Overview in " + numToString(date)
    );
  }
}

// 辅助函数
function numToString(num) {
  str = num.toString();
  return str.slice(0, 4) + "-" + str.slice(4, 6) + "-" + str.slice(6, 8);
}

//设置histogram随时间自动变化
var intervalId = setInterval(function() {
  startDate += 1;
  updateGraph(startDate);
  d3.select("input").property("value", startDate);
}, 2000);
