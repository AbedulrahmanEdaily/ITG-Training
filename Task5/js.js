
$(() => {

    function validateEmail() {
        let email = $("#email").val().trim();
        if (email === "") {
            $("#emailError").text("Please enter your email");
            return false;
        }
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $("#emailError").text("Please enter a valid email");
            return false;
        }
        $("#emailError").text("");
        return true;
    }

    function validatePassword() {
        let password = $("#password").val();
        if (password === "") {
            $("#passwordError").text("Please enter your password");
            return false;
        }
        if (password.length < 8) {
            $("#passwordError")
                .text("Password must be at least 8 characters");
            return false;
        }
        if (!/[0-9]/.test(password)) {
            $("#passwordError")
                .text("Please enter at least one digit");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            $("#passwordError")
                .text("Please enter at least one capital letter");
            return false;
        }
        if (!/[a-z]/.test(password)) {
            $("#passwordError")
                .text("Please enter at least one lowercase letter");
            return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            $("#passwordError")
                .text("Please enter at least one special character");
            return false;
        }
        $("#passwordError").text("");
        return true;
    }

    $("#email").blur(() => {
        validateEmail();
    });

    $("#password").blur(() => {
        validatePassword();
    });

    $("#validForm").submit((e) => {
        let emailValid = validateEmail();
        let passwordValid = validatePassword();
        if (!emailValid || !passwordValid) {
            e.preventDefault();
        }
    });
});