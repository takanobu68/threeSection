import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import {
  CSS3DObject,
  CSS3DRenderer,
} from "./node_modules/three/examples/jsm/renderers/CSS3DRenderer.js";

const container = document.getElementById("scene-container");
const videoBox = document.getElementById("video-box");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  1,
  1000
);
camera.position.set(0, 0, 1200);

//scene2
let scene2 = new THREE.Scene();
scene2.background = new THREE.Color("skyblue");
let camera2 = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  1,
  1000
);
camera2.position.set(0, 0, 10);

let renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer2.domElement);

const videoTest = document.getElementById("three-video");
const movie = document.createElement("video");
movie.src = "../video02.mp4";
movie.loop = true;

let videoTexture = new THREE.VideoTexture(videoTest);
console.log(videoTexture);
const geo = new THREE.SphereGeometry(3, 32, 32);
let cubeMat = new THREE.MeshBasicMaterial({ map: videoTexture });
let cube = new THREE.Mesh(geo, cubeMat);

cube.position.set(2, 0, 0);
scene2.add(cube);

const renderer = new CSS3DRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

let el = document.createElement("div");
el.innerHTML = `
<div class="video-box">
<ul>
	<li><video src="./assets/video02.mp4" id="video1" class="videos"></video></li>
	<li><video src="./assets/video05.mp4" id="video2" class="videos"></video></li>
	<li><video src="./assets/video03.mp4" id="video3" class="videos"></video></li>
	<li><video src="./assets/video04.mp4" id="video4" class="videos"></video></li>
	<li><video src="./assets/video01.mp4" id="video5" class="videos"></video></li>
	<li><video src="./assets/video06.mp4" id="video6" class="videos"></video></li>
</ul>
</div>`;

el.addEventListener("click", (e) => {
  videoTest.src = e.target.src;
  videoTest.play();
});

const obj = new CSS3DObject(el);
obj.position.set(-600, 0, 0);
obj.rotation.y += Math.PI / 4;
scene.add(obj);

const controls = new OrbitControls(camera, renderer.domElement);
const controls2 = new OrbitControls(camera2, renderer.domElement);

function draw() {
  videoTexture.needsUpdate = true;

  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);
  requestAnimationFrame(draw);
}

draw();
