# GoQuant Orderbook Viewer

A sophisticated real-time cryptocurrency orderbook viewer with advanced order simulation capabilities. This application provides traders with comprehensive market depth analysis, order impact visualization, and multi-venue comparison tools.

## 📚 Project Overview

This application is a modern, real-time trading tool built using Next.js 13+ and TypeScript. It provides traders with:
- Real-time orderbook visualization from multiple exchanges (OKX, Bybit, Deribit)
- Advanced order simulation capabilities
- Comprehensive market depth analysis
- Interactive trading interface optimized for both desktop and mobile
- Professional-grade trading UI with dark theme

## 🔧 Core Technologies & Libraries

### Frontend Framework
- **Next.js 13+**: Full-stack React framework with App Router for optimal performance
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For utility-first styling with custom trading-focused design system

### UI Components & Styling
- **Radix UI**: Accessible, unstyled component primitives
- **shadcn/ui**: Beautiful, customizable components built on Radix UI
- **TailwindCSS**: Utility-first CSS framework
- **sonner**: Toast notifications for user feedback
- **lucide-react**: Icon library for consistent UI elements

### Data Visualization
- **recharts**: Advanced charting library for market depth visualization
- **react-day-picker**: For date/time selection in order simulation

### State Management & Forms
- **react-hook-form**: For form handling and validation
- **@hookform/resolvers**: For Zod integration with form validation
- **zod**: Schema validation and type safety

### Layout & Responsiveness
- **react-resizable-panels**: For flexible layout management
- **clsx**: For conditional class names
- **tailwind-merge**: For utility class merging
- **tailwindcss-animate**: For smooth animations

### Development Tools
- **ESLint**: For code linting and style enforcement
- **PostCSS**: For CSS processing
- **Autoprefixer**: For CSS vendor prefixing

### Date & Time Handling
- **date-fns**: For robust date manipulation and formatting

### Interactive Elements
- **embla-carousel-react**: For interactive market data visualization
- **input-otp**: For secure input handling
- **cmdk**: For command palette functionality
- **vaul**: For modal and overlay components

### UI Components (Radix UI)
- **@radix-ui/react-accordion**: For collapsible content
- **@radix-ui/react-alert-dialog**: For alert notifications
- **@radix-ui/react-aspect-ratio**: For maintaining aspect ratios
- **@radix-ui/react-avatar**: For user avatars
- **@radix-ui/react-checkbox**: For form inputs
- **@radix-ui/react-collapsible**: For collapsible sections
- **@radix-ui/react-context-menu**: For right-click menus
- **@radix-ui/react-dialog**: For modal dialogs
- **@radix-ui/react-dropdown-menu**: For dropdown selections
- **@radix-ui/react-hover-card**: For interactive tooltips
- **@radix-ui/react-label**: For form labels
- **@radix-ui/react-menubar**: For navigation menus
- **@radix-ui/react-navigation-menu**: For navigation
- **@radix-ui/react-popover**: For pop-up content
- **@radix-ui/react-progress**: For progress indicators
- **@radix-ui/react-radio-group**: For radio button groups
- **@radix-ui/react-scroll-area**: For scrollable content
- **@radix-ui/react-select**: For dropdown selections
- **@radix-ui/react-separator**: For visual separation
- **@radix-ui/react-slider**: For range inputs
- **@radix-ui/react-slot**: For component composition
- **@radix-ui/react-switch**: For toggle switches
- **@radix-ui/react-tabs**: For tabbed navigation
- **@radix-ui/react-toast**: For notifications
- **@radix-ui/react-toggle**: For toggle buttons
- **@radix-ui/react-toggle-group**: For grouped toggles
- **@radix-ui/react-tooltip**: For tooltips

## 📋 Assumptions

1. **Development Environment**
   - Node.js 18+ is installed
   - npm or yarn is available
   - Development is done in a TypeScript environment

2. **API Integration**
   - Exchanges provide stable WebSocket APIs
   - Rate limits are consistent across exchanges
   - API endpoints remain stable between versions

3. **User Experience**
   - Users are familiar with trading concepts
   - Users have basic understanding of cryptocurrency markets
   - Users have access to modern web browsers

## 📖 API Documentation References

### Exchange APIs
- [OKX API Documentation](https://www.okx.com/docs-v5)
- [Bybit API Documentation](https://bybit-exchange.github.io/docs/v5)
- [Deribit API Documentation](https://docs.deribit.com/v2)

### Library Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Recharts Documentation](https://recharts.org/en-US)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ⚠️ Rate Limiting Considerations

### Exchange Rate Limits
- **OKX**: ~20 requests/second for public endpoints
- **Bybit**: ~20 requests/second for public endpoints
- **Deribit**: ~20 requests/second for public endpoints

### Implementation Details
- WebSocket connections are preferred over REST for real-time data
- Rate limiting is handled at the exchange level
- The application implements exponential backoff for connection retries
- Mock data is used in development to avoid rate limiting issues

### Best Practices
- Use WebSocket connections for real-time data
- Implement proper error handling for rate limit errors
- Use batch requests where possible
- Implement caching for frequently accessed data
- Monitor API usage and adjust accordingly

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

## 🚀 Deploying to Vercel

### Prerequisites
- GitHub account (you already have this since your code is on GitHub)
- Vercel account (free to sign up)

### Step-by-Step Deployment Guide

1. **Sign Up for Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Click on "Sign Up" in the top right corner
   - Choose "Sign up with GitHub" (recommended)
   - Grant Vercel access to your GitHub repositories

2. **Import Your Project**
   - After signing up, you'll be redirected to the Vercel dashboard
   - Click on the "+" button in the top left corner
   - Select "Import Project"
   - Click on "Continue with GitHub"
   - Find your repository ("Real-Time-Orderbook-Viewer-with-Order-Simulation-OKX-Bybit-and-Deribit-")
   - Click "Deploy"

3. **Configure Deployment Settings**
   - Vercel will automatically detect your Next.js project
   - It will use the following settings from your package.json:
     - Build command: `next build`
     - Start command: `next start`
   - If prompted, keep these default settings

4. **Wait for Deployment**
   - Vercel will:
     1. Clone your repository
     2. Install dependencies
     3. Build your project
     4. Deploy to production
   - This process typically takes 2-3 minutes

5. **Access Your Website**
   - Once deployment is complete, Vercel will provide a deployment URL
   - The URL will look like: `https://your-project-name.vercel.app`
   - Click on the URL to view your live website

6. **Automatic Deployment**
   - Vercel will automatically deploy new versions whenever you push to your main branch
   - No manual intervention needed for future updates

7. **Custom Domain (Optional)**
   - If you want to use a custom domain:
     1. Go to your project settings in Vercel
     2. Click on "Domains"
     3. Add your custom domain
     4. Follow Vercel's DNS setup instructions

8. **Environment Variables**
   - If your project requires environment variables:
     1. Go to your project settings
     2. Click on "Environment Variables"
     3. Add your variables under "Production"

### Troubleshooting Tips

1. **Build Errors**
   - Check the deployment logs in Vercel dashboard
   - Common issues:
     - Missing dependencies
     - Incorrect build settings
     - TypeScript errors

2. **Performance Issues**
   - Use Vercel's "Performance" tab to monitor:
     - Page load times
     - Build times
     - API performance

3. **Accessing Logs**
   - Go to your project in Vercel
   - Click on "Logs"
   - View both build logs and runtime logs

### Best Practices

1. **Commit Messages**
   - Use clear commit messages for better deployment tracking
   - Example: "fix: resolve build error in orderbook component"

2. **Branch Management**
   - Keep your main branch clean and stable
   - Use feature branches for development
   - Only merge to main when ready for production

3. **Monitoring**
   - Use Vercel's analytics to monitor:
     - Page views
     - Error rates
     - Load times

### Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Next.js on Vercel](https://nextjs.org/docs/deployment)