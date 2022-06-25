$(document).ready(function () {


    function getMovies(movies) {
        $("#movieTable").find('tr').remove();
        $.each(movies, function (index, data) { //We created a table to list the movies.
            $("#movieTable").append(` 
                    <tr class="trMovie">
                        <td>${data.Id}</td>
                        <td>${data.Title}</td>
                        <td>${data.Description}</td>
                        <td>${data.Rate}</td>
                        <td>${data.Year}</td>
                        <td><button class="btn btn-sm btn-danger" value='Delete' id=${data.Id}>Delete</button></td>
                        <td><button class="btn btn-sm btn-warning" value='Update' id=${data.Id}>Update</button></td>
                    </tr>
           `)
        })
    }

    if (sessionStorage.getItem('access_token') != null) {
        getMovies();
    }
    else {
        window.location.href = "/login.html" //If the token is not received, go to the login page.
    }

    $("#btnMovie").click(function () { //button that lists all movies
        $.ajax({
            method: 'get',
            url: 'https://localhost:44399/api/movies/GetMovies',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token") //When a request is made to the page, an object will appear in the headers. This object will be Authorization and its type will be Bearer. Then we give the token in the sessionStorege that we created while buying the token.
            },
            success: function (result) {
                getMovies(result);
            }
        })
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

    //Add Movie
    $("#btnAddMovie").click(function () {
        var title = document.getElementById('movieTitle').value;
        var description = document.getElementById('movieDescription').value;
        var rating = document.getElementById('movieRating').value;
        var year = parseInt($("#movieYear").val());

        var movie = new Movie(title, description, rating, year);
        $.ajax({
            method: 'Post',
            url: 'https://localhost:44399/api/movies/PostAddMovie',
            data: movie,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            },
            success: {
                function(data) {
                    getMovies(data)
                }
            }
        })
    })

    $("#movieTable").on('click', 'button', function () { // on => id'si => 'employeeTable' içerisinden demek.click => event , button => element / button click olduğunda func devreye girecek.
        var currentValue = $(this).attr('value'); //this represents the clicked button.attr => means attributes // Buttons are given value and id.
        var currentId = $(this).attr('id'); //here also throw the id in currentId.
        var message = confirm('Are you sure you want to trade?') // comfirm => Confirmation question pops up.
        //Movie delete
        if (currentValue == 'Delete') {
            if (message) { //The decision structure is yes if the message is true.
                $.ajax({
                    method: 'Delete',
                    url: 'https://localhost:44399/api/movies/DeleteMovie/' + currentId,
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem("access_token")
                    },
                    success: function (data) {
                        getMovies(data)
                    }
                })
            }
            else {
                alert("It is cancelled.")
            }
        }
        else if (currentValue == 'Update') {
            //Movie Update
            if (message) {
                var title = document.getElementById('movieTitle').value;
                var description = document.getElementById('movieDescription').value;
                var rating = document.getElementById('movieRating').value;
                var year = parseInt($("#movieYear").val());

                var movie = new Movie(title, description, rating, year);
                movie.Id = currentId;
                console.log(movie);
                $.ajax({
                    method: 'Put',
                    url: 'https://localhost:44399/api/movies/PutMovie',
                    data: movie,
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem("access_token")
                    },
                    success: function (data) {
                        getMovies(data)
                    }
                })
            }
            else {
                alert("It is cancelled.")
            }
        }
    })

    class Movie {
        Id;
        Title;
        Description;
        Rating;
        Year;
        constructor(_title, _description, _rating, _year) {
            this.Title = _title;
            this.Description = _description;
            this.Rating = _rating;
            this.Year = _year;
        }
    }

})