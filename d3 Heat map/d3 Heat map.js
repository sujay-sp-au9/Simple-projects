const width = 1000;
const height = 600;
const padding = 60;
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

fetch(url)
.then(res => res.json())
.then(res => {
    let baseTemp = res["baseTemperature"];
    let data = res["monthlyVariance"];
    draw(baseTemp, data);
})

function draw(baseTemp, data){

    const minYear = d3.min(data, (item) => item['year']);
    const maxYear = d3.max(data, (item) => item['year']);

    let svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

    let xScale = d3.scaleLinear()
                   .domain([minYear, maxYear + 1])
                   .range([padding, width - padding]);

    let yScale = d3.scaleTime()
                   .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
                   .range([padding, height - padding]);

    let xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format('d'));
    svg.append('g')
       .attr('id', 'x-axis')
       .attr('transform', `translate(0, ${height - padding})`)
       .call(xAxis);

    let yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.timeFormat('%B'));
    svg.append('g')
       .attr('transform', `translate(${padding}, 0)`)
       .attr('id', 'y-axis')
       .call(yAxis);


    const rectWidth = (width - 2 * padding) / (maxYear - minYear);
    const rectHeight = (height - 2 * padding) / 12;

    svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr('class', 'cell')
       .attr('data-month', item => item['month'])
       .attr('data-year', item => item['year'])
       .attr('data-temp', item => baseTemp + item['variance'])
       .attr('fill', (item) => {
           let temp = item['variance'];
           if(temp <= -2){
               return '#32a4a8';
           }
           else if(temp <= -1){
               return '#3273a8';
           }
           else if(temp <= 0){
               return '#3246a8';
           }
           else if(temp <= 1){
               return '#8e32a8';
           }
           else if(temp <= 2){
               return '#780a44';
           }
           else{
               return '#850106';
           }
       })
       .attr('width', rectWidth)
       .attr('height', rectHeight)
       .attr('x', (item) => xScale(item['year']))
       .attr('y', (item) => yScale(new Date(0, item['month'] - 1, 0, 0, 0, 0, 0)))
       .append('title')
       .text(item => {
           let month = "";
           switch(item['month']){
                case 1:
                   month = 'January';
                   break;
                case 2:
                    month = 'February';
                    break;
                case 3:
                    month = 'March';
                    break;
                case 4:
                    month = 'April';
                    break;
                case 5:
                    month = "May";
                    break;
                case 6:
                    month = 'June';
                    break;
                case 7:
                    month = 'July';
                case 8:
                    month = 'August';
                    break;
                case 9:
                    month = "September";
                    break;
                case 10:
                    month = "October";
                    break;
                case 11:
                    month = "November";
                    break;
                case 12:
                    month = "December";
                    break;
           }
           return `${item['year']} - ${month}\n${(baseTemp + item['variance']).toFixed(3)}℃\n${item['variance']}℃`;
       });
}