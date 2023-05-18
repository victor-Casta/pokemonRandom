const baseURL_RANDOM = "https://pokeapi.co/api/v2/pokemon/";
const imageBaseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

const btnRandom = document.getElementById("btn-random");
const btnAdd = document.getElementById("btn-add");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");
const abilities = document.getElementById("abilities");
const species = document.getElementById("species");
const moves = document.getElementById("moves");
const favoritesContainer = document.getElementById("favorites-container");
const openPokemonFavorites = document.getElementById("open-aside");
const closeFavoritesButton = document.getElementById("close-favorites");
const notification = document.getElementById("notification");

const pokemonArray = [];

btnRandom.addEventListener("click", getPokemon);
btnAdd.addEventListener("click", addToFavorites);
openPokemonFavorites.addEventListener("click", openCardsFavorites);
closeFavoritesButton.addEventListener("click", closeFavoritesContainer);

async function getPokemon() {
    try {
        const randomID = Math.floor(Math.random() * 898) + 1;

        const response = await fetch(`${baseURL_RANDOM}${randomID}`);
        const pokemon = await response.json();

        pokemonImg.src = `${imageBaseURL}${pokemon.id}.png`;
        pokemonName.textContent = pokemon.name;
        abilities.textContent = pokemon.abilities[0].ability.name;
        species.textContent = pokemon.species.name;
        moves.textContent = pokemon.moves[0].move.name;

        pokemonArray.push(pokemon); // Agregar el objeto pokemon al array

        return pokemon;
    } catch (error) {
        console.log(error);
    }
}

function addToFavorites() {
    const pokemon = pokemonArray[pokemonArray.length - 1];

    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("favorite-card");

    const favoriteImg = document.createElement("img");
    favoriteImg.src = `${imageBaseURL}${pokemon.id}.png`;
    favoriteImg.alt = pokemon.name;

    const favoriteName = document.createElement("h3");
    favoriteName.textContent = pokemon.name;

    const btnRemoveFavorites = document.createElement("button");
    const btnText = document.createTextNode("remove to favorites");
    

    notification.textContent = `pokémon ${pokemon.name} added to favorites`;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);


    favoriteCard.appendChild(favoriteImg);
    favoriteCard.appendChild(favoriteName);
    btnRemoveFavorites.appendChild(btnText);
    favoriteCard.appendChild(btnRemoveFavorites);

    favoritesContainer.appendChild(favoriteCard);
}

function openCardsFavorites() {
    favoritesContainer.classList.remove("view-card");
}

function closeFavoritesContainer() {
    favoritesContainer.classList.add("view-card");
}

getPokemon();
