function submit() {

var poolData = {
    UserPoolId : 'ap-southeast-2_07l8nmhDC', // your user pool id here
    ClientId : '7vro8do5h49rk6b13a7oe9hqis' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


var userData = {
    Username : document.getElementById("email").value, // your username here
    Pool : userPool
};


var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


cognitoUser.forgotPassword({
        onSuccess: function (result) {
            console.log('call result: ' + result);
            alert("Password reset successful");
            window.location.href = "Login2.html"; 
        },
        onFailure: function(err) {
            alert("There's an error resetting password, please contact site admin");
        },
        inputVerificationCode() {
            var verificationCode = prompt("For security reason, please input verification code sent to your email", "Verification code");
            var newPassword = document.getElementById("password").value;//prompt('Enter new password ' ,'');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });
}
