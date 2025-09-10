
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, InnoTech",
      content: "Quantum UI transformed our outdated website into a modern, engaging platform that perfectly represents our brand. The team's attention to detail and commitment to excellence exceeded our expectations.",
      stars: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, Fusion Studios",
      content: "Working with Quantum UI was a game-changer for our business. Their design expertise and technical knowledge helped us create a website that not only looks amazing but also drives results.",
      stars: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, Bloom Boutique",
      content: "From concept to execution, the Quantum UI team guided us through the entire process with professionalism and creativity. Our e-commerce site is now our most valuable business asset.",
      stars: 5
    },
    {
      name: "David Thompson",
      role: "CTO, NexGen Solutions",
      content: "The development expertise at Quantum UI is unmatched. They built us a complex web application that's both powerful and user-friendly. Incredibly satisfied with the results.",
      stars: 4
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[250px]">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`quantum-card quantum-glow absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-8 -z-10"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                    {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                      <Star key={i + testimonial.stars} className="h-5 w-5 text-primary/30" />
                    ))}
                  </div>
                  
                  <p className="text-lg italic mb-6">"{testimonial.content}"</p>
                  
                  <div>
                    <p className="font-display font-bold">{testimonial.name}</p>
                    <p className="text-foreground/70 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
