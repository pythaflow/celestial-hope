import { useRef, useEffect } from 'react';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import ProcessJourney from '../components/ProcessJourney';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let isHovered = false;
    let scrollSpeed = 0.5;

    const scroll = () => {
      if (!isHovered) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => isHovered = true;
    const handleMouseLeave = () => isHovered = false;

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleMouseEnter, { passive: true });
    scrollContainer.addEventListener('touchend', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('touchstart', handleMouseEnter);
      scrollContainer.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  const clients = ["AuraTech", "Nexify", "Vertex Labs", "OmniCorp", "Lumina", "Quantum", "Nexus", "Synergy"];
  const duplicatedClients = [...clients, ...clients];

  return (
    <>
      <Hero />
      
      {/* Trusted Clients Section */}
      <section id="clients" className="py-24 bg-[#09090b] border-t border-b border-[#1a1a24] overflow-hidden">
        <div className="w-full">
          <p className="text-center font-mono text-sm tracking-widest text-gray-500 uppercase mb-12 px-4">Trusted by Global Innovators</p>
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto cursor-grab active:cursor-grabbing gap-16 md:gap-32 px-8"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style>{`
              .flex::-webkit-scrollbar {
                display: none;
              }
            `}</style>
             {duplicatedClients.map((client, index) => (
               <div 
                 key={index} 
                 className="flex-shrink-0 transition-all duration-500 transform hover:scale-110 opacity-50 hover:opacity-100 py-4"
               >
                 <h4 className="text-3xl md:text-5xl font-serif whitespace-nowrap text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#dc143c] hover:to-[#aa3bff] transition-all duration-300 cursor-pointer">
                   {client}
                 </h4>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
         <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-serif mb-6 leading-tight text-[#dc143c]">We don't just build.<br/>We architect impact.</h2>
            <p className="text-gray-400 font-sans text-lg mb-8 max-w-md">
               Nezt Digital is an anti-synthetic spatial web agency. We believe in high-end micro-industrial design, organic imperfections, and engineering that feels distinctly human. 
            </p>
            <div className="flex gap-4">
               <div className="border-l-2 border-[#dc143c] pl-4">
                  <h3 className="text-3xl font-serif text-[#dc143c]">150+</h3>
                  <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-1">Projects Delivered</p>
               </div>
               <div className="border-l-2 border-[#dc143c] pl-4 ml-8">
                  <h3 className="text-3xl font-serif text-[#dc143c]">24/7</h3>
                  <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-1">Global Support</p>
               </div>
            </div>
         </div>
         <div className="w-full md:w-1/2 relative">
            <div className="aspect-square rounded-sm overflow-hidden border border-[#2e303a]">
               <img src="/images/agency_studio.jpg" alt="Agency Studio" className="w-full h-full object-cover grayscale contrast-125" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-[#121214] border border-[#2e303a] p-8 shadow-2xl">
               <h4 className="text-xl font-serif mb-2 text-[#dc143c]">Our Philosophy</h4>
               <p className="text-gray-400 font-sans text-sm max-w-xs">Eradicate the generic. Build bespoke digital experiences.</p>
            </div>
         </div>
      </section>

      <ServicesSection />
      
      <ProcessJourney />
      
      {/* Contact Section */}
      <section id="contacts" className="py-32 bg-[#121214] border-t border-[#2e303a]">
         <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-5xl font-serif mb-6 text-[#dc143c]">Let's Discuss Your Next Move</h2>
            <p className="text-gray-400 mb-12">Leave your details and we will get back to you within 24 hours.</p>
            <form className="flex flex-col gap-6 text-left">
               <div className="flex gap-6">
                  <input type="text" placeholder="Name" className="w-1/2 bg-[#09090b] border border-[#2e303a] p-4 text-white focus:outline-none focus:border-[#dc143c] transition-colors" />
                  <input type="email" placeholder="Email" className="w-1/2 bg-[#09090b] border border-[#2e303a] p-4 text-white focus:outline-none focus:border-[#dc143c] transition-colors" />
               </div>
               <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-[#09090b] border border-[#2e303a] p-4 text-white focus:outline-none focus:border-[#dc143c] transition-colors" />
               <button type="button" className="bg-[#dc143c] text-white py-4 font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full md:w-auto md:px-12 md:self-center">
                  Submit Inquiry
               </button>
            </form>
         </div>
      </section>
    </>
  );
}
