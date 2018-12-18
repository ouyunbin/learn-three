<template>
    <div id="geometry"></div>
</template>

<script>
	import * as dat from 'dat.gui'
	import Stats from '@/common/method/stats'
	import  three from '@/common/method/three'
	export default {
		name: "geometries",
        data(){
			return {}
        },
        methods:{
		    initThree(){
		    	let element = document.getElementById('geometry');
		    	let width = element.clientWidth,
                    height = element.clientHeight;
		    	let scene = new three.Scene();
		    	let camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
		    	camera.position.x = -50;
		    	camera.position.y = 30;
		    	camera.position.z = 20;
		    	camera.lookAt(new three.Vector3(-10,0,0));
		    	var renderer = new three.WebGLRenderer();
		    	renderer.setClearColor(new three.Color(0xeeeeee,1.0));
		    	renderer.setSize(width,height);
		    	renderer.shadowMapEnabled = true;

		    	var planeGeometry = new three.PlaneGeometry(60,40,1,1);
		    	var planeMaterial = new three.MeshLambertMaterial({color: 0xffffff});
		    	var plane = new three.Mesh(planeGeometry,planeMaterial);
		    	plane.receiveShadow = true;

		    	plane.rotation.x = -0.5*Math.PI;
		    	plane.position.x = 0;
			    plane.position.y = 0;
			    plane.position.z = 0;
			    scene.add(plane);

			    var spotLight = new three.SpotLight(0xffffff);
			    spotLight.position.set(-40,40,50);
			    spotLight.castShadow = true;
			    scene.add(spotLight);

			    element.appendChild(renderer.domElement)
			    addGeometries(scene)
                function addGeometries(scene) {
                    var geoms = [];
                    geoms.push(new three.CylinderGeometry(1,4,4));
                    geoms.push(new three.BoxGeometry(2,2,2));
                    geoms.push(new three.SphereGeometry(2));
                    geoms.push(new three.IcosahedronGeometry(4));

                    var points = [
                    	new three.Vector3(2,2,2),
	                    new three.Vector3(2,2,-2),
	                    new three.Vector3(2,-2,2),
	                    new three.Vector3(2,-2,-2),
	                    new three.Vector3(-2,2,-2),
	                    new three.Vector3(-2,2,2),
	                    new three.Vector3(-2,-2,2),
	                    new three.Vector3(-2,-2,-2),
                    ]
                    geoms.push(new three.ConvexGeometry(points));

                    var pts = [];
                    var detail = .1;
                    var radius = 3;
                    for(var angle = 0.0; angle < Math.PI; angle += detail){
                    	pts.push(new three.Vector3(Math.cos(angle) * radius,0,Math.sin(angle)*radius));
                    }
	                geoms.push(new three.LatheGeometry(pts,12));
	                geoms.push(new three.OctahedronGeometry(3));
	                geoms.push(new three.ParametricGeometry(three.ParametricGeometries.mobius3d,20,10));

	                geoms.push(new three.TetrahedronGeometry(3));
	                geoms.push(new three.TorusGeometry(3,1,10,10));
	                geoms.push(new three.TorusKnotGeometry(3,0.5,50,20));

	                var j = 0;
	                for(var i = 0; i < geoms.length; i++){
	                	var cubeMaterial = new three.MeshLambertMaterial({wireframe:true,color:Math.random()* 0xffffff});
	                	var materials = [
	                		new three.MeshLambertMaterial({color: Math.random()*0xffffff,shading: three.FlatShading}),
                            new three.MeshBasicMaterial({color: 0x000000, wireframe: true})
                        ];
	                	var mesh = three.SceneUtils.createMultiMaterialObject(geoms[i],materials);
	                	mesh.traverse(function (e) {
                            e.castShadow = true;
		                });
	                	mesh.position.x = -24 + ( i % 4) * 12;
	                	mesh.position.y = 4;
	                	mesh.position.z = -8 + (j * 12);
	                	if((i+1) % 4 === 0) j ++;
	                	scene.add(mesh);
                    }
                }
                render()
                function render() {
                    requestAnimationFrame(render);
                    renderer.render(scene,camera)
                }

            }
        },
        mounted(){
			this.initThree()
        }
	}
</script>

<style lang="scss" scoped>
    #geometry{
        width: 100%;
        min-height: 600px;
        height: 800px;
    }
</style>