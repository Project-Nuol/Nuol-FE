import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { NUOL_LOGO_SVG } from './nuolLogoTrace';

/**
 * 히어로 3D 레이어.
 * - WaveSurface: 은은한 코발트 와이어프레임 파도면 (임베딩 공간 분위기, 배경)
 * - LogoMark: 너울 심볼을 압출(extrude)한 글로시 3D 로고 (오른쪽 포커스, 글자 없음)
 *
 * ⚠️ 브랜드 가이드 4.5의 "심볼 3D 금지"를 의도적으로 넘어선 연출 — 사용자 승인 하에 진행.
 *    원본은 패스 없는 PNG라, public/brand/logo-symbol.png 를 potrace로 벡터화한
 *    public/brand/logo-trace.svg 를 SVGLoader로 읽어 실제 로고 실루엣 그대로 입체화한다.
 *    (재생성: `node trace-logo.cjs`)
 */

function WaveSurface({ reduced }: { reduced: boolean }) {
  const geo = useMemo(() => new THREE.PlaneGeometry(18, 10, 48, 28), []);
  const base = useMemo(
    () => Float32Array.from(geo.attributes.position.array as Float32Array),
    [geo],
  );

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const z =
        Math.sin(x * 0.55 + t * 0.7) * 0.5 +
        Math.cos(y * 0.7 + t * 0.5) * 0.35 +
        Math.sin((x + y) * 0.35 + t * 0.9) * 0.18;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh geometry={geo} rotation={[-1.0, 0, 0]} position={[-1, -1.6, -3]}>
      <meshBasicMaterial color="#2d6be5" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

/** 너울 심볼 — 벡터화한 로고 실루엣을 압출한 글로시 3D 마크. */
function LogoMark({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const rot = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const data = new SVGLoader().parse(NUOL_LOGO_SVG);
    const shapes: THREE.Shape[] = [];
    data.paths.forEach((p) => {
      SVGLoader.createShapes(p).forEach((s) => shapes.push(s));
    });
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 26,
      bevelEnabled: true,
      bevelThickness: 7,
      bevelSize: 5,
      bevelSegments: 5,
      curveSegments: 26,
    });
    geo.center();
    geo.scale(1, -1, 1); // SVG는 y축이 아래로 → 뒤집어 정방향
    geo.computeVertexNormals();
    return geo;
  }, []);

  // 로고 높이(256px) 기준으로 월드 크기 정규화
  const scale = 2.4 / 256;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const baseY = reduced ? 0.35 : Math.sin(t * 0.45) * 0.4 + 0.1;
    const baseX = reduced ? -0.12 : Math.sin(t * 0.6) * 0.1 - 0.05;
    const targetY = baseY + pointer.x * 0.45;
    const targetX = baseX - pointer.y * 0.28;
    rot.current.y += (targetY - rot.current.y) * 0.06;
    rot.current.x += (targetX - rot.current.x) * 0.06;
    g.rotation.y = rot.current.y;
    g.rotation.x = rot.current.x;
    g.position.y = 0.1 + (reduced ? 0 : Math.sin(t * 0.8) * 0.08);
  });

  return (
    <group ref={group} position={[2.5, 0.1, 0]} scale={scale}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#4f8df5"
          emissive="#2d6be5"
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.16}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function HeroWave3D() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* 글로시 심볼을 위한 라이팅 — 키/필/림 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[-3, 4, 5]} intensity={2.4} color="#dbe8ff" />
      <directionalLight position={[4, -1, 3]} intensity={1.3} color="#4f8df5" />
      <directionalLight position={[2, 3, -4]} intensity={1.6} color="#9cc0fb" />
      <WaveSurface reduced={reduced} />
      <LogoMark reduced={reduced} />
    </Canvas>
  );
}
