
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-quantum-light-purple to-quantum-medium-purple">
            404
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Oops! The page you're looking for doesn't exist in this quantum reality.
          </p>
          <Button className="quantum-button" asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
