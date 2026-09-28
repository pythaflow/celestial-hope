import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="pt-24 min-h-screen pb-32 bg-[#09090b]">
      {/* Banner */}
      <div className="relative w-full h-[40vh] flex items-center justify-center border-b border-[#2e303a] overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img src="/images/agency_studio.jpg" className="absolute inset-0 w-full h-full object-cover filter grayscale" alt="Contact Us" />
        <div className="relative z-20 text-center px-4">
           <h1 className="text-5xl md:text-7xl font-serif text-[#dc143c] uppercase tracking-wider">Contact Us</h1>
           <p className="text-gray-300 mt-4 max-w-xl mx-auto font-sans">
             Ready to scale? Initiate a conversation with our engineering and marketing experts.
           </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
            >
               <h2 className="text-4xl font-serif text-white mb-8">Reach Out</h2>
               <p className="text-gray-400 font-sans mb-12">
                  Whether you need a complete digital transformation, a high-converting e-commerce platform, or an aggressive paid media campaign, we are here to architect your success.
               </p>
               
               <div className="space-y-8">
                  <div>
                     <h4 className="text-[#dc143c] font-mono text-sm uppercase tracking-widest mb-2">Global Headquarters</h4>
                     <p className="text-white font-sans text-lg">100 Innovation Drive<br/>Tech District, NY 10001</p>
                  </div>
                  <div>
                     <h4 className="text-[#dc143c] font-mono text-sm uppercase tracking-widest mb-2">Direct Line</h4>
                     <p className="text-white font-sans text-lg">+1 (800) 123-4567</p>
                  </div>
                  <div>
                     <h4 className="text-[#dc143c] font-mono text-sm uppercase tracking-widest mb-2">Electronic Mail</h4>
                     <p className="text-white font-sans text-lg">hello@neztdigital.com</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="bg-[#121214] border border-[#2e303a] p-8 shadow-2xl"
            >
               <h3 className="text-2xl font-serif text-white mb-6 uppercase tracking-widest">Send a Message</h3>
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                     <label className="block text-[#dc143c] font-mono text-xs uppercase tracking-widest mb-2">Full Name</label>
                     <input type="text" className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                     <label className="block text-[#dc143c] font-mono text-xs uppercase tracking-widest mb-2">Email Address</label>
                     <input type="email" className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors" placeholder="john@company.com" />
                  </div>
                  <div>
                     <label className="block text-[#dc143c] font-mono text-xs uppercase tracking-widest mb-2">Subject</label>
                     <select className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors">
                        <option>General Inquiry</option>
                        <option>Web Development</option>
                        <option>Digital Marketing</option>
                        <option>AI / ML Solutions</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-[#dc143c] font-mono text-xs uppercase tracking-widest mb-2">Message</label>
                     <textarea rows={5} className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button className="w-full bg-[#dc143c] text-white py-4 font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                     Submit Inquiry
                  </button>
               </form>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
