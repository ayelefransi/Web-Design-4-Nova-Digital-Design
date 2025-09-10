
import React from 'react';
import { Card } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      title: "Innovation",
      description: "We push boundaries and explore new technologies to create cutting-edge solutions.",
      delay: "delay-100"
    },
    {
      title: "Quality",
      description: "We believe in excellence and meticulousness in every pixel and line of code.",
      delay: "delay-200"
    },
    {
      title: "Collaboration",
      description: "We work closely with our clients, ensuring their vision guides our creative process.",
      delay: "delay-300"
    },
    {
      title: "Results",
      description: "We design with purpose, focusing on solutions that drive real business outcomes.",
      delay: "delay-400"
    }
  ];

  const expertise = [
    {
      title: "UI/UX Design",
      percentage: 95,
    },
    {
      title: "Web Development",
      percentage: 90,
    },
    {
      title: "Mobile Development",
      percentage: 85,
    },
    {
      title: "Digital Marketing",
      percentage: 80,
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            About <span className="text-gradient">Quantum UI</span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            We're a team of designers, developers, and strategists passionate about creating 
            exceptional digital experiences that stand out in the crowded digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="quantum-card quantum-glow overflow-hidden group"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold mb-2 text-primary">
                    {value.title}
                  </h3>
                  <p className="text-foreground/80">{value.description}</p>
                </div>
                <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent mt-4 group-hover:w-full transition-all duration-300"></div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-display font-bold text-center mb-10">Our Expertise</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {expertise.map((skill, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{skill.title}</h4>
                  <span className="text-primary">{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-quantum-light-purple to-quantum-medium-purple rounded-full"
                    style={{ width: `${skill.percentage}%` }}
                    data-aos="slide-right"
                    data-aos-duration="1000"
                    data-aos-delay={index * 100}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="quantum-card quantum-glow p-8">
              <h3 className="text-xl font-display font-bold mb-4">Our Vision</h3>
              <p className="text-foreground/80">
                To redefine digital experiences through innovative design and technology, creating 
                intuitive, accessible, and powerful solutions that propel our clients ahead of the competition.
              </p>
            </div>
            
            <div className="quantum-card quantum-glow p-8">
              <h3 className="text-xl font-display font-bold mb-4">Our Mission</h3>
              <p className="text-foreground/80">
                To combine creative design with cutting-edge technology, delivering digital solutions that not
                only meet our clients' business objectives but exceed their expectations in every aspect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
