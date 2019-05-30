function Chart(data) {

  var svg = d3.select("#svg");
  var padding = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 100
  };

  var ChartArea = {
    "width": parseInt(svg.style("width")) - padding.left - padding.right,
    "height": parseInt(svg.style("height")) - padding.top - padding.bottom,
  };



  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d, i) {
      return d[1]
    })])
    .range([ChartArea.height, 0]);


  var arr = [];
  var t = data.map((d) => {
    y = d[0].split("-");
    var dataArr = y[0]
    if (dataArr % 5 === 0) {
      return arr.push(dataArr)
    }
  });


  var parseTime = d3.timeParse("%m/%d/%y");
  formatDate = d3.timeFormat("%Y");

  var xScale = d3.scaleTime()
    .domain(d3.extent(data, (d) => new Date(d[0])))
    .range([0, ChartArea.width]);

  // Axis
  // x-axis
  var xAxis = svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0" + padding.left + "," + (ChartArea.height + padding.top) + ")")
    .call(d3.axisBottom(xScale));



  var yAxis = svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(0" + padding.left + "," + padding.top + ")")
    .call(d3.axisLeft(yScale))

  var rectGrp = svg.append("g").attr(
    "transform", "translate(" + padding.left + "," + padding.top + ")"
  );

  svg.selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("x", (d) => d[0])
    .attr("y", (d) => d[1])
    .attr("width", (ChartArea.width))
    .attr("height", ChartArea.height);


    svg.append('text')
    .attr('class', 'label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -400)
    .attr('y', 40)
    .attr('fill', '#fff')
    .text('Gross Domestic Product in Billions')

  var tooltip = rectGrp.select("body")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "#333")
    .style("background", "yellow")



  rectGrp.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("data-gdp", (d) => d[1])
    .attr("data-date", (d) => d[0])
    .attr("x", (d, i) => i * (ChartArea.width / data.length))
    .attr("y", (d, i) => yScale(d[1]))
    .attr("width", (ChartArea.width / data.length))
    .attr("height", (d, i) => ChartArea.height - yScale(d[1]))
    .attr("fill",  `cyan`)
    .attr("class", "bar")
    .on("mouseover", function (d) {
      var num = ['01', '04', '07', '10'];
      tooltip.text(d[0]);
      tooltip.attr("data-date", d[0]);
      // console.log(d[0].split('-')[1])
      tooltip.html(`${d[0].split('-')[0]} Q${num.indexOf(d[0].split('-')[1]) + 1}<br/>$${d[1]} Billion`)
        .style('left', `${d3.event.pageX - 30}px`)
        .style('top', `${d3.event.pageY - 80}px`);

      return tooltip.style("visibility", "visible");
    })
    .on("mouseout", function () {
      return tooltip.style("visibility", "hidden");
    });

}







req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
req.send();
req.onload = function () {
  json = JSON.parse(req.responseText);
  var dataset = json.data;
  var name = dataset.name;
  console.log(name)
  var title = json.source_name;
  document.getElementById('title').innerHTML = JSON.stringify(title);


  Chart(dataset);
};