
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Portfolio = () => {
  const projects = [{
    title: "Interior Design Website",
    description: "A stunning showcase website for an interior design studio, featuring interactive galleries and 3D visualizations.",
    type: "Interior Design Showcase",
    link: "https://hannainteriordesigns.netlify.app",
    image: "/lovable-uploads/03f7bfb9-809e-4243-9e42-25e77b50e247.png"
  }, {
    title: "Photography Website",
    description: "A minimal and elegant portfolio site for a professional photographer with advanced image galleries.",
    type: "Photography Portfolio",
    link: "https://hannainteriordesigns.netlify.app",
    image: "/lovable-uploads/593513ff-2ce6-4cdd-87a3-b25a450a6c44.png"
  }, {
    title: "Quantum Café & Restaurant",
    description: "A modern website for a restaurant featuring online ordering, reservation system, and interactive menu.",
    type: "Business Website",
    link: "https://quantum-cafe-and-restaurant.vercel.app",
    image: "/lovable-uploads/d19252fc-9418-4a83-b52a-11d48c14942e.png",
    details: {
      address: "Ayat, Train Station",
      phone: "0993656831"
    }
  }];

  return (
    <section id="portfolio" className="py-20 bg-quantum-darkest-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-quantum-light-purple max-w-2xl mx-auto">
            Explore our latest projects and see how we've helped businesses transform their digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="quantum-card quantum-glow overflow-hidden group border border-quantum-medium-purple/30">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-quantum-darkest-blue to-transparent opacity-60 z-10"></div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-quantum-light-purple">{project.type}</span>
                    <h3 className="text-xl font-display font-bold mt-1 text-white">{project.title}</h3>
                    <p className="text-quantum-light-purple/90 text-sm mt-2">{project.description}</p>
                  </div>
                  
                  {project.details && (
                    <div className="text-sm text-quantum-light-purple/70">
                      {project.details.address && (
                        <p>Address: {project.details.address}</p>
                      )}
                      {project.details.phone && (
                        <p>Phone: {project.details.phone}</p>
                      )}
                    </div>
                  )}
                  
                  <Button asChild variant="ghost" className="p-0 h-auto w-max flex items-center gap-2 text-quantum-medium-purple hover:text-quantum-light-purple hover:bg-transparent">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      Visit Project <ArrowRight size={16} />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-xl font-display font-bold text-white">{project.title}</h3>
                      <p className="text-sm text-quantum-light-purple">{project.type}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-quantum-medium-purple text-white border-quantum-dark-purple" />
            <CarouselNext className="bg-quantum-medium-purple text-white border-quantum-dark-purple" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
