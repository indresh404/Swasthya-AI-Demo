"use client";

import { useState } from "react";

type HeatZoneProps = {
  id: string;
  position: [number, number, number];
  radius: number;
  color: string;
  onSelect: (zone: string | null) => void;
};

export default function HeatZone({ id, position, radius, color, onSelect }: HeatZoneProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Visible glow sphere - simplified */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.8}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}