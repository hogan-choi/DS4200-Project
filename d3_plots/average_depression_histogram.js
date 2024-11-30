// Load the dataset
const dataset = d3.csv("./datasets/binned_depression_data.csv");

dataset.then(function(data) {
    // Convert numeric fields
    data.forEach(function(d) {
        d.Avg_Depression_Score = +d.Avg_Depression_Score;
        d.CGPA_Bin = d.CGPA_Bin; 
    });

    // Define dimensions and margins
    const width = 400, height = 300;
    const margin = { top: 50, bottom: 50, left: 50, right: 30 };

    // Create the SVG container
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style('background', '#f5f5f5');

    // Set up scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.CGPA_Bin)) 
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Avg_Depression_Score)])
        .range([height - margin.bottom, margin.top]);

    // Add x-axis
    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    const yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    // Add x-axis label
    xAxis.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("CGPA Bins");

    // Add y-axis label
    yAxis.append("text")
        .attr("x", -(height / 2))
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Average Depression Score");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Histogram: Average Depression Score by CGPA");

    // Draw the bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.CGPA_Bin))
        .attr("y", d => yScale(d.Avg_Depression_Score))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - margin.bottom - yScale(d.Avg_Depression_Score))
        .attr("fill", "steelblue");
});
