import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from '../components/TiltCard';

const categories = ["All", "Social Media Marketing", "Digital Marketing", "Web Development", "AI ML", "Software Development"];

const allServicesDetails = [
  { 
    id: 1, title: "Custom Web Applications", category: "Web Development", 
    desc: "High-performance, scalable web apps built with modern stacks.",
    fullDesc: "We build highly interactive, responsive, and robust web applications tailored to your business needs using React, Vue, Next.js, Node.js, and modern serverless architectures. Expect zero compromise on performance."
  },
  { 
    id: 2, title: "E-Commerce Platforms", category: "Web Development", 
    desc: "Conversion-optimized stores driving revenue.",
    fullDesc: "From Shopify Headless builds to custom Magento architectures, we design and deploy e-commerce solutions that maximize conversion rates through behavioral psychology and micro-interactions."
  },
  { 
    id: 3, title: "Predictive Analytics", category: "AI ML", 
    desc: "Data-driven insights to forecast market trends.",
    fullDesc: "Harness the power of historical data with our advanced machine learning pipelines. We deploy predictive models that help you anticipate market shifts and customer needs before they happen."
  },
  { 
    id: 4, title: "Generative AI Integration", category: "AI ML", 
    desc: "Automate workflows with custom LLM integrations.",
    fullDesc: "Integrate specialized ChatGPT/Claude instances into your internal operations. We fine-tune and deploy secure LLMs to automate customer support, content generation, and internal knowledge bases."
  },
  { 
    id: 5, title: "Brand Identity Campaigns", category: "Social Media Marketing", 
    desc: "Viral, data-backed social campaigns.",
    fullDesc: "We don't just post. We architect brand narratives. Our social media strategies combine high-end creative direction with aggressive algorithmic hacking to ensure maximum reach."
  },
  { 
    id: 6, title: "SEO & Content Strategy", category: "Digital Marketing", 
    desc: "Dominate search rankings with semantic architecture.",
    fullDesc: "Technical SEO meets masterful content strategy. We audit your core web vitals, restructure your site architecture, and deploy programmatic content that secures page 1 rankings."
  },
  { 
    id: 7, title: "Enterprise Systems", category: "Software Development", 
    desc: "Robust microservices for enterprise operations.",
    fullDesc: "Legacy system modernization and microservice architecture development using Go and Rust for mission-critical, high-throughput enterprise environments."
  },
  { 
    id: 8, title: "Performance Marketing", category: "Digital Marketing", 
    desc: "High ROI paid acquisition strategies.",
    fullDesc: "Hyper-targeted ad campaigns across Meta, Google, and LinkedIn. We utilize AI-driven A/B testing for ad creatives to continuously lower your CAC (Customer Acquisition Cost)."
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<any>(null);

  const filteredServices = activeCategory === "All" 
    ? allServicesDetails 
    : allServicesDetails.filter(s => s.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen pb-32">
      
      {/* Banner */}
      <div className="relative w-full h-[40vh] flex items-center justify-center border-b border-[#2e303a] overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img src="/images/agency_studio.jpg" className="absolute inset-0 w-full h-full object-cover filter grayscale" alt="Services Banner" />
        <div className="relative z-20 text-center px-4">
           <h1 className="text-5xl md:text-7xl font-serif text-[#dc143c] uppercase tracking-wider">{activeCategory === 'All' ? 'All Services' : activeCategory}</h1>
           <p className="text-gray-300 mt-4 max-w-xl mx-auto font-sans">
             Architecting impact through specialized digital solutions. Select a category below to explore our offerings.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center">
          {categories.map(cat => (
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

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredServices.map(service => (
               <TiltCard 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  key={service.id} 
                  onClick={() => setSelectedService(service)}
                  className="cursor-pointer w-full h-full"
                >
                  <div className="bg-[#121214] border border-[#2e303a] p-8 hover:border-[#dc143c] transition-colors duration-300 group flex flex-col justify-between h-[300px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div>
                     <span className="text-xs font-mono text-[#dc143c] mb-4 block uppercase tracking-widest">{service.category}</span>
                     <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-[#dc143c] transition-colors">{service.title}</h3>
                     <p className="text-gray-400 text-sm font-sans line-clamp-3">{service.desc}</p>
                  </div>
                  <div className="mt-8">
                     <button className="text-sm font-mono uppercase tracking-widest border-b border-[#dc143c] pb-1 hover:text-white transition-colors">
                       View Details
                     </button>
                  </div>
                  </div>
               </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedService(null)} />
             <motion.div 
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               className="bg-[#121214] border border-[#2e303a] p-8 md:p-12 max-w-2xl w-full relative z-10 shadow-2xl"
             >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white"
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                
                <span className="text-xs font-mono text-[#dc143c] mb-4 block uppercase tracking-widest">{selectedService.category}</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">{selectedService.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed font-sans mb-8">
                  {selectedService.fullDesc}
                </p>
                
                <button className="bg-[#dc143c] text-white px-8 py-3 uppercase font-mono tracking-widest hover:bg-white hover:text-black transition-colors w-full md:w-auto">
                  Request Quote
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
