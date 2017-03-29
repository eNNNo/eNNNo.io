/*
Three-Body

Web Lab Final Project

CMU HCII 2013 Fall

Wang Liang
*/
function createAtmosphereMaterial (){
	var vertexShader	= [
		'varying vec3 vNormal;',
		'void main(){',
		'	// compute intensity',
		'	vNormal		= normalize( normalMatrix * normal );',
		'	// set gl_Position',
		'	gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}',
	].join('\n');
	var fragmentShader	= [
		'uniform float coeficient;',
		'uniform float power;',
		'uniform vec3  glowColor;',
		'varying vec3  vNormal;',
		'void main(){',
		'	float intensity	= pow( coeficient - dot(vNormal, vec3(0.0, 0.0, 1.0)), power );',
		'	gl_FragColor	= vec4( glowColor * intensity, 1.0 );',
		'}',
	].join('\n');
	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var material	= new THREE.ShaderMaterial({
		uniforms: { 
			coeficient	: {
				type	: "f", 
				value	: 1.0
			},
			power		: {
				type	: "f",
				value	: 2
			},
			glowColor	: {
				type	: "c",
				value	: new THREE.Color('black')
			},
		},
		vertexShader	: vertexShader,
		fragmentShader	: fragmentShader,
		side		: THREE.FrontSide,
		blending	: THREE.AdditiveBlending,
		transparent	: true,
		depthWrite	: false,
	});
	return material;
}
function createSun (no){
	var geometry	= new THREE.SphereGeometry(0.5, 64, 64);	// create the sphere
	var texture;
	switch(no) {	// different texture for the 3 suns
		case 1: texture	= THREE.ImageUtils.loadTexture('images/ss1.jpg');break;
		case 2: texture	= THREE.ImageUtils.loadTexture('images/ss2.jpg');break;
		case 3: texture	= THREE.ImageUtils.loadTexture('images/ss3.jpg');break;
		default:break;
	}
	var material	= new THREE.MeshPhongMaterial({	// phong material
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.05,
		emissive: new THREE.Color('#ffffff'),
		specular: new THREE.Color('#ffff66'),
		shininess: 1000,
		wireframeLinewidth: 100
	});
	var theSun	= new THREE.Mesh(geometry, material);	// create the mesh for the surface
	theSun.receiveShadow = true;
	theSun.castShadow = true;
	var color;
	switch(no) {	// different atmosphere colors for suns
		case 1: color = 0xffcc00;break;
		case 2: color = 0xff6600;break;
		case 3: color = 0x993300;break;
		default:break;
	}
	var geometry	= new THREE.SphereGeometry(0.5, 64, 64);	// create the mesh for atmosphere
	var material	= createAtmosphereMaterial();
	material.side	= THREE.DoubleSide;
	material.uniforms.glowColor.value.set(color);
	material.uniforms.coeficient.value	= 0.5;
	material.uniforms.power.value		= 4.0;
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.5);
	theSun.add( mesh );
	return theSun;	
}
function createThreeBodyPlanet (){	// create three-body planet
	var geometry	= new THREE.SphereGeometry(0.5, 64, 64)	// sphere
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture('images/marsmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture('images/marsbump1k.jpg'),
		bumpScale: 0.05,
	});
	var planet	= new THREE.Mesh(geometry, material);	// mesh for the surface
	planet.receiveShadow	= true;
	planet.castShadow	= true;
	var geometry	= new THREE.SphereGeometry(0.5, 64, 64);	// atmosphere
	var material	= createAtmosphereMaterial();
	material.side	= THREE.DoubleSide;
	material.uniforms.glowColor.value.set(0xaaaaaa);
	material.uniforms.coeficient.value	= 0.5;
	material.uniforms.power.value		= 4.0;
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.15);
	planet.add( mesh );
	return planet	
}
function add_div(name, description, height) {
	ele = document.createElement('div');	// container
	ele.style.position = 'absolute';
	ele.style.width = 400 + 'px';
	ele.style.height = height + 'px';
	ele.style.borderStyle = 'solid';
	ele.style.borderColor = "white";
	ele.style.top = 50 + 'px';
	ele.style.left = 50 + 'px';
	ele.style.opacity = 0;
	document.body.appendChild(ele);
	
	var title = document.createElement('div');	// title div
	title.innerHTML = name;
	title.style.color = 'white';
	title.style.fontSize = 30 + 'px';
	title.style.position = 'absolute';
	title.style.top = 20 + 'px';
	title.style.left = 20 + 'px';
	title.style.width = 360 + 'px';
	title.style.height = 50 + 'px';
	title.style.fontFamily = 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Open-Light, sans-serif';	
	ele.appendChild(title);
	
	var des = document.createElement('div');	// description div
	des.innerHTML = description;
	des.style.color = 'white';
	des.style.fontSize = 16 + 'px';
	des.style.position = 'absolute';
	des.style.top = 100 + 'px';
	des.style.left = 20 + 'px';
	des.style.width = 360 + 'px';
	des.style.height = height - 130 + 'px';
	des.style.fontFamily = 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Open-Light, sans-serif';	
	ele.appendChild(des);
	ele.style.display = 'none';
	return ele;
}
function add_lensFlares() {
	var textureFlare0 = THREE.ImageUtils.loadTexture( "images/lensflare0.png" );	// lens flares
	var textureFlare2 = THREE.ImageUtils.loadTexture( "images/lensflare1.png" );
	var textureFlare3 = THREE.ImageUtils.loadTexture( "images/lensflare2.png" );
	addLensFlare( 0.55, 0.9, 0.5, 800, 50, 0 );
	function addLensFlare( h, s, l, x, y, z ) {
		var flareColor = new THREE.Color( 0xffffff );
		flareColor.setHSL( h, s, l + 0.5 );
		var lensFlare = new THREE.LensFlare( textureFlare0, 150, -0.1, THREE.AdditiveBlending, flareColor );

		lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
		lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
		lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

		lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

		lensFlare.customUpdateCallback = lensFlareUpdateCallback;
		lensFlare.position.set( x,y,z );
		lensFlare.size = 0;
		scene.add( lensFlare );
	}
	function lensFlareUpdateCallback( object ) {	// the callback function to update lensflares
		var f, fl = object.lensFlares.length;
		var flare;
		var vecX = -object.positionScreen.x * 2;
		var vecY = -object.positionScreen.y * 2;
		for( f = 0; f < fl; f++ ) {
			   flare = object.lensFlares[ f ];
			   flare.x = object.positionScreen.x + vecX * flare.distance;
			   flare.y = object.positionScreen.y + vecY * flare.distance;
			   flare.rotation = 0;
		}
		object.lensFlares[ 2 ].y += 0.025;
		object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
	};
}
function debug() {
	var debugaxis = function(axisLength){
	    function v(x,y,z){ 	//Shorten the vertex function
	            return new THREE.Vertex(new THREE.Vector3(x,y,z)); 
	    }
	    function createAxis(p1, p2, color){	//Create axis (point1, point2, colour)
	            var line, lineGeometry = new THREE.Geometry(),
	            lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
	            lineGeometry.vertices.push(p1, p2);
	            line = new THREE.Line(lineGeometry, lineMat);
	            scene.add(line);
	    }
	    createAxis(v(-axisLength/25, 0, 0), v(axisLength, 0, 0), 0xFF0000);
	    createAxis(v(0, -axisLength/25, 0), v(0, axisLength, 0), 0x00FF00);
	    createAxis(v(0, 0, -axisLength/25), v(0, 0, axisLength), 0x0000FF);
	};
	debugaxis(100);
}