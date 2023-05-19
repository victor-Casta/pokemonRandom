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

        pokemonImg.src = pokemon.sprites.other["official-artwork"].front_default;
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

getPokemon();

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
    const btnText = document.createTextNode("Remove from favorites");

    notification.textContent = `Pokémon ${pokemon.name} added to favorites`;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);

    favoriteCard.appendChild(favoriteImg);
    favoriteCard.appendChild(favoriteName);
    btnRemoveFavorites.appendChild(btnText);
    favoriteCard.appendChild(btnRemoveFavorites);

    favoritesContainer.appendChild(favoriteCard);

    btnRemoveFavorites.addEventListener("click", function() {
        const parentDiv = this.parentNode;
        const pokemonName = parentDiv.querySelector("h3").textContent;

        // Eliminar el elemento del DOM
        parentDiv.remove();

        // Eliminar el elemento del array
        const index = pokemonArray.findIndex(pokemon => pokemon.name === pokemonName);
        if (index !== -1) {
            pokemonArray.splice(index, 1);
        }
    });
}

function openCardsFavorites() {
    favoritesContainer.classList.remove("view-card");
}

function closeFavoritesContainer() {
    favoritesContainer.classList.add("view-card");
}
