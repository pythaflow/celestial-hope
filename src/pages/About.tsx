import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-24 min-h-screen pb-32 bg-[#09090b]">
      {/* Banner */}
      <div className="relative w-full h-[40vh] flex items-center justify-center border-b border-[#2e303a] overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img src="/images/agency_studio.jpg" className="absolute inset-0 w-full h-full object-cover filter grayscale" alt="About Us" />
        <div className="relative z-20 text-center px-4">
           <h1 className="text-5xl md:text-7xl font-serif text-[#dc143c] uppercase tracking-wider">About Us</h1>
           <p className="text-gray-300 mt-4 max-w-xl mx-auto font-sans">
             Pioneering digital experiences that define the future.
           </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 mt-24">
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg max-w-none font-sans"
         >
            <h2 className="text-3xl font-serif text-white mb-6 uppercase tracking-widest text-center">We Are Nezt Digital</h2>
            <p className="text-gray-400 text-center text-xl leading-relaxed mb-16">
              We operate at the intersection of high-end design, artificial intelligence, and rigorous software engineering. Our mission is to transform ambitious brands into market leaders through data-driven strategies and next-generation web architecture.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-[#dc143c] font-mono text-sm uppercase tracking-widest mb-4">Our Vision</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To eliminate mediocrity in the digital space. We believe that every digital touchpoint should be an immersive experience that commands attention and drives measurable impact. We don't just build websites; we architect ecosystems.
                  </p>
               </div>
               <div>
                  <h3 className="text-[#dc143c] font-mono text-sm uppercase tracking-widest mb-4">Our Approach</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Radical transparency combined with obsessive engineering. We leverage real-time predictive analytics and cutting-edge machine learning to ensure every campaign and product we launch is scientifically optimized for success.
                  </p>
               </div>
            </div>
            
            <div className="mt-24 border-t border-[#2e303a] pt-16">
               <h3 className="text-[#dc143c] font-mono text-sm uppercase tracking-widest mb-8 text-center">The Core Team</h3>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {[1, 2, 3].map((item) => (
                     <div key={item} className="text-center group">
                        <div className="w-32 h-32 mx-auto rounded-full bg-[#121214] border border-[#2e303a] mb-4 group-hover:border-[#dc143c] transition-colors overflow-hidden">
                           <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-600 font-mono text-xs">Photo</div>
                        </div>
                        <h4 className="text-white font-serif text-xl">Leader {item}</h4>
                        <p className="text-[#dc143c] font-mono text-xs uppercase tracking-widest mt-1">Director</p>
                     </div>
                  ))}
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
