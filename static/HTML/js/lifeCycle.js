window.onload = function () {
	var lifeBox = document.getElementById('lifeBox');
	var width = lifeBox.clientWidth, height = lifeBox.clientHeight;
	var three = THREE;
	var lifeCycle = {
		initStats(){
			var stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.setMode(0)
			lifeBox.appendChild(stats.domElement);
			return stats
		},
		createMesh(geometry){
			var meshMaterial = new three.MeshNormalMaterial();
			meshMaterial.side = three.DoubleSide;
			var wireFrameMat = new three.MeshBasicMaterial();
			wireFrameMat.wireframe = true;
			return three.SceneUtils.createMultiMaterialObject(geometry,[meshMaterial,wireFrameMat]);
		},
		initThree(){
			var scene = new three.Scene();
			var camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
			camera.position.x = -20;
			camera.position.y = 20;
			camera.position.z = 30;
			camera.lookAt(new three.Vector3(10,0,0))
			var renderer = new three.WebGLRenderer();
			renderer.setClearColor('#eee');
			renderer.setSize(width,height);
			lifeBox.appendChild(renderer.domElement)
			var cylinderGeometry = this.createMesh(new three.CylinderGeometry(5,5,2,20,20))
			scene.add(cylinderGeometry)

			renderer.render(scene,camera)
		}
	}
	lifeCycle.initStats()
	lifeCycle.initThree()
}