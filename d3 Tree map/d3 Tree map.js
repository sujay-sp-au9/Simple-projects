const URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const width = 1000;
const height = 600;

const legendWidth = 1000;
const legendHeight = 100;

let data;

fetch(URL)
.then(res => res.json())
.then(res => {
    data = res;
    draw();
})

function draw() {
    let svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
    
    let hierarchy = d3.hierarchy(data, node => node.children)
                      .sum(node => node.value)
                      .sort((node1, node2) => node2.value - node1.value);

    let createTreeMap = d3.treemap()
                          .size([width, height]);

    createTreeMap(hierarchy);

    console.log(hierarchy.leaves());

    let gameTiles = hierarchy.leaves();

    let g = svg.selectAll('g')
               .data(gameTiles)
               .enter()
               .append('g')
               .attr('transform', game => `translate(${game.x0}, ${game.y0})`);

    g.append('rect')
     .attr('class', 'tile')
     .attr('fill', (game) => {
         let temp = game.data.category;
         switch(temp){
             case 'Wii':
                 return 'rgb(76, 146, 195)';
             case 'GB':
                 return 'rgb(255, 201, 147)';
             case 'PS2':
                 return 'rgb(222, 82, 83)';
             case 'SNES':
                 return 'rgb(209, 192, 221)';
             case 'GBA':
                 return 'rgb(233, 146, 206)';
             case '2600':
                 return 'rgb(210, 210, 210)';
             case 'DS':
                 return 'rgb(190, 210, 237)';
             case 'PS3':
                 return 'rgb(86, 179, 86)';
             case '3DS':
                 return 'rgb(255, 173, 171)';
             case 'PS':
                 return 'rgb(163, 120, 111)';
             case 'XB':
                 return 'rgb(249, 197, 219)';
             case 'PSP':
                 return 'rgb(201, 202, 78)';
             case 'X360':
                 return 'rgb(255, 153, 62)';
             case 'NES':
                 return 'rgb(173, 229, 161)';
             case 'PS4':
                 return 'rgb(169, 133, 202)';
             case 'N64':
                 return 'rgb(208, 176, 169)';
             case 'PC':
                 return 'rgb(153, 153, 153)';
             case 'XOne':
                 return 'rgb(226, 226, 164)';
         }
     })
     .attr('data-name', game => game.data.name)
     .attr('data-category', game => game.data.category)
     .attr('data-value', game => game.data.value)
     .attr('width', game => game.x1 - game.x0)
     .attr('height', game => game.y1 - game.y0)
     .append('title')
     .text(game => {
         let category = 'Category: ' + game.data.category;
         let name = 'Name: ' + game.data.name;
         let value = "Value: " + game.data.value;
         return name + '\n' + category + '\n' + value;
     });

    g.append('text')
     .text(game => game.data.name)
     .attr('x', 5)
     .attr('y', 20);

    let legend = d3.select('body')
                   .append('svg')
                   .attr('id', 'legend')
                   .attr('width', legendWidth)
                   .attr('height', legendHeight);

    let gameCategories = [];

    for(game of gameTiles){
        gameCategories.push(game.data.category);
    }

    gameCategories = [ ...new Set(gameCategories) ];

    let gWidth = legendWidth / gameCategories.length;

    let legendG = legend.selectAll('g')
                        .data(gameCategories)
                        .enter()
                        .append('g')
                        .attr('transform', (game, i) => `translate(${i * gWidth}, 0)`);

    legendG.append('rect')
           .attr('x', 5)
           .attr('y', legendHeight / 4)
           .attr('width', gWidth / 2)
           .attr('height', legendHeight / 2)
           .attr('fill', (category) => {
            switch(category){
                case 'Wii':
                    return 'rgb(76, 146, 195)';
                case 'GB':
                    return 'rgb(255, 201, 147)';
                case 'PS2':
                    return 'rgb(222, 82, 83)';
                case 'SNES':
                    return 'rgb(209, 192, 221)';
                case 'GBA':
                    return 'rgb(233, 146, 206)';
                case '2600':
                    return 'rgb(210, 210, 210)';
                case 'DS':
                    return 'rgb(190, 210, 237)';
                case 'PS3':
                    return 'rgb(86, 179, 86)';
                case '3DS':
                    return 'rgb(255, 173, 171)';
                case 'PS':
                    return 'rgb(163, 120, 111)';
                case 'XB':
                    return 'rgb(249, 197, 219)';
                case 'PSP':
                    return 'rgb(201, 202, 78)';
                case 'X360':
                    return 'rgb(255, 153, 62)';
                case 'NES':
                    return 'rgb(173, 229, 161)';
                case 'PS4':
                    return 'rgb(169, 133, 202)';
                case 'N64':
                    return 'rgb(208, 176, 169)';
                case 'PC':
                    return 'rgb(153, 153, 153)';
                case 'XOne':
                    return 'rgb(226, 226, 164)';
           }});
    
    legendG.append('text')
           .text(category => category)
           .attr('x', 5)
           .attr('y', legendHeight / 2);
}