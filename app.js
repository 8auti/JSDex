
let loadedPokemon = []
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

async function searchPokemon(){
    const pokemonName = document.getElementById("searchInput").value.toLowerCase()
    if (pokemonName != ''){
        const pokemon = await fetchData(pokemonName)
        console.log(pokemon)

        if (pokemon) {
            openModalWithPokemon(pokemon)
        } else {
            alert('No se pudo encontrar el pokemon!')
        }
    }
}

async function loadMorePokemon(){
    let loaded = loadedPokemon.length
    const limit = loaded + loadAmount;
    for (loaded; loaded < limit; loaded++) {
        const pokemon = await fetchData(loaded+1)

        if(pokemon){
            loadedPokemon.push(pokemon)
            createCard(pokemon)
        }
    }
}

const myModal = document.getElementById("modal");

function openModal(pokemon){
    myModal.showModal()
    fillModalWithPokemonData(pokemon)
}

function openModalWithId(id){
    const pokemon = loadedPokemon[id-1]
    if (pokemon){
        openModal(pokemon)
    }
}

function openModalWithPokemon(pokemon){
    if (pokemon){
        openModal(pokemon)
    }
}

function closeModal(){
    myModal.close()
}

// Función para llenar el modal con los datos
function fillModalWithPokemonData(pokemon) {
    // Nombre y número
    document.getElementById('pokemonName').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('pokemonNumber').textContent = `#${String(pokemon.id).padStart(4, '0')}`;
    
    // Imagen
    document.getElementById('pokemonImg').src = pokemon.sprites.other['home'].front_default;
    document.getElementById('pokemonImg').alt = pokemon.name;
    
    // Tipos
    const typesHTML = pokemon.types.map(t => 
        `<span class="badge badge-type-${t.type.name.toLowerCase()}">
            ${t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
         </span>`
    ).join('');
    document.getElementById('typeBadges').innerHTML = typesHTML;
    
    // Audio del cry
    if (pokemon.cries && pokemon.cries.latest) {
        document.getElementById('crySource').src = pokemon.cries.latest;
        document.getElementById('pokemonCry').load();
    }
    
    // Habilidades
    const abilitiesHTML = pokemon.abilities.map(a => {
        const abilityName = a.ability.name.replace('-', ' ');
        return `<li>${abilityName.charAt(0).toUpperCase() + abilityName.slice(1)}</li>`;
    }).join('');
    document.getElementById('abilitiesList').innerHTML = abilitiesHTML;
    
    // Dimensiones
    document.getElementById('pokemonHeight').textContent = `${(pokemon.height / 10).toFixed(1)} m`;
    document.getElementById('pokemonWeight').textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
    
    // Stats
    const statsHTML = pokemon.stats.map(stat => {
        let statName = stat.stat.name
            .replace('special-attack', 'Sp. Atk')
            .replace('special-defense', 'Sp. Def')
            .replace('hp', 'HP')
            .replace('attack', 'Attack')
            .replace('defense', 'Defense')
            .replace('speed', 'Speed')
            .replace('-', ' ');
        
        statName = statName.charAt(0).toUpperCase() + statName.slice(1);
        
        const percentage = (stat.base_stat / 255) * 100;
        
        return `
            <div class="stat-item">
                <span class="stat-label">${statName}</span>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${percentage}%"></div>
                </div>
                <span class="stat-number">${stat.base_stat}</span>
            </div>
        `;
    }).join('');
    document.getElementById('statsList').innerHTML = statsHTML;
    
    // Movimientos (primeros 20)
    const movesHTML = pokemon.moves.slice(0, 20).map(move => {
        const moveName = move.move.name.replace('-', ' ');
        return `<span class="badge badge-move">${moveName.charAt(0).toUpperCase() + moveName.slice(1)}</span>`;
    }).join('');
    document.getElementById('movesGrid').innerHTML = movesHTML;
}

loadMorePokemon()