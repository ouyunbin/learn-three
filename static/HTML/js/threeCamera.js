window.onload = function () {
	var dom = document.getElementById('plane');
	var [width,height]=[dom.clientWidth,dom.clientHeight];
	var three = THREE;
	var threeCamera = {
		initStats(){
			var stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.setMode(0);
			dom.appendChild(stats.domElement);
			return stats;
		},
		initThree(){
			var stats = this.initStats();
			var scene = new three.Scene();
			var camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
			camera.position.x = 120;
			camera.position.y = 60;
			camera.position.z = 180;
			camera.lookAt(scene.position);
			var renderer = new three.WebGLRenderer();
			renderer.setClearColor('#efefef');
			renderer.setSize(width,height);
			var planeGeometry = new three.PlaneGeometry(180,180);
			var planeMaterial = new three.MeshLambertMaterial({color:'#fff'});
			var plane = new three.Mesh(planeGeometry,planeMaterial);

			plane.rotation.x = -0.5 * Math.PI;
			plane.position.x = 0;
			plane.position.y = 0;
			plane.position.z = 0;
			scene.add(plane);
			var cubeGeometry = new three.BoxGeometry(4,0.5,4);
			for(var j = 0; j < (planeGeometry.parameters.height/5); j++){
				for(var i = 0; i < planeGeometry.parameters.height/5; i++){
					var rnd = Math.random() * 0.75 +0.25
					var cubeMaterial = new three.MeshLambertMaterial();
					cubeMaterial.color = new three.Color(rnd,0,0);
					var cube = new three.Mesh(cubeGeometry,cubeMaterial);
					cube.position.z = -((planeGeometry.parameters.height) / 2) +2 +(j*5);
					cube.position.x = -((planeGeometry.parameters.width) / 2) +2 +(i * 5);
					cube.position.y = 2;
					scene.add(cube);
				}
			}
			var directionalLight = new three.DirectionalLight(0xffffff,0.7);
			directionalLight.position.set(-20,40,60);
			scene.add(directionalLight);

			var ambientLight = new three.AmbientLight(0x292929);
			scene.add(ambientLight);

			dom.appendChild(renderer.domElement);

			var step = 0;

			var controls = new function () {
				this.perspective = "Perspective";
				this.switchCamera = function () {
					if (camera instanceof three.PerspectiveCamera) {
						camera = new three.OrthographicCamera(width / -16, width / 16, height / 16, height / -16, -200, 500);
						camera.position.x = 120;
						camera.position.y = 60;
						camera.position.z = 180;
						camera.lookAt(scene.position);
						this.perspective = "Orthographic";
					} else {
						camera = new three.PerspectiveCamera(45, wwidth / height, 0.1, 1000);
						camera.position.x = 120;
						camera.position.y = 60;
						camera.position.z = 180;

						camera.lookAt(scene.position);
						this.perspective = "Perspective";
					}
				};
			};
			var gui = new dat.GUI();
			gui.add(controls, 'switchCamera');
			gui.add(controls, 'perspective').listen();
			render();
			function render() {
				stats.update();
				// render using requestAnimationFrame
				requestAnimationFrame(render);
				renderer.render(scene, camera);
			}
		}
	}
	threeCamera.initThree()
}