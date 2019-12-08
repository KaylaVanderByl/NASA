
import Stats from '../../lib/stats.js';
import * as THREE from '../../lib/three.js';



    	var statsEnabled = true;
			var container, stats;
			var camera, scene, renderer;
			var mouseX = 0, mouseY = 0;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			init();
			animate();
			function init() {
				container = document.getElementById('stars');
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
				camera.position.z = 3200;
				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0x000000, 1, 20000 );
				var light = new THREE.PointLight( 0xffffff );
				scene.add( light );
				var texture2 = new THREE.TextureLoader().load( '../../assets/space2.jpg' );
        var texture3 = new THREE.TextureLoader().load( '../../assets/earth.jpg' );
        var texture4 = new THREE.TextureLoader().load( '../../assets/mars.jpg' );
        var texture5 = new THREE.TextureLoader().load( '../../assets/uranus.jpg' );
        var texture6 = new THREE.TextureLoader().load( '../../assets/neptune.jpg' );
        var texture7 = new THREE.TextureLoader().load( '../../assets/saturn.jpg' );
        var texture8 = new THREE.TextureLoader().load( '../../assets/mercury.jpg' );
        var texture9 = new THREE.TextureLoader().load( '../../assets/venusat.jpg' );
        var texture10 = new THREE.TextureLoader().load( '../../assets/jupiter.jpg' );
        var texture11 = new THREE.TextureLoader().load( '../../assets/clouds.jpg' );
				var materials = [
					new THREE.MeshBasicMaterial( { map: texture11} ),
					new THREE.MeshBasicMaterial( { map: texture2 } ),
          new THREE.MeshBasicMaterial( { map: texture3 } ),
          new THREE.MeshBasicMaterial( { map: texture4 } ),
					new THREE.MeshBasicMaterial( { map: texture5 } ),
					new THREE.MeshBasicMaterial( { map: texture6 } ),
          new THREE.MeshBasicMaterial( { map: texture7 } ),
          new THREE.MeshBasicMaterial( { map: texture8 } ),
          new THREE.MeshBasicMaterial( { map: texture9 } ),
          new THREE.MeshBasicMaterial( { map: texture10 } ),
          new THREE.MeshBasicMaterial( { map: texture11 } ),


				];
				var geometry = new THREE.SphereBufferGeometry( 20, 32, 16 );
				for ( var i = 0; i < 2000; i ++ ) {
					// random order
					//var index = Math.floor( Math.random() * materials.length );
					// sort by material / geometry
					var index = Math.floor( ( i / 1000 ) * materials.length );
					var material = materials[ index ];
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 10000 - 5000;
					mesh.position.y = Math.random() * 10000 - 5000;
					mesh.position.z = Math.random() * 10000 - 5000;
					//mesh.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
					mesh.rotation.y = Math.random() * 2 * Math.PI;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 1;
					scene.add( mesh );
				}
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				if ( statsEnabled ) {
					stats = new Stats();
					container.appendChild( stats.dom );
				}
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
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
				if ( statsEnabled ) stats.update();
			}
			function render() {
				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}