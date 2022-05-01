const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
  Array(12)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elementsTypes = types.map((typeInfo) => typeInfo.type.name);

    accumulator += `
  <li class="card ${elementsTypes[0]}">
  <img class="card-image" alt="${name}" src="https://cdn.traction.one/pokedex/pokemon/${id}.png" />
  <h2 class="card-title">${id}. ${name}</h2>
  <p class="card-subtitle">${elementsTypes.join(" | ")}</p>
  </li>
  `;
    return accumulator;
  }, "");

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);
