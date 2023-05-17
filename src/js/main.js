const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const imageBaseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

const btnRandom = document.getElementById("btn-random");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");

btnRandom.addEventListener("click", getPokemon);

async function getPokemon() {
    try {
        const randomID = Math.floor(Math.random() * 898) + 1;
    
        const response = await fetch(`${baseURL}${randomID}`);
        const pokemon = await response.json();
    
        pokemonImg.src = `${imageBaseURL}${pokemon.id}.png`;
        pokemonName.textContent = pokemon.name;
    
        return pokemon;
    } catch (error) {
        console.log(error);
    }
}

getPokemon();
