import { useState, useEffect } from 'react'
import './App.css'

import { MainComponent } from './MainComponent/MainComponent';

function App() {
  const [count, setCount] = useState(0)

  /*useEffect(() => {
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 200);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 200);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    // const geometry = new THREE.SphereGeometry( 15, 32, 32 );
    // const material = new THREE.MeshNormalMaterial();
    // const sphere = new THREE.Mesh( geometry, material );
    // scene.add( sphere );

    const controls = new OrbitControls(camera, renderer.domElement);

    const stats = Stats();
    document.body.appendChild(stats.dom);

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

  }, [])*/
  
  return (
    <div className="App">
      <MainComponent></MainComponent>
    </div>
  )
}

export default App
