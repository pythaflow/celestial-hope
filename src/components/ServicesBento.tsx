import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Wireframe, RoundedBox } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

function WebGLCube() {
  const mesh = useRef<any>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.pointer.y * 0.5 + state.clock.elapsedTime * 0.2;
      mesh.current.rotation.y = state.pointer.x * 0.5 + state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <RoundedBox ref={mesh} args={[2, 2, 2]} radius={0.1} smoothness={4}>
      <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      <Wireframe fillOpacity={0} strokeOpacity={0.5} stroke="#aa3bff" thickness={0.02} />
    </RoundedBox>
  );
}

function WebGLDataTree() {
  const group = useRef<any>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      group.current.position.y = Math.cos(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Box args={[1, 3, 1]} position={[-1.5, 0, 0]}>
        <meshBasicMaterial color="#333" wireframe />
      </Box>
      <Box args={[1, 2, 1]} position={[0, -0.5, 0]}>
        <meshBasicMaterial color="#444" wireframe />
      </Box>
      <Box args={[1, 4, 1]} position={[1.5, 0.5, 0]}>
        <meshBasicMaterial color="#555" wireframe />
      </Box>
    </group>
  );
}


export default function ServicesBento() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    const cells = gridRef.current.children;

    gsap.fromTo(cells, 
      { 
        y: 150, 
        rotationX: 45, 
        rotationY: -10,
        z: -500,
        opacity: 0 
      },
      {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center center",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-8 max-w-7xl mx-auto relative z-10 bg-[#09090b]">
      <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-12 border-b border-[#2e303a] pb-4">
        01 // Capabilities
      </h2>
      
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px]"
        style={{ perspective: '1000px' }}
      >
        {/* Cell 1 */}
        <div className="col-span-1 md:col-span-8 bg-[#121214] border border-[#2e303a] relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 z-0">
             <Canvas camera={{ position: [0, 0, 5] }}>
               <ambientLight intensity={0.5} />
               <pointLight position={[10, 10, 10]} intensity={2} />
               <WebGLCube />
             </Canvas>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
            <h3 className="text-3xl font-serif mb-2">Web Engineering</h3>
            <p className="text-gray-400 font-sans">High-performance applications built for scale.</p>
          </div>
        </div>

        {/* Cell 2 */}
        <div className="col-span-1 md:col-span-4 bg-[#121214] border border-[#2e303a] relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="p-8 h-full flex flex-col justify-end z-20 relative mix-blend-difference">
            <h3 className="text-2xl font-serif mb-2">AI / ML Solutions</h3>
            <p className="text-gray-400 font-sans text-sm">Automating the impossible.</p>
          </div>
          <div className="absolute inset-0 z-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100">
             <Canvas camera={{ position: [0, 0, 6] }}>
               <WebGLDataTree />
             </Canvas>
          </div>
        </div>

        {/* Cell 3 */}
        <div className="col-span-1 md:col-span-4 bg-[#121214] border border-[#2e303a] relative overflow-hidden flex flex-col justify-between p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
           <div className="w-12 h-12 border border-[#2e303a] flex items-center justify-center rounded-sm">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#aa3bff]">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
             </svg>
           </div>
           <div>
              <h3 className="text-2xl font-serif mb-2">Digital Marketing</h3>
              <p className="text-gray-400 font-sans text-sm">Data-driven growth strategies.</p>
           </div>
        </div>

        {/* Cell 4 */}
        <div className="col-span-1 md:col-span-8 bg-[#121214] border border-[#2e303a] relative overflow-hidden flex flex-col justify-center p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#aa3bff11] to-transparent">
           <h3 className="text-4xl font-serif max-w-md">Business Consultation</h3>
           <p className="text-gray-400 font-sans mt-4 max-w-md">Transforming operational friction into streamlined digital workflows.</p>
        </div>

      </div>
    </section>
  );
}
