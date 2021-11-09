import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
function createSphere(radius,material){
  const sphereGeometry = new THREE.SphereGeometry(radius);
  const sphereMesh = new THREE.Mesh(sphereGeometry,material);

  return sphereMesh
}
// According  Sciencetrends data
// Check that in sciencetrends.com/great-planets-order-size-distance-sun/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80,window.innerWidth/window.innerHeight,0.6,1200);
const loader = new THREE.TextureLoader()
const renderer = new THREE.WebGLRenderer({antialias: true});
const light = new THREE.PointLight(0xFFFFFF,1,100);

renderer.setClearColor('#223124');
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
import imagePath from './resources/images/space_One.jpg'
const bgTexture = loader.load(imagePath);



scene.add(light);
scene.background = bgTexture;

const rendering = function(){
  requestAnimationFrame(rendering);
  bgTexture.offset.x = aspect > 1 ? (1-1 / 2)/2 :0;
  bgTexture.repeat.x = aspect > 1 ? 1 / 2 : 1;


  renderer.render(scene,camera);
}
rendering();



// // Creating the planets and sun
// const sun = createSphere(1100,sunMaterial);
// // The sun is pending because of his massive volume
// const mercury = createSphere(3.8,mercuryMaterial);
// const venus = createSphere(9.5,venusMaterial);
// const earth = createSphere(10,earthMaterial);
// const mars = createSphere(5.3,marsMaterial);;
// const jupiter = createSphere(111.2,jupiterMaterial);;
// const saturn = createSphere(94.5,saturnMaterial);;
// const uranus = createSphere(4,uranusMaterial);;
// const neptune = createSphere(3.88,neptuneMaterial);





function App() {
  
  return (
    <main>
      <div>
        <scene/>

      </div>
    </main>
  );
}

export default App;
