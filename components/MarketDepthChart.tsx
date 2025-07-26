'use client';

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface MarketDepthChartProps {
  orderbookData: OrderbookData | null;
  simulatedOrder: SimulatedOrder | null;
  height?: number;
}

export function MarketDepthChart({ 
  orderbookData, 
  simulatedOrder, 
  height = 400 
}: MarketDepthChartProps) {
  const chartData = useMemo(() => {
    if (!orderbookData || !orderbookData.bids.length || !orderbookData.asks.length) {
      return [];
    }

    const bids = [...orderbookData.bids].reverse();
    const asks = [...orderbookData.asks];

    const bidData = bids.map(bid => ({
      price: bid.price,
      bidDepth: bid.total,
      askDepth: 0,
      side: 'bid'
    }));

    const askData = asks.map(ask => ({
      price: ask.price,
      bidDepth: 0,
      askDepth: ask.total,
      side: 'ask'
    }));

    return [...bidData, ...askData].sort((a, b) => a.price - b.price);
  }, [orderbookData]);

  const midPrice = useMemo(() => {
    if (!orderbookData || !orderbookData.bids.length || !orderbookData.asks.length) {
      return 0;
    }
    return (orderbookData.bids[0].price + orderbookData.asks[0].price) / 2;
  }, [orderbookData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3">
          <p className="text-white font-mono text-sm">Price: ${Number(label).toFixed(2)}</p>
          {data.bidDepth > 0 && (
            <p className="text-green-400 text-sm">
              Bid Depth: {data.bidDepth.toFixed(4)}
            </p>
          )}
          {data.askDepth > 0 && (
            <p className="text-red-400 text-sm">
              Ask Depth: {data.askDepth.toFixed(4)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        No market depth data available
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="bidGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="askGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          
          <XAxis 
            dataKey="price" 
            stroke="#94a3b8"
            fontSize={12}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          
          <YAxis 
            stroke="#94a3b8"
            fontSize={12}
            tickFormatter={(value) => value.toFixed(2)}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="stepAfter"
            dataKey="bidDepth"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#bidGradient)"
            connectNulls={false}
          />
          
          <Area
            type="stepBefore"
            dataKey="askDepth"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#askGradient)"
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Mid Price Indicator */}
      {midPrice > 0 && (
        <div className="mt-2 text-center">
          <span className="text-xs text-slate-400">Mid Price: </span>
          <span className="text-sm font-mono text-yellow-400">${midPrice.toFixed(2)}</span>
        </div>
      )}

      {/* Simulated Order Indicator */}
      {simulatedOrder && simulatedOrder.price && (
        <div className="mt-2 text-center">
          <span className="text-xs text-slate-400">Simulated Order: </span>
          <span className={`text-sm font-mono ${
            simulatedOrder.side === 'buy' ? 'text-green-400' : 'text-red-400'
          }`}>
            {simulatedOrder.side.toUpperCase()} @ ${simulatedOrder.price.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}