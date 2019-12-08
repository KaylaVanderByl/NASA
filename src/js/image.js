

const Image = (function() {
  "use strict";
  const api = "https://api.nasa.gov/planetary/apod?api_key=KQ8KfeadbmJD8EnheIIdRNHrTJS8IkgCv4if8H68"; //API
  const imageofday = document.getElementById("getimage");
  imageofday.addEventListener("click", image);

  function image(){
  	const url = api;
  	const xhr = new XMLHttpRequest();
  	xhr.onload = function() {
  		if (xhr.status === 200) {
  			var resp = JSON.parse( xhr.response );
  			console.log(resp);
        document.getElementById("title").innerHTML = resp.title;
        document.getElementById("imagehere").src = resp.url;
        document.getElementById("description").innerHTML = "Description: " +resp.explanation;
  		} else{
  			error();
  		}
  	}
  	xhr.open("GET", url, true);
  	xhr.send(null);
    }

}());

export default Image;
