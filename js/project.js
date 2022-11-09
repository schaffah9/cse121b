let pokemons = [];

async function getPokemons() {
    const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=251"
    );
    if (response.ok) {
        let pokemons = await response.json();
        const pokeData = pokemons.results.forEach(pokemon => {
            getPokemonData(pokemon);
        });
    }
}

async function getPokemonData(pokemon) {
    const url = pokemon.url;
    const response = await fetch(url);
    if (response.ok) {
        const pokemonData = await response.json();
        pokemons.push(pokemonData);
        outputPokemon(pokemonData);
    };
}

function outputPokemon(pokemon) {
    const allPokemonsContainer = document.querySelector(".pokemons");

    const pokemonContainer = document.createElement("article");
    allPokemonsContainer.appendChild(pokemonContainer);

    const pokemonName = document.createElement("h3");
    pokemonName.textContent = getPokemonName(pokemon);
    
    const pokemonSprite = document.createElement("img");
    pokemonSprite.src = getPokemonSprite(pokemon);
    pokemonSprite.alt = getPokemonName(pokemon);

    const pokemonTypes = document.createElement("p");
    pokemonTypes.textContent = `Type: ${getPokemonTypes(pokemon)}`;

    const pokemonAbilities = document.createElement("p");
    pokemonAbilities.textContent = `Abilities: ${getPokemonAbilities(pokemon)}`;

    const pokemonStats = document.createElement("p");
    const pokemonStatValues = document.createElement("ul");
    pokemonStats.textContent = "Base Stats: "
    pokemonStats.appendChild(pokemonStatValues)
    pokemonStatValues.innerHTML = outputStats(pokemon);

    pokemonContainer.appendChild(pokemonName);
    pokemonContainer.appendChild(pokemonSprite);
    pokemonContainer.appendChild(pokemonTypes);
    pokemonContainer.appendChild(pokemonAbilities);
    pokemonContainer.appendChild(pokemonStats);
}

function capitalize(word) {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
}

function capitalizeStr(word) {
    let capitalized;
    if (word.includes("-")) {
        let split = word.split("-");
        split = split.map((item) => capitalize(item));
        capitalized = split.join(" ");
    }
    else {
        capitalized = capitalize(word);
    }
    return capitalized;
}

function getPokemonName(pokemon) {
    return capitalizeStr(pokemon.name);
}

function getPokemonSprite(pokemon) {
    return pokemon.sprites.front_default;
}

function getPokemonTypes(pokemon) {
    const typesList = pokemon.types.map((item) => {
        return capitalize(item.type.name);
    });
    return typesList.join(" / ");
}

function getPokemonAbilities(pokemon) {
    let abilitiesList = pokemon.abilities.filter((item) => !(item.is_hidden));
    abilitiesList = abilitiesList.map((item) => {
        return capitalizeStr(item.ability.name);
    });
    return abilitiesList.join(", ");
}

function getPokemonStats(pokemon) {
    const statsList = pokemon.stats.map((item) => {
        const statName = function () {
            let capitalized;
            if (item.stat.name === "hp") {
                capitalized = item.stat.name.toUpperCase();
            }
            else {capitalized = capitalizeStr(item.stat.name);}
            return capitalized;
        };
        const stat = {
            name: statName(),
            value: item.base_stat
        };
        return stat;
    });
    return statsList;
}

function outputStats(pokemon) {
    const stats = getPokemonStats(pokemon);
    let html = "";

    stats.forEach((stat) => {
        html += `<li>${stat.name}: ${stat.value}</li>`;
    });
    return html;
}

getPokemons()

function reset() {
    const pokemons = document.querySelector(".pokemons");
    pokemons.innerHTML = "";
}

function sortByStat(statIndex) {
    let sorted = pokemons.sort((pokemon1, pokemon2) => {
        let value1 = pokemon1.stats[statIndex].base_stat;
        let value2 = pokemon2.stats[statIndex].base_stat;
        return value1 - value2;
    });
    return sorted;
}

function sortBy() {
    const order = document.getElementById("sortBy").value;

    reset();

    let sorted;
    let statIndex;
    switch (order) {
        case "HPAsc":
            statIndex = 0
            sorted = sortByStat(statIndex);
            break;
        case "HPDesc":
            statIndex = 0
            sorted = sortByStat(statIndex).reverse();
            break;
    
        case "AtkAsc":
            statIndex = 1
            sorted = sortByStat(statIndex);
            break;
        case "AtkDesc":
            statIndex = 1
            sorted = sortByStat(statIndex).reverse();
            break;
    
        case "DefAsc":
            statIndex = 2
            sorted = sortByStat(statIndex);
            break;
        case "DefDesc":
            statIndex = 2
            sorted = sortByStat(statIndex).reverse();
            break;
    
        case "SpAtkAsc":
            statIndex = 3
            sorted = sortByStat(statIndex);
            break;
        case "SpAtkDesc":
            statIndex = 3
            sorted = sortByStat(statIndex).reverse();
            break;
    
        case "SpDefAsc":
            statIndex = 4
            sorted = sortByStat(statIndex);
            break;
        case "SpDefDesc":
            statIndex = 4
            sorted = sortByStat(statIndex).reverse();
            break;
    
        case "SpeAsc":
            statIndex = 5
            sorted = sortByStat(statIndex);
            break;
        case "SpeDesc":
            statIndex = 5
            sorted = sortByStat(statIndex).reverse();
            break;
    }
    renderPokemons(sorted);
}

function renderPokemons(pokemons) {
    pokemons.forEach(pokemon => {
        outputPokemon(pokemon);
    });
}

const sortPokemons = document.getElementById("sortBy");
sortPokemons.addEventListener("change", sortBy);
