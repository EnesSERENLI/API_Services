$(document).ready(function () {


    function getMovies() {
        $.ajax({
            method: 'get',
            url: 'https://localhost:44399/api/movies/GetMovies',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token") //When a request is made to the page, an object will appear in the headers. This object will be Authorization and its type will be Bearer. Then we give the token in the sessionStorege that we created while buying the token.
            },
            success: function (result) {
                console.log(result);
            }
        }).done(function (data) {
            data.forEach(function (val, index) { //We created a table to list the movies.
                $("#movieTable").append(` 
                    <tr class="trMovie">
                        <td>${val.Id}</td>
                        <td>${val.Title}</td>
                        <td>${val.Description}</td>
                        <td>${val.Rate}</td>
                        <td>${val.Year}</td>
                    </tr>
               `)
            })
        })
    }

    if (sessionStorage.getItem('access_token') != null) {
        getMovies();
    }
    else {
        window.location.href = "/login.html" //If the token is not received, go to the login page.
    }

    $("#btnMovie").click(function () { //button that lists all movies
        getMovies()
    })

    //Cleaning the table
    function clearTable() {
        $(".trMovie").remove();
    }

    //GetRandomMovie
    function getRandomMovie() {
        $.ajax({
            method: 'Get',
            url: 'https://localhost:44399/api/movies/GetRandomMovies',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token") //When a request is made to the page, an object will appear in the headers. This object will be Authorization and its type will be Bearer. Then we give the token in the sessionStorege that we created while buying the token.
            },
            success: function (result) {
                console.log(result);
            }
        }).done(function (response) {
            clearTable() //Let the table be cleared first, then a random movie come..
            var tr = `
                    <tr class="trMovie">
                    <td>${response.Id}</td>
                    <td>${response.Title}</td>
                    <td>${response.Description}</td>
                    <td>${response.Rate}</td>
                    <td>${response.Year}</td>
                    </tr>
                    `
            $("#movieTable").append(tr);
        })
    }

    $("#btnRandom").click(function () { //Function that will be activated when btnRandom is clicked
        getRandomMovie();
    })

    //GetRandomHighRatingMovie
    function GetRandomHighRatingMovie() {
        $.ajax({
            method: 'Get',
            url: 'https://localhost:44399/api/movies/GetRandomHighRatingMovie',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            },
            success: function (result) {
                console.log(result);
            }
        }).done(function (movie) {
            clearTable()
            var tr = `
                    <tr class="trMovie">
                    <td>${movie.Id}</td>
                    <td>${movie.Title}</td>
                    <td>${movie.Description}</td>
                    <td>${movie.Rate}</td>
                    <td>${movie.Year}</td>
                    </tr>
                        `
            $("#movieTable").append(tr);
        })
    }
    //RandomHighRatinMovie
    $("#btnRatingMovie").click(function () {
        GetRandomHighRatingMovie()
    })

    //Search Movie
    function Search() {
        var result = document.getElementById('txtSearch').value;
        $.ajax({
            method: 'Get',
            url: 'https://localhost:44399/api/movie/' + result,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            },
            success: function (result) {
                console.log(result);
            }
        }).done(function (movies) {
            clearTable()
            for (var i = 0; i < movies.length; i++) {
                var tr = `
<tr class="trMovie">
                    <td>${movies[i].Id}</td>
                    <td>${movies[i].Title}</td>
                    <td>${movies[i].Description}</td>
                    <td>${movies[i].Rate}</td>
                    <td>${movies[i].Year}</td>
</tr>
                    `
                $("#movieTable").append(tr);
            }
        })
    }

    //SearchMovie
    $("#txtSearch").keyup(function () {
        Search()
    })

})