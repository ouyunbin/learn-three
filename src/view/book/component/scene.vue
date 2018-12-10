<template>
    <div class="box" id="box">
    </div>
</template>

<script>
    import * as three from 'three'
	export default {
		name: "scene",
        data(){
			return {}
        },
        methods:{
			init(){
				var element = document.getElementById('box')
				var width = element.clientWidth,
                    height = element.clientHeight;
				var scene = new three.Scene();
				var camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
				var renderer = new three.WebGLRenderer();
				// renderer.setColors(0xeeeeee);
				renderer.setSize(width,height);
				element.appendChild(renderer.domElement);
				var axes = new three.AxisHelper(20);
				scene.add(axes);
				var planeGeometry = new three.PlaneGeometry(60,20,1,1);
				var planeMaterial = new three.MeshBasicMaterial({color: 0xcccccc});
				var plane = new three.Mesh(planeGeometry,planeMaterial);
				plane.rotation.x = -0.5 * Math.PI;
				plane.position.x =15;
				plane.position.y = 0;
				plane.position.z = 0;
				scene.add(plane);

				var cubeGeometry = new three.CubeGeometry(4,4,4);
				var cubeMaterial = new three.MeshBasicMaterial({color: 0xff0000,wireframe:true});
				var cube = new three.Mesh(cubeGeometry,cubeMaterial);
				cube.position.x = -4;
				cube.position.y = 3;
				cube.position.z = 0;
				scene.add(cube);

				var sphereGeometry = new three.SphereGeometry(4,20,20);
				var sphereMaterial = new three.MeshBasicMaterial({color: 0x7777ff,wireframe:true});
				var sphere = new three.Mesh(sphereGeometry,sphereMaterial);
				sphere.position.x = 20;
				sphere.position.y = 4;
				sphere.position.z = 2;

				scene.add(sphere)

                camera.position.x = -30;
				camera.position.y = 40;
				camera.position.z = 30;
				camera.lookAt(scene.position);
				renderer.render(scene,camera)

            }
        },
        mounted(){
			this.init()
        }
	}
</script>

<style scoped>
    .box{
        width: 100%;
        min-height: 800px;
    }
</style>