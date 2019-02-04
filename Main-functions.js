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

//function viewAlbum(albumName) {
  //var albumPhotosKey = encodeURIComponent(albumName) + '/';
  //s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
    s3.listObjects(function(err, data) {
    if (err) {
      return alert('There was an error viewing your album: ' + err.message);
    }
    // `this` references the AWS.Response instance that represents the response
    var href = this.request.httpRequest.endpoint.href;
    var bucketUrl = href + albumBucketName + '/';

    var photos = data.Contents.map(function(photo) {
      var photoKey = photo.Key;
      if(photoKey.includes(".txt") || photoKey.includes("Desc")){
        //Do nothing and don't display it on the web
      } else {
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return getHtml([
          '<span>',
            '<div>',
              '<img style="width:230px;height:230px;" onClick = save("'+ photoUrl +'"); src="' + photoUrl + '"/>',
            '</div>',
            '<div>',
              //'<span onclick="deletePhoto(\'' + albumName + "','" + photoKey + '\')">',
               // 'X',
              //'</span>',
            '</div>',
          '</span>',
        ]);
      }
    });

    var message = photos.length ?
      '<p></p>' :
      '<p>You do not have any photos in this album. Please add photos.</p>';
    var htmlTemplate = [
      message,
      '<div>',
        getHtml(photos),
      '</div>',
    ]
    document.getElementById('app').innerHTML = getHtml(htmlTemplate);
  });
//}


function save(link) {
  sessionStorage.image = link;
  window.location.href = "Image.html";
}