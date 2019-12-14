import * as THREE from '../../lib/three.js';

//getting today's asteroid statistics using new Date function
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const api = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+date+"&end_date="+date+"&api_key=KQ8KfeadbmJD8EnheIIdRNHrTJS8IkgCv4if8H68"; //API
  const aesteroid = document.getElementById("submit");
  aesteroid.addEventListener("click", planet);
  //function to get statistics
  function planet() {
    const url = api;
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status === 200) {
        var resp = JSON.parse( xhr.response );
        console.log(resp);
        var totalplusone = resp.element_count;
        var total = resp.element_count - 1; //counting # of objects/asteroids in near_earth_objects, minus the array they are grouped in
        var all = resp.near_earth_objects;
        var first = Object.values(all); //getting all elements in near_earth_objects
        var firstasteroid = first[0];//getting the first element in near_earth_objects, which is an array named as the date
        var ast = firstasteroid[0];//getting the first asteroid in the array
        var name = ast.name; //getting the asteroid name
        var nopuncname = name.replace(/[()]/g,""); //removing brackets from name

        console.log(ast);
        console.log(total);
        console.log(ast.is_potentially_hazardous_asteroid);
        document.getElementById("text").innerHTML = "Amount of Asteroids around Earth today:";
        document.getElementById("text").style.textDecoration = "underline";
        document.getElementById("text2").innerHTML = "Closest Asteroid:";
        document.getElementById("text2").style.textDecoration = "underline";
        //attaching data to dom elements
        document.getElementById("counter").innerHTML = total;
        document.getElementById("closest").innerHTML = "Name: " + nopuncname;
        document.getElementById("magnitude").innerHTML = "Magnitude: " + ast.absolute_magnitude_h;
        document.getElementById("diameter").innerHTML = "Max Diameter(miles): " + ast.estimated_diameter.miles.estimated_diameter_max;
        document.getElementById("hazard").innerHTML = "Potentially Hazardous: " + ast.is_potentially_hazardous_asteroid;

        floating(total); //calling the three js canvas: # of spheres in canvas = # of asteroids
        document.getElementById("asteroid2").style.display = "none";

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

  const yest = document.getElementById("send");
  yest.addEventListener("click", planet2);
  //getting yesterday's date
  var todayTimeStamp = +new Date(); // Unix timestamp in milliseconds
  var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
  var diff = todayTimeStamp - oneDayTimeStamp;
  var yesterdayDate = new Date(diff);
  var yesterdayString = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
  const api2 = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+yesterdayString+"&end_date="+yesterdayString+"&api_key=KQ8KfeadbmJD8EnheIIdRNHrTJS8IkgCv4if8H68";
  function planet2(){
    const url = api2;
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status === 200) {
        var resp = JSON.parse( xhr.response );
        console.log(resp);
        var totalplusone = resp.element_count;
        var total = resp.element_count - 1;
        var all = resp.near_earth_objects;
        var first = Object.values(all);
        var firstasteroid = first[0];
        var ast = firstasteroid[0];
        var name = ast.name;
        var nopuncname = name.replace(/[()]/g,"");

        console.log(ast);
        console.log(total);
        document.getElementById("text").innerHTML = "Amount of Aesteroids around Earth yesterday:";
        document.getElementById("text").style.textDecoration = "underline";
        document.getElementById("text2").innerHTML = "Closest Aesteroid yesterday:";
        document.getElementById("text2").style.textDecoration = "underline";
        document.getElementById("counter").innerHTML = total;
        document.getElementById("closest").innerHTML = "Name: " + nopuncname;
        document.getElementById("magnitude").innerHTML = "Magnitude: " + ast.absolute_magnitude_h;
        document.getElementById("diameter").innerHTML = "Max Diameter(miles): " + ast.estimated_diameter.miles.estimated_diameter_max;
        document.getElementById("hazard").innerHTML = "Potentially Hazardous: " + ast.is_potentially_hazardous_asteroid;

        floating2(total);



      } else{
        error();
      }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}


//creating the three js scene
function floating(aesteroid){
  // Set up the scene, camera, and renderer as global variables.
      var container;
			var camera, scene, renderer;
			var spheres = [];
			var mouseX = 0;
			var mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			init();
			animate();
      //setting up the scene
			function init() {
        //setting up the background and the camera position
				container = document.getElementById('asteroid');
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
				camera.position.z = 3200;
				scene = new THREE.Scene();
				scene.background = new THREE.CubeTextureLoader()
					.setPath( '../../assets/' )
					.load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );
				var geometry = new THREE.SphereBufferGeometry( 200, 32, 16 );
				var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background } );
				for ( var i = 0; i < aesteroid ; i ++ ) {
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 10000 - 5000;
					mesh.position.y = Math.random() * 10000 - 5000;
					mesh.position.z = Math.random() * 10000 - 5000;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
					scene.add( mesh );
					spheres.push( mesh );
				}


				//rendering the scene
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				window.addEventListener( 'resize', onWindowResize, false );

      }

			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function onDocumentMouseMove( event ) {
				mouseX = ( event.clientX - windowHalfX ) * 10;
				mouseY = ( event.clientY - windowHalfY ) * 10;
			}

			function animate() {
				requestAnimationFrame( animate );
				render();
			}

			function render() {
				var timer = 0.0001 * Date.now();
				for ( var i = 0, il = spheres.length; i < il; i ++ ) {
					var sphere = spheres[ i ];
					sphere.position.x = 5000 * Math.cos( timer + i );
					sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
				}
				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
    }
