let pageNumber = 1;

const movies = {
    apikey: "d4f1dcd6334e5eeba415a8313cbf9bde",
    numResults: 9,
    storeMyData: null,

    fetchMovies: name => fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movies.apikey}&query=${name}`)
        .then(response => response.json())
        .then(data => {
            movies.storeMyData = data;
            movies.displayMyMovie(data);
        }),

    displayMyMovie: data => {
        if (!data || !data.results) {
            return;
        }

        const startIdx = Math.max(movies.numResults - 9, 0);
        const results = data.results.slice(startIdx, movies.numResults);
        const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
        const finalBody = document.querySelector('.finalBody');
        finalBody.innerHTML = '';

        results.forEach(movie => {
            const { title, release_date, adult, poster_path, vote_average } = movie;
            const posterUrl = poster_path ? `${posterBaseUrl}${poster_path}` : '';
            const insideDiv = document.createElement("div");
            const movieDiv = document.createElement("div");
            movieDiv.className = "moviee";
            insideDiv.className = "insideDiv";
            insideDiv.innerHTML = `
                <h2 class="title">${title}</h2>
                <div class="release-date">Release Date: ${release_date}</div>
                <div class="adult-content">Adult Content: ${adult ? "Yes" : "No"}</div>
                <div class="rating">Rating: ${vote_average}</div>
            `;
            movieDiv.appendChild(insideDiv);
            movieDiv.style.backgroundImage = `url(${posterUrl})`;
            finalBody.appendChild(movieDiv);
        });
    },

    searchFunction: () => movies.fetchMovies(document.querySelector(".enter-text").value)
};

document.querySelector(".search-bar button").addEventListener('click', function() {
    movies.numResults = 9;
    pageNumber = 1;
    document.querySelector('.pageNumber').textContent = pageNumber;
    movies.searchFunction();
});

document.querySelector(".enter-text").addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        movies.numResults = 9;
        pageNumber = 1;
        document.querySelector('.pageNumber').textContent = pageNumber;
        movies.searchFunction();
    }
});

document.querySelector(".last").addEventListener('click', function() {
    if (movies.numResults > 9) {
        movies.numResults -= 9;
        movies.displayMyMovie(movies.storeMyData);
        document.querySelector('.pageNumber').textContent = --pageNumber;
    }
});

document.querySelector(".next").addEventListener('click', function() {
    movies.numResults += 9;
    movies.displayMyMovie(movies.storeMyData);
    document.querySelector('.pageNumber').textContent = ++pageNumber;
});

movies.fetchMovies("Avengers");
