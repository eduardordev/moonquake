import React, { useEffect } from 'react';
import * as THREE from 'three';
import textureImage from './Bump_2K.png';

const ModelViewer = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const texture = new THREE.TextureLoader().load(textureImage);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);

    camera.position.z = 5;

    scene.add(sphere);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model-container').appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div id="model-container" />;
};

export default ModelViewer;