var margin = { top: 60, right: 230, bottom: 50, left: 50 },
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.xml("./data1.xml", function(error, data) {
  if (error) throw error;
  data = [].map.call(data.querySelectorAll("Trackpoint"), function(trackpoint) {
    return {
      time: d3.timeParse("%Y-%m-%dT%H:%M:%S.000Z")(
        trackpoint.querySelector("Time").textContent
      ),
      // speed: +trackpoint.querySelector("Speed") !== 0? +trackpoint.querySelector("Speed").textContent : 0,
      HeartRate: +trackpoint.querySelector("Value").textContent,
      // distance: +trackpoint.querySelector("DistanceMeters") !== 0 ? +trackpoint.querySelector("DistanceMeters").textContent : 0,

      Cadence:
        +trackpoint.querySelector("Cadence") !== 0
          ? +trackpoint.querySelector("Cadence").textContent
          : 0,
      Elevation: +trackpoint.querySelector(" AltitudeMeters").textContent
    };
  });

  var keys = Object.keys(data[0]).slice(1);


  var color = d3
    .scaleOrdinal()
    .domain(keys)
    .range(d3.schemeSet2);

  var stackedData = d3.stack().keys(keys)(data);


  var x = d3
    .scaleTime()
    .domain(
      d3.extent(data, function(d) {
        return d.time;
      })
    )
    .range([0, width]);
  var xAxis = svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  xAxis
    .select(".domain")
    .attr("stroke", "rgb(252, 141, 98)")
    .attr("stroke-width", "5")
    .attr("opacity", ".6")
    .attr("stroke-dasharray", "4");

  xAxis.selectAll(".tick").attr("stroke", "rgb(252, 141, 98)");
  xAxis
    .selectAll("line")
    .attr("stroke", "rgb(252, 141, 98)")
    .attr("stroke-width", "5")
    .attr("opacity", ".6")
    .attr("stroke-dasharray", "4");


  // axis lables

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+40 )
      .text("Time")
      .style("color", "white")
      ;

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", -20)
    .text("Elevation")
    .attr("text-anchor", "start");


  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d) {
        return d.Elevation;
      }) + 300
    ])
    .range([height, 0]);
  svg
    .append("g")
    .call(d3.axisLeft(y).ticks(5))
    .selectAll(".tick")
    .attr("stroke", "rgb(252, 141, 98)")
    .selectAll("line")
    .attr("stroke", "rgb(252, 141, 98)")
    .attr("stroke-width", "5")
    .attr("opacity", ".6")
    .attr("stroke-dasharray", "4")
    .select(".domain")
    .attr("stroke", "rgb(252, 141, 98)")
    .attr("stroke-width", "5")
    .attr("opacity", ".6")
    .attr("stroke-dasharray", "4");


  var clip = svg
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  var brush = d3
    .brushX() 
    .extent([
      [0, 0],
      [width, height]
    ]) 
    .on("end", updateChart);


  var areaChart = svg.append("g").attr("clip-path", "url(#clip)");

  var area = d3
    .area()
    .x(function(d) {
      return x(d.data.time);
    })
    .y0(function(d) {
      return y(d[0]);
    })
    .y1(function(d) {
      return y(d[1]);
    });

  areaChart
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", function(d) {
      return "myArea " + d.key;
    })
    .style("fill", function(d) {
      return color(d.key);
    })
    .attr("d", area);

  areaChart
    .append("g")
    .attr("class", "brush")
    .call(brush);

  var idleTimeout;
  function idled() {
    idleTimeout = null;
  }


  function updateChart() {
    extent = d3.event.selection;

   
    if (!extent) {
      if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
      x.domain(
        d3.extent(data, function(d) {
          return d.time;
        })
      );
    } else {
      x.domain([x.invert(extent[0]), x.invert(extent[1])]);
      areaChart.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the 
    }

 
    xAxis
      .transition()
      .duration(1000)
      .call(d3.axisBottom(x).ticks(5));
    areaChart
      .selectAll("path")
      .transition()
      .duration(1000)
      .attr("d", area);

    xAxis
      .select(".domain")
      .attr("stroke", "rgb(252, 141, 98)")
      .attr("stroke-width", "5");
    //  .attr("opacity",".6")
    //  .attr("stroke-dasharray","4");

    xAxis.selectAll(".tick").attr("stroke", "rgb(252, 141, 98)");
    xAxis
      .selectAll("line")
      .attr("stroke", "rgb(252, 141, 98)")
      .attr("stroke-width", "5");
    //  .attr("opacity",".6")
    //  .attr("stroke-dasharray","4");
  }




  var highlight = function(d) {
    console.log(d);
    d3.selectAll(".myArea").style("opacity", 0.1);
    d3.select("." + d).style("opacity", 1);
  };

  var noHighlight = function(d) {
    d3.selectAll(".myArea").style("opacity", 1);
  };


  var size = 20;
  svg
    .selectAll("myrect")
    .data(keys)
    .enter()
    .append("rect")
    .attr("x", 700)
    .attr("y", function(d, i) {
      return 10 + i * (size + 5);
    }) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d) {
      return color(d);
    })
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight);

  svg
    .selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 700 + size * 1.2)
    .attr("y", function(d, i) {
      return 10 + i * (size + 5) + size / 2;
    }) 
    .style("fill", function(d) {
      return color(d);
    })
    .text(function(d) {
      return d;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight);
});
