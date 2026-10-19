import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Deterministic pseudo-random so the skyline is identical on every load. */
function makeRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

interface Building {
  key: string;
  position: [number, number, number];
  size: [number, number, number];
  rotation: number;
  wall: string;
  roof: boolean;
  roofHeight: number;
}

const WALLS = ["#f4efe6", "#e9e2d5", "#f7f3ec", "#ded6c7", "#efe7da"];

function buildCity(): Building[] {
  const rnd = makeRandom(20260806);
  const items: Building[] = [];
  const rings = [
    { radius: 1.35, count: 7, base: 0.95 },
    { radius: 2.5, count: 13, base: 0.75 },
    { radius: 3.65, count: 19, base: 0.58 },
    { radius: 4.75, count: 24, base: 0.44 },
  ];

  rings.forEach((ring, ringIndex) => {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 + rnd() * 0.16;
      const radius = ring.radius + (rnd() - 0.5) * 0.42;
      const height = ring.base * (0.62 + rnd() * 0.95);
      const width = 0.42 + rnd() * 0.34;
      const depth = 0.42 + rnd() * 0.34;
      // Hill profile: the island falls away toward the shoreline.
      const ground = Math.max(0, 0.62 - ringIndex * 0.17);

      items.push({
        key: `b-${ringIndex}-${i}`,
        position: [Math.cos(angle) * radius, ground + height / 2, Math.sin(angle) * radius],
        size: [width, height, depth],
        rotation: angle + Math.PI / 2 + (rnd() - 0.5) * 0.5,
        wall: WALLS[Math.floor(rnd() * WALLS.length)] ?? WALLS[0]!,
        roof: rnd() > 0.22,
        roofHeight: 0.14 + rnd() * 0.14,
      });
    }
  });

  return items;
}

function Buildings() {
  const buildings = useMemo(buildCity, []);

  return (
    <group>
      {buildings.map((b) => (
        <group key={b.key} position={b.position} rotation={[0, b.rotation, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial color={b.wall} roughness={0.86} metalness={0.02} />
          </mesh>
          {b.roof && (
            <mesh position={[0, b.size[1] / 2 + b.roofHeight / 2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
              <coneGeometry args={[Math.max(b.size[0], b.size[2]) * 0.79, b.roofHeight, 4]} />
              <meshStandardMaterial color="#b4552f" roughness={0.7} metalness={0.03} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/** The rock the town sits on — two stacked cylinders read as a headland. */
function Island() {
  return (
    <group>
      <mesh position={[0, 0.31, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[3.05, 3.5, 0.62, 48]} />
        <meshStandardMaterial color="#2b2f2c" roughness={0.95} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.12, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[5.5, 5.9, 0.5, 56]} />
        <meshStandardMaterial color="#232724" roughness={0.98} metalness={0.04} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[6.1, 5.2, 0.5, 56]} />
        <meshStandardMaterial color="#171a18" roughness={1} />
      </mesh>
    </group>
  );
}

/** Cascais-style lighthouse with a slowly pulsing gold lamp. */
function Lighthouse() {
  const lamp = useRef<THREE.PointLight>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const pulse = 0.65 + Math.sin(clock.elapsedTime * 1.4) * 0.35;
    if (lamp.current) lamp.current.intensity = 2.4 + pulse * 3.2;
    if (glow.current) {
      const m = glow.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.5 + pulse * 0.45;
    }
  });

  return (
    <group position={[3.75, 0.05, -1.5]}>
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.22, 1.5, 18]} />
        <meshStandardMaterial color="#fbf7f0" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.36, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.1, 18]} />
        <meshStandardMaterial color="#b4552f" roughness={0.6} />
      </mesh>
      <mesh ref={glow} position={[0, 1.53, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color="#f2d79c" transparent opacity={0.85} />
      </mesh>
      <pointLight ref={lamp} position={[0, 1.53, 0]} color="#e6c07a" intensity={4} distance={9} decay={2} />
    </group>
  );
}

/** Dark, slightly rippling Atlantic that catches the gold key light. */
function Water() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const m = mesh.current.material as THREE.MeshStandardMaterial;
    m.roughness = 0.14 + Math.sin(clock.elapsedTime * 0.4) * 0.03;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.78, 0]} receiveShadow>
      <circleGeometry args={[34, 64]} />
      <meshStandardMaterial color="#111c22" roughness={0.18} metalness={0.85} />
    </mesh>
  );
}

const SKY_VERTEX = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vWorld = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAGMENT = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    float h = normalize(vWorld).y * 0.5 + 0.5;
    vec3 sea = vec3(0.035, 0.045, 0.055);
    vec3 glow = vec3(0.620, 0.380, 0.190);
    vec3 warm = vec3(0.300, 0.230, 0.190);
    vec3 high = vec3(0.048, 0.058, 0.078);
    vec3 c = mix(sea, glow, smoothstep(0.34, 0.505, h));
    c = mix(c, warm, smoothstep(0.505, 0.60, h));
    c = mix(c, high, smoothstep(0.60, 0.92, h));
    gl_FragColor = vec4(c, 1.0);
  }
`;

function SkyDome() {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[60, 32, 32]} />
      <shaderMaterial vertexShader={SKY_VERTEX} fragmentShader={SKY_FRAGMENT} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  );
}

/** Slow orbit plus a gentle pointer parallax; both stop when paused. */
function Rig({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (paused) return;

    if (group.current) group.current.rotation.y += delta * 0.055;

    const pointer = state.pointer;
    target.current.x += (pointer.x * 1.3 - target.current.x) * 0.045;
    target.current.y += (pointer.y * 0.5 - target.current.y) * 0.045;

    camera.position.x = target.current.x;
    camera.position.y = 5.2 + target.current.y;
    camera.lookAt(0, 0.35, 0);
  });

  return (
    <group ref={group}>
      <Island />
      <Buildings />
      <Lighthouse />
    </group>
  );
}

export interface HeroSceneProps {
  paused?: boolean;
}

export default function HeroScene({ paused = false }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 5.2, 17.5], fov: 30 }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#2a2018", 22, 52]} />
      <SkyDome />
      <ambientLight intensity={0.5} color="#8fa0ad" />
      <hemisphereLight args={["#c9b48a", "#0d1113", 0.55]} />
      <directionalLight
        position={[7.5, 7, 4.5]}
        intensity={2.6}
        color="#e8bf83"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <directionalLight position={[-8, 3.5, -6]} intensity={1.1} color="#6d8aa6" />
      <Water />
      <Rig paused={paused} />
    </Canvas>
  );
}
