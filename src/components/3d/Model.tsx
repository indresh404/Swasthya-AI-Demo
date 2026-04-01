"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { HEAT_POINTS_CONFIG } from "@/data/heatZones";

type ModelProps = {
  onSelect: (zone: string | null) => void;
};

export default function Model({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/model.glb");
  const groupRef = useRef<THREE.Group>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const heatmapMaterial = useMemo(() => {
    const numPoints = HEAT_POINTS_CONFIG.length;
    return new THREE.ShaderMaterial({
      uniforms: {
        uHeatPoints: { value: HEAT_POINTS_CONFIG.map((p: any) => new THREE.Vector3(...p.position)) },
        uHeatColors: { value: HEAT_POINTS_CONFIG.map((p: any) => new THREE.Color(p.color)) },
        uHeatIntensities: { value: HEAT_POINTS_CONFIG.map((p: any) => p.intensity) },
        uNumPoints: { value: numPoints },
        uTime: { value: 0 },
        uBaseColor: { value: new THREE.Color("#ffffff") },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uHeatPoints[${numPoints}];
        uniform vec3 uHeatColors[${numPoints}];
        uniform float uHeatIntensities[${numPoints}];
        uniform int uNumPoints;
        uniform vec3 uBaseColor;
        uniform float uTime;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        void main() {
          float totalHeat = 0.0;
          vec3 heatColor = vec3(0.0);
          float dotNL = max(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 0.2);
          vec3 base = uBaseColor * (0.9 + 0.1 * dotNL);
          for (int i = 0; i < ${numPoints}; i++) {
            if (i >= uNumPoints) break;
            float dist = distance(vWorldPosition, uHeatPoints[i]);
            float radius = 0.25;
            float falloff = exp(-pow(dist / radius, 2.0));
            float currentHeat = falloff * uHeatIntensities[i];
            totalHeat += currentHeat;
            heatColor += uHeatColors[i] * currentHeat;
          }
          vec3 finalColor = mix(base, heatColor, clamp(totalHeat, 0.0, 1.0));
          float pulseIntensity = 0.15;
          float pulse = (sin(uTime * 4.0) * 0.5 + 0.5) * pulseIntensity * clamp(totalHeat * 2.0, 0.0, 1.0);
          finalColor += heatColor * pulse;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    groupRef.current.position.set(-center.x, -center.y, -center.z);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = heatmapMaterial;
      }
    });
  }, [scene, heatmapMaterial]);

  useFrame((state) => {
    heatmapMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    const point = e.point;
    let closestZone = null;
    let minDist = Infinity;

    HEAT_POINTS_CONFIG.forEach((zone: any) => {
      const pos = new THREE.Vector3(...zone.position);
      const dist = point.distanceTo(pos);
      if (dist < 0.5 && dist < minDist) {
        minDist = dist;
        closestZone = zone.id;
      }
    });

    setActiveZone(closestZone);
    onSelect(closestZone);
  };

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={0.01} 
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      />
    </group>
  );
}

useGLTF.preload("/model.glb");