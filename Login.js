//Sign in to use
function validate(){

	var poolData = {
    UserPoolId : 'ap-southeast-2_07l8nmhDC', // your user pool id here
    ClientId : '7vro8do5h49rk6b13a7oe9hqis' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : document.getElementById("email").value, // your username here
    Pool : userPool
};


   var authenticationData = {
        Username : document.getElementById("email").value,	//'...', // your username here
        Password : document.getElementById("password").value,	//'...', // your password here
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
        	alert("Login success!");
            var accessToken = result.getAccessToken().getJwtToken();
            sessionStorage.userIdToken = result.getIdToken().getJwtToken();
            //linkS3(result);
            window.location.href = "Main.html";
        },
 
        onFailure: function(err) {
        	alert("Username or password is incorrect!");
            //alert(err);
        },
        mfaRequired: function(codeDeliveryDetails) {
        	alert("Verification?");
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
});

return false; //If successful
}