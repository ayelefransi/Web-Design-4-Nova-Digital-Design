
import React from 'react';
import { Layers, Satellite, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface MapControlsProps {
  onStyleChange: (style: string) => void;
  currentStyle: string;
}

const MapControls = ({ onStyleChange, currentStyle }: MapControlsProps) => {
  const mapStyles = [
    { id: 'mapbox://styles/mapbox/dark-v11', name: 'Dark', icon: <Layers size={16} /> },
    { id: 'mapbox://styles/mapbox/satellite-streets-v12', name: 'Satellite', icon: <Satellite size={16} /> },
    { id: 'mapbox://styles/mapbox/outdoors-v12', name: 'Terrain', icon: <Mountain size={16} /> },
  ];

  const currentStyleName = mapStyles.find(style => style.id === currentStyle)?.name || 'Dark';

  return (
    <div className="flex flex-col space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-quantum-dark-purple/60 backdrop-blur-sm border-quantum-medium-purple/30 text-quantum-light-purple">
            <Layers className="mr-2 h-4 w-4" />
            {currentStyleName}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-quantum-dark-purple/80 backdrop-blur-sm border-quantum-medium-purple/50">
          {mapStyles.map(style => (
            <DropdownMenuItem 
              key={style.id} 
              onClick={() => onStyleChange(style.id)}
              className="text-quantum-light-purple hover:bg-quantum-medium-purple/20"
            >
              {style.icon}
              <span className="ml-2">{style.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MapControls;
