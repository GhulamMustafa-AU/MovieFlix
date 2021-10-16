$(document).ready(() => {
    $.post('/userprofile', {
        token: localStorage.getItem('token')
    }).done((response) => {
        document.getElementById('user_name').innerHTML = response.username
    })
    $("#search-form").on("submit", (e) => {
        let search_text = $("#search-bar").val()
        getMovies(search_text)
        e.preventDefault()
    })
});

function getMovies(search_text){
    $.get("https://www.omdbapi.com/?apikey=93dc8027&s="+search_text, (response) => {
        movies = response.Search
        output = ''
        $(movies).each((index, movie) => {
            output += `
            <div class="card col-md-4 my-2">
                <img class="card-img-top" src=${movie.Poster}>
                <div class="card-body">
                    <h3 class="card-title">${movie.Title}</h3>
                    <p class="card-text text-capitalize">${movie.Type} ${movie.Year}</p>
                    <button onclick ="getMovie('${movie.imdbID}')" class="btn btn-primary text-center">Details</button>
                </div>
            </div>`
        })
        $('#output').html(output)
    })
}

function getMovie(imdbID){
    sessionStorage.setItem('movieId', imdbID)
    window.location = 'movie.html'
    return false
}

function showDetails(){
    imdbID = sessionStorage.getItem('movieId')
    $.get("https://www.omdbapi.com/?apikey=93dc8027&i="+imdbID, (response) => {
        output = ''
        $(response).each((index, movie) => {
            output = `
            <div class="row jumbotron bg-dark text-white my-4 mx-1">
                <div class="col-md-4 px-2 text-center">
                    <img src="${movie.Poster}" class="thumbnail " alt="">
                </div>
                <div class="col-md-8  my-4">
                    <h1>${movie.Title}</h1>
                    <ul class="list-group-flush my-4 p-0">
                        <li class="pl-0 bg-dark text-white list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="pl-0 bg-dark text-white list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="pl-0 bg-dark text-white list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="pl-0 bg-dark text-white list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="pl-0 bg-dark text-white list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="pl-0 bg-dark text-white list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    </ul>
                </div>
            </div>
            <div class="row jumbotron bg-dark text-white mx-1">
                <div class="col-md-12">
                <h3 class="display-4">Plot</h3>
                <p class="lead">${movie.Plot}</p>
                <hr class="my-4">
                <a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">IMDB Profile</a>
                <a href="home.html" class="btn btn-primary">Go Back To Home Page</a>
                </div>
            </div>
            `
        })
        $('#output').html(output)
    })
}