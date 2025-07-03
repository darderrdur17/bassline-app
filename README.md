# **BASSLINE**

> _The city never sleeps — neither should you._

Bassline is a React-Native ✕ Expo mobile app that makes it ridiculously simple to decide **where to go out tonight in San Francisco** (with other cities coming soon). Search, swipe, and filter through an animated map of bars, clubs, lounges, and late-night spots to find the perfect vibe in seconds.

---

## 🚀 Why Bassline?

Your group chat is on fire, you're starving for a dance-floor, but Google Maps and generic lists don't tell you:

* **"Is this place actually open past 2 AM?"**
* **"Do I need to dress up?"**
* **"How packed is it right now?"**

Bassline answers all of the above with one thumb: live filters, visual crowd indicators, and a card-first design that surfaces exactly what you care about.

---

## ✨ Key Features

| Feature | What it does |
| ------- | ------------ |
| 🔍 **Smart Search** | Fuzzy search across name, neighborhood, music genre, vibes & tags. |
| 🗺️ **Interactive Map** | Scrollable preview with custom-colored markers and auto-centering on the selected venue. |
| 🪄 **One-tap Filters** | Filter by Area, Hours, Distance, Venue Type, Genre, Vibe Density, Price, Dress Code & Scene — all animated with `LayoutAnimation`. |
| 📊 **Live Results Counter** | See how many venues match as you type or toggle filters. |
| 💳 **Venue Hover Card** | Swipeable preview with hero image, quick facts, arrows for next/prev & close button that snaps the map back to default. |
| 🎨 **Custom Typography** | Anton, Bungee, Oswald & Roboto loaded with `expo-google-fonts` for a bold retro poster look. |
| 🏠 **Bottom-Tab Navigation** | Home (map), Explore, Saved, Social — built with React Navigation. |
| 📱 **iOS & Android Ready** | Runs in Expo Go, standalone builds or the web. |

---

## 🏗️  Tech Stack

* **React Native** 19 · **Expo** SDK 53  
* **React Navigation** Bottom Tabs & Stack  
* **expo-location** – user distance filter  
* **react-native-maps** – dark-themed Google Maps style  
* **expo-google-fonts** – Anton, Bungee, Oswald, Roboto  
* **react-native-reanimated & gesture-handler** – smooth UI  
* **CSV seed data** → `src/data/venues.js`  

---

## 📂 Project Structure (relevant bits)

```
Bassline-main/
  README.md 🚀
  bassline-app/
    App.js            ← loads fonts & navigator
    index.js          ← Expo entry point
    src/
      components/
        FilterPanel.js
        VenueCard.js
      navigation/
        AppNavigator.js
      screens/
        LandingScreen.js
        MapScreen.js
        ExploreScreen.js
        ...
      data/
        venues.js      ← mock venue dataset
      styles/
        theme.js       ← colors, spacing, typography
```

---

## 🛠️  Getting Started

1. **Clone & install**

   ```bash
   git clone https://github.com/your-org/bassline.git
   cd bassline-main/bassline-app
   npm install          # or yarn / pnpm
   ```

2. **Run in Expo**

   ```bash
   npx expo start -c    # clears Metro cache, opens dev tools
   ```

   • Press **i** to launch iOS simulator, **a** for Android, or scan the QR with Expo Go.  
   • Fonts are pre-loaded; splash screen stays up until they're ready.

3. **Populate real data (optional)**

   Replace `src/data/venues.js` with your own dataset or connect to a backend. The search & filter logic is all local JS — swap in a fetch() call and you're done.

---

## 📝 Configuration Notes

* **Fonts** are loaded in `App.js` via `useFonts`. Add more families by `expo install @expo-google-fonts/<name>` and dropping them into the object.
* **Default Map Region** is set in `MapScreen.js` — tweak lat/long & delta to your city.
* **Theme** lives in `src/styles/theme.js` (colors, spacing, typography). One stop shop for branding tweaks.

---

## 🗺️  Filter Logic

When the user types, taps a quick mood, or toggles a category pill:

1. `searchText`, `filters`, and/or `userLocation` update state.  
2. `useEffect` recomputes `filteredVenues` with fuzzy checks + category rules.  
3. Results badge & markers refresh instantly.  
4. Venue hover arrows traverse **filtered** list only (and keep map in sync).

---

## 🛣️  Roadmap

- [ ] Real-time crowd & wait data via a Firebase backend.  
- [ ] Social tab: share night plans with friends.  
- [ ] Offline tiles & caching.  
- [ ] Dark-mode & haptic feedback polish.

---

## 🤝 Contributing

PRs are welcome! Open an issue to discuss big changes. Please follow the existing code style (ESLint + Prettier) and keep commits descriptive.

---

## ©️ License

MIT — do what you want, but throw us a shout-out if this saved your Friday night. 