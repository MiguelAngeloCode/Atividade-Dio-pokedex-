const pokemonList = document.getElementById('pokelist')
const LoadMoreButton = document.getElementById('LoadMoreButton')
const maxrecord = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi (pokemon){
  return  `
    <li class="pokemon  ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) =>  ` <li class="type ${type}">${type}</li>` ).join('')}
                    </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            </li> 
    `
}
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}
loadPokemonItens(offset, limit)
LoadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset +limit
    if (qtdRecordsWithNexPage >= maxrecord){
        newLimit  = maxrecord - offset
        loadPokemonItens(offset,newLimit)
        LoadMoreButton.parentElement.removeChild(LoadMoreButton)
    }else {loadPokemonItens(offset,limit)
}})
