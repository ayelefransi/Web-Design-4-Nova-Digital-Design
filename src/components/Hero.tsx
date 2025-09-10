
import React from 'react';
import { Button } from "@/components/ui/button";
import ParticlesBackground from './Particles';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticlesBackground />
      
      <div className="container mx-auto px-6 py-10 z-10 flex flex-col lg:flex-row lg:items-center">
        <div className="lg:w-1/2 text-left lg:pr-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Think. Connect. <span className="text-gradient">Digitize.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl">
            We create cutting-edge digital experiences that transform brands and drive business growth through innovative web solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-quantum-medium-purple hover:bg-quantum-dark-purple text-white animate-pulse-glow text-base"
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Start Your Project
            </Button>
            <Button 
              className="bg-quantum-dark-purple/50 hover:bg-quantum-dark-purple/70 text-white text-base"
              variant="secondary"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}
            >
              See Our Work
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <div className="tech-illustration relative">
            {/* Central Screen/Dashboard */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-quantum-darkest-blue/80 rounded-lg border border-quantum-medium-purple/30 shadow-lg shadow-quantum-medium-purple/20 overflow-hidden z-20">
              <div className="p-2">
                <div className="h-2 w-16 bg-quantum-medium-purple/40 rounded-full mb-2"></div>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-2 bg-quantum-light-purple/30 rounded-full"></div>
                  ))}
                </div>
                <div className="mt-4 h-20 bg-gradient-to-r from-quantum-medium-purple/20 to-quantum-light-purple/20 rounded-md"></div>
                <div className="mt-3 flex justify-between">
                  <div className="h-2 w-10 bg-quantum-medium-purple/40 rounded-full"></div>
                  <div className="h-2 w-10 bg-quantum-light-purple/40 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            {/* Web Design */}
            <div className="absolute left-[10%] top-[35%] transform -translate-y-1/2 bg-quantum-medium-purple p-3 rounded-lg shadow-lg shadow-quantum-medium-purple/30 z-10 animate-float">
              <div className="text-xs font-medium text-white">Web Design</div>
            </div>
            
            {/* Development */}
            <div className="absolute right-[15%] top-[30%] transform -translate-y-1/2 bg-quantum-light-purple p-3 rounded-lg shadow-lg shadow-quantum-light-purple/30 z-10 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-xs font-medium text-quantum-darkest-blue">Development</div>
            </div>
            
            {/* UX/UI */}
            <div className="absolute left-[20%] bottom-[25%] bg-quantum-dark-purple p-3 rounded-lg shadow-lg shadow-quantum-dark-purple/30 z-10 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="text-xs font-medium text-white">UX/UI</div>
            </div>
            
            {/* Branding */}
            <div className="absolute right-[20%] bottom-[20%] bg-quantum-darkest-blue p-3 rounded-lg shadow-lg shadow-quantum-darkest-blue/30 z-10 animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-xs font-medium text-white">Branding</div>
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="30%" y1="35%" x2="50%" y2="50%" stroke="#524db6" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="#baa8d4" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#3d3e7e" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="70%" y1="75%" x2="50%" y2="50%" stroke="#1f2455" strokeWidth="1" strokeOpacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
          className="text-quantum-light-purple hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
