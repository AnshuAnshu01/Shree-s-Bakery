import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Rotate3d, 
  SunMedium, 
  Sparkles, 
  Palette, 
  Layers, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag, 
  Lightbulb,
  Heart
} from 'lucide-react';
import { Studio3DConfig } from '../types/bakery';
import { LOGO_IMAGE_PATH } from './BakeryLogo';
import { useTheme } from '../context/ThemeContext';
import { getStoredSectionCakes, SectionCakeItem } from '../utils/storage';

interface Cake3DStudioProps {
  onSelectForOrder?: (config: { tiers: number; color: string; colorName: string; topper: string; flavor: string }) => void;
  onOpenOrderModal?: () => void;
}

const COLOR_PRESETS = [
  { name: 'Rich Dark Chocolate', hex: '#2c150c', roughness: 0.35, metalness: 0.08, flavor: 'Belgian Chocolate Truffle' },
  { name: 'Royal Velvet Burgundy', hex: '#54101e', roughness: 0.4, metalness: 0.12, flavor: 'Red Velvet Royale' },
  { name: 'Golden Buttercream', hex: '#f7e7c4', roughness: 0.45, metalness: 0.05, flavor: 'Classic Vanilla Gold' },
  { name: 'Strawberry Rose', hex: '#e8788a', roughness: 0.38, metalness: 0.05, flavor: 'Fresh Strawberry Infusion' },
  { name: 'Midnight Truffle Glaze', hex: '#160a06', roughness: 0.15, metalness: 0.3, flavor: 'Dark Dutch Truffle' },
  { name: 'Pistachio Mint Delight', hex: '#7ca88a', roughness: 0.42, metalness: 0.05, flavor: 'Pistachio Almond Bliss' }
];

const LIGHT_PRESETS: { id: Studio3DConfig['lightingPreset']; label: string; keyColor: string; hemiSky: string; hemiGround: string; intensity: number }[] = [
  { id: 'warm-bakery', label: 'Bakery Warmth', keyColor: '#ffd79e', hemiSky: '#ffeed6', hemiGround: '#3d1c06', intensity: 2.2 },
  { id: 'studio-luxury', label: 'Luxury Studio', keyColor: '#ffffff', hemiSky: '#e8f0fe', hemiGround: '#1a0e08', intensity: 2.0 },
  { id: 'candlelight', label: 'Candlelight', keyColor: '#ffaa44', hemiSky: '#ff8833', hemiGround: '#220800', intensity: 2.6 },
  { id: 'sunset-glow', label: 'Sunset Amber', keyColor: '#ff7733', hemiSky: '#ffaa66', hemiGround: '#3b120c', intensity: 2.4 },
  { id: 'party-neon', label: 'Celebration Neon', keyColor: '#f43f5e', hemiSky: '#8b5cf6', hemiGround: '#1e1b4b', intensity: 2.5 }
];

export const Cake3DStudio: React.FC<Cake3DStudioProps> = ({
  onSelectForOrder,
  onOpenOrderModal
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'tiers' | 'colors' | 'toppings' | 'lighting'>('tiers');

  const [tiers, setTiers] = useState<number>(2);
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [selectedTopping, setSelectedTopping] = useState<Studio3DConfig['topping']>('strawberries');
  const [lightingPreset, setLightingPreset] = useState<Studio3DConfig['lightingPreset']>('warm-bakery');
  const [shadowsEnabled, setShadowsEnabled] = useState<boolean>(true);
  const [explodedView, setExplodedView] = useState<number>(0);
  const [lightAngle, setLightAngle] = useState<number>(45);
  const { isLight } = useTheme();
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const [sliderCakes, setSliderCakes] = useState<SectionCakeItem[]>(() =>
    getStoredSectionCakes().filter(c => c.section === 'gallery')
  );

  useEffect(() => {
    const handleUpdate = () => {
      setSliderCakes(getStoredSectionCakes().filter(c => c.section === 'gallery'));
    };
    window.addEventListener('shrees_cakes_updated', handleUpdate);
    return () => window.removeEventListener('shrees_cakes_updated', handleUpdate);
  }, []);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cakeGroupRef = useRef<THREE.Group | null>(null);
  const tier1MeshRef = useRef<THREE.Mesh | null>(null);
  const tier2MeshRef = useRef<THREE.Group | null>(null);
  const tier3MeshRef = useRef<THREE.Group | null>(null);
  const toppersGroupRef = useRef<THREE.Group | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param) || '');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x140703);
    scene.fog = new THREE.FogExp2(0x140703, 0.045);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 3.8, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    try {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    } catch (e) {
      console.warn('RoomEnvironment fallback', e);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 10;
    controls.target.set(0, 1.2, 0);

    const hemiLight = new THREE.HemisphereLight(0xffeed6, 0x3d1c06, 1.2);
    hemiLightRef.current = hemiLight;
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffd79e, 2.2);
    keyLight.position.set(4, 7, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 18;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3.5;
    keyLight.shadow.camera.bottom = -1;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.02;
    keyLightRef.current = keyLight;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffecb3, 1.0);
    rimLight.position.set(-4, 5, -5);
    scene.add(rimLight);

    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x100502,
      roughness: 0.8,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    const standGroup = new THREE.Group();
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.22,
    });

    const standBaseGeo = new THREE.CylinderGeometry(1.4, 1.7, 0.18, 36);
    const standBase = new THREE.Mesh(standBaseGeo, standMat);
    standBase.position.y = 0.09;
    standBase.castShadow = true;
    standBase.receiveShadow = true;
    standGroup.add(standBase);

    const standStemGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.5, 24);
    const standStem = new THREE.Mesh(standStemGeo, standMat);
    standStem.position.y = 0.38;
    standStem.castShadow = true;
    standGroup.add(standStem);

    const plateGeo = new THREE.CylinderGeometry(2.35, 2.25, 0.1, 48);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x1f110a,
      roughness: 0.3,
      metalness: 0.3
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = 0.65;
    plate.castShadow = true;
    plate.receiveShadow = true;
    standGroup.add(plate);

    const rimGeo = new THREE.TorusGeometry(2.32, 0.05, 16, 48);
    const rim = new THREE.Mesh(rimGeo, standMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.7;
    standGroup.add(rim);

    scene.add(standGroup);

    const cakeGroup = new THREE.Group();
    cakeGroupRef.current = cakeGroup;
    cakeGroup.position.y = 0.7;
    scene.add(cakeGroup);

    buildProceduralCake();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let reqId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && cakeGroupRef.current) {
        cakeGroupRef.current.rotation.y += delta * 0.4;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  const buildProceduralCake = () => {
    if (!cakeGroupRef.current) return;
    const group = cakeGroupRef.current;

    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    const cakeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor.hex),
      roughness: selectedColor.roughness,
      metalness: selectedColor.metalness
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18
    });

    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xfffaea,
      roughness: 0.45,
      metalness: 0.05
    });

    const createRosetteRing = (radius: number, yPos: number, count: number, size = 0.065, mat = creamMat) => {
      const ringGroup = new THREE.Group();
      const beadGeo = new THREE.SphereGeometry(size, 10, 10);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const bead = new THREE.Mesh(beadGeo, mat);
        bead.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
        bead.castShadow = true;
        ringGroup.add(bead);
      }
      return ringGroup;
    };

    // Tier 1
    const tier1Group = new THREE.Group();
    const t1Geo = new THREE.CylinderGeometry(1.8, 1.8, 0.85, 48);
    const t1Mesh = new THREE.Mesh(t1Geo, cakeMat);
    t1Mesh.position.y = 0.85 / 2;
    t1Mesh.castShadow = true;
    t1Mesh.receiveShadow = true;
    tier1Group.add(t1Mesh);
    tier1MeshRef.current = t1Mesh;

    tier1Group.add(createRosetteRing(1.82, 0.06, 36, 0.07, creamMat));
    tier1Group.add(createRosetteRing(1.78, 0.84, 32, 0.05, goldMat));
    group.add(tier1Group);

    let currentY = 0.85;

    // Tier 2
    if (tiers >= 2) {
      const tier2Group = new THREE.Group();
      tier2MeshRef.current = tier2Group;

      const t2Geo = new THREE.CylinderGeometry(1.25, 1.25, 0.75, 40);
      const t2Mesh = new THREE.Mesh(t2Geo, cakeMat);
      t2Mesh.position.y = 0.75 / 2;
      t2Mesh.castShadow = true;
      t2Mesh.receiveShadow = true;
      tier2Group.add(t2Mesh);

      tier2Group.add(createRosetteRing(1.27, 0.05, 26, 0.06, creamMat));
      tier2Group.add(createRosetteRing(1.23, 0.74, 24, 0.045, goldMat));

      tier2Group.position.y = currentY + explodedView * 0.45;
      group.add(tier2Group);

      currentY += 0.75;
    } else {
      tier2MeshRef.current = null;
    }

    // Tier 3
    if (tiers >= 3) {
      const tier3Group = new THREE.Group();
      tier3MeshRef.current = tier3Group;

      const t3Geo = new THREE.CylinderGeometry(0.75, 0.75, 0.65, 36);
      const t3Mesh = new THREE.Mesh(t3Geo, cakeMat);
      t3Mesh.position.y = 0.65 / 2;
      t3Mesh.castShadow = true;
      t3Mesh.receiveShadow = true;
      tier3Group.add(t3Mesh);

      tier3Group.add(createRosetteRing(0.77, 0.04, 18, 0.05, creamMat));
      tier3Group.add(createRosetteRing(0.74, 0.64, 16, 0.04, goldMat));

      tier3Group.position.y = currentY + (explodedView * 0.9);
      group.add(tier3Group);

      currentY += 0.65;
    } else {
      tier3MeshRef.current = null;
    }

    // Topper
    const topperGroup = new THREE.Group();
    toppersGroupRef.current = topperGroup;
    const topY = currentY + (tiers === 3 ? explodedView * 0.9 : tiers === 2 ? explodedView * 0.45 : 0);
    topperGroup.position.y = topY;

    if (selectedTopping === 'strawberries') {
      const count = 5;
      for (let i = 0; i < count; i++) {
        const sGroup = new THREE.Group();
        const sAngle = (i / count) * Math.PI * 2;
        const sRad = tiers === 3 ? 0.35 : tiers === 2 ? 0.6 : 0.85;

        const strawGeo = new THREE.ConeGeometry(0.12, 0.22, 16);
        const strawMat = new THREE.MeshStandardMaterial({ color: 0xdd1834, roughness: 0.18, metalness: 0.1 });
        const berry = new THREE.Mesh(strawGeo, strawMat);
        berry.rotation.x = Math.PI;
        berry.position.y = 0.11;
        berry.castShadow = true;
        sGroup.add(berry);

        sGroup.position.set(Math.cos(sAngle) * sRad, 0.02, Math.sin(sAngle) * sRad);
        topperGroup.add(sGroup);
      }
      const centerBerry = new THREE.Mesh(
        new THREE.ConeGeometry(0.16, 0.28, 16),
        new THREE.MeshStandardMaterial({ color: 0xcc112b, roughness: 0.16, metalness: 0.1 })
      );
      centerBerry.rotation.x = Math.PI;
      centerBerry.position.y = 0.14;
      centerBerry.castShadow = true;
      topperGroup.add(centerBerry);
    } else if (selectedTopping === 'candle') {
      const candle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.55, 16),
        new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.2 })
      );
      candle.position.y = 0.28;
      candle.castShadow = true;
      topperGroup.add(candle);

      const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffaa00 })
      );
      flame.scale.set(1, 2.2, 1);
      flame.position.y = 0.68;
      topperGroup.add(flame);
    } else {
      const crownMat = new THREE.MeshStandardMaterial({ color: 0xf3c85a, roughness: 0.15, metalness: 0.95 });
      const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.12, 24), crownMat);
      crownBase.position.y = 0.08;
      topperGroup.add(crownBase);
    }

    group.add(topperGroup);
  };

  useEffect(() => {
    buildProceduralCake();
  }, [tiers, selectedColor, selectedTopping]);

  useEffect(() => {
    if (tier2MeshRef.current) {
      tier2MeshRef.current.position.y = 0.85 + explodedView * 0.45;
    }
    if (tier3MeshRef.current) {
      tier3MeshRef.current.position.y = 0.85 + 0.75 + explodedView * 0.9;
    }
    if (toppersGroupRef.current) {
      const baseY = tiers === 3 ? (0.85 + 0.75 + 0.65) : tiers === 2 ? (0.85 + 0.75) : 0.85;
      const extraY = tiers === 3 ? explodedView * 0.9 : tiers === 2 ? explodedView * 0.45 : 0;
      toppersGroupRef.current.position.y = baseY + extraY;
    }
  }, [explodedView, tiers]);

  useEffect(() => {
    const preset = LIGHT_PRESETS.find(p => p.id === lightingPreset);
    if (!preset || !keyLightRef.current || !hemiLightRef.current) return;

    keyLightRef.current.color.set(preset.keyColor);
    keyLightRef.current.intensity = preset.intensity;
    hemiLightRef.current.color.set(preset.hemiSky);
    hemiLightRef.current.groundColor.set(preset.hemiGround);
  }, [lightingPreset]);

  useEffect(() => {
    if (!keyLightRef.current) return;
    const rad = (lightAngle * Math.PI) / 180;
    const distance = 5.5;
    keyLightRef.current.position.x = Math.cos(rad) * distance;
    keyLightRef.current.position.z = Math.sin(rad) * distance;
    keyLightRef.current.position.y = 6.8;
  }, [lightAngle]);

  useEffect(() => {
    if (keyLightRef.current) {
      keyLightRef.current.castShadow = shadowsEnabled;
    }
  }, [shadowsEnabled]);

  useEffect(() => {
    if (!sceneRef.current) return;
    const bgColor = isLight ? 0xf5ece1 : 0x140703;
    sceneRef.current.background = new THREE.Color(bgColor);
    sceneRef.current.fog = new THREE.FogExp2(bgColor, 0.045);
  }, [isLight]);

  const handleOrderCustomDesign = () => {
    if (onSelectForOrder) {
      onSelectForOrder({
        tiers,
        color: selectedColor.hex,
        colorName: selectedColor.name,
        topper: selectedTopping,
        flavor: selectedColor.flavor
      });
    }
    // Directly opens floating modal without redirecting
    if (onOpenOrderModal) {
      onOpenOrderModal();
    }
  };

  return (
    <>
      <section id="3d-studio" className="relative min-h-screen py-16 sm:py-24 px-3 sm:px-6 md:px-8 bg-gradient-to-b from-[#140703] via-[#1c0c05] to-[#140703] border-b border-[#d4af37]/20 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Hero Header with Brand Logo & Heart-Touching Line */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center mb-3">
            <img
              src={LOGO_IMAGE_PATH}
              alt="Shree's Bakery"
              className="w-16 h-16 object-cover rounded-full border border-[#d4af37]/50 shadow-lg bg-[#140703]"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a1309] border border-[#d4af37]/30 text-[#fce293] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Sculpted in 3D Real-Time</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-[#fbf6ee] mb-3">
            Touch, Spin, & Shape the Cake <span className="text-gold-gradient italic">Your Heart Envisions</span>
          </h2>

          <p className="font-script text-xl md:text-2xl text-[#fce293] mb-2">
            “Because your dream celebration deserves an unforgettable centerpiece.”
          </p>

          <p className="text-xs sm:text-sm text-[#d4c3b1] max-w-xl mx-auto font-light">
            Drag to rotate 360°, watch real-time lighting dance across tiers, and test delicious flavor palettes before we bake.
          </p>
        </div>

        {/* 3D Viewport Box */}
        <div className={`relative w-full rounded-3xl overflow-hidden border shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-colors ${
          isLight ? 'border-[#d4af37]/50 bg-[#f5ece1]' : 'border-[#d4af37]/35 bg-[#100502]'
        }`}>
          {/* Top HUD Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium flex items-center gap-1.5 shadow-lg border ${
              isLight
                ? 'bg-white/95 text-[#241107] border-[#d4af37]/50'
                : 'bg-[#180803]/90 text-[#fbf6ee] border-[#d4af37]/30'
            }`}>
              <Rotate3d className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden xs:inline">Drag to</span> Rotate 360°
            </span>
          </div>

          {/* Top-Right Quick Toggles */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all shadow-md cursor-pointer ${
                autoRotate
                  ? 'bg-[#d4af37] text-[#140703] font-bold'
                  : isLight
                  ? 'bg-white/90 text-[#542d17] border border-[#d4af37]/40'
                  : 'bg-[#220d06]/90 text-[#e5d2bc] border border-[#d4af37]/30'
              }`}
            >
              <Rotate3d className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{autoRotate ? 'Spin' : 'Manual'}</span>
            </button>
            <button
              onClick={() => setShadowsEnabled(!shadowsEnabled)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all shadow-md cursor-pointer ${
                shadowsEnabled
                  ? isLight
                    ? 'bg-[#eedcc8] text-[#8a4e0c] border border-[#d4af37]/60 font-bold'
                    : 'bg-[#3b1b0e] text-[#fce293] border border-[#d4af37]/50'
                  : isLight
                  ? 'bg-white/80 text-[#6b4226] border border-[#d4af37]/30'
                  : 'bg-[#1a0904]/80 text-[#9e8a78] border border-white/10'
              }`}
            >
              <SunMedium className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37]" />
              <span>{shadowsEnabled ? 'Shadows' : 'Off'}</span>
            </button>
          </div>

          {/* WebGL Canvas */}
          <div
            ref={mountRef}
            className="w-full h-[380px] sm:h-[450px] md:h-[550px] cursor-grab active:cursor-grabbing focus:outline-none"
          />

          {/* Collapsible Unified Bottom Control Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-3 z-20 pointer-events-auto">
            <div className="flex justify-center -mb-1">
              <button
                onClick={() => setControlsCollapsed(!controlsCollapsed)}
                className={`border-t border-x px-4 py-1 rounded-t-xl text-xs font-semibold flex items-center gap-1 shadow-lg cursor-pointer transition-colors ${
                  isLight
                    ? 'bg-[#f7efe4] text-[#8a4e0c] border-[#d4af37]/50'
                    : 'bg-[#200e07] text-[#fce293] border-[#d4af37]/40'
                }`}
              >
                {controlsCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Customize Cake</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Hide Controls</span>
                  </>
                )}
              </button>
            </div>

            {!controlsCollapsed && (
              <div className={`border rounded-2xl shadow-2xl p-3 md:p-4 backdrop-blur-md transition-colors ${
                isLight
                  ? 'bg-[#fffdfa]/95 border-[#d4af37]/50 text-[#241107]'
                  : 'bg-[#180803]/95 border-[#d4af37]/40 text-[#fbf6ee]'
              }`}>
                <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b pb-2 mb-3 gap-2 ${
                  isLight ? 'border-[#d4af37]/30' : 'border-[#d4af37]/20'
                }`}>
                  <div className="flex items-center justify-between sm:justify-start gap-1.5 md:gap-2">
                    <button
                      onClick={() => setActiveTab('tiers')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'tiers'
                          ? 'bg-[#d4af37] text-[#140703] font-bold shadow'
                          : isLight
                          ? 'bg-[#eedcc8] text-[#4d2a13] hover:bg-[#e4cbaf]'
                          : 'bg-[#241006] text-[#e0cfbb]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Tiers
                    </button>
                    <button
                      onClick={() => setActiveTab('colors')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'colors'
                          ? 'bg-[#d4af37] text-[#140703] font-bold shadow'
                          : isLight
                          ? 'bg-[#eedcc8] text-[#4d2a13] hover:bg-[#e4cbaf]'
                          : 'bg-[#241006] text-[#e0cfbb]'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5" />
                      Flavors
                    </button>
                    <button
                      onClick={() => setActiveTab('lighting')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'lighting'
                          ? 'bg-[#d4af37] text-[#140703] font-bold shadow'
                          : isLight
                          ? 'bg-[#eedcc8] text-[#4d2a13] hover:bg-[#e4cbaf]'
                          : 'bg-[#241006] text-[#e0cfbb]'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      Lighting
                    </button>
                  </div>

                  {/* Opens Floating Form Modal directly without redirecting */}
                  <button
                    onClick={handleOrderCustomDesign}
                    className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#d4af37] to-[#c59129] text-[#140703] font-bold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Book 3D Design</span>
                  </button>
                </div>

                {activeTab === 'tiers' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <span className={`text-xs font-semibold block mb-2 ${
                        isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                      }`}>Cake Tiers</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map(t => (
                          <button
                            key={t}
                            onClick={() => setTiers(t)}
                            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              tiers === t
                                ? isLight
                                  ? 'bg-[#d4af37] text-[#140703] border-[#b88616] shadow'
                                  : 'bg-[#3b1a0e] text-[#fce293] border-[#d4af37]'
                                : isLight
                                ? 'bg-[#f7efe4] text-[#5a341e] border-[#d4af37]/35 hover:bg-[#eedcc8]'
                                : 'bg-[#180903] text-[#b8a490] border-white/5'
                            }`}
                          >
                            {t === 1 ? '1 Tier' : t === 2 ? '2 Tiers' : '3 Tiers'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className={`flex items-center justify-between mb-1.5 text-xs ${
                        isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                      }`}>
                        <span className="flex items-center gap-1">
                          <Sliders className="w-3 h-3 text-[#d4af37]" />
                          Exploded Layer View
                        </span>
                        <span className="font-bold">{Math.round(explodedView * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={explodedView}
                        onChange={(e) => setExplodedView(parseFloat(e.target.value))}
                        className={`w-full accent-[#d4af37] h-2 rounded-lg cursor-pointer ${
                          isLight ? 'bg-[#e7d5be]' : 'bg-[#220d06]'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'colors' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setSelectedColor(preset)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedColor.name === preset.name
                            ? isLight
                              ? 'bg-[#eedcc8] border-[#b88616] shadow-sm'
                              : 'bg-[#301408] border-[#d4af37]'
                            : isLight
                            ? 'bg-[#f7efe4] border-[#d4af37]/25 hover:bg-[#eedcc8]'
                            : 'bg-[#180903] border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-3 h-3 rounded-full shrink-0 border border-black/20" style={{ backgroundColor: preset.hex }} />
                          <span className={`text-[11px] font-bold truncate ${
                            isLight ? 'text-[#241107]' : 'text-white'
                          }`}>{preset.name}</span>
                        </div>
                        <span className={`text-[10px] block truncate font-medium ${
                          isLight ? 'text-[#8a4e0c]' : 'text-[#d4af37]'
                        }`}>{preset.flavor}</span>
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === 'lighting' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="grid grid-cols-3 gap-1.5">
                      {LIGHT_PRESETS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setLightingPreset(p.id)}
                          className={`py-1.5 px-2 rounded-md text-[11px] font-semibold border cursor-pointer ${
                            lightingPreset === p.id
                              ? isLight
                                ? 'bg-[#d4af37] text-[#140703] border-[#b88616] font-bold shadow'
                                : 'bg-[#3b1a0e] text-[#fce293] border-[#d4af37]'
                              : isLight
                              ? 'bg-[#f7efe4] text-[#5a341e] border-[#d4af37]/30 hover:bg-[#eedcc8]'
                              : 'bg-[#180903] text-[#b8a490] border-white/5'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                    <div>
                      <span className={`text-xs block mb-1 font-semibold ${
                        isLight ? 'text-[#8a4e0c]' : 'text-[#fce293]'
                      }`}>
                        Rotate Light Angle ({lightAngle}°)
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={lightAngle}
                        onChange={(e) => setLightAngle(parseInt(e.target.value))}
                        className={`w-full accent-[#d4af37] h-2 rounded-lg cursor-pointer ${
                          isLight ? 'bg-[#e7d5be]' : 'bg-[#220d06]'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Real Handcrafted Cakes Showcase - Continuous Left-to-Right Moving Carousel */}
    <section className={`py-16 sm:py-20 border-t overflow-hidden relative transition-colors ${
      isLight ? 'bg-[#faf5ee] border-[#d4af37]/30 text-[#241107]' : 'bg-[#100502] border-[#d4af37]/25 text-[#fbf6ee]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-3 ${
          isLight ? 'bg-[#eedbc4] border-[#d4af37]/50 text-[#855325]' : 'bg-[#2a1309] border-[#d4af37]/30 text-[#fce293]'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Real Custom Creations</span>
        </div>
        <h3 className={`text-2xl sm:text-4xl font-serif-luxury font-bold mb-2 ${
          isLight ? 'text-[#241107]' : 'text-white'
        }`}>
          Real Handcrafted <span className="text-gold-gradient italic">Cake Masterpieces</span>
        </h3>
        <p className={`text-xs sm:text-sm font-light max-w-xl mx-auto ${
          isLight ? 'text-[#6b4226]' : 'text-[#ded0be]'
        }`}>
          Continuously moving showcase of our real homemade cakes. Hover or tap to pause, and tap any cake to book it fresh!
        </p>
      </div>

      {/* Infinite Left-to-Right Continuous Moving Carousel */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Soft edge shadow gradients */}
        <div className={`absolute top-0 bottom-0 left-0 w-8 sm:w-20 z-10 pointer-events-none bg-gradient-to-r ${
          isLight ? 'from-[#faf5ee] to-transparent' : 'from-[#100502] to-transparent'
        }`} />
        <div className={`absolute top-0 bottom-0 right-0 w-8 sm:w-20 z-10 pointer-events-none bg-gradient-to-l ${
          isLight ? 'from-[#faf5ee] to-transparent' : 'from-[#100502] to-transparent'
        }`} />

        <div className="animate-marquee-left-to-right flex gap-4 sm:gap-6">
          {/* Double array so the marquee seamlessly repeats without empty seams */}
          {[...sliderCakes, ...sliderCakes].map((cake, idx) => (
            <div
              key={`marquee-${cake.id}-${idx}`}
              onClick={() => {
                if (onSelectForOrder) {
                  onSelectForOrder({
                    tiers: cake.title.includes('Tier') ? 2 : 1,
                    color: '#d4af37',
                    colorName: 'Custom Artisanal',
                    topper: 'custom',
                    flavor: cake.title
                  });
                }
                if (onOpenOrderModal) {
                  onOpenOrderModal();
                }
              }}
              className={`w-64 sm:w-72 shrink-0 rounded-2xl border-2 p-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer shadow-lg group ${
                isLight
                  ? 'bg-[#fffdfa] border-[#e7d5be] hover:border-[#d4af37] shadow-[0_8px_20px_rgba(180,140,80,0.12)]'
                  : 'bg-[#1c0c05] border-[#381a0e] hover:border-[#d4af37] shadow-[0_10px_25px_rgba(0,0,0,0.8)]'
              }`}
            >
              {/* Frame created according to the cake image without cutting */}
              <div className={`h-64 sm:h-72 rounded-xl overflow-hidden mb-3 relative flex items-center justify-center p-2.5 transition-colors border ${
                isLight ? 'bg-[#fbf7f0] border-[#e7d5be]' : 'bg-[#120502] border-[#381a0e]'
              }`}>
                <img
                  src={cake.image}
                  alt={cake.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className={`absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow z-10 ${
                  isLight ? 'bg-white/95 text-[#8a4e0c] border-[#d4af37]/40' : 'bg-black/85 text-[#fce293] border-[#d4af37]/30'
                }`}>
                  {cake.price}
                </div>
              </div>

              <h4 className={`text-sm font-serif-luxury font-bold truncate mb-1 ${
                isLight ? 'text-[#241107] group-hover:text-[#8a4e0c]' : 'text-[#fbf6ee] group-hover:text-[#fce293]'
              }`}>
                {cake.title}
              </h4>
              <p className={`text-[11px] font-script truncate ${
                isLight ? 'text-[#8a4e0c]' : 'text-[#d4af37]'
              }`}>
                {cake.tagline}
              </p>

              <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[11px] font-semibold ${
                isLight ? 'border-[#e7d5be] text-[#8a4e0c]' : 'border-white/10 text-[#fce293]'
              }`}>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#e11d48] fill-[#e11d48]" />
                  <span>Homemade</span>
                </span>
                <span className="underline underline-offset-2">Book Cake →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};
