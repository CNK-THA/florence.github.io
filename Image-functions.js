var holder = document.getElementById("image");
holder.src = sessionStorage.image;


function reqListener () {
 // console.log(this.responseText);
  document.getElementById("desc").innerHTML = this.responseText;

}
var address = sessionStorage.image.substring(0,49) + 'Desc/' + 
			  sessionStorage.image.substring(49) + 'caption.txt';
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", address);
oReq.send();
