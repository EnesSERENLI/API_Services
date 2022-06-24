$(document).ready(function () {

    function loginUser() {
        $.ajax({
            method: 'Post',
            url: 'https://localhost:44399/token', //url to get token
            data: {
                username: $("#username").val(),
                password: $("#password").val(),
                grant_type:"password"
            },
            success: function (result) {
                console.log(result.access_token); //Let's see it in the console when the token is created.
                sessionStorage.setItem("access_token", result.access_token) //we just got the token part. No need to get other information.
                window.location.href = 'https://localhost:44399/api/movies' //After the login process, the user can open the page with the token received.
            }
        })
    }

    $("#btnLogin").click(function () { //It will be activated when the Login button is pressed.
        loginUser();
    })
})