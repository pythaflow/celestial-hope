import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-booking-modal', handleOpen);
    return () => window.removeEventListener('open-booking-modal', handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
           <motion.div 
             initial={{ scale: 0.95, y: 20 }}
             animate={{ scale: 1, y: 0 }}
             exit={{ scale: 0.95, y: 20 }}
             className="bg-[#121214] border border-[#2e303a] p-8 max-w-4xl w-full relative z-10 shadow-2xl flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto"
           >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#dc143c] transition-colors"
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              
              <div className="w-full md:w-1/2">
                 <span className="text-xs font-mono text-[#dc143c] mb-4 block uppercase tracking-widest">Discovery Call</span>
                 <h2 className="text-3xl font-serif text-white mb-6">Book an Audit / Meeting</h2>
                 <p className="text-gray-400 text-sm font-sans mb-8">
                   Select a time that works for you. Our experts will prepare a preliminary analysis of your digital footprint prior to the call.
                 </p>
                 
                 <div className="bg-black/50 border border-white/10 p-4 rounded-md mb-6">
                    <h4 className="text-white font-mono text-sm uppercase tracking-widest mb-4">Select Date</h4>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-sans text-gray-400 mb-2">
                       <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-sans">
                       {[...Array(30)].map((_, i) => (
                          <button key={i} className={`p-2 rounded-full transition-colors ${[12, 14, 18, 22].includes(i+1) ? 'text-white hover:bg-[#dc143c] cursor-pointer' : 'text-gray-600 cursor-not-allowed'}`}>
                             {i + 1}
                          </button>
                       ))}
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-2">
                    <button className="border border-[#2e303a] text-gray-400 text-xs py-2 hover:border-[#dc143c] hover:text-white transition-colors">09:00 AM</button>
                    <button className="border border-[#dc143c] bg-[#dc143c] text-white text-xs py-2 hover:bg-white hover:text-black hover:border-white transition-colors">11:30 AM</button>
                    <button className="border border-[#2e303a] text-gray-400 text-xs py-2 hover:border-[#dc143c] hover:text-white transition-colors">02:00 PM</button>
                 </div>
              </div>
              
              <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-[#2e303a] pt-8 md:pt-0 md:pl-8">
                 <h3 className="text-xl font-serif text-white mb-6 uppercase tracking-widest">Your Details</h3>
                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                       <label className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Full Name</label>
                       <input type="text" className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors text-sm" />
                    </div>
                    <div>
                       <label className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Corporate Email</label>
                       <input type="email" className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors text-sm" />
                    </div>
                    <div>
                       <label className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Company / Website</label>
                       <input type="text" className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors text-sm" />
                    </div>
                    <div>
                       <label className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Primary Objective</label>
                       <textarea rows={3} className="w-full bg-[#09090b] border border-[#2e303a] p-3 text-white focus:outline-none focus:border-[#dc143c] transition-colors resize-none text-sm"></textarea>
                    </div>
                    <button className="w-full bg-[#dc143c] text-white py-4 font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-sm mt-4" onClick={() => {
                       alert("Meeting Confirmed! Check your email.");
                       setIsOpen(false);
                    }}>
                       Confirm Booking
                    </button>
                 </form>
              </div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
