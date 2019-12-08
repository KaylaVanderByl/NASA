

const Image = (function() {
  "use strict";
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const api = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+date+"&end_date="+date+"&api_key=KQ8KfeadbmJD8EnheIIdRNHrTJS8IkgCv4if8H68"; //API
  const aesteroid = document.getElementById("submit");
  aesteroid.addEventListener("click", planet);
  function planet(){
    const url = api;
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status === 200) {
        var resp = JSON.parse( xhr.response );
        console.log(resp);
        var totalplusone = resp.element_count;
        var total = resp.element_count - 1;
        var first = resp.near_earth_objects;
        var soc = Object.values(first);
        var then = soc[0];
        var now = then[0];
        var name = now.name;
        var nopuncname = name.replace(/[()]/g,"");

        console.log(now);
        console.log(total);
        document.getElementById("counter").innerHTML = total;
        document.getElementById("closest").innerHTML = "Name: " + nopuncname;
        document.getElementById("magnitude").innerHTML = "Magnitude: " + now.absolute_magnitude_h;
        document.getElementById("diameter").innerHTML = "Max Diameter: " + now.estimated_diameter.miles.estimated_diameter_max;
        if (now.is_potentially_hazardous_asteroid = "false"){
          document.getElementById("hazard").innerHTML = "Potentially Hazardous: No Threat"
        } else {
          document.getElementById("hazard").innerHTML = "Potentially Hazardous: Possible Threat";
        }
        floating(totalplusone);

      } else{
        error();
      }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
  };
}());

export default Image;

import * as THREE from '../../lib/three.js';

function floating(aesteroid){

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
			function init() {
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

				//
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				//
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
			//
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
				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
}
