import { useState, useEffect } from 'react'
import './MainComponent.css';
import * as THREE from 'three'
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

function MainComponent(){

  let scene;
  let controls;
  let camera;
  let canvas;
  let renderer;

  const prepareSceneAndCamera = () => {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.05,
      1000
    );
    camera.position.set(5,0,0);
    canvas = document.getElementById('myThreeJsCanvas');
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
  };

  const createDirectionalLight = (positionX, positionY, positionZ) => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    // const helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
    directionalLight.position.set(positionX, positionY,positionZ);
    scene.add(directionalLight);
    // scene.add(helper);
  };

  const createAmbientLight = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 17);
    ambientLight.castShadow = true;
    scene.add(ambientLight);
  };

  const createPointLight = (positionX, positionY, positionZ, color, intensity, size) => {
    const pointLight = new THREE.PointLight( color, intensity, size );
    pointLight.position.set(positionX, positionY,positionZ);
    scene.add(pointLight);

    // const sphereSize = 0.3;
    // const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    // scene.add( pointLightHelper );
  };

  const createBox = (x, y , z , posX, posY, posZ) => {
    const boxGeometry = new THREE.BoxGeometry(x, y, z);
    const boxMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(posX, posY, posZ);
    boxMesh.receiveShadow = true;
    scene.add(boxMesh);
  }

    useEffect(() => {

      // Configuring scene
      prepareSceneAndCamera();

      // Lights
      createDirectionalLight(0,3,0);
      createAmbientLight();

      // Red pointlight inside car
      createPointLight(0,0,0, 0xff0000, 10, 500);

      //Pointlights outside car delantera derecha
      createPointLight(-2,0,2, 0xffffff, 1, 100);

      //Pointlights outside car mitad derecha
      createPointLight(-2,0,0, 0xffffff, 1, 100);

      //Pointlights outside car trasera derecha
      createPointLight(-2,0,-2, 0xffffff, 1, 100);

      //Pointlights outside car delantera izquierda
      createPointLight(2,0,2, 0xffffff, 1, 100);

      //Pointlights outside car mitad izquierda
      createPointLight(2,0,0, 0xffffff, 1, 100);

      //Pointlights outside car trasera izquierda
      createPointLight(2,0,-2, 0xffffff, 1, 100);

      // Floor
      createBox(20,0.05,20, 0, -0.64, 0);
        
        // const spotLight = new THREE.SpotLight(0xffffff, 10);
        // spotLight.castShadow = true;
        // spotLight.position.set(0, 64, 32);
        // scene.add(spotLight);
    
        // const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
        // // // const boxMaterial = new THREE.MeshNormalMaterial({wireframe: true});
        // const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
        // // // const texture = new THREE.TextureLoader().load( './UV_1k.jpg' );
        // // const texture = new THREE.TextureLoader().load( '../../assets/931998321.png' );
        // // const boxMaterial = new THREE.MeshBasicMaterial( { map: texture } );
        // // // const boxMaterial = new THREE.MeshBasicMaterial( );
        // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        // boxMesh.scale.x = 3;
        // boxMesh.scale.z = 3;
        // boxMesh.scale.y = 0.05;

        // scene.add(boxMesh);
        // const materialBoxParams = {
        //     boxMeshColor: boxMesh.material.color.getHex()
        // };
    
    
        // const stats = Stats();
        // document.body.appendChild(stats.dom);

        // //setting up our gui parameters
        // const gui = new GUI();

        // const boxRotationFolder = gui.addFolder('Rotation');
        // boxRotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
        // boxRotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
        // boxRotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
        // const boxScaleFolder = gui.addFolder('Scale');
        // boxScaleFolder.add(boxMesh.scale, 'x', 1, 10).name('Scale X Axis');
        // boxScaleFolder.add(boxMesh.scale, 'y', 1, 10).name('Scale Y Axis');
        // boxScaleFolder.add(boxMesh.scale, 'z', 1, 10).name('Scale Z Axis');
        // const boxMaterialFolder = gui.addFolder('Material');
        // boxMaterialFolder.add(boxMesh.material, 'wireframe');
        // boxMaterialFolder.addColor(materialBoxParams, 'boxMeshColor').onChange((value) => boxMesh.material.color.set(value));

    
        // Call uv texture with callback
        // const loader = new THREE.TextureLoader();
        // loader.load('../../assets/931998321.png', (texture) => {
        //   boxMaterial.map = texture
        // })

        // const glftLoader = new GLTFLoader();
        // glftLoader.load('../../Car/scene.gltf', (glftScene) => {
        //   scene.add(glftScene.scene);
        // });

        // Instantiate a loader
        const loader = new GLTFLoader();

        // Optional: Provide a DRACOLoader instance to decode compressed mesh data
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );

        // Load a glTF resource
        loader.load(
          // resource URL
          '../../Car/scene.gltf',
          // called when the resource is loaded
          function ( gltf ) {

            const box = new THREE.Box3().setFromObject( gltf.scene );
            const center = box.getCenter( new THREE.Vector3() );

            // Center de object
            gltf.scene.position.x += ( gltf.scene.position.x - center.x );
            gltf.scene.position.y += ( gltf.scene.position.y - center.y );
            gltf.scene.position.z += ( gltf.scene.position.z - center.z );
            // gltf.scene.scale.set(20,20,20);
            // gltf.scene.position.set(0,0,0);
            // gltf.scene.rotation.set(0,5,0);
            // gltf.scene.geometry.center();


            scene.add( gltf.scene );

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

          },
          // called while loading is progressing
          function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

          },
          // called when loading has errors
          function ( error ) {

            console.log( 'An error happened' );

          }
        );

        const animate = () => {
          // boxMesh.rotation.x += 0.01;
          // boxMesh.rotation.y += 0.01;
          // boxMesh.rotation.z += 0.01;
    
          // stats.update();
          controls.update();
          renderer.render(scene, camera);
          window.requestAnimationFrame(animate);
        };
        animate();
    
      }, []);

    return (
        <canvas id='myThreeJsCanvas'></canvas>
    )
  
}
  
export { MainComponent }