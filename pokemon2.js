alert( 'Hello Pokemon');

const pokedex = document.getElementById("pokedex");

// console.log('pokedex', pokedex);

function displayPokemons(pokemons) {
    const pokemonHTMLString = pokemons
        .map(
            (pokemon) => {
               const abilityElements = pokemon.abilities.map((ability) => {
                return `
                <ul class="card ">
              <p class="card-subtitle ">name: ${ability.ability.name}</p>
              <p class="card-subtitle">url: ${ability.ability.url}</p>
              <p class="card-subtitle">is_hidden: ${ability.is_hidden}</p>
              <p class="card-subtitle">slot: ${ability.slot}</p>
                </ul>
        `
                 }).join(''); 
               
            //    console.log('Ability html', abilityElements);
               return `
        <li class="card">
            <h2 class="card-title">${pokemon.name}</h2>
            <div class = "display">
            <p class="card-subtitle-height">Height: ${pokemon.height}</p>
            <p class="card-subtitle-weight">Weight: ${pokemon.weight}</p>
            </div>
            <p class="card-subtitle ability">Abilities: ${abilityElements}</p>
        </li>
    `
            })
        .join('');

    pokedex.innerHTML = pokemonHTMLString;
};

function fetchAndDisplayPokemons() {
    let pokemons = [];
    const promises = [];
    for (let i = 1; i <= 10; i++) {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        const promise = fetch(url).then((res) => res.json());
        promises.push(promise);
    }
    
    Promise.all(promises,).then((results) => {
        pokemons = results.map((pokemon) => {
            return {name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: pokemon.abilities}});  
            displayPokemons(pokemons);          
        
    });
   
}



fetchAndDisplayPokemons();