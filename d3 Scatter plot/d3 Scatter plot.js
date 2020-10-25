const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
fetch(url)
.then(res => res.json())
.then(res => {
    let data = [];
    res.map((r , i) => {
        data[i] = [];
        data[i][0] = r["Name"];
        data[i][1] = r["Nationality"];
        data[i][2] = r["Year"];
        data[i][3] = r['Seconds'];
        data[i][4] = r["Doping"] == "" ? false : true;
        data[i][5] = r['Doping'];
    });
    draw(data);
})
function draw(data){
    const width = 900;
    const height = 600;
    const padding = 40;

    const svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

    svg.append('text')
       .attr('x', width - 250)
       .attr('y', height / 3)
       .text('No doping allegations : 🟠');

    svg.append('text')
       .attr('x', width -250)
       .attr('y', height / 2.5)
       .text('Riders with doping allegations : 🔵');

    let xScale = d3.scaleLinear()
                   .domain([d3.min(data, (d) => d[2]) - 1, d3.max(data, (d) => d[2])])
                   .range([padding, width- padding]);
    
    let yScale = d3.scaleTime()
                   .domain([d3.min(data, (d) => new Date(d[3] * 1000)), d3.max(data, (d) => new Date(d[3] * 1000))])
                   .range([padding, height - padding]);

    let xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format('d'));
    svg.append('g')
       .attr('transform', `translate(0, ${height - padding})`)
       .call(xAxis)
       .attr('id', 'x-axis');

    let yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.timeFormat('%M:%S'));
    svg.append('g')
       .attr('transform', `translate(${padding}, 0)`)
       .call(yAxis)
       .attr('id', 'y-axis');

    svg.selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('class', 'dot')
       .attr('r', 5)
       .attr('data-xvalue', (item) => item[2])
       .attr('data-yvalue', (item) => new Date(item[3] * 1000))
       .attr('cx', (item) => xScale(item[2]))
       .attr('cy', (item) => yScale(new Date(item[3] * 1000)))
       .attr('fill', (item) => item[4] ? "#1380ed" : '#f06502' )
       .append('title')
       .attr('id', 'tooltip')
       .text((item) => {
           let temp = "";
           if(item[4]){
               temp = "\n\n" + item[5];
           }
           let timeMin = parseInt(item[3] / 60) - 30;
           timeMin = (timeMin) < 10 ? '0' + timeMin : timeMin;
           let timeSec = item[3] % 60;
           timeSec = timeSec < 10 ? '0' + timeSec : timeSec;
           return `${item[0]}: ${item[1]}\nYear: ${item[2]}, Time: ${timeMin}:${timeSec}${temp}`
       });
}
