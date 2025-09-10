
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapSearchBarProps {
  onResult: (result: any) => void;
  mapboxToken: string;
}

const MapSearchBar = ({ onResult, mapboxToken }: MapSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close results when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!query.trim() || !mapboxToken) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=5`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setResults(data.features);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching for locations:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, mapboxToken]);

  const handleResultClick = (result: any) => {
    setQuery(result.place_name);
    setShowResults(false);
    onResult(result);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="flex rounded-md overflow-hidden border border-quantum-medium-purple/30 bg-quantum-dark-purple/60 backdrop-blur-sm">
        <div className="flex-grow flex items-center">
          <Search className="ml-3 h-4 w-4 text-quantum-light-purple/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search locations..."
            className="w-full bg-transparent border-0 focus:ring-0 text-quantum-light-purple p-2 pl-2"
          />
        </div>
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="h-full aspect-square text-quantum-light-purple/50 hover:text-quantum-light-purple hover:bg-quantum-medium-purple/20"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-quantum-dark-purple/80 backdrop-blur-sm border border-quantum-medium-purple/30 rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto">
          <ul className="py-1">
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="px-4 py-2 hover:bg-quantum-medium-purple/20 text-quantum-light-purple cursor-pointer flex items-start"
              >
                <Search className="h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <div className="font-medium">{result.text}</div>
                  <div className="text-sm text-quantum-light-purple/70">{result.place_name}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-quantum-dark-purple/80 backdrop-blur-sm border border-quantum-medium-purple/30 rounded-md shadow-lg z-50 p-4 text-center">
          <div className="text-quantum-light-purple">Searching...</div>
        </div>
      )}
    </div>
  );
};

export default MapSearchBar;
