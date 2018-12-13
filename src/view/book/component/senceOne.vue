<template>
    <div class="box">
        <div class="wrapper-one" id="wrapper-one"></div>
        <div class="fps" id="fps"></div>
    </div>
</template>

<script>
    import three from '@/common/method/three'
    import Stats from '@/common/method/stats'
    import dat from 'dat.gui'
	export default {
		name: "basicScene",
        data(){
			return{
                step:0
            }
        },
        methods:{
			// 检测WebGL FPS变化
		    initStats(){
		    	var stats = new Stats();
			    stats.setMode(0);
			    stats.domElement.style.position = 'absolute';
			    stats.domElement.style.zIndex = '0';
		    	document.getElementById('fps').appendChild(stats.domElement);
		    	return stats
            },
            initScene(){
		    	var element = document.getElementById('wrapper-one')
		    	var _this = this;
		    	var scene = new three.Scene();
		    	scene.fog = new three.Fog(0xffffff,0.015, 200)
		    	var width = element.clientWidth,height= element.clientHeight
		    	var camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
		    	camera.position.x = -20;
	            camera.position.y = 80;
	            camera.position.z = 30;
	            camera.lookAt(scene.position)
		    	scene.add(camera);

		    	var renderer = new three.WebGLRenderer();
		    	renderer.setClearColor(new three.Color(0xeeeeee,1.0));
		    	renderer.setSize(width,height);
		    	renderer.shadowMapEnabled = true;

		    	var planeGeometry = new three.PlaneGeometry(60,40,1,1);
		    	var planeMaterial = new three.MeshLambertMaterial({color: 0xffffff});
		    	var plane = new three.Mesh(planeGeometry,planeMaterial);
	            var axes = new three.AxisHelper(30); // 创建坐标轴对象
	            scene.add(axes); // 将坐标轴添加到场景中
		    	plane.receiveShadow = true;

		    	plane.rotation.x = -0.5* Math.PI;
		    	plane.position.x = 0;
	            plane.position.y = 0;
	            plane.position.z = 0;
                scene.add(plane);

                var ambientLight = new three.AmbientLight(0x0c0c0c);
                scene.add(ambientLight);

                var spotLight = new three.SpotLight(0xffffff);
                spotLight.position.set(-40,60,-10);
                spotLight.castShadow = true;
                scene.add(spotLight);

                element.appendChild(renderer.domElement);

                var controls = new function () {
                    this.rotationSpeed = 0.02;
                    this.numberOfObjects = scene.children.length;
                    this.removeCube = function () {
                        var allChildren = scene.children;
                        var lastObject = allChildren[allChildren.length - 1];
                        if(lastObject instanceof three.Mesh){
                        	scene.remove(lastObject);
                        	this.numberOfObjects = scene.children.length;
                        }
                    }
                    this.addCube = function () {
                        var cubeSize = Math.ceil(Math.random() * 3);
                        var cubeGeometry = new three.BoxGeometry(cubeSize,cubeSize,cubeSize);
                        var cubeMaterial = new three.MeshLambertMaterial({color: Math.random() * 0xffffff});
                        var cube = new three.Mesh(cubeGeometry,cubeMaterial);
                        cube.castShadow = true;
                        cube.name = 'cube-' + scene.children.length;

                        cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width);
                        cube.position.y = -1 +  Math.round(Math.random() * 5);
                        cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);

                        scene.add(cube);
                        this.numberOfObjects = scene.children.length;
                    }

                    this.outputObjects = function () {
                        console.log(scene.children)
                    }
                }
                var gui = new dat.GUI();
                gui.add(controls,'rotationSpeed',0,0.5);
                gui.add(controls,'addCube');
                gui.add(controls,'removeCube');
                gui.add(controls,'outputObjects');
                gui.add(controls,'numberOfObjects').listen()
	            animationRender()

	            function animationRender(){
		            requestAnimationFrame(animationRender);
		            var stats = _this.initStats();
		            stats.update()
		            scene.traverse(function (e) {
                        if(e instanceof three.Mesh && e != plane){
                        	e.rotation.x += controls.rotationSpeed;
	                        e.rotation.y += controls.rotationSpeed;
	                        e.rotation.z += controls.rotationSpeed;
                        }
		            })
		            renderer.render(scene,camera);
	            }
            }
        },
        mounted(){
            this.initStats();
            this.initScene();
        }
	}
</script>

<style lang="scss" scoped>
    .box{
        position: relative;
        min-height: 600px;
        width:100%;
    }
    .wrapper-one{
        width:100%;
        height:1000px;
    }
</style>