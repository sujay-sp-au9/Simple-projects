const educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countiesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const width = 1000;
const height = 600;

let countyData;
let educationData;

let svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

fetch(countiesURL)
.then(res => res.json())
.then(res => {
    countyData = topojson.feature(res, res.objects.counties).features;
    fetch(educationURL)
    .then(res => res.json())
    .then(res => {
        educationData = res;
        draw();
    });
});

function draw() {
    svg.selectAll('path')
       .data(countyData)
       .enter()
       .append('path')
       .attr('d', d3.geoPath())
       .attr('class', 'county')
       .attr('fill', (data) => {
           let bachelorsOrHigher = educationData.find((item) => {
               return item.fips == data.id;
           }).bachelorsOrHigher;
           if(bachelorsOrHigher <= 15){
               return 'tomato';
           }
           else if(bachelorsOrHigher <= 30){
               return 'orange';
           }
           else if(bachelorsOrHigher <= 45){
               return 'purple';
           }
           else{
               return 'limegreen';
           }
       });
       
}