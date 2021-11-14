import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
import { AxesHelper } from 'three';


function createSphere(radius,material){
  const sphereGeometry = new THREE.SphereGeometry(radius);
  const sphereMesh = new THREE.Mesh(sphereGeometry,material);

  return sphereMesh
}

function createPathForStrings(filename){
  const basePath = 'https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/skybox/';
  const baseFileName = basePath + filename;
  const fileType = '.png';
  const sides = ['1', '2', '3', '4', '5', '6'];
  const pathStings = sides.map(side => {
    return baseFileName + '_' + side + fileType;
  });
  return pathStings;
}

function createMaterialArray(filename){
  const skyBoxImagePaths = createPathForStrings(filename);
  const materialArray = skyBoxImagePaths.map(image => {
    const loader = new THREE.TextureLoader();
    let texture = loader.load(image);
    
    return new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide})
  });
  return materialArray;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.6,1200);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
const light = new THREE.PointLight(0xFFFFFF,1,100);
light.position.set(5,5,5);

const skyboxSpace  = new THREE.BoxGeometry(100,100,100);
const materialArray = createMaterialArray('space')

renderer.setClearColor('#223124');
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
// import imagePath from './resources/images/space_One.jpg'
// const bgTexture = loader.load(imagePath);
const skybox = new THREE.Mesh(skyboxSpace,materialArray);
scene.add(skybox);

window.addEventListener('resize', () =>{
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const controls = new TrackballControls(camera,renderer.domElement);
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

scene.add(light);
const axes = new THREE.AxesHelper(10);
scene.add(axes);



const rendering = function(){
  requestAnimationFrame(rendering);
  
  

  
  renderer.render(scene,camera);
  controls.update();
}

rendering();

// According  Sciencetrends data
// Check that in sciencetrends.com/great-planets-order-size-distance-sun/

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
