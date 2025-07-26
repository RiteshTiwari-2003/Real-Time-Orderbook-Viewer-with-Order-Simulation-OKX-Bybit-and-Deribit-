'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, AlertTriangle } from 'lucide-react';

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

interface SimulatedOrder {
  side: 'buy' | 'sell';
  price?: number;
  quantity: number;
  type: 'market' | 'limit';
}

interface OrderbookDisplayProps {
  venue: 'okx' | 'bybit' | 'deribit';
  symbol: string;
  orderbookData: OrderbookData | null;
  simulatedOrder: SimulatedOrder | null;
  isLoading: boolean;
  error: string | null;
  compact?: boolean;
}

export function OrderbookDisplay({
  venue,
  symbol,
  orderbookData,
  simulatedOrder,
  isLoading,
  error,
  compact = false
}: OrderbookDisplayProps) {
  const { bids, asks, spread, midPrice } = useMemo(() => {
    if (!orderbookData || !orderbookData.bids.length || !orderbookData.asks.length) {
      return { bids: [], asks: [], spread: 0, midPrice: 0 };
    }

    const topBid = orderbookData.bids[0]?.price || 0;
    const topAsk = orderbookData.asks[0]?.price || 0;
    const spread = topAsk - topBid;
    const midPrice = (topBid + topAsk) / 2;

    return {
      bids: orderbookData.bids.slice(0, compact ? 10 : 15),
      asks: orderbookData.asks.slice(0, compact ? 10 : 15).reverse(),
      spread,
      midPrice
    };
  }, [orderbookData, compact]);

  const maxTotal = useMemo(() => {
    if (!bids.length && !asks.length) return 0;
    const maxBidTotal = Math.max(...bids.map(b => b.total));
    const maxAskTotal = Math.max(...asks.map(a => a.total));
    return Math.max(maxBidTotal, maxAskTotal);
  }, [bids, asks]);

  const getOrderHighlight = (price: number, side: 'bid' | 'ask') => {
    if (!simulatedOrder) return '';
    
    if (simulatedOrder.type === 'market') {
      // Market orders fill at best available prices
      return '';
    }
    
    if (simulatedOrder.type === 'limit' && simulatedOrder.price) {
      if (simulatedOrder.side === 'buy' && side === 'bid' && price <= simulatedOrder.price) {
        return 'ring-2 ring-green-500 bg-green-500/10';
      }
      if (simulatedOrder.side === 'sell' && side === 'ask' && price >= simulatedOrder.price) {
        return 'ring-2 ring-red-500 bg-red-500/10';
      }
    }
    
    return '';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          <span className="text-slate-400">Loading orderbook...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-red-400">
          <AlertTriangle className="h-5 w-5" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!orderbookData || (!bids.length && !asks.length)) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-slate-400">No orderbook data available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-3 text-xs font-medium text-slate-400 px-2">
        <div>Price ({symbol.split('-')[1]})</div>
        <div className="text-right">Size</div>
        <div className="text-right">Total</div>
      </div>

      {/* Asks (Sell orders) */}
      <div className="space-y-1">
        {asks.map((ask, index) => (
          <div
            key={`ask-${ask.price}-${index}`}
            className={cn(
              "relative grid grid-cols-3 text-sm py-1 px-2 rounded hover:bg-red-500/5 transition-colors",
              getOrderHighlight(ask.price, 'ask')
            )}
          >
            <div
              className="absolute inset-y-0 right-0 bg-red-500/10 transition-all duration-300"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            />
            <div className="relative z-10 font-mono text-red-400">
              {ask.price.toFixed(2)}
            </div>
            <div className="relative z-10 text-right font-mono text-slate-300">
              {ask.size.toFixed(4)}
            </div>
            <div className="relative z-10 text-right font-mono text-slate-400">
              {ask.total.toFixed(4)}
            </div>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="border-t border-b border-slate-700 py-2 px-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Spread</span>
          <span className="font-mono text-yellow-400">
            {spread.toFixed(2)} ({((spread / midPrice) * 100).toFixed(3)}%)
          </span>
        </div>
        <div className="flex justify-between items-center text-xs mt-1">
          <span className="text-slate-500">Mid Price</span>
          <span className="font-mono text-slate-300">{midPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Bids (Buy orders) */}
      <div className="space-y-1">
        {bids.map((bid, index) => (
          <div
            key={`bid-${bid.price}-${index}`}
            className={cn(
              "relative grid grid-cols-3 text-sm py-1 px-2 rounded hover:bg-green-500/5 transition-colors",
              getOrderHighlight(bid.price, 'bid')
            )}
          >
            <div
              className="absolute inset-y-0 right-0 bg-green-500/10 transition-all duration-300"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <div className="relative z-10 font-mono text-green-400">
              {bid.price.toFixed(2)}
            </div>
            <div className="relative z-10 text-right font-mono text-slate-300">
              {bid.size.toFixed(4)}
            </div>
            <div className="relative z-10 text-right font-mono text-slate-400">
              {bid.total.toFixed(4)}
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Order Indicator */}
      {simulatedOrder && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="text-sm font-medium text-blue-400 mb-1">Simulated Order</div>
          <div className="text-xs text-slate-400 space-y-1">
            <div>Type: {simulatedOrder.type.toUpperCase()}</div>
            <div>Side: {simulatedOrder.side.toUpperCase()}</div>
            <div>Quantity: {simulatedOrder.quantity}</div>
            {simulatedOrder.price && (
              <div>Price: {simulatedOrder.price.toFixed(2)}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}