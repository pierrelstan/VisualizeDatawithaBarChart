

function Chart(data){

  var svg = d3.select("#svg")
  var padding={top: 50, right: 50, bottom: 50, left: 100};
  
  var ChartArea = {
          "width": parseInt(svg.style("width")) - padding.left - padding.right,
          "height": parseInt(svg.style("height")) - padding.top - padding.bottom,
  };
  
  
  
  var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d, i){return d[1]})])
  .range([ChartArea.height,0])
  
  
  var arr=[];
  var t =data.map((d)=> {
        y=  d[0].split("-");
       var dataArr=y[0]
       if(dataArr % 5 === 0){
               return arr.push(dataArr)
       }
  })

// console.log(arr)
  // remove duplicate items

  var parseTime =d3.timeParse("%m/%d/%y");
  formatDate = d3.timeFormat("%Y");

  var xScale=d3.scaleTime()
  .domain(d3.extent(data, (d) => new Date(d[0])))
  .range([0,ChartArea.width]);
  
  // Axis
  // x-axis
  var xAxis=svg.append("g")
  .attr("id", "x-axis")
  .attr("transform", "translate(0"+ padding.left + "," + (ChartArea.height + padding.top ) +")")
  .call(d3.axisBottom(xScale));
  
  
  
  var yAxis=svg.append("g")
  .attr("id", "y-axis")
  .attr("transform", "translate(0"+ padding.left+ "," + padding.top+")")
  .call( d3.axisLeft(yScale))
  
  var rectGrp= svg.append("g").attr(
          "transform", "translate("+ padding.left + ","+ padding.top+")"
  );


  svg.selectAll("div")
  .data(data)
  .enter()
  .append("div")
  .attr("x", (d) => d[0])
  .attr("y", (d) =>  d[1])
  .attr("width",(ChartArea.width/3))
  .attr("height", () =>  ChartArea.height)
  
  
  
  rectGrp.selectAll("rect")
  .data(data)
    .enter()
   .append("rect")
   .attr("data-gdp", (d)=> d[1])
   .attr("data-date", (d, i)=> d[0])
   .attr("x", (d, i) => i*( ChartArea.width/data.length))
   .attr("y", (d, i) =>  yScale(d[1]))
   .attr("width",(ChartArea.width/data.length))
   .attr("height", (d, i) =>  ChartArea.height - yScale(d[1]))
  .attr("fill",(d,i)=>"yellow")
  .attr("class", "bar")
   .attr("id", "tooltip")
   .append("title")
   .text((d)=> d[0] +  " " + d[1])
  
  
  
  }
  

  
  req=new XMLHttpRequest();
  req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    var dataset = json.data;
    var title = json.source_name;
    document.getElementById('title').innerHTML=JSON.stringify(title);
  
  
  Chart(dataset);
  };