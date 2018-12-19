window.onload = function () {
	var dom = document.getElementById('plane');
	var three = THREE;
	var torusGeometry = {
		initStats(){
			var stats = new Stats();
			stats.setMode(0);
			stats.domElement.style.position = 'absolute';
			dom.appendChild(stats.domElement)
			return stats;
		},
		createMesh(geometry){
			var meshMaterial = new three.MeshNormalMaterial();
			meshMaterial.side = three.DoubleSide;
			var wireMaterial = new three.MeshBasicMaterial();
			wireMaterial.wireframe = true;
			return three.SceneUtils.createMultiMaterialObject(geometry,[meshMaterial,wireMaterial]);
		},
		init(){
			var stats = this.initStats()
			var scene = new three.Scene();
			var width = dom.clientWidth,height = dom.clientHeight;
			var camera = new three.PerspectiveCamera(45,width/height,0.1,10000);
			var renderer = new three.WebGLRenderer();
			renderer.setClearColor(new three.Color(0xeeeeee));
			renderer.setSize(width,height);
			renderer.shadowMapEnabled = true;

			camera.position.x = -30;
			camera.position.y = 40;
			camera.position.z = 50;
			camera.lookAt(new three.Vector3(10,0,0));

			var torusKnot = this.createMesh(new three.TorusKnotGeometry(10,1,64,8,2,3,1));
			scene.add(torusKnot);

			dom.appendChild(renderer.domElement)
			var step = 0.01;
			var _this = this;
			var controls = new function () {
				this.radius = torusKnot.children[0].geometry.parameters.radius;
				this.tube = torusKnot.children[0].geometry.parameters.tube;
				this.radialSegments = torusKnot.children[0].geometry.parameters.radialSegments;
				this.tubularSegments = torusKnot.children[0].geometry.parameters.tubularSegments;
				this.p = torusKnot.children[0].geometry.parameters.p;
				this.q = torusKnot.children[0].geometry.parameters.q;
				//this.heightScale = torusKnot.children[0].geometry.parameters.heightScale;
				this.redraw = function(){
					scene.remove(torusKnot);
					torusKnot=_this.createMesh(new three.TorusGeometry(controls.radius,controls.tube,Math.round(controls.radialSegments),Math.round(controls.tubularSegments),Math.round(controls.p),Math.round(controls.q),controls.heightScale));
					scene.add(torusKnot)
				}

			}
			var gui = new dat.GUI();
			gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
			gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
			gui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
			gui.add(controls, 'tubularSegments', 1, 20).step(1).onChange(controls.redraw);
			gui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
			gui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);
			gui.add(controls, 'heightScale', 0, 5).onChange(controls.redraw);

			render();
			function render() {
				stats.update();
				torusKnot.rotation.y = step+=0.01;
				requestAnimationFrame(render);
				renderer.render(scene,camera)
			}

		}
	}
	torusGeometry.init()
}
