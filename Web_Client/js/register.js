$(document).ready(function () {
    $("#alert-danger").hide();
    $("#alert-success").hide(); //Do not show a warning when the form is opened.We will show you at the end of the registration process.

    function registerUser() {
        $.ajax({
            method: 'Post', //
            url: 'https://localhost:44399/api/account/register', //the request will go to this url
            data: { //data to be sent with the request.
                Email: $("#email").val(),
                Password: $("#password").val(),
                ConfirmPassword: $("#confirmpassword").val()
            },
            success: function (data) {
                $("#alert-success").show();
                $("#info").html('User success created! You can login.')
                /*window.location = 'https://localhost:44313/login.html'*/ //We can direct the user directly to the login page.
            },
            error: function (data) {
                $("#alert-danger").show();
                $("#infoerror").html('Failed to create user')
            }
        })
    }

    $("#btnRegister").click(function () { //It will be activated when the Register button is pressed.
        registerUser();
    })
})