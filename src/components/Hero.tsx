import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HeroParticles from './HeroParticles';

const slides = [
  {
    title: "Engineered for Human Impact",
    description: "World-class digital marketing, AI solutions, and web engineering.",
    highlightWords: ["Engineered"]
  },
  {
    title: "Data-Driven Growth Strategies",
    description: "Scaling your business through intelligent social media marketing.",
    highlightWords: ["Data-Driven"]
  },
  {
    title: "Next-Gen Web Architecture",
    description: "High-performance applications built for scale and speed.",
    highlightWords: ["Next-Gen"]
  }
];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!headlineRef.current) return;
    
    // Select all the char spans inside the headline
    const chars = headlineRef.current.querySelectorAll('.char');

    // Reset properties
    gsap.set(chars, { y: 50, opacity: 0 });

    // Animate in
    gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power4.out',
    });

    // Animate out before the next slide
    gsap.to(chars, {
      y: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.01,
      ease: 'power3.in',
      delay: 4.2 // Out animation starts at 4.2s
    });

  }, [currentSlide]);

  const renderTitle = (title: string, highlightWords: string[]) => {
    const words = title.split(' ');
    
    return words.map((word, wordIdx) => {
      const isHighlight = highlightWords.includes(word);
      return (
        <span key={wordIdx} className="inline-block whitespace-nowrap mx-2">
          {word.split('').map((char, charIdx) => (
            <span 
              key={charIdx} 
              className={`char inline-block ${isHighlight ? 'text-[#dc143c]' : 'text-white'}`}
            >
              {char}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <HeroParticles />
      
      <div className="z-10 text-center px-4 pointer-events-none mt-20 w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full">
        <h1 
          ref={headlineRef}
          className="text-[10vw] md:text-7xl lg:text-8xl font-serif font-black tracking-tighter uppercase leading-[1.1] min-h-[180px] md:min-h-[250px] flex flex-wrap justify-center content-center drop-shadow-2xl"
        >
          {renderTitle(slides[currentSlide].title, slides[currentSlide].highlightWords)}
        </h1>
        <p key={currentSlide} className="mt-8 text-xl md:text-2xl text-gray-300 font-sans tracking-wide max-w-2xl mx-auto animate-fade-in-out h-16 drop-shadow-lg">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
         {slides.map((_, idx) => (
            <button 
               key={idx}
               onClick={() => setCurrentSlide(idx)}
               className={`w-12 h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'bg-[#dc143c] scale-y-150' : 'bg-white/30 hover:bg-white/50'}`} 
            />
         ))}
      </div>

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
