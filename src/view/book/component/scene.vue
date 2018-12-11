<template>
    <div class="box" id="box">
        <div id="Stats-output"></div>
    </div>
</template>

<script>
    import * as three from 'three'
    import Stats from 'stats'
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
				var scene = new three.Scene(); // 定义场景
				var camera = new three.PerspectiveCamera(45,width/height,0.1,1000); // 定义相机
				// 定义相机的位置
                camera.position.x = -30;
				camera.position.y = 40;
				camera.position.z = 30;
				camera.lookAt(scene.position);

                var renderer = new three.WebGLRenderer(); // 定义渲染器，负责计算指定相机角度的场景在浏览器中的样子
				renderer.setClearColor(0xEEEEEE,1.0);
				renderer.setSize(width,height); // 设置渲染的范围
                renderer.shadowMapEnabled = true;
				element.appendChild(renderer.domElement); // 将渲染的元素挂载到浏览器相应的元素中
				var axes = new three.AxisHelper(20); // 创建坐标轴对象
				scene.add(axes); // 将坐标轴添加到场景中
				var planeGeometry = new three.PlaneGeometry(60,20,1,1); // 定义平面的尺寸
				var planeMaterial = new three.MeshLambertMaterial({color: 0xffffff}); // 设置平面的材质（颜色）
				var plane = new three.Mesh(planeGeometry,planeMaterial);
				plane.rotation.x = -0.5 * Math.PI;
				plane.position.x =15;
				plane.position.y = 0;
				plane.position.z = 0;
				plane.receiveShadow = true;
				scene.add(plane);
                // 添加几何物体
				var cubeGeometry = new three.CubeGeometry(4,4,4);
				var cubeMaterial = new three.MeshLambertMaterial({color: 0xff0000,wireframe:true});
				var cube = new three.Mesh(cubeGeometry,cubeMaterial);
				cube.position.x = -4;
				cube.position.y = 3;
				cube.position.z = 0;
				cube.castShadow = true;
				scene.add(cube);
                // 添加球体
				var sphereGeometry = new three.SphereGeometry(4,20,20);
				var sphereMaterial = new three.MeshLambertMaterial({color: 0x7777ff,wireframe:true});
				var sphere = new three.Mesh(sphereGeometry,sphereMaterial);
				sphere.position.x = 20;
				sphere.position.y = 4;
				sphere.position.z = 2;
				sphere.castShadow = true; // 允许球体产生阴影
				scene.add(sphere)
                // 添加光源
                var spotLight = new three.SpotLight(0xffffff);
				spotLight.position.set(-40,60,-10); // 设置光源的位置
                spotLight.castShadow = true; // 定义光源产生阴影
                scene.add(spotLight);
				renderScene()
                function renderScene(){
	                renderer.render(scene,camera)
                	requestAnimationFrame(renderScene)

                }


            },
            initStats(){
				var stats = Stats;
				console.log(JSON.stringify(stats))
				stats.setMode(0);
				stats.domElement.style.position = 'absolute';
	            stats.domElement.style.left = '0';
	            stats.domElement.style.top = '0';
	            document.getElementById('Stats-output').appendChild(stats.domElement);
            }
        },
        mounted(){
			this.initStats()
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