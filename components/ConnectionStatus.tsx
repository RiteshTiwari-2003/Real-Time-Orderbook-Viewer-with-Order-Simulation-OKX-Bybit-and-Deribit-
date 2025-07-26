'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectionStatusProps {
  venue: 'okx' | 'bybit' | 'deribit';
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  onReconnect: () => void;
}

export function ConnectionStatus({ venue, status, onReconnect }: ConnectionStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'connecting':
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <WifiOff className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'connecting': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'error': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'error': return 'Connection Error';
      default: return 'Disconnected';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Badge className={cn("flex items-center space-x-2 px-3 py-1", getStatusColor())}>
        {getStatusIcon()}
        <span className="text-sm font-medium">{getStatusText()}</span>
      </Badge>

      {(status === 'disconnected' || status === 'error') && (
        <Button
          size="sm"
          variant="outline"
          onClick={onReconnect}
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Reconnect
        </Button>
      )}

      <div className="text-xs text-slate-500">
        {venue.toUpperCase()} WebSocket
      </div>
    </div>
  );
}