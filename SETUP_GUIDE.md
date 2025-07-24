# Bassline Complete Setup Guide

This guide will walk you through setting up the entire Bassline ecosystem - both the React Native mobile app and the Next.js web version.

## 📱 Mobile App (React Native)

### Prerequisites
- **Node.js** 18.17.0 or higher
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (for Mac) or **Android Studio** (for Android development)

### Setup Instructions

1. **Navigate to mobile app directory**
```bash
cd Bassline-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on device/simulator**
- **iOS**: Press `i` in terminal or scan QR code with Camera app
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **Web**: Press `w` in terminal

### Mobile App Features
- Interactive map with venue pins
- Search and filtering
- Venue detail cards
- Social media integration
- Mood-based discovery

---

## 🌐 Web Version (Next.js)

### Prerequisites
- **Node.js** 18.17.0 or higher
- **npm** or **yarn**

### Setup Instructions

1. **Navigate to web app directory**
```bash
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

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Web App Features
- Interactive map with Leaflet.js
- Mobile-responsive design
- Search functionality
- Venue details and social links
- SEO-optimized for discovery

---

## 🔄 Data Synchronization

Both apps use the same venue data structure. To update venues:

### Mobile App
- Edit: `src/data/venues.js`
- Format: JavaScript object

### Web App
- Edit: `src/data/venues.ts`
- Format: TypeScript interface

### Keeping Data in Sync
1. **Update mobile app data** first
2. **Copy to web app** and convert to TypeScript
3. **Test both apps** to ensure consistency

---

## 🚀 Deployment

### Mobile App
1. **Build for production**
```bash
npx expo build:android  # or build:ios
```

2. **Submit to stores**
- **iOS**: App Store Connect
- **Android**: Google Play Console

### Web App
1. **Deploy to Vercel** (Recommended)
```bash
cd bassline-web
npx vercel
```

2. **Deploy to Netlify**
```bash
cd bassline-web
npm run build
# Upload 'out' folder to Netlify
```

---

## 🧪 Testing

### Mobile App Testing
```bash
# Run tests
npm test

# Test on different devices
npx expo start --ios
npx expo start --android
npx expo start --web
```

### Web App Testing
```bash
# Run tests
npm test

# Build test
npm run build

# Lint check
npm run lint
```

---

## 📊 Analytics & Monitoring

### Mobile App
- **Expo Analytics**: Built-in usage tracking
- **Crashlytics**: Error monitoring
- **App Store Connect**: Download metrics

### Web App
- **Google Analytics**: User behavior
- **Vercel Analytics**: Performance metrics
- **Search Console**: SEO performance

---

## 🔧 Development Workflow

### Adding New Features

1. **Plan the feature** for both platforms
2. **Implement mobile first** (React Native)
3. **Adapt to web** (Next.js)
4. **Test on both platforms**
5. **Deploy simultaneously**

### Code Organization

```
Bassline-main/           # Mobile app
├── src/
│   ├── screens/         # App screens
│   ├── components/      # Reusable components
│   ├── data/           # Venue data
│   └── styles/         # Theme and styling

bassline-web/            # Web app
├── src/
│   ├── app/            # Next.js pages
│   ├── components/     # React components
│   ├── data/          # Venue data (TypeScript)
│   └── lib/           # Utilities and theme
```

---

## 🎯 Business Strategy

### User Journey
1. **Discovery**: User finds web app via search/social
2. **Planning**: Browse venues, check details
3. **Action**: Download mobile app for full experience
4. **Engagement**: Use mobile app during night out

### Marketing Channels
- **SEO**: Web app appears in "SF nightlife" searches
- **Social Media**: Share venue recommendations
- **Word of Mouth**: Easy URL sharing
- **App Stores**: Mobile app discovery

### Revenue Model
- **Web**: Lead generation and discovery
- **Mobile**: Premium features and engagement
- **Both**: Venue partnerships and advertising

---

## 🐛 Troubleshooting

### Common Issues

#### Mobile App
- **Metro bundler issues**: Clear cache with `npx expo start --clear`
- **iOS simulator not working**: Reset simulator or use physical device
- **Android build errors**: Check Android SDK installation

#### Web App
- **Node.js version**: Ensure 18.17.0+ is installed
- **Port conflicts**: Change port with `npm run dev -- -p 3001`
- **Build errors**: Check TypeScript types and dependencies

### Getting Help
- **Documentation**: Check README files in each project
- **Issues**: Create GitHub issues for bugs
- **Community**: Join Discord for support

---

## 📈 Performance Optimization

### Mobile App
- **Image optimization**: Use Expo's image optimization
- **Bundle size**: Monitor with `expo doctor`
- **Memory usage**: Profile with React DevTools

### Web App
- **Lighthouse score**: Aim for 90+ on all metrics
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle analysis**: Use `@next/bundle-analyzer`

---

## 🔮 Future Roadmap

### Phase 1 (Current)
- ✅ Mobile app with map and search
- ✅ Web app for discovery
- ✅ Basic venue data

### Phase 2 (Next 3 months)
- [ ] User accounts and profiles
- [ ] Advanced filtering options
- [ ] Real-time venue status
- [ ] Social features

### Phase 3 (6 months)
- [ ] Multi-city expansion
- [ ] AI-powered recommendations
- [ ] Event integration
- [ ] Premium subscriptions

### Phase 4 (1 year)
- [ ] International markets
- [ ] Advanced analytics
- [ ] Partner integrations
- [ ] Mobile app marketplace

---

## 📞 Support & Resources

### Documentation
- **Mobile**: [Expo Docs](https://docs.expo.dev/)
- **Web**: [Next.js Docs](https://nextjs.org/docs)
- **Maps**: [Leaflet Docs](https://leafletjs.com/)

### Community
- **Discord**: [Bassline Community](https://discord.gg/bassline)
- **GitHub**: [Issues & Discussions](https://github.com/your-repo)
- **Email**: support@bassline.com

### Tools
- **Design**: Figma for UI/UX
- **Analytics**: Google Analytics, Vercel Analytics
- **Monitoring**: Sentry for error tracking
- **Deployment**: Vercel, Netlify, Expo EAS

---

**Happy coding! 🎉**

*This guide covers the complete Bassline ecosystem setup. For specific questions, check the individual README files in each project directory.* 