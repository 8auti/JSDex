
const myModal = document.getElementById("modal");
let modalPokemon
let shinyView = false

async function openModal(pokemon){
    myModal.showModal()

    const pokemonSpecies = await fetchSpecies(pokemon.name)
    if (pokemonSpecies) {
        //const alternate_forms = pokemonSpecies.varieties.filter(v => {  return v.pokemon.name !== pokemon.name});
        pokemon.alternate_forms = pokemonSpecies.varieties
    }

    
    modalPokemon = pokemon
    shinyView = false

    fillModal(pokemon)
}

function closeModal(){
    myModal.close()
}

async function openModalWithName(name) {
    const pokemon = await fetchPokemon(name)
    if (pokemon){
        openModal(pokemon)
    }
}

async function openModalWithId(id){
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

function toggleShiny(){
    shinyView = !shinyView
    const sprites = modalPokemon.sprites.other['home']
    document.getElementById('pokemonImg').src = shinyView ? sprites.front_shiny : sprites.front_default
}

// Función para llenar el modal con los datos
function fillModal(pokemon) {
    // Nombre y número
    document.getElementById('pokemonName').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('pokemonNumber').textContent = `#${String(pokemon.id).padStart(4, '0')}`;
    
    if (!pokemon.is_default){
        console.log(pokemon.name);
        
        const hasMega = pokemon.name.includes('-mega')
        document.getElementById('form-icon').src = `img/icons/${ hasMega ? 'mega_stone' : 'gigantamax' }.png`
    } else {
        document.getElementById('form-icon').src = "img/icons/pokemon_other.png"
    }

    // Imagen
    document.getElementById('pokemonImg').src = pokemon.sprites.other['home'].front_default;
    document.getElementById('pokemonImg').alt = pokemon.name;

        // Variantes
    if (pokemon.alternate_forms) {
        const varietiesHTML = pokemon.alternate_forms.map(v => 
            `<button class="varietie-btn" onclick="openModalWithName('${ v.pokemon.name }')">
                ${v.pokemon.name.charAt(0).toUpperCase() + v.pokemon.name.slice(1)}
            </button>`
        ).join('');
        document.getElementById('varieties-list').innerHTML = varietiesHTML;
    }
    
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