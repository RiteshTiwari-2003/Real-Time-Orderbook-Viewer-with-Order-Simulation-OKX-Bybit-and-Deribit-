'use client';

import { useState, useMemo } from 'react';

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
  venue: 'okx' | 'bybit' | 'deribit';
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  price?: number;
  quantity: number;
  timing: 'immediate' | '5s' | '10s' | '30s';
}

interface OrderMetrics {
  fillPercentage: number;
  slippage: number;
  marketImpact: number;
  estimatedFillTime: number;
  averageFillPrice: number;
  totalCost: number;
}

export function useOrderSimulation(orderbookData: OrderbookData | null) {
  const [simulatedOrder, setSimulatedOrder] = useState<SimulatedOrder | null>(null);

  const orderMetrics = useMemo((): OrderMetrics | null => {
    if (!simulatedOrder || !orderbookData) return null;

    const { side, type, price, quantity } = simulatedOrder;
    const relevantLevels = side === 'buy' ? orderbookData.asks : orderbookData.bids;
    
    if (!relevantLevels.length) return null;

    let remainingQuantity = quantity;
    let totalCost = 0;
    let totalFilled = 0;
    let weightedPriceSum = 0;

    if (type === 'market') {
      // Market order - fill against best available prices
      for (const level of relevantLevels) {
        if (remainingQuantity <= 0) break;
        
        const fillQuantity = Math.min(remainingQuantity, level.size);
        totalCost += fillQuantity * level.price;
        totalFilled += fillQuantity;
        weightedPriceSum += fillQuantity * level.price;
        remainingQuantity -= fillQuantity;
      }
    } else if (type === 'limit' && price) {
      // Limit order - only fill at specified price or better
      for (const level of relevantLevels) {
        const canFill = side === 'buy' ? level.price <= price : level.price >= price;
        if (!canFill || remainingQuantity <= 0) break;
        
        const fillQuantity = Math.min(remainingQuantity, level.size);
        totalCost += fillQuantity * level.price;
        totalFilled += fillQuantity;
        weightedPriceSum += fillQuantity * level.price;
        remainingQuantity -= fillQuantity;
      }
    }

    const fillPercentage = (totalFilled / quantity) * 100;
    const averageFillPrice = totalFilled > 0 ? weightedPriceSum / totalFilled : 0;
    
    // Calculate slippage
    const bestPrice = relevantLevels[0]?.price || 0;
    const slippage = totalFilled > 0 ? 
      Math.abs((averageFillPrice - bestPrice) / bestPrice) * 100 : 0;
    
    // Market impact (simplified calculation)
    const marketImpact = totalCost * 0.001; // 0.1% of total value
    
    // Estimated fill time based on timing and market conditions
    const timingMultiplier = {
      'immediate': 1,
      '5s': 5,
      '10s': 10,
      '30s': 30
    }[simulatedOrder.timing];
    
    const baseTime = type === 'market' ? 0.1 : Math.random() * 5 + 1;
    const estimatedFillTime = baseTime * timingMultiplier;

    return {
      fillPercentage,
      slippage,
      marketImpact,
      estimatedFillTime,
      averageFillPrice,
      totalCost
    };
  }, [simulatedOrder, orderbookData]);

  const simulateOrder = (order: SimulatedOrder) => {
    setSimulatedOrder(order);
  };

  const clearSimulation = () => {
    setSimulatedOrder(null);
  };

  return {
    simulatedOrder,
    orderMetrics,
    simulateOrder,
    clearSimulation
  };
}