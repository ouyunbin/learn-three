window.onload = function () {
  var dom = document.getElementById('plane');
  var width = dom.clientWidth, height = dom.clientHeight;
  var three = THREE;
  var meshGeometry = {
    initStats(){
      var stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.setMode(0);
      dom.appendChild(stats.domElement);
      return stats;
    },
    initThree(){
      var stats = this.initStats();
      var scene = new three.Scene();
      var camera = new three.PerspectiveCamera(45,width/height,0.1,1000);
      camera.position.x = -20;
      camera.position.y = 40;
      camera.position.z = 30;
      camera.lookAt(scene.position);
      var renderer = new three.WebGLRenderer();
      renderer.setClearColor('#ccc');
      renderer.setSize(width,height);
      renderer.shadowMap.enable = true;
      var planeGeometry = new three.PlaneGeometry(60,40,1,1);
      var planeMaterial = new three.MeshLambertMaterial({color: '#fff'});
      var plane = new three.Mesh(planeGeometry,planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;
      scene.add(plane);
      var ambientLight = new three.AmbientLight(0x0c0c0c);
      scene.add(ambientLight);
      var spotLight = new three.SpotLight(0xffffff);
      scene.add(spotLight);
      spotLight.position.set(-40,60,20);
      spotLight.castShadow = true;
      scene.add(spotLight);
      dom.appendChild(renderer.domElement);

      var material = new three.MeshNormalMaterial({color: 0x44ff44});
      var geometry = new three.CubeGeometry(5,8,3,10,10,10);
      var cube = new three.Mesh(geometry,material);
      cube.position.y = 4;
      cube.castShadow = true;
      scene.add(cube)
      var step = 0;
      var controls = new function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;
        this.positionX = 0;
        this.positionY = 4;
        this.positionZ = 0;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;
        this.translate = function () {
          cube.translateX(this.translateX)
          cube.translateY(this.translateY)
          cube.translateZ(this.translateZ)
          this.positionX = cube.position.x;
          this.positionY = cube.position.y;
          this.positionZ = cube.position.z;
        }
      }
      var gui = new dat.GUI(),
        guiScale = gui.addFolder('scale');
      guiScale.add(controls,'scaleX',0,5);
      guiScale.add(controls,'scaleY',0,5);
      guiScale.add(controls,'scaleZ',0,5);

      var guiPosition = gui.addFolder('position');
      var contX =guiPosition.add(controls,'positionX',-10,10);
      var contY =guiPosition.add(controls,'positionY',-4,20);
      var contZ =guiPosition.add(controls,'positionZ',-10,10);
      contX.listen();
      contX.onChange(function (value) {
        cube.position.x = controls.positionX;
      })
      contY.listen();
      contY.onChange(function (value) {
        cube.position.y = controls.positionY;
      })
      contZ.listen();
      contZ.onChange(function (value) {
        cube.position.z = controls.positionZ;
      })

      var guiRotation = gui.addFolder('rotation');
      guiRotation.add(controls,'rotationX',-4,4)
      guiRotation.add(controls,'rotationY',-4,4)
      guiRotation.add(controls,'rotationZ',-4,4)

      var guiTranslate = gui.addFolder('translate');
      guiTranslate.add(controls,'translateX',-10,10)
      guiTranslate.add(controls,'translateY',-10,10)
      guiTranslate.add(controls,'translateZ',-10,10)

      render()
      function render() {
        stats.update();
        cube.rotation.x = controls.rotationX
        cube.rotation.y = controls.rotationY
        cube.rotation.z = controls.rotationZ
        cube.scale.set(controls.scaleX,controls.scaleY,controls.scaleZ);
        requestAnimationFrame(render);
        renderer.render(scene,camera);
      }
    }
  }
  meshGeometry.initThree()
}
