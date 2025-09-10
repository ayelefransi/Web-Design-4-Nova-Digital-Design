import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle smooth scrolling for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Only process if it's a hash link on the homepage
    if (targetId.startsWith("/#")) {
      e.preventDefault();
      const sectionId = targetId.replace("/#", "");
      
      // If we're already on home page, scroll to the section
      if (location.pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If on another page, navigate to homepage then scroll
        // The scroll will happen after navigation via useEffect in NavLinks
        window.localStorage.setItem("scrollTo", sectionId);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-quantum-darkest-blue/90 backdrop-blur-lg shadow-lg shadow-quantum-medium-purple/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-display font-bold text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-light-purple to-quantum-medium-purple">
              Quantum UI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLinks onSmoothScroll={handleSmoothScroll} />
            <Button
              className="quantum-button"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-1"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-quantum-darkest-blue/95 backdrop-blur-lg border-t border-quantum-medium-purple/10">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <NavLinks onSmoothScroll={handleSmoothScroll} />
            <Button
              className="quantum-button w-full"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ onSmoothScroll }: { onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void }) => {
  const location = useLocation();

  useEffect(() => {
    // Check if we need to scroll after navigation
    if (location.pathname === "/") {
      const sectionId = window.localStorage.getItem("scrollTo");
      if (sectionId) {
        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
          window.localStorage.removeItem("scrollTo");
        }, 100);
      }
    }
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Portfolio", path: "/#portfolio" },
    { name: "Pricing", path: "/#pricing" },
    { name: "Map", path: "/map" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          onClick={(e) => onSmoothScroll(e, link.path)}
          className={`text-sm font-medium transition-colors hover:text-quantum-light-purple relative py-2 group ${
            isActive(link.path)
              ? "text-quantum-light-purple"
              : "text-quantum-light-purple/80"
          }`}
        >
          {link.name}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-quantum-light-purple transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </>
  );
};

export default Navbar;
