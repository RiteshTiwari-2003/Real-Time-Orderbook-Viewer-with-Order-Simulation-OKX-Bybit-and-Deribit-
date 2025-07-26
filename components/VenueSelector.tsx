'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface VenueSelectorProps {
  selectedVenue: 'okx' | 'bybit' | 'deribit';
  onVenueChange: (venue: 'okx' | 'bybit' | 'deribit') => void;
  connectionStatuses: Record<string, 'connected' | 'connecting' | 'disconnected' | 'error'>;
}

const VENUES = [
  { id: 'okx' as const, name: 'OKX', color: 'bg-blue-600' },
  { id: 'bybit' as const, name: 'Bybit', color: 'bg-yellow-600' },
  { id: 'deribit' as const, name: 'Deribit', color: 'bg-purple-600' }
];

export function VenueSelector({ 
  selectedVenue, 
  onVenueChange, 
  connectionStatuses 
}: VenueSelectorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting';
      case 'error': return 'Error';
      default: return 'Disconnected';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {VENUES.map((venue) => {
        const status = connectionStatuses[venue.id] || 'disconnected';
        const isSelected = selectedVenue === venue.id;
        
        return (
          <Button
            key={venue.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onVenueChange(venue.id)}
            className={cn(
              "relative transition-all duration-200",
              isSelected
                ? `${venue.color} hover:opacity-90 text-white border-transparent`
                : "border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500"
            )}
          >
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  getStatusColor(status)
                )}
              />
              <span>{venue.name}</span>
            </div>
            
            {isSelected && (
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-white/20 text-white border-none"
              >
                {getStatusText(status)}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}