
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const services = [
    {
      title: "Custom Web Design",
      description: "Unique, responsive websites tailored specifically to your brand and business goals.",
      details: "We craft visually striking and functionally powerful websites that elevate your brand. Our design process focuses on creating intuitive user experiences that guide visitors naturally toward your conversion goals.",
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Full Stack Web Development",
      description: "End-to-end development solutions with cutting-edge technologies and robust architectures.",
      details: "From front-end interfaces to complex back-end systems, we build scalable web applications using modern frameworks and best practices. We specialize in React, Node.js, and cloud technologies to deliver high-performance solutions.",
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "UI/UX Prototyping",
      description: "Comprehensive user experience design and interactive prototyping to validate concepts.",
      details: "We create detailed wireframes, interactive prototypes, and user flows that let you experience your product before development begins. Our UX research and testing ensures your digital products are intuitive and user-friendly.",
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Branding & Identity",
      description: "Cohesive brand development including logos, style guides, and brand strategy.",
      details: "We develop comprehensive brand identities that communicate your values and resonate with your audience. From logo design and color palettes to typography and voice, we create cohesive brand systems that work across all touchpoints.",
      icon: (
        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="quantum-card quantum-glow overflow-hidden transition-all duration-500 ease-out"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="h-full flex flex-col">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2">{service.title}</h3>
                
                <div className="relative flex-grow">
                  <p className={`text-foreground/80 transition-opacity duration-300 ${
                    activeIndex === index ? "opacity-0" : "opacity-100"
                  }`}>
                    {service.description}
                  </p>
                  
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeIndex === index 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-10 pointer-events-none"
                  }`}>
                    <p className="text-foreground/80">{service.details}</p>
                  </div>
                </div>
                
                <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent mt-4 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
