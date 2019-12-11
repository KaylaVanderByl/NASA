//jquery date selector
$( function() {
  $( "#datepicker" ).datepicker({ dateFormat: 'yy-mm-dd',minDate: '2015-10-31',maxDate: '2019-06-27', }).val();

} );

  const date = document.getElementById("datepicker");
  const planet = document.getElementById("planetsubmit");
  planet.addEventListener("click", image);

//function calling image api
  function image(){
    //combining api with the date user selected
    const api = "https://epic.gsfc.nasa.gov/api/enhanced/date/" + date.value;
  	const url = api;
  	const xhr = new XMLHttpRequest();
  	xhr.onload = function() {
  		if (xhr.status === 200) {
  			var resp = JSON.parse( xhr.response );
  			console.log(resp);
        var link = resp[0].image; //getting most recent image of the day
        console.log(link);
        var newdate = date.value; //getting the date the user selected
        var imagedate = newdate.replace(/-/g, "/"); //replacing dash with a slash for image link
        console.log(imagedate);
        //creating the image link
        document.getElementById("image").src = "https://epic.gsfc.nasa.gov/archive/enhanced/" + imagedate +"/png/" + link+ ".png";
      } else{
     error();
   }
 }
 xhr.open("GET", url, true);
 xhr.send(null);
 }
    function error() {
      document.getElementById("error").innerHTML = "No image available for date";
    }
