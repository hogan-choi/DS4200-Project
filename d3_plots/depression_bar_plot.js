// Load the depression distribution dataset
const dist = d3.csv("./datasets/depression_distribution.csv");

dist.then(function(data) {
    // Convert string values into numbers
    data.forEach(function(d) {
        d.Depression_Score = +d.Depression_Score;
        d.count = +d.count;
    });

    // Define dimensions and margins for the SVG
    const width = 400, height = 300;
    const margin = { top: 50, bottom: 50, left: 50, right: 30 };

    // Create the SVG container
    const svg = d3.select("#barplot")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style('background', '#f5f5f5'); 

    // Set up scales for x and y axes
    let xScale = d3.scaleBand()
        .domain(data.map(d => d.Depression_Score))
        .range([margin.left, width - margin.right])
        .padding(0.5);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([height - margin.bottom, margin.top]);

    // Add x-axis
    const xAxis = svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    const yAxis = svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    // Add x-axis label
    xAxis.append('text')
        .attr('x', width / 2)
        .attr('y', height - 10)
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .text('Depression Score');

    // Add y-axis label
    yAxis.append('text')
        .attr('x', -(height / 2))
        .attr('y', 15)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .text('Number of Students');

    // Add title to the graph
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2) 
        .attr("text-anchor", "middle")
        .style("font-size", "16px") 
        .style("font-weight", "bold") 
        .text("Overall Depression Score Distribution");

    // Draw the bars
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.Depression_Score))
        .attr('y', d => yScale(d.count))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - margin.bottom - yScale(d.count))
        .attr('fill', 'steelblue'); 
});
