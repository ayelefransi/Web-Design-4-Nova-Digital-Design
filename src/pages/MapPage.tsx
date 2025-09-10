
import React from "react";
import Navbar from "@/components/Navbar";
import MapComponent from "@/components/MapComponent";
import Footer from "@/components/Footer";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-quantum-darkest-blue text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Interactive <span className="text-gradient">Map</span>
          </h1>
          <p className="text-quantum-light-purple max-w-2xl mx-auto">
            Explore locations with our futuristic quantum-themed map interface
          </p>
        </div>
        <MapComponent />
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
