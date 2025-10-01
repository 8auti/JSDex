const API_URL = 'https://pokeapi.co/api/v2/';

async function fetchPokemon(identifier){
    try{
        // Puede ser el numero o nombre
        const response = await fetch(`${API_URL}pokemon/${identifier}`)
        
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

async function fetchSpecies(identifier){
    try{
        // Puede ser el numero o nombre
        const response = await fetch(`${API_URL}pokemon-species/${identifier}`)
        
        // Si el recurso no se pudo obtener
        if(!response.ok){
            throw new Error(`No se pudieron obtener las especies del Pokemon ${identifier}`)
        }

        const data = await response.json()
        return data
    }
    catch(error){
        console.error(error)
    }
}