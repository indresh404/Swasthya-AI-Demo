import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Model from "./Model";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

type SceneProps = {
  onSelect: (zone: string | null) => void;
  selectedZone: string | null;
  selectedPosition?: THREE.Vector3 | null;
};

// Helper component to sync 3D point to 2D screen coordinates
function ProjectionSync({
  position,
  onProject
}: {
  position: THREE.Vector3 | null,
  onProject: (p: { x: number; y: number } | null) => void
}) {
  const { camera, size } = useThree();

  useFrame(() => {
    if (!position) {
      onProject(null);
      return;
    }

    const vector = position.clone();
    vector.project(camera);

    const x = (vector.x + 1) / 2 * size.width;
    const y = -(vector.y - 1) / 2 * size.height;

    onProject({ x, y });
  });

  return null;
}

export default function Scene({ onSelect, selectedZone, selectedPosition }: SceneProps) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas
        shadows
        gl={{
          antialias: true,
          stencil: false,
          depth: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ background: "#050505" }}
      >
        <color attach="background" args={["#050505"]} />

        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={35} />

        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={8}

          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}

          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={1.8}

          autoRotate={!selectedZone}
          autoRotateSpeed={0.3}
        />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, 5, -5]} intensity={0.6} />
        <pointLight position={[0, 2, 3]} intensity={1.0} color="#ffffff" />

        <Model onSelect={onSelect} />

        <ProjectionSync
          position={selectedPosition || null}
          onProject={(px) => {
            if (typeof window !== "undefined") {
              (window as any)._lastProjectedPoint = px;
            }
          }}
        />

        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}