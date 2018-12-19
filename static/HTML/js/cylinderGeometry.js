window.onload = function () {
	cylinderGeometry.init()
}
var dom = document.getElementById('plane');
var three = THREE;
var cylinderGeometry = {
	initStats(){
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.setMode(0)
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

		var cylinder = this.createMesh(new three.CylinderGeometry(25,25,100,20,20,false));
		scene.add(cylinder);

		camera.position.x = -20;
		camera.position.y = 30;
		camera.position.z = 40;
		camera.lookAt(new three.Vector3(10,0,0));

		dom.appendChild(render.domElement);

		var step = 0;
		var _this = this;
		var controls = new function () {
			this.radiusTop = cylinder.children[0].geometry.parameters.radiusTop;
			this.radiusBottom = cylinder.children[0].geometry.parameters.radiusBottom;
			this.height = cylinder.children[0].geometry.parameters.height;
			this.radialSegments = cylinder.children[0].geometry.parameters.radialSegments;
			this.heightSegments = cylinder.children[0].geometry.parameters.heightSegments;
			// this.radialSegments = 8;
			// this.heightSegments = 8;
			this.redraw = function(){
				scene.remove(cylinder);
				cylinder = _this.createMesh(new three.CylinderGeometry(controls.radiusTop,controls.radiusBottom,controls.height,controls.radialSegments,controls.heightSegments,false))
				scene.add(cylinder)
			}
		}
		var gui = new dat.GUI();
		gui.add(controls,'radiusTop',-20,40).onChange(controls.redraw)
		gui.add(controls,'radiusBottom',-30,40).onChange(controls.redraw)
		gui.add(controls,'height',-50,200).onChange(controls.redraw)
		gui.add(controls,'radialSegments',0,20).onChange(controls.redraw)
		gui.add(controls,'heightSegments',0,20).onChange(controls.redraw)
		// gui.add(controls,'thetaStart',0,2 * Math.PI).onChange(controls.redraw)
		// gui.add(controls,'thetaLength',0,2 * Math.PI).onChange(controls.redraw)
		renderAnimation();
		function renderAnimation() {
			stats.update();
			cylinder.rotation.y = step+=0.01;
			requestAnimationFrame(renderAnimation);
			render.render(scene,camera);
		}
	}
}