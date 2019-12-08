

  const date = document.getElementById("user").value;
  const api = "https://epic.gsfc.nasa.gov/api/enhanced/date/2019-05-01"; //API
  const planet = document.getElementById("planetsubmit");
  planet.addEventListener("click", image);

  function image(){
  	const url = api;
  	const xhr = new XMLHttpRequest();
  	xhr.onload = function() {
  		if (xhr.status === 200) {
  			var resp = JSON.parse( xhr.response );
  			console.log(resp);
        var link = resp[0].image;
        console.log(link);
var imagedate = date.replace("-", "/");
console.log(imagedate);
console.log(date);

// document.getElementById("image").src = "https://epic.gsfc.nasa.gov/archive/enhanced/" + date  link + ".png";
  		} else{
  			error();
  		}
  	};
  	xhr.open("GET", url, true);
  	xhr.send(null);
    }


    // Created by Bjorn Sandvik - thematicmapping.org
    (function () {

    	var webglEl = document.getElementById('webgl');

    	if (!Detector.webgl) {
    		Detector.addGetWebGLMessage(webglEl);
    		return;
    	}

    	var width  = window.innerWidth,
    		height = window.innerHeight;

    	// Earth params
    	var radius   = 0.5,
    		segments = 32,
    		rotation = 6;

    	var scene = new THREE.Scene();

    	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    	camera.position.z = 1.5;

    	var renderer = new THREE.WebGLRenderer();
    	renderer.setSize(width, height);

    	scene.add(new THREE.AmbientLight(0x333333));

    	var light = new THREE.DirectionalLight(0xffffff, 1);
    	light.position.set(5,3,5);
    	scene.add(light);

        var sphere = createSphere(radius, segments);
    	sphere.rotation.y = rotation;
    	scene.add(sphere)

        var clouds = createClouds(radius, segments);
    	clouds.rotation.y = rotation;
    	scene.add(clouds)

    	var stars = createStars(90, 64);
    	scene.add(stars);

    	var controls = new THREE.TrackballControls(camera);

    	webglEl.appendChild(renderer.domElement);

    	render();

    	function render() {
    		controls.update();
    		sphere.rotation.y += 0.0005;
    		clouds.rotation.y += 0.0005;
    		requestAnimationFrame(render);
    		renderer.render(scene, camera);
    	}

    	function createSphere(radius, segments) {
    		return new THREE.Mesh(
    			new THREE.SphereGeometry(radius, segments, segments),
    			new THREE.MeshPhongMaterial({
    				map:         THREE.ImageUtils.loadTexture('../../assets/2_no_clouds_4k.jpg'),
    				bumpMap:     THREE.ImageUtils.loadTexture('../../assets/elev_bump_4k.jpg'),
    				bumpScale:   0.005,
    				specularMap: THREE.ImageUtils.loadTexture('../../assets/water_4k.png'),
    				specular:    new THREE.Color('grey')
    			})
    		);
    	}

    	function createClouds(radius, segments) {
    		return new THREE.Mesh(
    			new THREE.SphereGeometry(radius + 0.003, segments, segments),
    			new THREE.MeshPhongMaterial({
    				map:         THREE.ImageUtils.loadTexture('../../assets/fair_clouds_4k.png'),
    				transparent: true
    			})
    		);
    	}

    	function createStars(radius, segments) {
    		return new THREE.Mesh(
    			new THREE.SphereGeometry(radius, segments, segments),
    			new THREE.MeshBasicMaterial({
    				map:  THREE.ImageUtils.loadTexture('../../assets/galaxy_starfield.png'),
    				side: THREE.BackSide
    			})
    		);
    	}

    }());
