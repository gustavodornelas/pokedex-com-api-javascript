const pokemonsList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 20
let offset = 0
const maxRecords = 1154

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        pokemonsList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}" srcset="">
            </div>
        </li>
        `
        ).join('')
    })
        .catch((error) => console.error(error))
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    
    offset += limit

    if (offset >= maxRecords) {
        offset = maxRecords
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }

    loadPokemonItens(offset, limit)
})