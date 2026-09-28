import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/', hash: '#home' },
  { name: 'Services', path: '/services', hash: '#services' },
  { name: 'Projects', path: '/projects', hash: '#projects' },
  { name: 'Trusted Clients', path: '/#clients', hash: '#clients' },
  { name: 'About', path: '/about', hash: '#about' },
  { name: 'Contacts', path: '/contact', hash: '#contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Glassmorphism toggle
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll spy logic
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          currentSection = section.getAttribute('id') || '';
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-auto transition-all duration-500 ${scrolled ? 'bg-black/40 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      <Link to="/" className="flex items-center gap-4">
        <img src="/images/logo.png" alt="Nezt Digital" className="h-10 w-auto object-contain" />
        <span className="font-serif font-bold text-xl uppercase tracking-widest hidden md:block text-white">Nezt Digital</span>
      </Link>
      
      <div className="hidden lg:flex gap-8 font-sans text-sm tracking-widest uppercase font-medium items-center">
        {navLinks.map((link) => {
          let isActive = false;
          if (location.pathname === '/') {
             isActive = activeSection === link.hash.substring(1) || (activeSection === 'home' && link.name === 'Home');
          } else {
             isActive = location.pathname.startsWith(link.path) && link.path !== '/';
          }
          
          return (
            <Link 
              key={link.name} 
              to={link.path.startsWith('/') ? link.path : `/${link.path}`}
              className={`transition-colors duration-300 ${isActive ? 'text-[#dc143c] font-bold' : 'text-white hover:text-gray-300'}`}
            >
              {link.name}
            </Link>
          )
        })}

        {/* Language Switcher */}
        <div className="relative group cursor-pointer ml-4">
           <span className="text-white hover:text-[#dc143c] transition-colors flex items-center gap-1">
              EN <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
           </span>
           <div className="absolute top-full right-0 mt-2 bg-[#121214] border border-[#2e303a] rounded-md overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
              <div className="px-4 py-2 hover:bg-[#dc143c] text-white transition-colors">FR</div>
              <div className="px-4 py-2 hover:bg-[#dc143c] text-white transition-colors">ES</div>
              <div className="px-4 py-2 hover:bg-[#dc143c] text-white transition-colors">DE</div>
           </div>
        </div>

        {/* Theme Toggle (Invert Hack for WebGL) */}
        <button 
          onClick={() => document.documentElement.classList.toggle('light-mode-active')}
          className="text-white hover:text-[#dc143c] transition-colors ml-2"
          title="Toggle Light Mode"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
      </div>
      
      <button 
        onClick={() => window.dispatchEvent(new Event('open-booking-modal'))}
        className="border border-white/30 px-6 py-2 rounded-full text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300"
      >
        Call for Audit
      </button>
    </nav>
  );
}
