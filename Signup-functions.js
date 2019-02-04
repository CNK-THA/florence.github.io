/*var code = prompt('Please input invitation code', '');
if(code != '12345') {
	alert("You cannot join this network");
	window.location.href = "Login.html";
}*/

var poolData = {
    UserPoolId : 'ap-southeast-2_07l8nmhDC', // your user pool id here
    ClientId : '7vro8do5h49rk6b13a7oe9hqis' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//Signing a user up
function signup_user() {

	var attributeList = [];
	var dataEmail = {
	    Name : 'email',
	    Value : document.getElementById("email").value //'...' // your email here
	};
	var dataName = {
		Name : 'name',
		Value : document.getElementById("name").value
	};
	var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
	attributeList.push(attributeEmail);
	attributeList.push(dataName);

	var cognitoUser;
	userPool.signUp(document.getElementById("email").value, document.getElementById("password").value, attributeList, null, function(err, result){
	    if (err) {
	        alert(err);
	        return;
	    }
	    cognitoUser = result.user;
	    console.log('user name is ' + cognitoUser.getUsername());
	    alert("Sign up successful. Please check your email for verification code");
	    window.location.href = "Login2.html";
	    //return false; //Need this?
	});

}
