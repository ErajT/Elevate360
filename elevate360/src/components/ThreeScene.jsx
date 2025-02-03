import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const spheresRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create floating spheres
    const createSphere = (position, color) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color,
        shininess: 100,
        transparent: true,
        opacity: 0.7,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(position);
      scene.add(sphere);
      spheresRef.current.push(sphere);
      return sphere;
    };

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create multiple spheres
    const spherePositions = [
      new THREE.Vector3(-2, 1, 0),
      new THREE.Vector3(2, -1, 0),
      new THREE.Vector3(0, 2, 0),
      new THREE.Vector3(1, -2, 0),
      new THREE.Vector3(-1, -1, 0),
    ];

    const colors = [0x2b6777, 0x52ab98, 0x3e8e9e, 0x45b3cb, 0x2d7e94];

    spherePositions.forEach((pos, i) => {
      const sphere = createSphere(pos, colors[i]);

      // Animate each sphere
      gsap.to(sphere.position, {
        y: pos.y + Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to(sphere.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 10 + Math.random() * 5,
        repeat: -1,
        ease: 'none',
      });
    });

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      requestAnimationFrame(animate);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        mountRef.current?.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default ThreeScene;
