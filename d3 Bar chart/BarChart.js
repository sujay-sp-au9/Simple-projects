fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(res => res.json())
.then(res => {
    const { data } = res;
    create(data.map(d => [d[0].split("-")[0], d[1], d[0].split("-")[1]]));
})


function create(data) {
    
    const width = 800;
    const height = 500;

    const yPadding = 30;
    const xPadding = 40;

    const barWidth = (width - xPadding) / data.length;

    const Yscale = d3.scaleLinear()
                    .domain([0, d3.max(data, (d) => d[1])])
                    .range([0, height-yPadding]);

    const YscaleAxis = d3.scaleLinear()
                        .domain([0, d3.max(data, (d) => d[1])])
                        .range([height - yPadding, 0]);

    const Xscale = d3.scaleLinear()
                    .domain([d3.min(data, (d) => d[0]), d3.max(data, (d) => d[0])])
                    .range([0, width - xPadding]);

    const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i* barWidth + xPadding)
    .attr('y', (d) => height - Yscale(d[1]) - yPadding)
    .attr('width', barWidth)
    .attr('height', (d) => Yscale(d[1]) + 'px')
    .append('title')
    .text((d) => {
        let month = d[2];
        let temp;
        if(month > 0 && month < 4){
            temp = 'Q1';
        }
        else if(month > 3 && month < 7){
            temp = 'Q2';
        }
        else if(month > 6 && month < 10){
            temp ='Q3';
        }
        else if(month > 9 && month < 13){
            temp = 'Q4';
        }
        else{
            temp = '-';
        }
        return d[0] + ` ${temp}\n` + '$' + d[1] + 'bn';
    });

    const yAxis = d3.axisLeft(YscaleAxis);
    const xAxis = d3.axisBottom(Xscale);

    svg.append("g")
       .attr('transform', `translate(${xPadding}, ${height - yPadding})`)
       .call(xAxis);

    svg.append("g")
       .attr('transform', `translate(${xPadding}, 0)`)
       .call(yAxis);
}
