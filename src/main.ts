import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from 'tweakpane';
import { Cat } from './cat';
import { loader } from './utils';

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
const lightOptions = {
    color: 0xffffff,
};
scene.add(new THREE.AmbientLight(0xffffff, 0.2));
const pointLights = [new THREE.PointLight(lightOptions.color, 0.7)];
pointLights[0].position.set(0, 100, 0);
scene.add(...pointLights);

// Helpers
scene.add(new THREE.GridHelper(200, 50));
scene.add(...pointLights.map((light) => new THREE.PointLightHelper(light)));
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 70;
controls.maxDistance = 240;

const debug = new Pane();
const lightFolder = debug.addFolder({ title: 'Light' });
lightFolder
    .addInput(lightOptions, 'color', { view: 'color' })
    .on('change', (e) => pointLights[0].color.set(e.value));
lightFolder.addInput(pointLights[0], 'intensity', { min: 0, max: 2 });

// Models
const cat = new Cat((model) => {
    model.position.set(60, 0, 0);
    scene.add(model);
});
cat.rotationSpeed = 0.01;
cat.moving = true;

loader.load('models/bowl/scene.gltf', (data) => {
    const model = data.scene;
    const material = new THREE.MeshPhysicalMaterial({ color: 0xee2222 });
    model.traverse((o: any) => {
        if (o.isMesh) o.material = material;
    });
    model.scale.set(8, 8, 8);
    scene.add(model);
});

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
    cat.animate();
    renderer.render(scene, camera);
}

animate();
