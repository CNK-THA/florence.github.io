var albumBucketName = 'diary-uq';
var bucketRegion = 'ap-southeast-2';
var IdentityPoolId = 'ap-southeast-2:e7829bbc-3a8a-472e-a86e-2444969e7908';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});


function addPhoto() {
  var files = document.getElementById('choose').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
  var fileName = file.name;
  s3.upload({
    Key: fileName,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }
    //Uploading the text descriptions
    fileName = encodeURIComponent('Desc') + '/' + fileName + 'caption.txt';
    file = document.getElementById('textarea').value;
    console.log(fileName);
    console.log(file);
    s3.upload({
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    }, function(err, data) {
      if(err) {
        return alert('There was an error uploading your text: ', err.message);
      }
      alert('Successfully uploaded photo.');
      window.location.href = "Main.html";
    });
  });
}


function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#pic').attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]);
	}
};


$(document).ready(function() {
	var text_max = 100;
	$('#feedback').html(text_max + ' characters remaining');

	$('#textarea').keyup(function() {
		var text_length = $('#textarea').val().length;
		var text_remaining = text_max - text_length;

		$('#feedback').html(text_remaining + ' characters remaining');
	});
});
