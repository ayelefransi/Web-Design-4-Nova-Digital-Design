
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import MapSearchBar from './MapSearchBar';
import MapControls from './MapControls';
import type { FeatureCollection, Feature, Geometry } from 'geojson';

// Initialize mapbox (free to use for development)
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmN5YXllbGUiLCJhIjoiY2x1dGs1OXptMDAxYTJrcGliNmFpZTRoeCJ9.yruHHpZ2JpE-IsGnNQ8Big';

interface MapComponentProps {
  initialZoom?: number;
  initialCenter?: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialZoom = 1.5,
  initialCenter = [0, 20]
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();
  const [zoom, setZoom] = useState(initialZoom);
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: initialCenter,
        zoom: initialZoom,
        attributionControl: false,
        projection: { name: 'globe' }
      });

      // Add controls
      map.current.addControl(new mapboxgl.AttributionControl(), 'bottom-left');
      map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
      
      // Add atmosphere and fog for globe
      map.current.on('style.load', () => {
        // Add atmosphere layer
        map.current!.setFog({
          color: 'rgb(15, 16, 20)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.4,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.8
        });

        // Add 3D terrain
        map.current!.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.terrain-rgb',
          tileSize: 512
        });

        map.current!.setTerrain({ 
          source: 'mapbox-dem', 
          exaggeration: 1.5 
        });

        // Add neon grid overlay
        addNeonGrid();

        // Mark map as loaded
        setIsLoaded(true);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initialCenter, initialZoom]);

  // Add neon grid overlay
  const addNeonGrid = () => {
    if (!map.current) return;

    const gridData: FeatureCollection = {
      type: "FeatureCollection",
      features: createGridData()
    };

    map.current.addSource('grid', {
      type: 'geojson',
      data: gridData
    });

    map.current.addLayer({
      id: 'grid-lines',
      type: 'line',
      source: 'grid',
      paint: {
        'line-color': '#524db6',
        'line-opacity': 0.3,
        'line-width': 1
      }
    });
  };

  // Create grid data for neon overlay
  const createGridData = () => {
    const lines: Feature[] = [];
    const gridSize = 2; // Grid size in degrees
    
    // Create horizontal lines
    for (let lat = -90; lat <= 90; lat += gridSize) {
      const coordinates: [number, number][] = [];
      for (let lng = -180; lng <= 180; lng += 1) {
        coordinates.push([lng, lat]);
      }
      
      lines.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates
        },
        properties: {} // Add empty properties object to satisfy TypeScript
      });
    }
    
    // Create vertical lines
    for (let lng = -180; lng <= 180; lng += gridSize) {
      const coordinates: [number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 1) {
        coordinates.push([lng, lat]);
      }
      
      lines.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates
        },
        properties: {} // Add empty properties object to satisfy TypeScript
      });
    }
    
    return lines;
  };

  // Handle location search
  const handleSearch = (searchLocation: { lat: number; lng: number; name: string }) => {
    if (!map.current) return;

    // Fly to location
    map.current.flyTo({
      center: [searchLocation.lng, searchLocation.lat],
      zoom: 9,
      duration: 2000,
      essential: true
    });

    // Add marker
    new mapboxgl.Marker({
      color: "#9b87f5"
    })
      .setLngLat([searchLocation.lng, searchLocation.lat])
      .addTo(map.current);
    
    // Set location state
    setLocation(searchLocation);
    
    // Show toast
    toast({
      title: "Location Found",
      description: `Navigating to ${searchLocation.name}`,
      duration: 3000,
    });
  };

  // Handle map style change
  const handleStyleChange = (style: string) => {
    if (!map.current) return;
    
    map.current.setStyle(`mapbox://styles/mapbox/${style}`);
  };

  // Handle map projection change
  const handleProjectionChange = (projection: 'globe' | 'mercator') => {
    if (!map.current) return;
    
    map.current.setProjection(projection);
  };

  // Handle map reset
  const handleReset = () => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: initialCenter,
      zoom: initialZoom,
      duration: 1500,
      essential: true
    });
    
    setLocation(null);
  };

  return (
    <div className="h-full w-full relative">
      {/* Map container */}
      <div ref={mapContainer} className="h-full w-full rounded-lg overflow-hidden border border-quantum-medium-purple/20" />
      
      {/* Search overlay */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <MapSearchBar onSearch={handleSearch} />
      </div>
      
      {/* Map controls */}
      <div className="absolute bottom-4 left-4 z-10">
        <MapControls 
          onStyleChange={handleStyleChange} 
          onProjectionChange={handleProjectionChange}
          onReset={handleReset}
        />
      </div>
      
      {/* Location info */}
      {location && (
        <div className="absolute bottom-4 right-4 z-10 max-w-sm">
          <Card className="quantum-card quantum-glow p-4">
            <h3 className="font-bold">{location.name}</h3>
            <p className="text-xs mt-1">
              Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
            </p>
          </Card>
        </div>
      )}
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-quantum-darkest-blue/90 flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 w-16 border-4 border-t-quantum-medium-purple border-quantum-medium-purple/30 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-quantum-light-purple">Loading interactive map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
