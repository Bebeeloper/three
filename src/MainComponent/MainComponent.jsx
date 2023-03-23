import { useState, useEffect } from 'react'
import './MainComponent.css';
import * as THREE from 'three'
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';

function MainComponent(){
  
    useEffect(() => {
        const scene = new THREE.Scene();
    
        const camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        camera.position.z = 96;
    
        const canvas = document.getElementById('myThreeJsCanvas');
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);
    
        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;
        spotLight.position.set(0, 64, 32);
        scene.add(spotLight);
    
        const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
        // const boxMaterial = new THREE.MeshNormalMaterial({wireframe: true});
        const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        scene.add(boxMesh);
        const materialBoxParams = {
            boxMeshColor: boxMesh.material.color.getHex()
        };
    
        const controls = new OrbitControls(camera, renderer.domElement);
    
        const stats = Stats();
        document.body.appendChild(stats.dom);

        //setting up our gui parameters
        const gui = new GUI();

        const boxRotationFolder = gui.addFolder('Rotation');
        boxRotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
        boxRotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
        boxRotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
        const boxScaleFolder = gui.addFolder('Scale');
        boxScaleFolder.add(boxMesh.scale, 'x', 1, 10).name('Scale X Axis');
        boxScaleFolder.add(boxMesh.scale, 'y', 1, 10).name('Scale Y Axis');
        boxScaleFolder.add(boxMesh.scale, 'z', 1, 10).name('Scale Z Axis');
        const boxMaterialFolder = gui.addFolder('Material');
        boxMaterialFolder.add(boxMesh.material, 'wireframe');
        boxMaterialFolder.addColor(materialBoxParams, 'boxMeshColor').onChange((value) => boxMesh.material.color.set(value));

    
        const animate = () => {
          // boxMesh.rotation.x += 0.01;
          // boxMesh.rotation.y += 0.01;
          // boxMesh.rotation.z += 0.01;
    
          stats.update();
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