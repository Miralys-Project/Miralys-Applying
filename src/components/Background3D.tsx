import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import gsap from 'gsap';

export function Background3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x10101a);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Create animated wave geometry
    const geometry = new THREE.PlaneGeometry(10, 5, 100, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3a3a5a,
      emissive: 0x1a1a2a,
      metalness: 0.7,
      roughness: 0.3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x8ecaff, 1, 100);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    // Animate wave
    let frame = 0;
    // For BufferGeometry
    function animateBuffer() {
      frame += 0.02;
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 2 + frame) * Math.cos(y * 2 + frame) * 0.3);
      }
      pos.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animateBuffer);
    }
    animateBuffer();

    // Responsive resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // GSAP fade-in effect
    gsap.fromTo(renderer.domElement, { opacity: 0 }, { opacity: 1, duration: 2 });

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />;
}
