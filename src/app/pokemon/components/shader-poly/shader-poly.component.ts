import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-shader-poly',
  templateUrl: './shader-poly.component.html',
  styleUrl: './shader-poly.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShaderPolyComponent implements OnInit, OnDestroy {
  camera: THREE.PerspectiveCamera | undefined;
  renderer: THREE.WebGLRenderer | undefined;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.initScene();
  }

  initScene() {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize.bind(this));
      this.createScene();
    });
  }

  createScene() {
    const scene = new THREE.Scene();

    // Red Cube
    const geometry = new THREE.CircleGeometry(1, 5);
    const material = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader(),
      fragmentShader: this.fragmentShader(),
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        radius: { value: 0.5 },
        lineWidth: { value: 0.1 },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Camera
    const picture = document.querySelector('.picture') as HTMLImageElement;
    const sizes = {
      width: picture.clientWidth,
      height: picture.clientHeight,
    };

    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    this.camera.position.z = 1.5;

    scene.add(this.camera);

    // Renderer
    const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.render(scene, this.camera);

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update material
      material.uniforms['time'].value = elapsedTime;

      // Update Mesh
      mesh.rotation.z = 0.1 * elapsedTime;

      // Render
      if (this.renderer) {
        this.renderer.render(scene, this.camera as THREE.PerspectiveCamera);
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  vertexShader(): string {
    return `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * modelViewPosition;
      }
    `;
  }

  fragmentShader(): string {
    return `
      varying vec2 vUv;
      uniform float time;
      void main() {
          vec2 p = -1.0 + 2.0 * vUv;
          vec2 position = p;
          float a = atan(position.y * 0.5);
          float r = length(position);
          float sx = abs(sin(a * 0.1 + time * 1.0));
          float sy = sin(r * 100.5 + time * 10.0);
          float cx = sin(time * 0.3) * 0.3;
          float cy = cos(time * 0.2) * 0.1;
          r += sx * 10.2 * sy * cy;
          float d = abs(r - 0.1 - cx) + abs(sy * 0.2 + cy);
          float intensity = 0.5 / (d + 0.1);
          vec3 tealColor = vec3(0.086, 0.867, 0.773);
          vec3 goldColor= vec3(0.984, 0.949, 0.757);
          vec3 finalColor = mix(tealColor, goldColor, intensity);


          vec3 purple = vec3(1., 0.071, 0.012);
          vec3 gray = vec3(0.431, 0.545, 0.701);

          finalColor = mix(purple, gray, intensity);


          gl_FragColor = vec4( finalColor, 1.0);
      }
    `;
  }

  onResize() {
    const picture = document.querySelector('.picture') as HTMLImageElement;
    // Update sizes
    const sizes = {
      width: picture.clientWidth,
      height: picture.clientHeight,
    };

    // Update camera
    if (this.camera) {
      this.camera.aspect = sizes.width / sizes.height;
      this.camera.updateProjectionMatrix();
    }

    // Update renderer
    if (this.renderer) {
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      window.removeEventListener('resize', this.onResize.bind(this));
    });
  }
}
