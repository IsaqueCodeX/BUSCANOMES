import React from "react";
import { cn } from "../../lib/utils";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const GlowingCard = ({ children, className, color = "#6366f1", onClick, ...props }: GlowingCardProps) => {
  return (
    <div 
      className={cn("relative group", className)} 
      onClick={onClick}
      {...props}
    >
      {/* Animated Border Container */}
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
        <div 
           className="absolute top-0 left-[-50%] w-[200%] h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[moveTop_3s_linear_infinite]"
           style={{ color }}
        />
        <div 
           className="absolute bottom-0 right-[-50%] w-[200%] h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[moveTop_3s_linear_infinite_reverse]"
           style={{ color }}
        />
        <div 
           className="absolute left-0 bottom-[-50%] w-1 h-[200%] bg-gradient-to-b from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[moveTop_3s_linear_infinite_reverse]"
           style={{ color }}
        />
         <div 
           className="absolute right-0 top-[-50%] w-1 h-[200%] bg-gradient-to-b from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[moveTop_3s_linear_infinite]"
           style={{ color }}
        />
      </div>

      {/* Main Content */}
      <div className="relative h-full w-full bg-white rounded-[2.5rem] z-10 overflow-hidden">
        {children}
      </div>
      
      {/* Background Glow */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
