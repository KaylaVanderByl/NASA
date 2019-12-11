//calling the api
  const api = "https://api.nasa.gov/planetary/apod?api_key=KQ8KfeadbmJD8EnheIIdRNHrTJS8IkgCv4if8H68";
  const imageofday = document.getElementById("getimage");
  imageofday.addEventListener("click", image);
//function to get media of the day
  function image(){
  	const url = api;
  	const xhr = new XMLHttpRequest();
  	xhr.onload = function() {
  		if (xhr.status === 200) {
  			var resp = JSON.parse( xhr.response );
  			console.log(resp);
        document.getElementById("title").innerHTML = resp.title; //image title
        document.getElementById("description").innerHTML = "Description: " +resp.explanation; //image description
        //checking if media is either video or image
        if (resp.media_type == "video") {
        document.getElementById("imagehere").style.display = "none";
        document.getElementById("video").src = resp.url;
      } else{
        document.getElementById("imagehere").src = resp.url;
        document.getElementById("video").style.display = "none";
      }
  		} else{
  			error();
  		}
  	};
  	xhr.open("GET", url, true);
  	xhr.send(null);
}

function error() {
  document.getElementById("error").innerHTML = "No media available";
}
