import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from 'tweakpane';

// Setup
const scene = new THREE.Scene();
const ratio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
camera.position.set(-70, 70, -70);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main')!,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Light
scene.add(new THREE.AmbientLight(0xffffff, 0.2));
// Helpers
scene.add(new THREE.GridHelper(200, 50));
const controls = new OrbitControls(camera, renderer.domElement);

const debug = new Pane();

// Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

// Animate
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
