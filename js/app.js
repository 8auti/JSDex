let loadedPokemon = []
let loadAmount = 6
let isLoading = false

async function loadMorePokemon() {
    if (isLoading) return

    isLoading = true
    let loaded = loadedPokemon.length
    const limit = loaded + loadAmount;

    for (loaded; loaded < limit; loaded++) {
        const pokemon = await fetchPokemon(loaded+1)
        console.log(pokemon);
        

        if(pokemon){
            loadedPokemon.push(pokemon)
            createCard(pokemon)
        }
    }

    isLoading = false
}

async function searchPokemon(){
    const pokemonName = document.getElementById("searchInput").value.toLowerCase()

    if (pokemonName != ''){
        const pokemon = await fetchPokemon(pokemonName)

        if (pokemon) {
            openModalWithPokemon(pokemon)
        } else {
            alert('No se pudo encontrar el pokemon!')
        }
    }
}

loadMorePokemon()