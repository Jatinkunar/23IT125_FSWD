//collection
const movies = [
    { title: "Hera Pheri", genre: "comedy", rating: 8.8, releaseYear: 2000 },
    { title: "Kantara", genre: "culture", rating: 9.0, releaseYear: 2022 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, releaseYear: 2014 }
];

//adding a movie
const addMovie = (collection, movie) => {
    collection.push(movie);
};

addMovie(movies, { title: "Phir Hera pheri", genre: "comedy", rating: 7.5, releaseYear: 2000 });
console.log(movies);

//movies of specific genre
console.log("\n---------------------------------\n");
const listMoviesByGenre = (collection, genre) => {
    return collection.filter(movie => movie.genre === genre);
};

console.log(listMoviesByGenre(movies, "Sci-Fi"));
//highest rated movie
console.log("\n---------------------------------\n");

const findHighestRatedMovie = collection => {
    return collection.reduce((highest, movie) => movie.rating > highest.rating ? movie : highest);
};

console.log(findHighestRatedMovie(movies));
console.log("\n---------------------------------\n");
//movie list
const getMovieTitles = collection => {
    return collection.map(movie => movie.title);
};

console.log(getMovieTitles(movies));
//released after
console.log("\n---------------------------------\n");

const moviesAfterYear = (collection, year) => {
    return collection.filter(movie => movie.releaseYear > year);
};

console.log(moviesAfterYear(movies, 2008));
console.log("\n---------------------------------\n");

//print in formatting
movies.forEach(movie => {
    console.log(`${movie.title} (${movie.releaseYear}) is a ${movie.genre} movie with a rating of ${movie.rating}.`);
});

console.log("\n---------------------------------\n");

//search  movie
let searchMovie = (collection,keyword) =>{
    return collection.filter(collection => collection.title.includes(keyword));
}

console.log(searchMovie(movies,"tara"));

//shortest and longest

let fun1 = (collection) =>{
    let max ="";
    collection.forEach((e)=>{
        if(e.title.length > max.length){
            max = e.title;
        }
    })
    console.log(max,max.length);
}
fun1(movies);
let fun2 = (collection) =>{
    let min ="echifuheruoivjheroigvjotigjo";
    collection.forEach((e)=>{
        if(e.title.length < min.length){
            min = e.title;
        }
    })
    console.log(min,min.length);
}
fun2(movies);