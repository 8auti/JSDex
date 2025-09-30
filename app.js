
let loaded = 0
let loadAmount = 6

async function fetchData(identifier){
    try{

        // Puede ser el numero o nombre
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`)
        
        // Si el recurso no se pudo obtener
        if(!response.ok){
            throw new Error("No se pudo obtener el recurso")
        }

        const data = await response.json()
        return data
    }
    catch(error){
        console.error(error)
    }
}

function searchPokemon(){
    const pokemonName = document.getElementById("searchBar").value.toLowerCase()
    if(!pokemonName == ''){
        const pokemon = fetchData(pokemonName)
        return pokemon
    }
}

async function loadMorePokemon(){
    const limit = loaded + loadAmount;
    for (loaded; loaded < limit; loaded++) {
        const pokemon = await fetchData(loaded+1)
        
        if(pokemon){
            const card = createCard(pokemon)
        }
    }
}

loadMorePokemon()