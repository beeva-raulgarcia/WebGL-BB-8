
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth, 
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();

var group = new THREE.Object3D();
	
init();
animate();

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setViewport( 0,0,width, height );
	renderer.getMaxAnisotropy();

	var container = document.getElementById('container'),
			body;
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 60, (width/height), 0.1, 10000000 );
	camera.position.set( 3000, 600, 4500 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildShape();

	var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
		directionalLight.position.set(2000, 3500,2500);
		//directionalLight.target.position.set( 0, 0, 0 );
		//directionalLight.shadowCameraVisible = true;
		directionalLight.castShadow = true;
		directionalLight.shadowCameraFar = 10000;
		directionalLight.shadowDarkness = 0.5;
		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.name = 'luzDireccional'

	scene.add( directionalLight );
	//
	window.addEventListener( 'resize', onWindowResize, false );

}


function buildShape(){
	var BB8material  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/bb8.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );
	var BB8Headmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/bb8_casco.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );
	var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var BODYradius = 500; //dimensiones de la esfera
var BODYwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var BODYheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var BODYangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var BODYangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var BODYgeometry = new THREE.SphereGeometry( BODYradius, BODYwidthSegments, BODYheigthSegments, BODYangleStart, BODYangleLenght );
	body = new THREE.Mesh( BODYgeometry, BB8material );
	body.castShadow = true;	//emitir sombras
	body.receiveShadow = true;	//recibir sombras
	body.position.set(0,0,0);	//position del objeto(x,y,z)
	body.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	body.scale.set(1,1,1);	//escala del objeto(x,y,z)

	group.add(body);

var HEADradius = 300; //dimensiones de la esfera
var HEADwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var HEADheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var HEADangleStart = 1.57; //grado desde el que empieza a dibujar la pared de la espera
var HEADangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var HEADgeometry = new THREE.SphereGeometry( HEADradius, HEADwidthSegments, HEADheigthSegments, HEADangleStart, HEADangleLenght );
var head = new THREE.Mesh( HEADgeometry, BB8Headmaterial );
	head.castShadow = true;	//emitir sombras
	head.receiveShadow = true;	//recibir sombras
	head.position.set(0,400,0);	//position del objeto(x,y,z)
	head.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	head.scale.set(1,1,1);	//escala del objeto(x,y,z)
group.add( head );

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x111111, emissive: 0x000000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var CYLINDERradiusTop = 80; //radio de la parte superios del cilindro
		var CYLINDERradiusBottom = 80;	//radio de la parte inferior del cilindro
		var CYLINDERheigth = 20;	//altura del cilindro
		var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
		var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
		var CYLINDERopenEnded = false;	//en off el cilindro en hueco
		var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
		var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

		var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
		var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
			cylinder.castShadow = true;	//emitir sombras
			cylinder.receiveShadow = true;	//recibir sombras
			cylinder.position.set(0,550, 300);	//position del objeto(x,y,z)
			cylinder.rotation.set(20,40,0);	//rotacion del objeto(x,y,z)
			cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
		group.add( cylinder );

		var LENSradius = 80; //dimensiones de la esfera
var LENSwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var LENSheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var LENSangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var LENSangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var LENSgeometry = new THREE.SphereGeometry( LENSradius, LENSwidthSegments, LENSheigthSegments, LENSangleStart, LENSangleLenght );
var lens = new THREE.Mesh( LENSgeometry, CYLINDERmaterial );
	lens.castShadow = true;	//emitir sombras
	lens.receiveShadow = true;	//recibir sombras
	lens.position.set(0,540, 270);	//position del objeto(x,y,z)
	lens.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	lens.scale.set(1,1,1);	//escala del objeto(x,y,z)
group.add( lens );
	var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0x111111, emissive: 0x000000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var DONUTradius = 45; //radio del anillo
		var DONUTtubeWidth = 5;	//ancho del anillo
		var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
		var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
		var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

		var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
		var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
			donut.castShadow = true;	//emitir sombras
			donut.receiveShadow = true;	//recibir sombras
			donut.position.set(170,515,220);	//position del objeto(x,y,z)
			donut.rotation.set(6,3.9,0);	//rotacion del objeto(x,y,z)
			donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
		group.add( donut );

var LENSradius =50; //dimensiones de la esfera
var LENSwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var LENSheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var LENSangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var LENSangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var LENSgeometry = new THREE.SphereGeometry( LENSradius, LENSwidthSegments, LENSheigthSegments, LENSangleStart, LENSangleLenght );
var lens = new THREE.Mesh( LENSgeometry, CYLINDERmaterial );
	lens.castShadow = true;	//emitir sombras
	lens.receiveShadow = true;	//recibir sombras
	lens.position.set(150,500,190);	//position del objeto(x,y,z)
	lens.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	lens.scale.set(1,1,1);	//escala del objeto(x,y,z)
group.add( lens );

var AERIAL1material = new THREE.MeshPhongMaterial( {color: 0xFFFFFF, emissive: 0xDDDDDD, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var AERIAL1radiusTop = 5; //radio de la parte superios del cilindro
		var AERIAL1radiusBottom = 5;	//radio de la parte inferior del cilindro
		var AERIAL1heigth = 600;	//altura del cilindro
		var AERIAL1radioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
		var AERIAL1heigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
		var AERIAL1openEnded = false;	//en off el cilindro en hueco
		var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
		var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

		var AERIAL1geometry = new THREE.CylinderGeometry( AERIAL1radiusTop, AERIAL1radiusBottom, AERIAL1heigth, AERIAL1radioSegments, AERIAL1heigthSegments, AERIAL1openEnded, circleStartCylinder, circleCylinder );
		var aerial1 = new THREE.Mesh( AERIAL1geometry, CYLINDERmaterial );
			aerial1.castShadow = true;	//emitir sombras
			aerial1.receiveShadow = true;	//recibir sombras
			aerial1.position.set(-50,700,0);	//position del objeto(x,y,z)
			aerial1.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			aerial1.scale.set(1,1,1);		//escala del objeto(x,y,z)
		group.add( aerial1 );

		var AERIAL2material = new THREE.MeshPhongMaterial( {color: 0xFFFFFF, emissive: 0xDDDDDD, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var AERIAL2radiusTop = 5; //radio de la parte superios del cilindro
		var AERIAL2radiusBottom = 5;	//radio de la parte inferior del cilindro
		var AERIAL2heigth = 300;	//altura del cilindro
		var AERIAL2radioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
		var AERIAL2heigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
		var AERIAL2openEnded = false;	//en off el cilindro en hueco
		var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
		var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

		var AERIAL2geometry = new THREE.CylinderGeometry( AERIAL2radiusTop, AERIAL2radiusBottom, AERIAL2heigth, AERIAL2radioSegments, AERIAL2heigthSegments, AERIAL2openEnded, circleStartCylinder, circleCylinder );
		var aerial2 = new THREE.Mesh( AERIAL2geometry, CYLINDERmaterial );
			aerial2.castShadow = true;	//emitir sombras
			aerial2.receiveShadow = true;	//recibir sombras
			aerial2.position.set(100,700,0);	//position del objeto(x,y,z)
			aerial2.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			aerial2.scale.set(1,1,1);		//escala del objeto(x,y,z)
		group.add( aerial2 );

var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/skyHD.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );
	var grassTexture = THREE.ImageUtils.loadTexture( "images/sand.jpg" );
	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; 
		grassTexture.repeat.set( 10, 10 );
		//grassTexture.minFilter = THREE.LinearFilter;
	var grassMaterial = new THREE.MeshLambertMaterial( { map: grassTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111 } );

	//SKY -----------------------------------

	var SKYradius = 20000;
	var SKYwidthSegments = 32;
	var SKYheigthSegments = 32;
	var SKYangleStart = 0;
	var SKYangleLenght = 6.3;

	var SKYgeometry = new THREE.SphereGeometry( SKYradius, SKYwidthSegments, SKYheigthSegments, SKYangleStart, SKYangleLenght );
	var sky = new THREE.Mesh( SKYgeometry, SKYmaterial );
		sky.position.set(0,0,0);
		sky.rotation.set(0,0,0);
		sky.scale.set(1,1,1);
	scene.add( sky );

	//--------------------------------------
	//FLOOR --------------------------------

	var PLANEgeometry = new THREE.PlaneGeometry( 30000, 30000, 30000 );
	var plane = new THREE.Mesh( PLANEgeometry, grassMaterial );
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.position.set(0,-500,0);
		plane.rotation.set((3*Math.PI)/2,0,199.9);
		plane.scale.set(1,1,1);
	scene.add( plane );

	group.position.set(-4000,0,-4000);	//position del objeto(x,y,z)
scene.add( group );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function movement(value, object, delay, duration){
          var tween = new TWEEN.Tween(object).to(
          	value
          	,duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          	/*camera.position.x = valueX;
          	camera.position.y = valueY;
          	camera.position.z = valueZ;*/
          }).delay(delay).start();
}

function animate() {

	setTimeout( function() {
		requestAnimationFrame( animate );
	}, 1000/30 );

    TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){

	//requestAnimationFrame(render);
		var direction = 1;
    body.rotation.x += 0.1;
    body.rotation.y += 0.1;
    setInterval(function(){
	    group.position.x += direction * 50;
	    group.position.z += direction * 50;
    	direction = direction * -1
    }, 3000);
    renderer.render(scene,camera);
}
