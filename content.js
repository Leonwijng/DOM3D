import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

function visualizeDOM() {
  const elements = document.querySelectorAll('*');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  elements.forEach((el) => {
    const box = new THREE.Mesh(geometry, material);
    const rect = el.getBoundingClientRect();
    box.position.set(
      rect.left / 100 - window.innerWidth / 200,
      -rect.top / 100 + window.innerHeight / 200,
      -parseInt(getComputedStyle(el).zIndex) || 0
    );
    scene.add(box);
  });

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

visualizeDOM();
