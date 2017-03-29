/*
Three-Body

Web Lab Final Project

CMU HCII 2013 Fall

Wang Liang
*/
var AlphaCentauriADes = "&nbsp&nbsp&nbsp&nbspAlpha Centauri (α Centauri, α Cen; also known as Rigil Kentaurus, Rigil Kent play /\ˈraɪdʒəl/, or Toliman) is the brightest star in the southern constellation of Centaurus. Although it appears to the unaided eye as a single object, Alpha Centauri is actually a binary star system (designated Alpha Centauri AB or α Cen AB) whose combined visual magnitude of –0.27 would qualify it as the third single brightest star in the night sky after the –1.46 magnitude Sirius and the –0.72 magnitude Canopus.<br />&nbsp&nbsp&nbsp&nbspAlpha Centauri A is the principal member, or primary, of the binary system, being slightly larger and more luminous than the Sun. It is a solar-like main-sequence star with a similar yellowish color, whose stellar classification is spectral type G2 V. From the determined mutual orbital parameters, Alpha Centauri A is about 10% more massive than the Sun, with a radius about 23% larger. The projected rotational velocity ( v·sin i ) of this star is 2.7 ± 0.7 km·s−1, resulting in an estimated rotational period of 22 days, which gives it a slightly faster rotational period than the Sun's 25 days.";
var AlphaCentauriBDes = "&nbsp&nbsp&nbsp&nbspAlpha Centauri B is the companion star, or secondary, of the binary system, and is slightly smaller and less luminous than the Sun. It is a main-sequence star is of spectral type K1 V, making it more an orange color than the primary star. Alpha Centauri B is about 90% the mass of the Sun and 14% smaller in radius. The projected rotational velocity ( v·sin i ) is 1.1 ± 0.8 km·s−1, resulting in an estimated rotational period of 41 days. (An earlier, 1995 estimate gave a similar rotation period of 36.8 days.)[22] Although it has a lower luminosity than component A, star B emits more energy in the X-ray band. The light curve of B varies on a short time scale and there has been at least one observed flare.";
var ProximaCentauriDes = "&nbsp&nbsp&nbsp&nbspALpha Centauri C, also known as Proxima Centauri (Latin proxima, meaning \"next to\" or \"nearest to\") is a red dwarf star about 4.24 light-years distant in the constellation of Centaurus. It was discovered in 1915 by Robert Innes, the Director of the Union Observatory in South Africa, and is the nearest known star to the Sun, although it is too faint to be seen with the naked eye. Its distance to the second- and third-nearest stars, which form the bright binary Alpha Centauri, is 0.237 ± 0.011 ly (15,000 ± 700 astronomical units [AU]). Proxima Centauri may be part of a triple star system with Alpha Centauri A and B.<br />&nbsp&nbsp&nbsp&nbspBecause of the proximity of this star, its angular diameter can be measured directly, yielding a diameter one-seventh that of the Sun. Proxima Centauri\'s mass is about an eighth of the Sun\'s, and its average density is about 40 times that of the Sun. Although it has a very low average luminosity, Proxima is a flare star that undergoes random dramatic increases in brightness because of magnetic activity. The star\'s magnetic field is created by convection throughout the stellar body, and the resulting flare activity generates a total X-ray emission similar to that produced by the Sun. The mixing of the fuel at Proxima Centauri\'s core through convection and the star\'s relatively low energy production rate suggest that it will be a main-sequence star for another four trillion years, or nearly 300 times the current age of the universe.";
var ThreeBodyPlanetDes = "&nbsp&nbsp&nbsp&nbspAlpha Centauri Bb is a possible extrasolar planet orbiting the K-type main-sequence star Alpha Centauri B, located 4.37 light-years from Earth in the southern constellation of Centaurus. If verified, it would be the closest extrasolar planet to Earth ever discovered, and the lowest-minimum-mass planet detected so far around a solar-type star. Its existence was announced in October 2012 by a team of European observers, and the finding received widespread media attention. However, the announcement was met with scepticism by some astronomers, who believed that the European team was over-interpreting its data.<br />&nbsp&nbsp&nbsp&nbspIn the Three-Body story, this planet is constantly doing unpredictable movement, just like its suns, rather than orbiting around Alpha Centauri B, which makes it a even more miserable world for a three-body civilization."
var container, renderer, scene, camera, controls;
var originPoint,sunsBasePoint, bBasePoint, alphaCentauriA, alphaCentauriB, proximaCentauri, threeBodyPlanet;
var onRenderFcts = [], objects = [];
var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3(),
    projector = new THREE.Projector();
var alphaCentauriALabel, alphaCentauriBLabel, proximaCentauriLabel,threeBodyPlanetLabel,openingLabel;
var shouldAuto;
var rotateFactor = 1/4;
function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	// renderer
	renderer	= new THREE.WebGLRenderer({	
		antialias	: true, alpha: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.shadowMapEnabled	= true;
	container.appendChild(renderer.domElement);
	// scene
	scene	= new THREE.Scene();	
	scene.updateMatrixWorld(true);
	// camera
	camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1800 ); 
	camera.position.set(-13.62,-1.39,-4.56);
	camera.up.set(0.36, 0.86, -0.35);
	// trackball control
	controls = new THREE.TrackballControls( camera );	
    controls.rotateSpeed = 1.0;
    controls.autoRotateSpeed = 0.25;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.2;
    // lights
	var light	= new THREE.AmbientLight( 0x222222 );
	scene.add( light );
	var light	= new THREE.DirectionalLight( 0xffffff, 0 );
	light.position.set(0,0,5);
	scene.add( light );
	light.castShadow	= true;
	// renderer function
	onRenderFcts.push(function(){
		controls.update();
		renderer.render( scene, camera );		
	});
	// event listeners
	window.addEventListener('keydown', onKeyDown, false);
	window.addEventListener( 'resize', onWindowResize, false );
	renderer.domElement.addEventListener( 'mousemove', onMouseMove, false );
    renderer.domElement.addEventListener( 'click', onMouseClick, false );
    renderer.domElement.addEventListener( 'mousedown', onMouseDown, false);
    renderer.domElement.addEventListener( 'mouseup', onMouseUp, false);
    renderer.domElement.addEventListener( 'mousewheel', onMouseWheel, false);
}

function add_objects() {
	// star field
	var geometry	= new THREE.SphereGeometry(900, 64, 64);
	var material	= new THREE.MeshBasicMaterial({
		map	: THREE.ImageUtils.loadTexture('images/g10.jpg'),
		side	: THREE.DoubleSide
	});
	var starSphere	= new THREE.Mesh(geometry, material);
	scene.add(starSphere);
	// reference points
	originPoint	= new THREE.Object3D();
	scene.add(originPoint);
	onRenderFcts.push(function (delta, now) {
		originPoint.rotation.x += rotateFactor * delta;
		originPoint.rotation.z += rotateFactor * delta;
	});
	sunsBasePoint = new THREE.Object3D();
	originPoint.add(sunsBasePoint);
	onRenderFcts.push(function (delta, now) {
		sunsBasePoint.rotation.y += rotateFactor * delta;
		sunsBasePoint.rotation.z += rotateFactor * delta;
	});
	bBasePoint = new THREE.Object3D();
	bBasePoint.position.set(1,-1.5,1);
	sunsBasePoint.add(bBasePoint);
	onRenderFcts.push(function (delta, now) {
		bBasePoint.rotation.z += rotateFactor * 2 * delta;
		bBasePoint.rotation.y += rotateFactor / 2 * delta;
	});
	// stars
	// Alpha Centauri A
	alphaCentauriA = createSun(1);
	alphaCentauriA.name = 'Alpha Centauri A';
	alphaCentauriA.des = AlphaCentauriADes;
	alphaCentauriA.position.set(0,0,-1.5);
	alphaCentauriA.scale.multiplyScalar(1.5);
	sunsBasePoint.add(alphaCentauriA);
	onRenderFcts.push(function (delta, now) {
		alphaCentauriA.rotation.y -= 1/2 * delta;
		alphaCentauriA.rotation.z += 1/4 * delta;
	});
	var light = new THREE.PointLight( 0xffffff, 1, 1000 );
	alphaCentauriA.add( light );
	objects.push(alphaCentauriA);
	// Alpha Centauri B
	alphaCentauriB = createSun(2);
	alphaCentauriB.name = 'Alpha Centauri B';
	alphaCentauriB.des = AlphaCentauriBDes;
	alphaCentauriB.position.set(1,-1.5,1);
	sunsBasePoint.add(alphaCentauriB);
	onRenderFcts.push(function (delta, now) {
		alphaCentauriB.rotation.z -= 1/2 * delta;
		alphaCentauriB.rotation.y += 1/8 * delta;
	});
	var light = new THREE.PointLight( 0xffffff, 1, 1000 );
	alphaCentauriB.add( light );
	objects.push(alphaCentauriB);
	// Alpha Centauri C
	proximaCentauri = createSun(3);
	proximaCentauri.name = 'Proxima Centauri (Alpha Centauri C)';
	proximaCentauri.des = ProximaCentauriDes;
	proximaCentauri.position.set(-1,1,3);
	proximaCentauri.scale.multiplyScalar(0.8);
	sunsBasePoint.add(proximaCentauri);
	onRenderFcts.push(function (delta, now) {
		proximaCentauri.rotation.y -= 1/8 * delta;
		proximaCentauri.rotation.x += 1/4 * delta;
	});
	var light = new THREE.PointLight( 0xffffff, 1, 1000 );
	proximaCentauri.add(light);
	objects.push(proximaCentauri);
	// Three-Body Planet
	threeBodyPlanet	= createThreeBodyPlanet();
	threeBodyPlanet.name = "Alpha Centauri Bb (Three-Body Planet)";
	threeBodyPlanet.des = ThreeBodyPlanetDes;
	threeBodyPlanet.position.set(0.5,-0.5,0.5);
	threeBodyPlanet.scale.multiplyScalar(1/5);
	bBasePoint.add(threeBodyPlanet);
	onRenderFcts.push(function (delta, now) {
		threeBodyPlanet.rotation.y -= 1/3 * delta;
		threeBodyPlanet.rotation.x -= 1/3 * delta;
	});
	objects.push(threeBodyPlanet);
}
function add_divs() {
	// divs for title and description for each star
	alphaCentauriALabel = add_div(alphaCentauriA.name, alphaCentauriA.des, 500);
	alphaCentauriA.div = alphaCentauriALabel;
	alphaCentauriBLabel = add_div(alphaCentauriB.name, alphaCentauriB.des, 350);
	alphaCentauriB.div = alphaCentauriBLabel;
	proximaCentauriLabel = add_div(proximaCentauri.name, proximaCentauri.des, 600);
	proximaCentauri.div = proximaCentauriLabel;
	threeBodyPlanetLabel = add_div(threeBodyPlanet.name, threeBodyPlanet.des, 400);
	threeBodyPlanet.div = threeBodyPlanetLabel;
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
}
function onKeyDown(event) {
	if (event.keyCode == 32) {
		if (rotateFactor) {
			rotateFactor = 0;
		}
		else
			rotateFactor = 1/4;
	}
	if (event.keyCode == 65) {
		controls.autoRotate = !controls.autoRotate;
	}
}
function onMouseDown(event) {
	if (controls.autoRotate == true) {
		shouldAuto = true;
		controls.autoRotate = false;
	}
	else
		shouldAuto = false;
}
function onMouseUp(event) {
	if (shouldAuto) {
		controls.autoRotate = true;
		shouldAuto = false;
	}
}
function onMouseWheel(event) {
	controls.autoRotate = false;
}
function onMouseMove( event ) {
	// prevent stuff like pop up menu
    event.preventDefault();
    // show / dismiss the info box
    if (event.clientY > window.innerHeight * 0.7)
    		$('.overlay').addClass('show');
    if (event.clientY <= window.innerHeight * 0.7)
    		$('.overlay').removeClass('show');
    // some math to calculate the intersected objects
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );
    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( objects );
    // change the look of the mouse if the mouse intersected with any star
    if ( intersects.length > 0 )
        container.style.cursor = 'pointer';	
    else
        container.style.cursor = 'auto';
}
function onMouseClick( event ) {
	// like above
    event.preventDefault();
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, camera );
    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( objects );
    // determine which star description to open or to close
    var closingLabel;
    if ( intersects.length > 0 ) {
    	if (openingLabel == null) {
    		rotateFactor = 0;
    		openingLabel = intersects[0].object;
    	}
    	else if (openingLabel && intersects[0].object != openingLabel) {
    		closingLabel = openingLabel;
    		openingLabel = intersects[0].object;
	    }
	    else if (openingLabel && intersects[0].object == openingLabel) {
	    	rotateFactor = 1/4;
	    	closingLabel = openingLabel;
	    	openingLabel = null;
	    }
	    if (openingLabel) {
	    	// move the camera smoothly to focus on the opening star
	    	var target = new THREE.Vector3();
			target.getPositionFromMatrix( openingLabel.matrixWorld );
			var tween = new TWEEN.Tween(camera.position).to({
			    x: target.x - (openingLabel === threeBodyPlanet ? 1 : 4),
			    y: target.y,
			    z: target.z + (openingLabel === threeBodyPlanet ? 0.25 : 1)}, 600)
			.easing(TWEEN.Easing.Linear.None).start();
			var tween = new TWEEN.Tween(controls.target).to({
			    x: target.x,
			    y: target.y,
			    z: target.z
			}, 600).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
			}).start();
	    }
	    else {
	    	// move the camera away smoothly
	    	var tween = new TWEEN.Tween(camera.position).to({
			    x: -13.62,
			    y: -1.39,
			    z: -4.56}, 600)
			.easing(TWEEN.Easing.Linear.None).start();
			var tween = new TWEEN.Tween(controls.target).to({
			    x: 0,
			    y: 0,
			    z: 0
			}, 600).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
			}).start();
	    }
	    // open or close the divs smoothly
	    // timer for forcely cancel the the loop due to some potential mathmatic inaccuracy that make the loop runing forever
    	var inc = 0.1, timer = 0, ot = 0,ct = 0; // Increment / Decrement
	    var timeout = 100;
	    if (openingLabel)
	    	openingLabel.div.style.display = 'inline';
	    var fadeout = window.setInterval ( function () {
	        if (openingLabel && parseFloat(openingLabel.div.style.opacity) > 1 
	         || closingLabel && parseFloat(closingLabel.div.style.opacity) < 0 
	         || timer > 10) {
	            window.clearInterval ( fadeout );
	        	if (openingLabel) {
	        		openingLabel.div.style.opacity = "1";
	        	}
	        	if (closingLabel) {
	        		closingLabel.div.style.opacity = "0";
	        		closingLabel.div.style.display = 'none';
	        	}
	    	}
	        else {
	        	if (openingLabel) {
	        		openingLabel.div.style.opacity = (parseFloat(openingLabel.div.style.opacity) + inc).toString();
	        		ot = 1;
	        	}
	        	if (closingLabel) {
	        		ct = 1;
	        		closingLabel.div.style.opacity = (parseFloat(closingLabel.div.style.opacity) - inc).toString();
	        	}
	        	timer += (ot || ct);
	        	ot = ct = 0;
	        }
	    }, timeout );
    }
}

function animate() {
	var lastTimeMsec = null;
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
		lastTimeMsec	= nowMsec;
		// call each update function
		TWEEN.update();
		scene.updateMatrixWorld();
		originPoint.updateMatrixWorld();
		sunsBasePoint.updateMatrixWorld();
		bBasePoint.updateMatrixWorld();
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000);
		});
	});
}
window.onload = function (){
	init();
	add_objects();
	add_divs();
	add_lensFlares();
	//debug();
	animate();
}