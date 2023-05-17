const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const imageBaseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

const btnRandom = document.getElementById("btn-random");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");
const abilities = document.getElementById("abilities");
const species = document.getElementById("species");
const moves =document.getElementById("moves");

btnRandom.addEventListener("click", getPokemon);

async function getPokemon() {
    try {
        const randomID = Math.floor(Math.random() * 898) + 1;
    
        const response = await fetch(`${baseURL}${randomID}`);
        const pokemon = await response.json();
        console.log(pokemon);
    
        pokemonImg.src = `${imageBaseURL}${pokemon.id}.png`;
        pokemonName.textContent = pokemon.name;
        abilities.textContent = pokemon.abilities[0].ability.name;
        species.textContent = pokemon.species.name;
        moves.textContent = pokemon.moves[0].move.name;

    
        return pokemon;
    } catch (error) {
        console.log(error);
    }
}

getPokemon();
