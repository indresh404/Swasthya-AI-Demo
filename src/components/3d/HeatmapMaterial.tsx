"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const HeatmapMaterialImpl = shaderMaterial(
  {
    uHeatPoints: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
    uHeatColors: [new THREE.Color(), new THREE.Color(), new THREE.Color(), new THREE.Color()],
    uHeatIntensities: [0, 0, 0, 0],
    uNumPoints: 0,
    uBaseColor: new THREE.Color("#ffffff"),
    uTime: 0,
  },
  // Vertex Shader
  `
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec3 uHeatPoints[4];
  uniform vec3 uHeatColors[4];
  uniform float uHeatIntensities[4];
  uniform int uNumPoints;
  uniform vec3 uBaseColor;
  uniform float uTime;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    float totalHeat = 0.0;
    vec3 heatColor = vec3(0.0);
    
    // Base surface properties
    float dotNL = max(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 0.2);
    vec3 base = uBaseColor * (0.8 + 0.2 * dotNL);

    for (int i = 0; i < 4; i++) {
        if (i >= uNumPoints) break;
        
        float dist = distance(vWorldPosition, uHeatPoints[i]);
        
        // Custom falloff function for organic diffusion
        // Using a smooth exponential decay
        float radius = 0.25; // Base radius of heat spread
        float falloff = exp(-pow(dist / radius, 2.0));
        
        float currentHeat = falloff * uHeatIntensities[i];
        totalHeat += currentHeat;
        heatColor += uHeatColors[i] * currentHeat;
    }

    // Blend base color with heat color
    // Use an additive approach for a glowing effect
    vec3 finalColor = mix(base, heatColor, clamp(totalHeat, 0.0, 1.0));
    
    // Add a slight pulse effect to heat zones
    finalColor += heatColor * (sin(uTime * 2.0) * 0.05 + 0.05);

    gl_FragColor = vec4(finalColor, 1.0);
  }
  `
);

extend({ HeatmapMaterialImpl });

export default HeatmapMaterialImpl;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      heatmapMaterialImpl: any;
    }
  }
}
