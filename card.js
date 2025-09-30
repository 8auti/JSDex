const createCard = (pokemon) => {

    // Formatear el ID con ceros a la izquierda
    const formattedId = String(pokemon.id).padStart(4, '0');
    
    // Generar HTML de los tipos dinámicamente
    const typesHTML = pokemon.types.map(typeInfo => 
        `<img src="img/types/${typeInfo.type.name}.png" 
             alt="${typeInfo.type.name}" 
             title="${typeInfo.type.name}">`
    ).join('');

    const cardHTML = 
    `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.other['home'].front_default}" alt="${pokemon.name}">
            <div class="pokemon-number">#${formattedId}</div>
            <p>${pokemon.name}</p>
            <ul class="pokemon-types">
                <li>
                    ${typesHTML}
                </li>
            </ul>
        </div>
    `

    document.getElementById('pokemon-grid').insertAdjacentHTML('beforeend', cardHTML)
}