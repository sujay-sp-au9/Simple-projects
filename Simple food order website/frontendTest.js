const URL = 'https://api.jsonbin.io/b/5f9e3e27ce4aa2289553ee69';

let loc = "Cardiff";
let searchData;

function changeLocation(change) {
    loc = change;
    document.getElementById('selector').innerText = change;
    populate();
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
function login() {
    setTimeout(() => document.getElementById('login').innerText = 'Hello, Guest', 1000);
}
function addCategory(type) {
    let restaurantDiv = document.getElementById('restaurants');
    let h3 = document.createElement('h3');
    h3.innerText = type;
    restaurantDiv.appendChild(h3);
    let category = document.createElement('div');
    category.id = `${type}`;
    category.classList.add('category');
    restaurantDiv.appendChild(category);
}
function addRestaurant(type, imgSource, name, address, rating) {
    let category = document.getElementById(`${type}`);
    let card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = imgSource;
    img.alt = "restaurant-photo";
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = name;
    let cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = address;
    let cardRating = document.createElement('h5');
    cardRating.innerText = 'Rating: ' + '⭐'.repeat(rating);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardRating);
    card.appendChild(img);
    card.appendChild(cardBody);
    category.appendChild(card);
}
function populate() {
    document.getElementById('restaurants').innerHTML = "";
    searchData = [];
    let categoryList = new Set();
    fetch(URL)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        return res;
    })
    .then(res => res.filter((element) => {
        if(element['address line 2'] == loc){
            return true;
        }
        return false;
    }))
    .then(res => res.forEach(element => {
        let type = element['type_of_food'];
        let name = element['name'];
        let address = element['address'];
        let rating = element['rating']
        searchData.push([name, address, rating]);
        if(!categoryList.has(type)){
            addCategory(type);
            categoryList.add(type);
        }
        addRestaurant(type, "https://picsum.photos/200", name, address, rating);
    }));
}
populate();
function search(event, id) {
    let searchInput = document.getElementById(id).value;
    let resultHolder = document.getElementById('myDropdownSearch');
    resultHolder.innerHTML = "";
    let temp = [ ...searchData ];
    temp = temp.filter((element) => {
        if(element[0].toLowerCase().search(searchInput) != -1){
            return true;
        }
        return false;
    });
    let idx = 0;
    while(idx < 6 && idx < temp.length){
        let button = document.createElement('button');
        button.innerText = temp[idx][0];
        resultHolder.appendChild(button);
        idx+=1;
    }
    if(!resultHolder.classList.contains('show')){
        resultHolder.classList.add('show');
    }
    if(event.key == 'Enter' || event.keyCode == '13'){
        if(searchInput.length == 0){
            document.getElementById('myDropdownSearch').classList.remove('show');
            populate();
        }
        else{
            addSearchresults(temp);
        }
    }
}
function addSearchresults(result) {
    let restaurantDiv = document.getElementById('restaurants');
    restaurantDiv.innerHTML = "";
    let type = 'Search results';
    addCategory(type);
    for(restaurant of result){
        addRestaurant(type, "https://picsum.photos/200", restaurant[0], restaurant[1], restaurant[2]);
    }
    document.getElementById('myDropdownSearch').classList.remove('show');
}