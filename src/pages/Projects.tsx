import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import TiltCard from '../components/TiltCard';

const projectCategories = ["All", "E-Commerce", "FinTech", "Web3", "Enterprise"];

const projects = [
  {
    id: 1,
    title: "AuraTech Global",
    category: "Enterprise",
    shortDesc: "Complete digital transformation and modernization of legacy systems.",
    image: "/images/agency_studio.jpg",
    logo: "A",
    insights: "AuraTech was struggling with 15-year-old monolithic architecture causing massive operational delays.",
    tech: ["Go", "React", "PostgreSQL", "AWS"],
    impact: "Reduced operational latency by 85% and increased throughput by 3x within 6 months."
  },
  {
    id: 2,
    title: "Nexify Payments",
    category: "FinTech",
    shortDesc: "High-frequency transaction dashboard and API gateway.",
    image: "/images/agency_studio.jpg",
    logo: "N",
    insights: "Needed a highly secure, real-time dashboard for B2B payment tracking.",
    tech: ["Rust", "Next.js", "WebSockets", "Redis"],
    impact: "Processed $2B+ in transactions with 99.999% uptime in the first year."
  },
  {
    id: 3,
    title: "Vertex Market",
    category: "Web3",
    shortDesc: "Decentralized NFT marketplace with custom smart contracts.",
    image: "/images/agency_studio.jpg",
    logo: "V",
    insights: "Required a zero-gas fee layer 2 solution for fast trading.",
    tech: ["Solidity", "Ethers.js", "Node.js", "Tailwind CSS"],
    impact: "Attracted 50k+ active traders in week one, saving $5M in gas fees."
  },
  {
    id: 4,
    title: "OmniStore Headless",
    category: "E-Commerce",
    shortDesc: "Headless Shopify migration for a massive retail brand.",
    image: "/images/agency_studio.jpg",
    logo: "O",
    insights: "The monolithic Shopify liquid theme was too slow for their mobile traffic.",
    tech: ["Hydrogen", "React", "Shopify Storefront API"],
    impact: "Increased mobile conversion rates by 42% and decreased bounce rate by 30%."
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProject && modalRef.current) {
      const lenis = new Lenis({
        wrapper: modalRef.current,
        content: modalRef.current.firstElementChild as HTMLElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      let animationFrameId: number;
      function raf(time: number) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }
      animationFrameId = requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [selectedProject]);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen pb-32 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        
        <h1 className="text-5xl md:text-7xl font-serif text-[#dc143c] uppercase tracking-wider mb-8 text-center">Selected Works</h1>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center">
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-mono tracking-wider transition-all duration-300 backdrop-blur-md ${
                activeCategory === cat 
                  ? 'bg-[#dc143c] text-white border-transparent shadow-[0_0_15px_rgba(220,20,60,0.5)]' 
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
               <TiltCard 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer w-full h-full"
                >
                  <div className="relative overflow-hidden bg-[#121214] border border-[#2e303a] h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div className="aspect-[4/3] overflow-hidden relative">
                     <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                     <img src={project.image} alt={project.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                     <div className="absolute top-6 left-6 z-20 w-12 h-12 bg-black text-[#dc143c] font-serif flex items-center justify-center text-xl border border-[#2e303a]">
                        {project.logo}
                     </div>
                  </div>
                  <div className="p-8 border-t border-[#2e303a]">
                     <span className="text-xs font-mono text-[#dc143c] mb-2 block uppercase tracking-widest">{project.category}</span>
                     <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-[#dc143c] transition-colors">{project.title}</h3>
                     <p className="text-gray-400 font-sans">{project.shortDesc}</p>
                  </div>
                  </div>
               </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#09090b] overflow-y-auto"
            data-lenis-prevent="true"
          >
             <div>
               <div className="sticky top-0 w-full flex justify-end p-6 z-50">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-12 h-12 rounded-full border border-[#2e303a] flex items-center justify-center bg-[#121214] hover:border-[#dc143c] hover:bg-[#dc143c] text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
             </div>
             
             <div className="max-w-5xl mx-auto px-4 md:px-8 pb-32 w-full mt-[-80px]">
                {/* Header */}
                <div className="flex items-center gap-6 mb-8 pt-20">
                   <div className="w-20 h-20 bg-[#121214] text-[#dc143c] font-serif flex items-center justify-center text-4xl border border-[#2e303a]">
                      {selectedProject.logo}
                   </div>
                   <div>
                      <span className="text-sm font-mono text-gray-500 block uppercase tracking-widest mb-1">{selectedProject.category}</span>
                      <h2 className="text-5xl md:text-7xl font-serif text-[#dc143c]">{selectedProject.title}</h2>
                   </div>
                </div>

                {/* Banner */}
                <div className="w-full aspect-[21/9] border border-[#2e303a] mb-16 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                   <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-700" />
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                   <div className="col-span-1 md:col-span-2">
                      <h3 className="text-3xl font-serif mb-6 text-[#dc143c] border-b border-[#2e303a] pb-4">Project Insights</h3>
                      <p className="text-gray-300 text-lg leading-relaxed font-sans mb-12">
                        {selectedProject.insights}
                      </p>
                      
                      <h3 className="text-3xl font-serif mb-6 text-[#dc143c] border-b border-[#2e303a] pb-4">The Impact</h3>
                      <p className="text-gray-300 text-lg leading-relaxed font-sans">
                        {selectedProject.impact}
                      </p>
                   </div>
                   
                   <div className="col-span-1">
                      <div className="bg-[#121214] border border-[#2e303a] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                         <h4 className="text-xl font-serif mb-6 text-white">Key Technologies</h4>
                         <ul className="flex flex-col gap-4">
                            {selectedProject.tech.map((t: string) => (
                               <li key={t} className="flex items-center gap-3 text-gray-400 font-mono text-sm">
                                  <span className="w-2 h-2 bg-[#dc143c]" />
                                  {t}
                               </li>
                            ))}
                         </ul>
                      </div>
                      
                      <button className="mt-8 bg-[#dc143c] text-white px-8 py-4 uppercase font-mono tracking-widest hover:bg-white hover:text-black transition-colors w-full text-center shadow-[0_0_15px_rgba(220,20,60,0.5)]">
                         Launch Website
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
