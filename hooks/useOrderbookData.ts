'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface OrderbookLevel {
  price: number;
  size: number;
  total: number;
}

interface OrderbookData {
  bids: OrderbookLevel[];
  asks: OrderbookLevel[];
  timestamp: number;
}

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

// Mock data generator for demonstration
const generateMockOrderbook = (symbol: string): OrderbookData => {
  const basePrice = symbol.startsWith('BTC') ? 45000 : 
                   symbol.startsWith('ETH') ? 2500 : 
                   symbol.startsWith('SOL') ? 100 : 1000;
  
  const spread = basePrice * 0.001; // 0.1% spread
  const midPrice = basePrice + (Math.random() - 0.5) * basePrice * 0.02; // ±2% variation
  
  const generateLevels = (isAsk: boolean, levels: number = 15): OrderbookLevel[] => {
    const levels_array: OrderbookLevel[] = [];
    let total = 0;
    
    for (let i = 0; i < levels; i++) {
      const priceOffset = (i + 1) * (spread / 2) * (Math.random() * 0.5 + 0.75);
      const price = isAsk ? 
        midPrice + priceOffset : 
        midPrice - priceOffset;
      
      const size = Math.random() * 5 + 0.1;
      total += size;
      
      levels_array.push({
        price: Number(price.toFixed(2)),
        size: Number(size.toFixed(4)),
        total: Number(total.toFixed(4))
      });
    }
    
    return levels_array;
  };

  return {
    bids: generateLevels(false),
    asks: generateLevels(true),
    timestamp: Date.now()
  };
};

export function useOrderbookData(venue: 'okx' | 'bybit' | 'deribit', symbol: string) {
  const [orderbookData, setOrderbookData] = useState<OrderbookData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    setConnectionStatus('connecting');
    setError(null);
    setIsLoading(true);

    // Simulate connection delay
    setTimeout(() => {
      setConnectionStatus('connected');
      setIsLoading(false);
      
      // Generate initial data
      setOrderbookData(generateMockOrderbook(symbol));
      
      // Set up real-time updates
      intervalRef.current = setInterval(() => {
        setOrderbookData(generateMockOrderbook(symbol));
      }, 1000 + Math.random() * 2000); // Update every 1-3 seconds
      
    }, 1000 + Math.random() * 2000);

  }, [symbol]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setConnectionStatus('disconnected');
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(connect, 500);
  }, [disconnect, connect]);

  // Connect when venue or symbol changes
  useEffect(() => {
    connect();
    return disconnect;
  }, [venue, symbol, connect, disconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    orderbookData,
    connectionStatus,
    isLoading,
    error,
    reconnect
  };
}