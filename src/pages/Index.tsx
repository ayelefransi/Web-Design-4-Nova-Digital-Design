
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  // Update document title
  useEffect(() => {
    document.title = "Quantum UI - Designing Tomorrow's Web Today";
  }, []);

  // Handle anchor links
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Get the element by id (without the #)
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        // Wait a bit for the page to render and then scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
