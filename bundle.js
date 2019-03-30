(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var outerWidth = 700;
var outerHeight = 520;
var rMin = 1;
var rMax = 20;
var sidebarwidth = 150;
var margin = { left: 90, top: 30, right: 30, bottom: 80 };
var innerWidth = outerWidth - margin.left - margin.right - sidebarwidth;
var innerHeight = outerHeight - margin.top - margin.bottom;
var xColumn = "Living";
var yColumn = "Sell";
var rColumn = "List";
var colorColumn = "Category";
var xAxisText = xColumn;
var xAxisLabelOffset = 50;
var yAxisText = yColumn;
var yAxisLabelOffset = 45;
//most outer element
var container = d3.select("body").append("div")
    .attr("class", "container");
var svg = container.append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("max-width", "500")
    .attr("max-height", "500")
    .attr('viewBox', '0 0 ' + outerWidth + ' ' + outerHeight)
    .attr('preserveAspectRatio', 'xMinYMin meet');
//element within outer svg, centered via margins
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//group element for X and Y axes
var xAxisG = g.append("g")
    .attr("transform", "translate(0," + innerHeight + ")")
    .attr("class", "x axis");
var xAxisLabel = xAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("x", innerWidth / 2)
    .attr("y", xAxisLabelOffset)
    .attr("class", "label")
    .text(xAxisText);
var yAxisG = g.append("g")
    .attr("class", "y axis");
var yAxisLabel = yAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("transform", "translate(-" + yAxisLabelOffset + "," + innerHeight / 2 + ") rotate(-90)")
    .attr("class", "label")
    .text(yAxisText);
var colors = ["rgba(53, 219, 227, 0.6)", "rgba(146, 53, 227, 0.6)", "rgba(134, 230, 51, 0.6)"];
//x and y scales (y inverted because top->bottom)
var xScale = d3.scale.linear().range([0, innerWidth]);
var yScale = d3.scale.linear().range([innerHeight, 0]);
var rScale = d3.scale.sqrt().range([rMin, rMax]);
var colorScale = d3.scale.ordinal().range(colors);
//sidebar - legenda
var sidebarLeftMargin = margin.left + innerWidth;
var sidebar = svg.append("g")
    .attr("transform", "translate(" + sidebarLeftMargin + "," + margin.top + ")")
    .attr("class", "sidebar");
//kategorije - barve
var colorLegend = sidebar.append("g");
colorLegend.append("text")
    .text("Category")
    .attr("class", "categorylabel");
var colorLegendDataYoffset = 20;
var colorLegendData = colorLegend.append("g")
    .attr("transform", "translate(0," + colorLegendDataYoffset + ")");
function addLabel(item, index) {
    colorLegendData.append("rect")
        .attr("y", index * 30)
        .attr("height", 20)
        .attr("width", 20)
        .attr("fill", item);
    colorLegendData.append("text")
        .attr("y", 15 + index * 30)
        .attr("x", 30)
        .attr("class", "categorydata")
        .text(colorScale.domain()[index]);
}
//velikost kroga primerjava
//TODO
//X in Y osi
var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
    .outerTickSize(0)
    .ticks(5);
var yAxis = d3.svg.axis().scale(yScale).orient("left")
    .ticks(5)
    .tickFormat(d3.format("s"))
    .outerTickSize(0);
function render(data) {
    // Bind data
    //console.log(data);
    var xDomain = d3.extent(data, function (d) { return d[xColumn]; });
    var yDomain = d3.extent(data, function (d) { return d[yColumn]; });
    xScale.domain([xDomain[0] * 0.9, xDomain[1] * 1.1]);
    yScale.domain([yDomain[0] * 0.9, yDomain[1] * 1.1]);
    rScale.domain(d3.extent(data, function (d) { return d[rColumn]; }));
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    var circles = g.selectAll("circle").data(data);
    // Enter
    circles.enter().append("circle");
    // Update
    circles
        .attr("cx", function (d) { return xScale(d[xColumn]); })
        .attr("cy", function (d) { return yScale(d[yColumn]); })
        .attr("r", function (d) { return rScale(d[rColumn]); })
        .attr("class", function (d) { return d[colorColumn]; })
        .attr("fill", function (d) { return colorScale(d[colorColumn]).toString(); });
    colors.forEach(addLabel);
    // Exit
    circles.exit().remove();
}
//parses strings from file to ints
function type(d) {
    d[yColumn] = +d[yColumn];
    d[xColumn] = +d[xColumn];
    d[rColumn] = +d[rColumn];
    return d;
}
d3.csv("data/homes.csv", type, render);
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDYUEsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUV0QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFFZCxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFFMUQsSUFBSSxVQUFVLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7QUFDeEUsSUFBSSxXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUU1RCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFDdkIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUNyQixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUM7QUFFN0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDO0FBQ3hCLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUN4QixJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUUxQixvQkFBb0I7QUFDcEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUMsV0FBVyxDQUFD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Q0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekIsT0FBTztJQUNQLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBRUQsa0NBQWtDO0FBQ2xDLFNBQVMsSUFBSSxDQUFDLENBQWE7SUFDdkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBRUQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxuZXhwb3J0e31cclxuLy9pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XHJcbmltcG9ydCAqIGFzIF9kMyBmcm9tIFwiZDNcIjtcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICBjb25zdCBkMzogdHlwZW9mIF9kMztcclxufVxyXG5cclxuaW50ZXJmYWNlIGRhdGFvYmplY3Qge1xyXG4gIFtrZXk6IHN0cmluZ106IHN0cmluZ3xudW1iZXI7XHJcbn1cclxuIFxyXG5sZXQgb3V0ZXJXaWR0aCA9IDcwMDtcclxubGV0IG91dGVySGVpZ2h0ID0gNTIwO1xyXG5cclxubGV0IHJNaW4gPSAxO1xyXG5sZXQgck1heCA9IDIwO1xyXG5cclxubGV0IHNpZGViYXJ3aWR0aCA9IDE1MDtcclxubGV0IG1hcmdpbiA9IHsgbGVmdDogOTAsIHRvcDogMzAsIHJpZ2h0OiAzMCwgYm90dG9tOiA4MCB9O1xyXG5cclxubGV0IGlubmVyV2lkdGggPSBvdXRlcldpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQgLSBzaWRlYmFyd2lkdGg7XHJcbmxldCBpbm5lckhlaWdodCA9IG91dGVySGVpZ2h0IC0gbWFyZ2luLnRvcCAgLSBtYXJnaW4uYm90dG9tO1xyXG5cclxubGV0IHhDb2x1bW4gPSBcIkxpdmluZ1wiO1xyXG5sZXQgeUNvbHVtbiA9IFwiU2VsbFwiO1xyXG5sZXQgckNvbHVtbiA9IFwiTGlzdFwiO1xyXG5sZXQgY29sb3JDb2x1bW4gPSBcIkNhdGVnb3J5XCI7XHJcblxyXG5sZXQgeEF4aXNUZXh0ID0geENvbHVtbjtcclxubGV0IHhBeGlzTGFiZWxPZmZzZXQgPSA1MDtcclxubGV0IHlBeGlzVGV4dCA9IHlDb2x1bW47XHJcbmxldCB5QXhpc0xhYmVsT2Zmc2V0ID0gNDU7XHJcblxyXG4vL21vc3Qgb3V0ZXIgZWxlbWVudFxyXG5sZXQgY29udGFpbmVyID0gZDMuc2VsZWN0KFwiYm9keVwiKS5hcHBlbmQoXCJkaXZcIilcclxuLmF0dHIoXCJjbGFzc1wiLFwiY29udGFpbmVyXCIpO1xyXG5cclxubGV0IHN2ZyA9IGNvbnRhaW5lci5hcHBlbmQoXCJzdmdcIilcclxuLmF0dHIoXCJ3aWR0aFwiLCAgXCIxMDAlXCIpXHJcbi5hdHRyKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4uYXR0cihcIm1heC13aWR0aFwiLCBcIjUwMFwiKVxyXG4uYXR0cihcIm1heC1oZWlnaHRcIiwgXCI1MDBcIilcclxuLmF0dHIoJ3ZpZXdCb3gnLCcwIDAgJytvdXRlcldpZHRoKycgJytvdXRlckhlaWdodClcclxuLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCd4TWluWU1pbiBtZWV0JylcclxuXHJcbi8vZWxlbWVudCB3aXRoaW4gb3V0ZXIgc3ZnLCBjZW50ZXJlZCB2aWEgbWFyZ2luc1xyXG5sZXQgZyA9IHN2Zy5hcHBlbmQoXCJnXCIpXHJcbi5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiK21hcmdpbi5sZWZ0K1wiLFwiK21hcmdpbi50b3ArXCIpXCIpO1xyXG5cclxuLy9ncm91cCBlbGVtZW50IGZvciBYIGFuZCBZIGF4ZXNcclxubGV0IHhBeGlzRyA9IGcuYXBwZW5kKFwiZ1wiKVxyXG4uYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaW5uZXJIZWlnaHQgKyBcIilcIilcclxuLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKTtcclxubGV0IHhBeGlzTGFiZWwgPSB4QXhpc0cuYXBwZW5kKFwidGV4dFwiKVxyXG4uc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxyXG4uYXR0cihcInhcIiwgaW5uZXJXaWR0aCAvIDIpXHJcbi5hdHRyKFwieVwiLCB4QXhpc0xhYmVsT2Zmc2V0KVxyXG4uYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcclxuLnRleHQoeEF4aXNUZXh0KTtcclxubGV0IHlBeGlzRyA9IGcuYXBwZW5kKFwiZ1wiKVxyXG4uYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpO1xyXG5sZXQgeUF4aXNMYWJlbCA9IHlBeGlzRy5hcHBlbmQoXCJ0ZXh0XCIpXHJcbi5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXHJcbi5hdHRyKFwidHJhbnNmb3JtXCIsXCJ0cmFuc2xhdGUoLVwiK3lBeGlzTGFiZWxPZmZzZXQrXCIsXCIraW5uZXJIZWlnaHQvMitcIikgcm90YXRlKC05MClcIilcclxuLmF0dHIoXCJjbGFzc1wiLCBcImxhYmVsXCIpXHJcbi50ZXh0KHlBeGlzVGV4dCk7XHJcblxyXG5sZXQgY29sb3JzID0gW1wicmdiYSg1MywgMjE5LCAyMjcsIDAuNilcIixcInJnYmEoMTQ2LCA1MywgMjI3LCAwLjYpXCIsXCJyZ2JhKDEzNCwgMjMwLCA1MSwgMC42KVwiXTtcclxuLy94IGFuZCB5IHNjYWxlcyAoeSBpbnZlcnRlZCBiZWNhdXNlIHRvcC0+Ym90dG9tKVxyXG5sZXQgeFNjYWxlID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoWzAsIGlubmVyV2lkdGhdKTtcclxubGV0IHlTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpLnJhbmdlKFtpbm5lckhlaWdodCwgMF0pO1xyXG5sZXQgclNjYWxlID0gZDMuc2NhbGUuc3FydCgpLnJhbmdlKFtyTWluLHJNYXhdKTtcclxubGV0IGNvbG9yU2NhbGUgPSBkMy5zY2FsZS5vcmRpbmFsKCkucmFuZ2UoY29sb3JzKTtcclxuXHJcbi8vc2lkZWJhciAtIGxlZ2VuZGFcclxubGV0IHNpZGViYXJMZWZ0TWFyZ2luID0gbWFyZ2luLmxlZnQgKyBpbm5lcldpZHRoO1xyXG5sZXQgc2lkZWJhciA9IHN2Zy5hcHBlbmQoXCJnXCIpXHJcbi5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiK3NpZGViYXJMZWZ0TWFyZ2luK1wiLFwiK21hcmdpbi50b3ArXCIpXCIpXHJcbi5hdHRyKFwiY2xhc3NcIixcInNpZGViYXJcIik7XHJcblxyXG4vL2thdGVnb3JpamUgLSBiYXJ2ZVxyXG5sZXQgY29sb3JMZWdlbmQgPSBzaWRlYmFyLmFwcGVuZChcImdcIilcclxuY29sb3JMZWdlbmQuYXBwZW5kKFwidGV4dFwiKVxyXG4udGV4dChcIkNhdGVnb3J5XCIpXHJcbi5hdHRyKFwiY2xhc3NcIixcImNhdGVnb3J5bGFiZWxcIilcclxuXHJcbmxldCBjb2xvckxlZ2VuZERhdGFZb2Zmc2V0ID0gMjA7XHJcbmxldCBjb2xvckxlZ2VuZERhdGEgPSBjb2xvckxlZ2VuZC5hcHBlbmQoXCJnXCIpXHJcbi5hdHRyKFwidHJhbnNmb3JtXCIsXCJ0cmFuc2xhdGUoMCxcIitjb2xvckxlZ2VuZERhdGFZb2Zmc2V0ICtcIilcIik7XHJcblxyXG5mdW5jdGlvbiBhZGRMYWJlbChpdGVtOnN0cmluZywgaW5kZXg6bnVtYmVyKXtcclxuICBjb2xvckxlZ2VuZERhdGEuYXBwZW5kKFwicmVjdFwiKVxyXG4gIC5hdHRyKFwieVwiLGluZGV4KjMwKVxyXG4gIC5hdHRyKFwiaGVpZ2h0XCIsMjApXHJcbiAgLmF0dHIoXCJ3aWR0aFwiLDIwKVxyXG4gIC5hdHRyKFwiZmlsbFwiLGl0ZW0pO1xyXG5cclxuICBjb2xvckxlZ2VuZERhdGEuYXBwZW5kKFwidGV4dFwiKVxyXG4gIC5hdHRyKFwieVwiLDE1K2luZGV4KjMwKVxyXG4gIC5hdHRyKFwieFwiLDMwKVxyXG4gIC5hdHRyKFwiY2xhc3NcIixcImNhdGVnb3J5ZGF0YVwiKVxyXG4gIC50ZXh0KGNvbG9yU2NhbGUuZG9tYWluKClbaW5kZXhdKVxyXG59XHJcblxyXG4vL3ZlbGlrb3N0IGtyb2dhIHByaW1lcmphdmFcclxuLy9UT0RPXHJcblxyXG4vL1ggaW4gWSBvc2lcclxubGV0IHhBeGlzID0gZDMuc3ZnLmF4aXMoKS5zY2FsZSh4U2NhbGUpLm9yaWVudChcImJvdHRvbVwiKVxyXG4gIC5vdXRlclRpY2tTaXplKDApXHJcbiAgLnRpY2tzKDUpO1xyXG5sZXQgeUF4aXMgPSBkMy5zdmcuYXhpcygpLnNjYWxlKHlTY2FsZSkub3JpZW50KFwibGVmdFwiKVxyXG4gIC50aWNrcyg1KVxyXG4gIC50aWNrRm9ybWF0KGQzLmZvcm1hdChcInNcIikpXHJcbiAgLm91dGVyVGlja1NpemUoMCk7XHJcblxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKGRhdGE6IEFycmF5PGFueT4pe1xyXG4vLyBCaW5kIGRhdGFcclxuICAgIFxyXG4gICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGxldCB4RG9tYWluID0gZDMuZXh0ZW50KGRhdGEsIGZ1bmN0aW9uIChkKXsgcmV0dXJuIGRbeENvbHVtbl07IH0pO1xyXG4gICAgbGV0IHlEb21haW4gPSBkMy5leHRlbnQoZGF0YSwgZnVuY3Rpb24gKGQpeyByZXR1cm4gZFt5Q29sdW1uXTsgfSk7XHJcbiAgICB4U2NhbGUuZG9tYWluKFt4RG9tYWluWzBdKjAuOSx4RG9tYWluWzFdKjEuMV0pO1xyXG4gICAgeVNjYWxlLmRvbWFpbihbeURvbWFpblswXSowLjkseURvbWFpblsxXSoxLjFdKTtcclxuICAgIHJTY2FsZS5kb21haW4oZDMuZXh0ZW50KGRhdGEsIGZ1bmN0aW9uKGQpeyByZXR1cm4gZFtyQ29sdW1uXX0pKTtcclxuXHJcbiAgICB4QXhpc0cuY2FsbCh4QXhpcyk7XHJcbiAgICB5QXhpc0cuY2FsbCh5QXhpcyk7XHJcbiAgIFxyXG4gICAgbGV0IGNpcmNsZXMgPSBnLnNlbGVjdEFsbChcImNpcmNsZVwiKS5kYXRhKGRhdGEpO1xyXG5cclxuICAgIC8vIEVudGVyXHJcbiAgICBjaXJjbGVzLmVudGVyKCkuYXBwZW5kKFwiY2lyY2xlXCIpO1xyXG5cclxuICAgIC8vIFVwZGF0ZVxyXG4gICAgY2lyY2xlc1xyXG4gICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbiAoZCl7IHJldHVybiB4U2NhbGUoZFt4Q29sdW1uXSk7IH0pXHJcbiAgICAuYXR0cihcImN5XCIsIGZ1bmN0aW9uIChkKXsgcmV0dXJuIHlTY2FsZShkW3lDb2x1bW5dKTsgfSlcclxuICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkKXsgcmV0dXJuIHJTY2FsZShkW3JDb2x1bW5dKX0pXHJcbiAgICAuYXR0cihcImNsYXNzXCIsZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGRbY29sb3JDb2x1bW5dfSlcclxuICAgIC5hdHRyKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBjb2xvclNjYWxlKGRbY29sb3JDb2x1bW5dKS50b1N0cmluZygpfSk7XHJcblxyXG4gICAgY29sb3JzLmZvckVhY2goYWRkTGFiZWwpO1xyXG4gICAgLy8gRXhpdFxyXG4gICAgY2lyY2xlcy5leGl0KCkucmVtb3ZlKCk7XHJcbn1cclxuXHJcbi8vcGFyc2VzIHN0cmluZ3MgZnJvbSBmaWxlIHRvIGludHNcclxuZnVuY3Rpb24gdHlwZShkOiBkYXRhb2JqZWN0KXtcclxuICAgIGRbeUNvbHVtbl0gPSArZFt5Q29sdW1uXTtcclxuICAgIGRbeENvbHVtbl0gPSArZFt4Q29sdW1uXTtcclxuICAgIGRbckNvbHVtbl0gPSArZFtyQ29sdW1uXTtcclxuICAgIHJldHVybiBkO1xyXG59XHJcblxyXG5kMy5jc3YoXCJkYXRhL2hvbWVzLmNzdlwiLHR5cGUscmVuZGVyKTtcclxuIl19