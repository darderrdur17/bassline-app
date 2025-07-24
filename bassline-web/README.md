# Bassline Web

A web version of the Bassline app - an interactive map of San Francisco's best bars, restaurants, and nightlife venues. Discover the perfect spot for your night out with mood-based venue discovery.

## 🎯 Project Overview

**Bassline Web** is a curated nightlife discovery platform that helps users find the perfect venue based on their mood, music preferences, and location. Unlike generic venue apps, Bassline focuses specifically on San Francisco's nightlife scene with detailed venue information, crowd levels, and social integration.

### Key Features

- **🎵 Mood-Based Discovery** - "What are you feeling tonight?"
- **🗺️ Interactive Map** - Browse venues with colored pins (Bar=Blue, Restaurant=Red, Lounge=Yellow, Club=Green)
- **🔍 Smart Search** - Search by venue name, neighborhood, music genre, or mood
- **📱 Mobile Responsive** - Works perfectly on phones, tablets, and desktop
- **📊 Real-time Info** - Crowd levels, wait times, pricing, dress codes
- **🔗 Social Integration** - Direct links to Instagram, Yelp, and booking platforms

### Why This Exists

While apps like Yelp and Google Maps show venues, they lack the **curated nightlife experience** that Bassline provides:

- **Yelp** - Generic reviews, not nightlife-focused
- **Google Maps** - Basic venue info, no mood-based discovery
- **Foursquare** - Check-ins but no curated experience
- **Bassline** - **Curated, mood-driven, nightlife-specific discovery**

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17.0 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd bassline-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
bassline-web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   └── page.tsx           # Main landing page
│   ├── components/             # React components
│   │   └── Map.tsx            # Interactive map component
│   ├── data/                   # Venue data and types
│   │   └── venues.ts          # Venue database
│   ├── lib/                    # Utilities and theme
│   │   └── theme.ts           # Design system
│   └── types/                  # TypeScript definitions
│       └── venue.ts           # Venue interface
├── public/                     # Static assets
└── package.json               # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary Red**: `#E53935` (Bassline brand)
- **Background**: `#F5F5DC` (Cream/beige)
- **Pin Colors**: 
  - Bar: `#2196F3` (Blue)
  - Restaurant: `#E53935` (Red)
  - Lounge: `#FFEB3B` (Yellow)
  - Club: `#4CAF50` (Green)

### Typography
- **Brand**: Bold, uppercase for "BASSLINE" title
- **Body**: Clean, readable fonts for descriptions
- **Mobile-first**: Responsive design for all devices

## 📊 Venue Data

Each venue includes:
- **Basic Info**: Name, type, neighborhood, pricing
- **Atmosphere**: Ambiance, music genre, crowd type
- **Practical Details**: Hours, dress code, wait times
- **Social Links**: Instagram, Yelp, booking platforms
- **Rich Content**: Photos, descriptions, accolades

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Venues

1. **Edit** `src/data/venues.ts`
2. **Add venue object** with all required fields
3. **Include coordinates** for map placement
4. **Add social links** and photos
5. **Test** by running the dev server

### Customizing the Map

- **Map Center**: Edit coordinates in `Map.tsx`
- **Pin Colors**: Modify `pinColors` object
- **Zoom Levels**: Adjust in `MapContainer` props
- **Tile Layer**: Change map style in `TileLayer`

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts** and your site will be live!

### Netlify

1. **Build the project**
```bash
npm run build
```

2. **Upload** the `out` folder to Netlify
3. **Configure** build settings if needed

### Other Platforms

The app works on any static hosting service:
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Firebase Hosting**
- **DigitalOcean App Platform**

## 📱 Mobile App Integration

This web version complements the **Bassline mobile app**:

- **Web**: Discovery and planning
- **Mobile**: Full experience with advanced features
- **Both**: Complete ecosystem

**Strategy**: Web drives discovery → Mobile provides full experience

## 🎯 Business Model

### Revenue Streams
- **Venue Partnerships**: Featured listings
- **Local Advertising**: Sponsored venues
- **Premium Features**: Advanced filters, exclusive venues
- **Data Insights**: Venue analytics and trends

### User Acquisition
- **SEO**: Appears in "SF nightlife" searches
- **Social Sharing**: Viral venue recommendations
- **Word of Mouth**: Easy URL sharing
- **Mobile App**: Web users download full app

## 🔮 Future Features

### Phase 2
- [ ] **Advanced Filtering**: Price, ambiance, crowd density
- [ ] **User Reviews**: Ratings and comments
- [ ] **Real-time Status**: Live crowd levels
- [ ] **Directions**: Navigation integration

### Phase 3
- [ ] **PWA**: Install as mobile app
- [ ] **Push Notifications**: Venue updates
- [ ] **Social Features**: User profiles, friends
- [ ] **Analytics**: User behavior insights

### Phase 4
- [ ] **Multi-city**: Expand beyond San Francisco
- [ ] **AI Recommendations**: Machine learning suggestions
- [ ] **Event Integration**: Special events, DJ nights
- [ ] **Monetization**: Premium subscriptions

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- **TypeScript**: All new code should be typed
- **Responsive**: Test on mobile, tablet, desktop
- **Performance**: Optimize for fast loading
- **Accessibility**: Follow WCAG guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Venue Data**: Curated from local knowledge and research
- **Map Integration**: Powered by Leaflet.js and OpenStreetMap
- **Design Inspiration**: Modern, clean nightlife aesthetic
- **Community**: San Francisco nightlife scene

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: support@bassline.com
- **Discord**: [Join our community](https://discord.gg/bassline)

---

**Made with ❤️ for San Francisco nightlife**
