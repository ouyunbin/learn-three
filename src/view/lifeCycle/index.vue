<template>
    <div class="lifeCycle">
        <div class="scene" id="lifeCycle"></div>

    </div>
</template>

<script>
    import three from '../../common/method/three'
    import dat from 'dat.gui'
	export default {
		name: "lifeCycle",
        data(){
            return {}
        },
        methods:{
            init(){
	            // create a scene, that will hold all our elements such as objects, cameras and lights.
	            var scene = new three.Scene();

	            // create a camera, which defines where we're looking at.
	            var camera = new three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	            scene.add(camera);

	            // create a render and set the size
	            var renderer = new three.WebGLRenderer();

	            renderer.setClearColor(new three.Color(0xffffff, 1.0));
	            renderer.setSize(window.innerWidth, window.innerHeight);
	            renderer.shadowMapEnabled = true;

	            // create the ground plane
	            var planeGeometry = new three.PlaneGeometry(60, 40, 1, 1);
	            var planeMaterial = new three.MeshLambertMaterial({color: 0xffffff});
	            var plane = new three.Mesh(planeGeometry, planeMaterial);
	            plane.receiveShadow = true;

	            // rotate and position the plane
	            plane.rotation.x = -0.5 * Math.PI;
	            plane.position.x = 0;
	            plane.position.y = 0;
	            plane.position.z = 0;

	            // add the plane to the scene
	            scene.add(plane);

	            // position and point the camera to the center of the scene
	            camera.position.x = 20;
	            camera.position.y = 40;
	            camera.position.z = -30;
	            camera.lookAt(scene.position);
                /********************手动生成几何体***********************/
                var vertices = [
                	new three.Vector3(1,3,1),
	                new three.Vector3(1,3,-1),
	                new three.Vector3(1,-1,1),
	                new three.Vector3(1,-1,-1),
	                new three.Vector3(-1,3,-1),
	                new three.Vector3(-1,3,1),
	                new three.Vector3(-1,-1,-1),
	                new three.Vector3(-1,-1,1)
                ]

                var faces = [
                	new three.Face3(0,2,1),
	                new three.Face3(2,3,1),
	                new three.Face3(4,6,5),
	                new three.Face3(6,7,5),
	                new three.Face3(4,5,1),
	                new three.Face3(5,0,1),
	                new three.Face3(7,6,2),
	                new three.Face3(6,3,2),
	                new three.Face3(5,7,0),
	                new three.Face3(7,2,0),
	                new three.Face3(1,3,4),
	                new three.Face3(3,6,4)
                ]
                var geom = new three.Geometry();
                geom.vertices = vertices;
                geom.faces = faces;
                geom.mergeVertices();


	            /**********************手动生成几何体*********************/

	            // add subtle ambient lighting
	            var ambientLight = new three.AmbientLight(0x0c0c0c);
	            scene.add(ambientLight);

	            // add spotlight for the shadows
	            var spotLight = new three.SpotLight(0xffffff);
	            spotLight.position.set(-40, 60, -10);
	            spotLight.castShadow = true;
	            scene.add(spotLight);

	            // add the output of the renderer to the html element
	            document.getElementById("lifeCycle").appendChild(renderer.domElement);

	            render();

	            function render() {
		            // render using requestAnimationFrame
		            requestAnimationFrame(render);
		            renderer.render(scene, camera);
	            }

            }
        },
        mounted(){
			this.init()
        },
        beforeDestroy() {
        }
	}
</script>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .scene{
        width:100%;
        height: 100%;
        position:absolute;
        left: 0;
        top: 0;

    }
</style>