req=new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
req.send();
req.onload=function(){
  json=JSON.parse(req.responseText);
  const dataset = json.data
  const title = json.source_name;
  // console.log(dataset[0][0].substr(0,4))

  document.getElementById('title').innerHTML=JSON.stringify(title);


  // const width = 900;
  // const height = 400;
  const padding = 60;


  var svg = d3.select("svg"),
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin;
 
var  OnlytheYears=(data) => {
 let a =data
 let y = a.split("-")
 
   let n = parseInt(y[0], 10)
  //  console.log(n)
   var num =n % 5 === 0;
  if(num){
   return n
  }
}

  var minData = d3.min(dataset,(d) =>  OnlytheYears(d[0]))
  var maxData = d3.min(dataset,(d) =>  OnlytheYears(d[0]))

        var xScale = d3.scaleBand().rangeRound([0, width]).paddingInner(0.05),
  yScale = d3.scaleLinear().range([height , 0]);
// console.log(xScale)
var parseDate = d3.timeParse("%Y");
var g = svg.append("g")
.attr("id", "x-axis")
         .attr("transform", "translate(" + 100 + "," + 100 + ")");

         xScale.domain(dataset.map(function(d) { 
         return  OnlytheYears(d[0])
         }));

         yScale.domain([0, d3.max(dataset, function(d) { return d[1]})]);

         g.append("g")
         .attr("id", "x-axis")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));

        g.append("g")
        .attr("id", "y-axis")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return  d;
         }))
   
         svg.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("class","bar")
         .attr("data-date",(d)=> d[0])
         .attr("data-gdp", (d)=> d[1])
         .attr("x", (d, i) => i * 40)
         .attr("y", (d, i) => {
           // Add your code below this line
          //  return height - 40 *
           return height - 30 * d[1]
           
           
           // Add your code above this line
         })
         .attr("width", 23)
         .attr("height", (d, i) => d[1]);
   
    
   
//   document.getElementsByClassName('data')[0].innerHTML=JSON.stringify(dataset);
};