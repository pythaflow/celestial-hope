import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    const sections = gsap.utils.toArray('.horizontal-section');
    
    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + scrollWrapperRef.current?.offsetWidth
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="process-journey-wrapper">
      <section ref={containerRef} className="h-screen w-full bg-[#09090b] overflow-hidden flex items-center relative z-20">
        <div className="absolute top-12 left-4 md:left-8 z-30">
           <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              02 // Methodology
           </h2>
        </div>

        <div ref={scrollWrapperRef} className="flex h-full w-[300vw]">
          
          {/* Section 1: Discovery */}
          <div className="horizontal-section w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative overflow-hidden">
            <div className="w-full md:w-1/2 z-10 pr-0 md:pr-12">
              <h3 className="text-5xl md:text-7xl font-serif mb-6 text-[#dc143c]">01. Discovery</h3>
              <p className="text-xl text-gray-400 font-sans max-w-lg">
                We tear down assumptions. Deep-dive into your operational friction, market positioning, and tech debt to find the real problems.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] mt-8 md:mt-0 relative overflow-hidden rounded-sm grayscale contrast-125">
              <div className="absolute inset-0 bg-black/20 z-10" />
              <img 
                src="/images/agency_studio.jpg" 
                alt="Agency Studio" 
                className="w-full h-full object-cover origin-center scale-110"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
          </div>

          {/* Section 2: Architecture */}
          <div className="horizontal-section w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative overflow-hidden">
            <div className="w-full md:w-1/2 z-10 pr-0 md:pr-12">
              <h3 className="text-5xl md:text-7xl font-serif mb-6 text-[#dc143c]">02. Architecture</h3>
              <p className="text-xl text-gray-400 font-sans max-w-lg">
                Precision engineering over duct-tape solutions. We architect resilient systems using cutting-edge stacks that scale effortlessly.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] mt-8 md:mt-0 relative overflow-hidden rounded-sm bg-[#121214] border border-[#2e303a] flex items-center justify-center">
               <div className="font-mono text-xs md:text-sm text-[#aa3bff] opacity-70 whitespace-pre p-8 overflow-hidden">
  {`const Architecture = () => {
    return (
      <System 
         resilience={true} 
         scale="infinite"
         stack={['Rust', 'Go', 'React', 'WebGL']}
      >
        <DataPipeline />
        <MachineLearningModel />
      </System>
    )
  }`}
               </div>
            </div>
          </div>

          {/* Section 3: Deployment */}
          <div className="horizontal-section w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative overflow-hidden">
            <div className="w-full md:w-1/2 z-10 pr-0 md:pr-12">
              <h3 className="text-5xl md:text-7xl font-serif mb-6 text-[#dc143c]">03. Impact</h3>
              <p className="text-xl text-gray-400 font-sans max-w-lg">
                Deployment is just the beginning. We monitor, iterate, and drive continuous growth through data-backed marketing strategies.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] mt-8 md:mt-0 relative overflow-hidden rounded-sm flex items-center justify-center">
               <div className="w-full h-full border border-[#2e303a] bg-[#121214] flex flex-col justify-end p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#aa3bff33] to-transparent" />
                  <div className="relative z-10 flex items-end gap-2 h-32 w-full">
                     {[40, 65, 45, 80, 55, 95, 75, 100].map((height, i) => (
                        <div key={i} className="flex-1 bg-white" style={{ height: `${height}%`, opacity: 0.1 + (i * 0.1) }} />
                     ))}
                  </div>
               </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
