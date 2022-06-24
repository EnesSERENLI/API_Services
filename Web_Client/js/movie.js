$(document).ready(function () {


    function getProducts() {
        $.ajax({
            method: 'get',
            url: 'https://localhost:44399/api/products',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token") //When a request is made to the page, an object will appear in the headers. This object will be Authorization and its type will be Bearer. Then we give the token in the sessionStorege that we created while buying the token.
            },
            success: function (result) {
                console.log(result);
            }
        }).done(function (data) {
            data.forEach(function (val, index) { //We created a table to list the movies.
                $("#movie-table").append(` 
                    <tr>
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
        getProducts();
    }
    else {
        window.location.href = "/login.html" //If the token is not received, go to the login page.
    }

})