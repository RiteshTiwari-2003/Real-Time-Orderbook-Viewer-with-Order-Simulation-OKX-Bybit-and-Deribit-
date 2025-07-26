# GoQuant Orderbook Viewer

A sophisticated real-time cryptocurrency orderbook viewer with advanced order simulation capabilities. This application provides traders with comprehensive market depth analysis, order impact visualization, and multi-venue comparison tools.

## 🚀 Features

### Core Functionality
- **Multi-Venue Support**: Real-time orderbook data from OKX, Bybit, and Deribit
- **Live Market Data**: WebSocket connections for real-time price and depth updates
- **Order Simulation**: Advanced order placement simulation with comprehensive metrics
- **Market Depth Visualization**: Interactive charts showing bid/ask depth and market structure
- **Responsive Design**: Optimized for both desktop and mobile trading environments

### Advanced Features
- **Order Impact Analysis**: Calculate fill percentage, slippage, and market impact
- **Timing Simulation**: Simulate order execution with different timing scenarios
- **Visual Order Placement**: See exactly where your order would sit in the orderbook
- **Connection Management**: Robust WebSocket handling with auto-reconnection
- **Professional Trading UI**: Dark theme optimized for extended trading sessions

## 🛠 Technical Implementation

### Architecture
- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom trading-focused design system
- **Charts**: Recharts for market depth visualization
- **UI Components**: Radix UI with shadcn/ui for consistent, accessible components
- **State Management**: React hooks with custom WebSocket management
- **TypeScript**: Full type safety throughout the application

### Real-Time Data
- WebSocket connections for live market data
- Intelligent reconnection logic with exponential backoff
- Mock data generation for demonstration (easily replaceable with real APIs)
- Efficient state updates to minimize re-renders

### Order Simulation Engine
- Accurate fill calculation based on orderbook depth
- Slippage and market impact estimation
- Support for both market and limit orders
- Timing scenario analysis

## 📱 Responsive Design

The application features a sophisticated responsive layout:
- **Desktop (xl+)**: Three-panel layout with orderbook, charts, and simulation form
- **Tablet (md-xl)**: Adaptive grid layout with optimized spacing
- **Mobile (<md)**: Tab-based navigation for optimal mobile trading experience

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) for actions and highlights
- **Success/Bids**: Green (#10b981) for buy orders and positive metrics
- **Danger/Asks**: Red (#ef4444) for sell orders and negative metrics
- **Warning**: Yellow (#f59e0b) for spread and timing indicators
- **Background**: Dark slate theme optimized for trading environments

### Typography
- **Primary**: Inter for UI text and readability
- **Monospace**: JetBrains Mono for numerical data and prices
- **Tabular Numbers**: Consistent alignment for financial data

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd orderbook-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🔌 API Integration

The application is designed to integrate with real cryptocurrency exchange APIs:

### Supported Exchanges
- **OKX**: REST API + WebSocket for real-time data
- **Bybit**: V5 API with WebSocket subscriptions  
- **Deribit**: REST + WebSocket for options and futures

### Implementation Notes
- All API calls include proper error handling and rate limiting
- WebSocket connections have automatic reconnection logic
- Fallback mechanisms for data retrieval when WebSocket is unavailable
- Environment variables for API keys and endpoints

## 📊 Order Simulation Metrics

The application calculates comprehensive order metrics:

- **Fill Percentage**: How much of the order can be filled
- **Slippage**: Price movement impact on execution
- **Market Impact**: Estimated effect on market prices
- **Average Fill Price**: Weighted average execution price
- **Estimated Fill Time**: Based on market conditions and timing

## 🎯 Demo Features

For demonstration purposes, the application includes:
- Mock market data generation with realistic price movements
- Simulated WebSocket connections with connection states
- Sample orderbook data for major cryptocurrency pairs
- Interactive order placement with visual feedback

## 🔐 Security Considerations

- No API keys stored in client-side code
- Proper input validation and sanitization
- Rate limiting considerations for API calls
- CORS handling for cross-origin requests

## 📈 Performance Optimization

- Efficient React hooks for state management
- Memoized calculations for expensive operations
- Optimized re-rendering with proper dependency arrays
- Lazy loading for non-critical components
- WebSocket connection pooling and management

## 🧪 Testing Strategy

The application includes comprehensive testing approaches:
- Unit tests for calculation functions
- Integration tests for WebSocket connections
- Visual regression tests for UI components
- Performance testing for real-time updates

## 📋 Future Enhancements

Potential improvements and features:
- Historical data analysis and backtesting
- Advanced charting with technical indicators
- Portfolio tracking and P&L calculation
- Multi-account order management
- Alerts and notifications system
- API rate limiting dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to the open-source community for the excellent tools and libraries
- Cryptocurrency exchanges for providing public APIs
- The React and Next.js teams for the robust framework
- Radix UI and shadcn/ui for accessible component primitives

---

Built with ❤️ for GoQuant technical assessment