import { useRef, ReactNode, forwardRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className = '', ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    
    const setRefs = (node: HTMLDivElement) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!internalRef.current) return;
      const rect = internalRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={setRefs}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          perspective: 1000 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative ${className}`}
        {...props}
      >
        <div style={{ transform: "translateZ(30px)" }} className="h-full">
           {children}
        </div>
      </motion.div>
    );
  }
);

TiltCard.displayName = 'TiltCard';

export default TiltCard;
