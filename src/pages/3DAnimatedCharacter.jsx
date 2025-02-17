import * as THREE from 'three';

// Approximate a Hollow Knight-like character using primitives

function createHollowKnight() {
    const knightGroup = new THREE.Group();
  
    /**
     * Body geometry: a small cylinder for the torso
     * (You can tweak geometry parameters for different proportions)
     */
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.0, 24);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555, // Grayish color
      metalness: 0.3,
      roughness: 0.6,
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.set(0, 0, 0);
    knightGroup.add(bodyMesh);
  
    /**
     * Head geometry: a sphere for the “mask,” plus a smaller one for stylized shape
     */
    const headGeometry = new THREE.SphereGeometry(0.35, 24, 24);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, // White, typical Hollow Knight mask
      metalness: 0.1,
      roughness: 0.4,
    });
    const headMesh = new THREE.Mesh(headGeometry, headMaterial);
    headMesh.position.set(0, 0.75, 0);
    knightGroup.add(headMesh);
  
    /**
     * Horn geometry: a pair of small arcs or torus shapes
     * For simplicity, we’ll just do torus “loops” angled to look like horns.
     */
    const hornGeometry = new THREE.TorusGeometry(0.2, 0.07, 16, 100, Math.PI);
    const hornMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.4,
    });
  
    // Left horn
    const leftHorn = new THREE.Mesh(hornGeometry, hornMaterial);
    leftHorn.position.set(-0.25, 1.0, 0);
    leftHorn.rotation.set(0, 0, Math.PI * 0.9);
    knightGroup.add(leftHorn);
  
    // Right horn
    const rightHorn = new THREE.Mesh(hornGeometry, hornMaterial);
    rightHorn.position.set(0.25, 1.0, 0);
    rightHorn.rotation.set(0, 0, -Math.PI * 0.9);
    knightGroup.add(rightHorn);
  
    /**
     * Optional: tiny “feet” at bottom if you want
     * (just small spheres or cubes at the bottom of the body)
     */
    const footGeometry = new THREE.SphereGeometry(0.1, 20, 20);
    const footMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.3,
      roughness: 0.6,
    });
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
    leftFoot.position.set(-0.15, -0.55, 0);
    knightGroup.add(leftFoot);
    const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
    rightFoot.position.set(0.15, -0.55, 0);
    knightGroup.add(rightFoot);
    
    knightGroup.scale.set(1.9,1.5,2)
    // Shift the entire group so the base is near y=0
    knightGroup.position.y = 0.5;
  
    return knightGroup;
  }
  

export default createHollowKnight;
