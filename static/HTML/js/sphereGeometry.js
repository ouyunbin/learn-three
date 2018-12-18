window.onload = function () {
	sphereGeometry.init()
}
var dom = document.getElementById('plane');
var three = THREE;
var sphereGeometry = {
	initStats(){
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		dom.appendChild(stats.domElement);
		return stats;
	},
	createMesh(geometry){
			var meshMaterial = new three.MeshNormalMaterial();
			meshMaterial.side = three.DoubleSide;
			var wireFrameMat = new three.MeshBasicMaterial();
			wireFrameMat.wireframe = true;
			var mesh = three.SceneUtils.createMultiMaterialObject(geometry,[meshMaterial,wireFrameMat]);
			return mesh;
	},
	init(){
		var stats = this.initStats();
		var scene = new three.Scene();
		var width = dom.clientWidth,height = dom.clientHeight;
		var camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
		var render = new three.WebGLRenderer();
		render.setClearColor(0xeeeeee,0.9);
		render.setSize(width,height);

		var sphere = this.createMesh(new three.SphereGeometry(4,10,10));
		scene.add(sphere);

		camera.position.x = -20;
		camera.position.y = 30;
		camera.position.z = 40;
		camera.lookAt(new three.Vector3(10,0,0));

		dom.appendChild(render.domElement);

		var step = 0;
		var _this = this;
		var controls = new function () {
			this.radius = sphere.children[0].geometry.parameters.radius;
			this.widthSegments = sphere.children[0].geometry.parameters.widthSegments;
			this.heightSegments = sphere.children[0].geometry.parameters.heightSegments;
			this.phiStart = 0;
			this.phiLength = Math.PI * 2;
			this.thetaStart = 0;
			this.thetaLength = Math.PI;
			this.redraw = function(){
				scene.remove(sphere);
				sphere = _this.createMesh(new three.SphereGeometry(controls.radius,controls.widthSegments,controls.heightSegments,controls.phiStart,controls.phiLength,controls.thetaStart,controls.thetaLength))
				scene.add(sphere)
			}
		}
		var gui = new dat.GUI();
		gui.add(controls,'radius',0,40).onChange(controls.redraw)
		gui.add(controls,'widthSegments',0,20).onChange(controls.redraw)
		gui.add(controls,'heightSegments',0,20).onChange(controls.redraw)
		gui.add(controls,'phiStart',0,2 * Math.PI).onChange(controls.redraw)
		gui.add(controls,'phiLength',0,2 * Math.PI).onChange(controls.redraw)
		gui.add(controls,'thetaStart',0,2 * Math.PI).onChange(controls.redraw)
		gui.add(controls,'thetaLength',0,2 * Math.PI).onChange(controls.redraw)
		renderAnimation();
		function renderAnimation() {
			stats.update();
			sphere.rotation.y = step+=0.01;
			requestAnimationFrame(renderAnimation);
			render.render(scene,camera);
		}
	}
}