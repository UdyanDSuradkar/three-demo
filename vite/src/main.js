import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "three/addons";

// Make sure you have this element in your HTML: <canvas id="canvas"></canvas>
const canvas = document.getElementById("canvas");
if (!canvas) {
  console.error(
    "Canvas element not found! Add <canvas id='canvas'></canvas> to your HTML."
  );
}

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#F0F0F0");

// Camera - fixed parameters
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight, // Fixed aspect ratio
  0.1,
  1000
);
camera.position.z = 5;

// Dodecahedron
const geometry = new THREE.DodecahedronGeometry();
// Changed to MeshPhongMaterial to support emissive property
const material = new THREE.MeshPhongMaterial({
  color: "#468585",
  emissive: "#468585",
  emissiveIntensity: 0.2,
});
const dodecahedron = new THREE.Mesh(geometry, material);

// Box
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
// Fixed material reference
const boxMaterial = new THREE.MeshPhongMaterial({
  color: "#b4b4b3",
  emissive: "#b4b4b3",
  emissiveIntensity: 0.2,
});
// Corrected box creation
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

// Light
const light = new THREE.SpotLight(0x006869, 100);
light.position.set(1, 1, 1);
scene.add(light);

// Add ambient light to better see objects
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add OrbitControls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// animations
function animate() {
  requestAnimationFrame(animate);

  dodecahedron.rotation.x = 0.01;
  dodecahedron.rotation.y = 0.01;

  box.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

animate();
