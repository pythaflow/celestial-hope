import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

function MagneticButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current) return;

    const button = buttonRef.current;
    const text = textRef.current;

    const move = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic pull effect
      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.to(text, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 1,
        ease: 'power3.out'
      });
    };

    const leave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    button.addEventListener('mousemove', move);
    button.addEventListener('mouseleave', leave);

    return () => {
      button.removeEventListener('mousemove', move);
      button.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <button 
      ref={buttonRef}
      onClick={onClick}
      className="relative px-12 py-6 rounded-full border border-gray-500 hover:border-white bg-transparent hover:bg-white hover:text-black transition-colors duration-300 overflow-hidden group"
    >
      <span ref={textRef} className="relative z-10 font-sans font-medium text-lg pointer-events-none inline-block uppercase tracking-wider">
        {children}
      </span>
    </button>
  );
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isFooterInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Simple distortion effect using JS for the text (since full WebGL cloth physics text is heavy)
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const text = textRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = text.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate normalized coordinates (-1 to 1)
      const nx = (x / rect.width) * 2 - 1;
      const ny = -(y / rect.height) * 2 + 1;
      
      gsap.to(text, {
        rotateX: ny * 10,
        rotateY: nx * 10,
        skewX: nx * 5,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.5
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(text, {
        rotateX: 0,
        rotateY: 0,
        skewX: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 1.5
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <footer ref={containerRef} className="h-screen w-full bg-[#09090b] relative flex flex-col items-center justify-center overflow-hidden z-30">
      
      {/* Background radial gradient to separate from previous sections */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a24] to-[#09090b] z-0" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
        <motion.h2 
          ref={textRef}
          className="text-[12vw] font-serif font-black uppercase text-[#2e303a] hover:text-white transition-colors duration-500 select-none cursor-default leading-none mb-12 text-center flex justify-center gap-[3vw] overflow-hidden w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.span
            initial={{ x: "-100%", opacity: 0 }}
            animate={isFooterInView ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, duration: 1.5 }}
          >
            NEZT
          </motion.span>
          <motion.span
            initial={{ x: "100%", opacity: 0 }}
            animate={isFooterInView ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, duration: 1.5 }}
          >
            DIGITAL
          </motion.span>
        </motion.h2>
        
        <div className="mt-8 flex flex-col items-center">
          <p className="text-gray-400 mb-8 font-sans max-w-md text-center">
             Ready to scale your digital presence with world-class engineering and marketing? Claim your free consultation today.
          </p>
          <div className="p-8">
            <MagneticButton onClick={() => window.dispatchEvent(new Event('open-booking-modal'))}>
              Start a Conversation
            </MagneticButton>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-xs font-mono text-gray-500 uppercase">
         <span>© {new Date().getFullYear()} Nezt Digital. All Rights Reserved.</span>
         <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
         </div>
      </div>
    </footer>
  );
}
