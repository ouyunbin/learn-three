window.onload=function () {
	geometry.init()
}
var three = THREE;
var dom = document.getElementById('plane')
var geometry = {
	createMesh(geom){
		var meshMaterial = new three.MeshNormalMaterial();
		meshMaterial.side = three.DoubleSide;
		var wireFrameMat = new three.MeshBasicMaterial();
		wireFrameMat.wireframe = true;
		var mesh = three.SceneUtils.createMultiMaterialObject(geom,[meshMaterial,wireFrameMat]);
		return mesh
	},
	initStats(){
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		dom.appendChild(stats.domElement);
		return stats;
	},
	init(){
		var stats = this.initStats();
		var scene = new three.Scene();
		var width = dom.clientWidth,height = dom.clientHeight;
		var camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
		var renderer = new three.WebGLRenderer();
		renderer.setClearColor(0xEEEEEE,1.0);
		renderer.setSize(width,height);
		var cube =this.createMesh(new three.BoxGeometry(10,10,10,5,5,5));
		scene.add(cube);

		camera.position.x = -20;
		camera.position.y = 30;
		camera.position.z = 40;
		camera.lookAt(new three.Vector3(10,0,0));

		var spotLight = new three.SpotLight(0xffffff);
		spotLight.position.set(-40,60,-10);
		scene.add(spotLight);

		dom.appendChild(renderer.domElement);
		var _this = this;
		var controls = new function () {
			this.width = cube.children[0].geometry.parameters.width;
			this.height = cube.children[0].geometry.parameters.height;
			this.depth = cube.children[0].geometry.parameters.depth;

			this.widthSegments = cube.children[0].geometry.parameters.widthSegments;
			this.heightSegments = cube.children[0].geometry.parameters.heightSegments;
			this.depthSegments = cube.children[0].geometry.parameters.depthSegments;

			this.redraw = function () {
				scene.remove(cube);
				cube =_this.createMesh(new three.BoxGeometry(controls.width,controls.height,controls.depth,Math.round(controls.widthSegments),Math.round(controls.heightSegments),Math.round(controls.depthSegments)))
				scene.add(cube)
			}
		}
		var gui = new dat.GUI();
		gui.add(controls,'width',0,40).onChange(controls.redraw);
		gui.add(controls,'height',0,40).onChange(controls.redraw);
		gui.add(controls,'depth',0,40).onChange(controls.redraw);
		gui.add(controls,'widthSegments',0,40).onChange(controls.redraw);
		gui.add(controls,'heightSegments',0,40).onChange(controls.redraw);
		gui.add(controls,'depthSegments',0,40).onChange(controls.redraw);
		render();
		var step = 0;
		function render() {
			stats.update();
			cube.rotation.y = step += 0.01;
			requestAnimationFrame(render);
			renderer.render(scene,camera);
		}
	},

}