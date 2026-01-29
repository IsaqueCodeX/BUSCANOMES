
import React from 'react';

interface AnimatedBackgroundProps {
  color: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ color }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafafa] transition-colors duration-1000">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`
        }}
      />
      <div 
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[160px] opacity-[0.07] transition-colors duration-1000"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full blur-[200px] opacity-[0.05] transition-colors duration-1000"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
    </div>
  );
};

export default AnimatedBackground;
