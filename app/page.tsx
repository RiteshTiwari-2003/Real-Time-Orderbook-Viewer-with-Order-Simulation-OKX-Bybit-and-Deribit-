'use client';

import { useState, useEffect } from 'react';
import { OrderbookDisplay } from '@/components/OrderbookDisplay';
import { OrderSimulationForm } from '@/components/OrderSimulationForm';
import { MarketDepthChart } from '@/components/MarketDepthChart';
import { VenueSelector } from '@/components/VenueSelector';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { useOrderbookData } from '@/hooks/useOrderbookData';
import { useOrderSimulation } from '@/hooks/useOrderSimulation';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TradingDashboard() {
  const [selectedVenue, setSelectedVenue] = useState<'okx' | 'bybit' | 'deribit'>('okx');
  const [selectedSymbol, setSelectedSymbol] = useState('BTC-USDT');
  
  const {
    orderbookData,
    connectionStatus,
    isLoading,
    error,
    reconnect
  } = useOrderbookData(selectedVenue, selectedSymbol);

  const {
    simulatedOrder,
    orderMetrics,
    simulateOrder,
    clearSimulation
  } = useOrderSimulation(orderbookData);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">GoQuant Orderbook Viewer</h1>
              <ConnectionStatus 
                venue={selectedVenue} 
                status={connectionStatus} 
                onReconnect={reconnect}
              />
            </div>
            <VenueSelector 
              selectedVenue={selectedVenue}
              onVenueChange={setSelectedVenue}
              connectionStatuses={{ [selectedVenue]: connectionStatus }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Panel - Orderbook */}
          <div className="xl:col-span-1">
            <Card className="bg-slate-900/50 border-slate-800">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    {selectedVenue.toUpperCase()} Orderbook
                  </h2>
                  <div className="text-sm text-slate-400">
                    {selectedSymbol}
                  </div>
                </div>
                
                <OrderbookDisplay
                  venue={selectedVenue}
                  symbol={selectedSymbol}
                  orderbookData={orderbookData}
                  simulatedOrder={simulatedOrder}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </Card>
          </div>

          {/* Center Panel - Charts and Metrics */}
          <div className="xl:col-span-1">
            <div className="space-y-6">
              {/* Market Depth Chart */}
              <Card className="bg-slate-900/50 border-slate-800">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Market Depth</h3>
                  <MarketDepthChart
                    orderbookData={orderbookData}
                    simulatedOrder={simulatedOrder}
                    height={300}
                  />
                </div>
              </Card>

              {/* Order Metrics */}
              {orderMetrics && (
                <Card className="bg-slate-900/50 border-slate-800">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Order Impact Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-sm text-slate-400">Est. Fill %</div>
                        <div className="text-lg font-mono text-white">
                          {orderMetrics.fillPercentage.toFixed(1)}%
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-sm text-slate-400">Slippage</div>
                        <div className="text-lg font-mono text-red-400">
                          {orderMetrics.slippage.toFixed(4)}%
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-sm text-slate-400">Market Impact</div>
                        <div className="text-lg font-mono text-yellow-400">
                          ${orderMetrics.marketImpact.toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-sm text-slate-400">Est. Fill Time</div>
                        <div className="text-lg font-mono text-blue-400">
                          {orderMetrics.estimatedFillTime}s
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Right Panel - Order Simulation */}
          <div className="xl:col-span-1">
            <Card className="bg-slate-900/50 border-slate-800">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Order Simulation</h3>
                <OrderSimulationForm
                  venue={selectedVenue}
                  symbol={selectedSymbol}
                  onSymbolChange={setSelectedSymbol}
                  onSimulateOrder={simulateOrder}
                  onClearSimulation={clearSimulation}
                  isLoading={isLoading}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile Tabs for smaller screens */}
        <div className="xl:hidden mt-6">
          <Tabs defaultValue="orderbook" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="orderbook" className="data-[state=active]:bg-slate-700">
                Orderbook
              </TabsTrigger>
              <TabsTrigger value="chart" className="data-[state=active]:bg-slate-700">
                Depth Chart
              </TabsTrigger>
              <TabsTrigger value="simulation" className="data-[state=active]:bg-slate-700">
                Simulation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orderbook" className="mt-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <div className="p-4">
                  <OrderbookDisplay
                    venue={selectedVenue}
                    symbol={selectedSymbol}
                    orderbookData={orderbookData}
                    simulatedOrder={simulatedOrder}
                    isLoading={isLoading}
                    error={error}
                    compact={true}
                  />
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="chart" className="mt-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <div className="p-4">
                  <MarketDepthChart
                    orderbookData={orderbookData}
                    simulatedOrder={simulatedOrder}
                    height={250}
                  />
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="simulation" className="mt-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <div className="p-4">
                  <OrderSimulationForm
                    venue={selectedVenue}
                    symbol={selectedSymbol}
                    onSymbolChange={setSelectedSymbol}
                    onSimulateOrder={simulateOrder}
                    onClearSimulation={clearSimulation}
                    isLoading={isLoading}
                    compact={true}
                  />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}