// @ts-check
import * as THREE from 'three';
import { loader } from './utils';

export class Cat {
    private model = new THREE.Group();
    private clock = new THREE.Clock();
    private mixer?: THREE.AnimationMixer;
    private pressedKeys: { [key: string]: boolean } = {
        w: true,
        d: true,
    };
    rotationSpeed = 0.1;
    movingSpeed = 0.6;
    moving = false;

    constructor(onLoad: (model: THREE.Group) => void) {
        loader.load(
            'models/cat/scene.gltf',
            (data) => {
                this.model = data.scene;
                this.model.scale.set(0.1, 0.1, 0.1);
                this.mixer = new THREE.AnimationMixer(this.model);
                this.mixer.clipAction(data.animations[0]).play();
                onLoad(this.model);
            },
            undefined,
            (error) => console.error(error),
        );

        window.addEventListener('keydown', (e) => {
            this.pressedKeys[e.key] = true;
            this.checkMoving();
            if (['w', 'a', 's', 'd'].includes(e.key)) {
                this.rotationSpeed = 0.05;
                this.movingSpeed = 1;
            }
        });
        window.addEventListener('keyup', (e) => {
            this.pressedKeys[e.key] = false;
            this.checkMoving();
        });
    }

    private checkMoving() {
        const keys = this.pressedKeys;
        this.moving = keys.w || keys.a || keys.s || keys.d;
        if (this.moving) {
            this.clock.start();
        } else {
            this.clock.stop();
        }
    }

    animate() {
        const model = this.model;
        const keys = this.pressedKeys;
        if (this.moving) {
            if (keys.a) {
                model.rotation.y += this.rotationSpeed;
            }
            if (keys.d) {
                model.rotation.y -= this.rotationSpeed;
            }
            if (keys.w) {
                model.position.z += this.movingSpeed * Math.cos(model.rotation.y);
                model.position.x += this.movingSpeed * Math.sin(model.rotation.y);
            }
            if (keys.s) {
                model.position.z -= this.movingSpeed * Math.cos(model.rotation.y);
                model.position.x -= this.movingSpeed * Math.sin(model.rotation.y);
            }
            this.mixer?.update(this.clock.getDelta());
        }
    }
}
