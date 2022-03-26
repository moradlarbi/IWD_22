const movies_genres = [
    {
        title: "Romance",
        id: "10749"
    },
    {
        title: "Thriller",
        id: "53"
    },
    {
        title: "Adventure",
        id: "12"
    },
    {
        title: "Animation",
        id: "16"
    },
    {
        title: "Comedy",
        id: "35"
    },
    {
        title: "Documentary",
        id: "99"
    },
    {
        title: "Family",
        id: "10751"
    },
    {
        title: "Drama",
        id: "18"
    },
    {
        title: "Fantasy",
        id: "14"
    },
    {
        title: "Music",
        id: "10402"
    },
]

const associate_table = [
    {
        mood: "sad",
        genres: ["Romance","Animation"]
    },
    {
        mood: "angry",
        genres: ["Comedy","Music"]
    },
    {
        mood: "stressed",
        genres: ["Comedy","Music","Family"]
    },
    {
        mood: "burn-out",
        genres: ["Comedy","Fantasy","Documentary"]
    },
    {
        mood: "happy",
        genres: ["Romance","Thriller","Adventure"]
    },
    {
        mood: "disgusted",
        genres: ["Comedy"]
    },
    {
        mood: "neutral",
        genres: ["Romance","Thriller","Family","Documentary"]
    },
]
const input = "stressed"
const API_KEY = "48286de192a4bf3259eda8be498017fa";
const mood = associate_table.find(element => element.mood === input);
//console.log("genres: "+ mood.genres);
const genre_index = Math.floor(Math.random() * mood.genres.length);
//console.log("genre_index: " + genre_index);
const genre = mood.genres[genre_index];
//console.log("genre : ", genre);
const element = movies_genres.find(element => element.title === genre);
const genre_id = element.id
//console.log("genre id: "+ genre_id); 
function generate_movie() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&vote_average.gte=6&with_genres=${genre_id}`)
.then(res => {
            
    res.json()
    .then(data => {
        var results = data.results
        const film_index = Math.floor(Math.random() * results.length);
        const film = results[film_index];
        const img_url = "http://image.tmdb.org/t/p/w342"+film.poster_path;
        const img = document.querySelector(".left img");
        img.src = img_url;
        const title = document.querySelector(".right .title")
        title.textContent = film.original_title;
        const date = document.querySelector(".right .info-container .date")
        date.textContent = film.release_date;
        const category = document.querySelector(".right .info-container .category")
        category.textContent = genre;
        const vote = document.querySelector(".right .info-container .vote")
        vote.textContent = "IMDB: " +film.vote_average;

        const overview = document.querySelector(".right .desc-container .overview")
        overview.textContent = film.overview

    })
})
}
document.querySelector(".btn-suggest").addEventListener("click", generate_movie)
generate_movie();