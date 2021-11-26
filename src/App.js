import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import * as THREE from 'three';
import { TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
import { AxesHelper, Clock } from 'three';

const loader = new THREE.TextureLoader();
const arraySphere = []; 
const arrayPosition = [1100, 3.8, 9.5, 10, 5.3, 112, 94.5, 40, 38.8];
const arrayRadio = [300,1200,3000,5500,50000,100000,120000,140000];
const arrayMaterial = [];
function createSphere(radius,material){
  const sphereGeometry = new THREE.SphereGeometry(radius);
  const sphereMat = new THREE.MeshBasicMaterial({map : material});
  const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMat);
  arraySphere.push(sphereMesh);
  
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
    
    let texture = loader.load(image);
    
    return new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide})
  });
  return materialArray;
}

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.6,1200);
camera.position.z = -5;
//camera.position.set(1200,-250,2000);

const renderer = new THREE.WebGLRenderer({antialias: true});
const light = new THREE.PointLight(0xFFFFFF,1,100);
light.position.set(5,5,5);

const skyboxSpace  = new THREE.BoxGeometry(1,1,1);
const materialArray = createMaterialArray('space')

renderer.setClearColor('#223124');
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
// import imagePath from './resources/images/space_One.jpg'
// const bgTexture = loader.load(imagePath);
const skybox = new THREE.Mesh(skyboxSpace,materialArray);
//scene.add(skybox);

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





// According  Sciencetrends data
// Check that in sciencetrends.com/great-planets-order-size-distance-sun/
// Using textures and materials from https://www.solarsystemscope.com/
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/sun.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/mercury.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/venus.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/earth.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/mars.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/jupiter.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/saturn.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/uranus.jpg')); 
arrayMaterial.push(loader.load('https://raw.githubusercontent.com/AlonsoIndex18/planetarium/main/src/resources/images/neptune.jpg')); 
// // Creating the planets and sun

for (let index = 0; index < 9; index++) {
  createSphere(arrayPosition[index],arrayMaterial[index]);
}

for (let index = 0; index < arraySphere.length; index++) {
  scene.add(arraySphere[index]);
  arraySphere[index].position.set(20*(index+1),0,0)  
}


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
clock.start();
const rendering = function(){
  requestAnimationFrame(rendering);
  arraySphere.forEach(element => {
    //element.rotation.y += 0.05;
  });
  for (let i = 0; i < arrayRadio.length; i++) {
    var x = (Math.cos(clock.getElapsedTime()) * arrayRadio[i]);
    var y = 0;
    var z = (Math.sin(clock.getElapsedTime()) * arrayRadio[i]);
    arraySphere[i+1].position.set(x,y,z);
    
  }

  console.log(renderer.info.render.frame);

  renderer.render(scene,camera);
  controls.update();
}

rendering();



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
