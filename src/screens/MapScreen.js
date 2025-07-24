import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, fonts } from '../styles/theme';
import { venues, filterOptions, moodMapping } from '../data/venues';
import VenueCard from '../components/VenueCard';
import FilterPanel from '../components/FilterPanel';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const toRad = (v) => (v * Math.PI) / 180;
const distanceMiles = (coord1, coord2) => {
  const R = 6371000; // meters
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);
  const a = Math.sin(dLat/2)**2 + Math.sin(dLon/2)**2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c) / 1609.34; // miles
};

// 1. Add new pin colors to the color palette import (if not present)
const pinColors = {
  Bar: '#2196F3',        // Blue
  Restaurant: '#E53935', // Red (brand)
  Lounge: '#FFEB3B',     // Yellow
  Club: '#4CAF50',       // Green
};

export default function MapScreen({ navigation, route }) {
  const mapRef = useRef(null);
  const [selectedVenueIndex, setSelectedVenueIndex] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const selectedVenue =
    selectedVenueIndex !== null && filteredVenues[selectedVenueIndex]
      ? filteredVenues[selectedVenueIndex]
      : null;
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    neighborhood: [],
    hours: [],
    distance: [],
    venueType: [],
    musicGenre: [],
    ambianceDensity: [],
    pricing: [],
    dressCode: [],
    crowdScene: [],
  });

  // Handle incoming search query or mood from landing screen
  useEffect(() => {
    if (route.params?.searchQuery) {
      setSearchText(route.params.searchQuery);
      handleSearch(route.params.searchQuery);
    }
    if (route.params?.mood) {
      handleMoodFilter(route.params.mood);
    }
  }, [route.params]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      }
    })();
  }, []);

  // Filter venues based on search and filters
  useEffect(() => {
    let filtered = venues;

    // Apply search filter
    if (searchText) {
      const term = searchText.toLowerCase();
      filtered = filtered.filter(venue => {
        const haystack = [
          venue.name,
          venue.neighborhood,
          venue.type,
          venue.description,
          ...(venue.tags || []),
          ...(venue.musicGenre || []),
          ...(Array.isArray(venue.ambiance) ? venue.ambiance : [venue.ambiance]),
        ].join(' ').toLowerCase();
        return haystack.includes(term);
      });
    }

    // Apply category filters
    Object.keys(filters).forEach(filterKey => {
      if (filters[filterKey].length > 0) {
        filtered = filtered.filter(venue => {
          if (filterKey === 'venueType') {
            return filters[filterKey].includes(venue.type);
          }
          if (filterKey === 'pricing') {
            return filters[filterKey].includes(venue.pricing);
          }
          if (filterKey === 'musicGenre') {
            return venue.musicGenre.some(genre => filters[filterKey].includes(genre));
          }
          if (filterKey === 'neighborhood') {
            return filters[filterKey].includes(venue.neighborhood);
          }
          if (filterKey === 'hours') {
            return filters[filterKey].some(h => {
              if (h === 'Open Now') return true;
              if (h === 'Past 2 AM') return /2\s?AM|3\s?AM/i.test(venue.hours);
              if (h === '24 Hours') return /24/.test(venue.hours);
              return false;
            });
          }
          if (filterKey === 'ambianceDensity') {
            return venue.ambiance.some(a => filters[filterKey].includes(a));
          }
          if (filterKey === 'crowdScene') {
            if (Array.isArray(venue.crowd)) {
              return venue.crowd.some(c => filters[filterKey].includes(c));
            }
            return filters[filterKey].includes(venue.crowd);
          }
          if (filterKey === 'dressCode') {
            return filters[filterKey].includes(venue.dressCode);
          }
          if (filterKey === 'distance' && userLocation) {
            const maxMiles = Math.max(...filters.distance.map(d => parseFloat(d)));
            const distMiles = distanceMiles(userLocation, venue.coordinates);
            return distMiles <= maxMiles;
          }
          return true;
        });
      }
    });

    setFilteredVenues(filtered);
  }, [searchText, filters, userLocation]);

  // Default map region (SF center)
  const defaultRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (selectedVenue) {
      // Center on selected venue
      mapRef.current.animateToRegion(
        {
          latitude: selectedVenue.coordinates.latitude,
          longitude: selectedVenue.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );
    } else {
      // Return to default overview
      mapRef.current.animateToRegion(defaultRegion, 500);
    }
  }, [selectedVenue]);

  const handleSearch = (text) => {
    const trimmed = text.trimStart();
    setSearchText(trimmed);
    if (trimmed === '') {
      // Immediate reset to full list so UI feels responsive
      setFilteredVenues(venues);
    }
  };

  const handleMoodFilter = (mood) => {
    const moodVenues = moodMapping[mood] || [];
    const filtered = venues.filter(venue => moodVenues.includes(venue.name));
    setFilteredVenues(filtered);
  };

  const handleMarkerPress = (venue) => {
    const index = filteredVenues.findIndex(v => v.id === venue.id);
    setSelectedVenueIndex(index);
  };

  const handleNextVenue = () => {
    if (filteredVenues.length === 0) return;
    setSelectedVenueIndex((prev) => {
      const next = prev === null ? 0 : (prev + 1) % filteredVenues.length;
      return next;
    });
  };

  const handlePrevVenue = () => {
    if (filteredVenues.length === 0) return;
    setSelectedVenueIndex((prev) => {
      if (prev === null) return 0;
      const next = (prev - 1 + filteredVenues.length) % filteredVenues.length;
      return next;
    });
  };

  const handleVenueCardPress = (venue) => {
    navigation.navigate('VenueDetail', { venue });
  };

  const clearFilters = () => {
    setFilters({
      neighborhood: [],
      hours: [],
      distance: [],
      venueType: [],
      musicGenre: [],
      ambianceDensity: [],
      pricing: [],
      dressCode: [],
      crowdScene: [],
    });
    setSearchText('');
    setSelectedVenueIndex(null);
  };

  const getMarkerColor = (venue) => {
    if (selectedVenue && venue.id === selectedVenue.id) {
      return colors.white; // highlight selected
    }
    switch (venue.type) {
      case 'Bar': return pinColors.Bar;
      case 'Restaurant': return pinColors.Restaurant;
      case 'Lounge': return pinColors.Lounge;
      case 'Club': return pinColors.Club;
      default: return pinColors.Bar;
    }
  };

  const isRoot = !navigation.canGoBack();

  // ADD A TOGGLE FUNCTION THAT ANIMATES FILTER PANEL VISIBILITY
  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {isRoot ? (
        <View style={styles.brandHeader}>
          <Text style={styles.bigTitle}>BASSLINE</Text>
          <Text style={styles.tagline}>THE CITY NEVER SLEEPS, NEITHER SHOULD YOU.</Text>
        </View>
      ) : (
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BASSLINE</Text>
          {!isRoot && (
        <TouchableOpacity 
          style={styles.filterToggle}
              onPress={toggleFilters}
        >
          <Ionicons name="options" size={24} color={colors.primary} />
        </TouchableOpacity>
          )}
      </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Text style={styles.searchLabel}>WHAT ARE YOU FEELING TONIGHT?</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.searchContainer, { flex: 1 }] }>
          <TextInput
            style={styles.searchInput}
            placeholder="Search venues, moods, music..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.filterIconBtn} onPress={toggleFilters}>
            <Ionicons name="options" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {/* Results Count */}
        <View style={styles.resultsInline}>
          <Text style={styles.resultsText}>{filteredVenues.length} venues found</Text>
        </View>
        {/* Pin Color Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: pinColors.Bar }]} />
            <Text style={styles.legendLabel}>Bar</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: pinColors.Restaurant }]} />
            <Text style={styles.legendLabel}>Restaurant</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: pinColors.Lounge, borderWidth: 1, borderColor: colors.black }]} />
            <Text style={styles.legendLabel}>Lounge</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: pinColors.Club }]} />
            <Text style={styles.legendLabel}>Club</Text>
          </View>
        </View>
      </View>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      )}

      {/* Map Preview */}
      <View style={styles.mapPreviewWrapper}>
        <MapView
          ref={mapRef}
          style={styles.mapPreview}
          initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={darkMapStyle}
          scrollEnabled={true}
          zoomEnabled={true}
        >
          {filteredVenues.map((venue) => (
            <Marker
              key={venue.id}
              coordinate={venue.coordinates}
              onPress={() => handleMarkerPress(venue)}
              pinColor={getMarkerColor(venue)}
            />
          ))}
        </MapView>
      </View>

      {/* Venue Card (Bottom Sheet) */}
      {selectedVenue && (
        <VenueCard
          venue={selectedVenue}
          preview={true}
          onPress={() => handleVenueCardPress(selectedVenue)}
          onClose={() => setSelectedVenueIndex(null)}
          onNext={handleNextVenue}
          onPrev={handlePrevVenue}
        />
      )}
    </SafeAreaView>
  );
}

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8ec3b9' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1a3646' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4b6878' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64779f' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4b6878' }],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334e87' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#023e58' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#283d6a' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6f9ba5' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#023e58' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3C7680' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#304a7d' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#98a5be' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#2c6675' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#255763' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#b0d5ce' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#023e58' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#98a5be' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [{ color: '#283d6a' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#3a4762' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0e1626' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4e6d70' }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    ...typography.title,
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  filterToggle: {
    padding: spacing.sm,
  },
  searchSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  searchLabel: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
    fontSize: 16, // make it bigger and more readable
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.text,
  },
  searchButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconBtn: {
    marginLeft: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  mapPreviewWrapper: {
    height: height * 0.72, // Further increase map height
    width: '98%', // Slightly wider
    alignSelf: 'center',
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
    marginTop: spacing.xs, // Bring map closer to directory
    marginBottom: spacing.md,
  },
  mapPreview: {
    flex: 1,
  },
  customMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  markerText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultsInline: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
    marginLeft: spacing.md,
    backgroundColor: colors.white, // Make background blank/white
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    borderWidth: 1.5,
    borderColor: colors.primary, // Red outline
  },
  resultsText: {
    color: colors.primary, // change from white to primary color for better contrast
    fontSize: 14, // make it bigger
    fontWeight: 'bold',
  },
  brandHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primary,
    borderBottomWidth: 4,
    borderBottomColor: colors.white,
    ...shadows.medium,
  },
  bigTitle: {
    ...typography.brand,
    color: colors.white,
    fontSize: 64, // enlarged to approximate tagline width
    fontWeight: 'bold',
    letterSpacing: 6, // increased spacing for wider appearance
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.small,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontSize: 20, // make tagline bigger
    fontFamily: fonts.helveticaWorld,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xs, // Reduce space
    marginBottom: spacing.xs, // Reduce space
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white, // Make background blank/white
    borderRadius: borderRadius.small,
    borderWidth: 1.5,
    borderColor: colors.primary, // Red outline
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.xs,
  },
  legendLabel: {
    ...typography.small,
    color: colors.primary, // change from white to primary color for better contrast
    fontWeight: 'bold',
    fontSize: 14, // make it bigger
  },
}); 