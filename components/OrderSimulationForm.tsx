'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Play, X } from 'lucide-react';

interface OrderSimulationFormProps {
  venue: 'okx' | 'bybit' | 'deribit';
  symbol: string;
  onSymbolChange: (symbol: string) => void;
  onSimulateOrder: (order: SimulatedOrderInput) => void;
  onClearSimulation: () => void;
  isLoading: boolean;
  compact?: boolean;
}

interface SimulatedOrderInput {
  venue: 'okx' | 'bybit' | 'deribit';
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  price?: number;
  quantity: number;
  timing: 'immediate' | '5s' | '10s' | '30s';
}

const POPULAR_SYMBOLS = [
  'BTC-USDT', 'ETH-USDT', 'BTC-USD', 'ETH-USD',
  'SOL-USDT', 'ADA-USDT', 'DOT-USDT', 'LINK-USDT'
];

export function OrderSimulationForm({
  venue,
  symbol,
  onSymbolChange,
  onSimulateOrder,
  onClearSimulation,
  isLoading,
  compact = false
}: OrderSimulationFormProps) {
  const [formData, setFormData] = useState({
    side: 'buy' as 'buy' | 'sell',
    type: 'limit' as 'market' | 'limit',
    price: '',
    quantity: '',
    timing: 'immediate' as 'immediate' | '5s' | '10s' | '30s'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (formData.type === 'limit' && (!formData.price || parseFloat(formData.price) <= 0)) {
      newErrors.price = 'Price must be greater than 0 for limit orders';
    }

    if (!symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const order: SimulatedOrderInput = {
      venue,
      symbol,
      side: formData.side,
      type: formData.type,
      price: formData.type === 'limit' ? parseFloat(formData.price) : undefined,
      quantity: parseFloat(formData.quantity),
      timing: formData.timing
    };

    onSimulateOrder(order);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Venue Display */}
      <div>
        <Label className="text-sm font-medium text-slate-300">Venue</Label>
        <div className={cn(
          "mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm",
          "capitalize font-medium text-white"
        )}>
          {venue.toUpperCase()}
        </div>
      </div>

      {/* Symbol Input */}
      <div>
        <Label htmlFor="symbol" className="text-sm font-medium text-slate-300">
          Symbol
        </Label>
        <div className="mt-1 space-y-2">
          <Input
            id="symbol"
            value={symbol}
            onChange={(e) => onSymbolChange(e.target.value.toUpperCase())}
            placeholder="BTC-USDT"
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
          {!compact && (
            <div className="flex flex-wrap gap-1">
              {POPULAR_SYMBOLS.map((sym) => (
                <Button
                  key={sym}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onSymbolChange(sym)}
                  className="h-6 px-2 text-xs bg-slate-800 border-slate-600 hover:bg-slate-700 text-slate-300"
                >
                  {sym}
                </Button>
              ))}
            </div>
          )}
        </div>
        {errors.symbol && (
          <p className="mt-1 text-sm text-red-400">{errors.symbol}</p>
        )}
      </div>

      {/* Order Type and Side */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-slate-300">Side</Label>
          <Select value={formData.side} onValueChange={(value: 'buy' | 'sell') => 
            handleInputChange('side', value)
          }>
            <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="buy" className="text-green-400">Buy</SelectItem>
              <SelectItem value="sell" className="text-red-400">Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-300">Type</Label>
          <Select value={formData.type} onValueChange={(value: 'market' | 'limit') => 
            handleInputChange('type', value)
          }>
            <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="market">Market</SelectItem>
              <SelectItem value="limit">Limit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price (for limit orders) */}
      {formData.type === 'limit' && (
        <div>
          <Label htmlFor="price" className="text-sm font-medium text-slate-300">
            Price
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="0.00"
            className="mt-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-400">{errors.price}</p>
          )}
        </div>
      )}

      {/* Quantity */}
      <div>
        <Label htmlFor="quantity" className="text-sm font-medium text-slate-300">
          Quantity
        </Label>
        <Input
          id="quantity"
          type="number"
          step="0.0001"
          value={formData.quantity}
          onChange={(e) => handleInputChange('quantity', e.target.value)}
          placeholder="0.0000"
          className="mt-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-400">{errors.quantity}</p>
        )}
      </div>

      {/* Timing Simulation */}
      <div>
        <Label className="text-sm font-medium text-slate-300">Timing</Label>
        <Select value={formData.timing} onValueChange={(value: 'immediate' | '5s' | '10s' | '30s') => 
          handleInputChange('timing', value)
        }>
          <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="immediate">Immediate</SelectItem>
            <SelectItem value="5s">5s Delay</SelectItem>
            <SelectItem value="10s">10s Delay</SelectItem>
            <SelectItem value="30s">30s Delay</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          Simulate Order
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onClearSimulation}
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Order Preview */}
      {formData.quantity && (formData.type === 'market' || formData.price) && (
        <Card className="mt-4 p-3 bg-slate-800/50 border-slate-700">
          <div className="text-sm font-medium text-slate-300 mb-2">Order Preview</div>
          <div className="text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Side:</span>
              <span className={formData.side === 'buy' ? 'text-green-400' : 'text-red-400'}>
                {formData.side.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="text-white">{formData.type.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="text-white font-mono">{formData.quantity}</span>
            </div>
            {formData.type === 'limit' && formData.price && (
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="text-white font-mono">{formData.price}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Timing:</span>
              <span className="text-yellow-400">{formData.timing}</span>
            </div>
          </div>
        </Card>
      )}
    </form>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}