const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let url;

const revealDiv = document.getElementById('revealDiv');
const revealForm = document.getElementById('revealForm');
const submitBtn = document.querySelector('.btn');
const section = document.querySelector('section');

revealForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    console.log(e);
    e.preventDefault();

    function randomIntFromInterval(min, max) {
      //min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    let i = randomIntFromInterval(1, 150);
    
    let url = baseURL + i;

    fetch(url)
      .then(function(result) {
        console.log(result);
        return result.json();
    })
      .then(function(json) {
        console.log(json);
        displayResults(json);
    })
      .catch(function(err) {
        console.log(err);
    });

    function displayResults(json) {
         while (section.firstChild) {
            section.removeChild(section.firstChild);
        }

        let pokemon = json;

        let clearfix = document.createElement('div');
        let pokeSection1 = document.createElement('div');
        let pokeSection2 = document.createElement('div');
        let pokeSection3 = document.createElement('div');
        let pokeSection4 = document.createElement('div');
        let pokeName = document.createElement('h2');
        let pokeType = document.createElement('h5');
        let pokeDexOrder = document.createElement('h5');
        let pokeImg = document.createElement('img');

        clearfix.setAttribute('class', 'clearfix');
        pokeSection1.setAttribute('class', 'pokeSection container');
        pokeSection2.setAttribute('class', 'pokeSection container');
        pokeSection3.setAttribute('class', 'pokeSection container');
        pokeSection4.setAttribute('class', 'pokeSection container');

        let capitalPokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        console.log(capitalPokeName);

        pokeName.textContent = capitalPokeName;
        pokeType.textContent = `Type: ${pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1)}`; 

        pokeDexOrder.textContent = `Pokédex Order: ${pokemon.id}`;

        pokeImg.src = pokemon.sprites.front_default;
        pokeImg.setAttribute('class', 'img-fluid');

        pokeSection1.appendChild(pokeName);
        pokeSection2.appendChild(pokeType);
        pokeSection3.appendChild(pokeDexOrder);
        pokeSection4.appendChild(pokeImg);
        section.appendChild(clearfix);
        clearfix.appendChild(pokeSection1);
        clearfix.appendChild(pokeSection2);
        clearfix.appendChild(pokeSection3);
        clearfix.appendChild(pokeSection4);

    }
}