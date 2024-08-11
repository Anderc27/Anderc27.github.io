function TraerPersonajes(done) {
    const results = fetch("https://rickandmortyapi.com/api/character");

    results
        .then(response => response.json())
        .then(data => {
            done(data);
        });
}

function TraerLocacionYPrimeraAparicion(personaje, callback) {
    // Aca puedo traer la locacion del personaje
    fetch(personaje.location.url)
        .then(response => response.json())
        .then(location => {
            personaje.locationName = location.name; // Aca guardo el nombre de la locacion

            // Aca traigo el primer episodio donde salio el personaje
            return fetch(personaje.episode[0]);
        })
        .then(response => response.json())
        .then(episode => {
            personaje.firstSeenIn = episode.name; // Y aca guardo el nombre del primer episodio donde aparecio
            callback(personaje);
        });
}

function mostrarPersonaje(personaje) {
    const article = document.createRange().createContextualFragment(`
        <article>
            <div class="image-container">
                <img src="${personaje.image}" alt="Personaje">
            </div>
            <h2>${personaje.name}</h2>
            <p>Status: ${personaje.status}</p>
            <p>Species: ${personaje.species}</p>
            <p>Last known location: ${personaje.locationName}</p>
            <p>First seen in: ${personaje.firstSeenIn}</p>
        </article>
    `);

    const main = document.querySelector("main");
    main.append(article);
}

TraerPersonajes(data => {
    data.results.forEach(personaje => {
        TraerLocacionYPrimeraAparicion(personaje, mostrarPersonaje);
    });
});

