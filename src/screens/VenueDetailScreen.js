import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
  Alert,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import { venueImages, nameToImageKey } from '../data/venueImages';
// custom fonts not loaded yet

export default function VenueDetailScreen({ navigation, route }) {
  const venue = (route && route.params && route.params.venue) ? route.params.venue : {};

  // Early return if no venue data
  if (!venue || !venue.name) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>VENUE DETAILS</Text>
          <View style={styles.shareButton} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: colors.textSecondary }}>No venue selected</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getCrowdColor = (crowdLevel) => {
    switch (crowdLevel) {
      case 'empty': return colors.crowdEmpty;
      case 'moderate': return colors.crowdModerate;
      case 'busy': return colors.crowdBusy;
      case 'packed': return colors.crowdPacked;
      default: return colors.crowdModerate;
    }
  };

  const formatCrowdLevel = (level) => {
    if (!level || typeof level !== 'string') return 'Moderate';
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const handleDirections = () => {
    if (!venue.coordinates || !venue.coordinates.latitude || !venue.coordinates.longitude) {
      Alert.alert('Error', 'Location information not available');
      return;
    }
    const { latitude, longitude } = venue.coordinates;
    const url = `https://maps.google.com?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleCall = () => {
    Alert.alert('Call Venue', `Would you like to call ${venue.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => console.log('Calling venue...') },
    ]);
  };

  const handleShare = () => {
    Alert.alert('Share', `Share ${venue.name} with friends?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Share', onPress: () => console.log('Sharing venue...') },
    ]);
  };

  const openUrl = (url) => {
    if (!url) return;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Unable to open link'));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VENUE DETAILS</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image / Gallery */}
        <View style={styles.heroContainer}>
          <Image
            source={(venueImages[nameToImageKey(venue.name)]?.hero) || (venue.heroImage ? { uri: venue.heroImage } : require('../../assets/icon.png'))}
            style={styles.heroImage}
          />
          {(venueImages[nameToImageKey(venue.name)]?.gallery || (Array.isArray(venue.gallery) ? venue.gallery : [])).length > 0 && (
            <FlatList
              data={(venueImages[nameToImageKey(venue.name)]?.gallery || venue.gallery || []).filter(Boolean)}
              keyExtractor={(item, idx) => idx.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.galleryList}
              renderItem={({ item }) => (
                <Image source={item} style={styles.galleryImage} />
              )}
            />
          )}
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            style={styles.heroOverlay}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          >
            <View style={styles.venueTypeTag}>
              <Text style={styles.venueTypeText}>{venue.type ? venue.type.toUpperCase() : 'VENUE'}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{venue.rating || 'N/A'}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Main Info */}
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.venueName}>{venue.name}</Text>
              <Text style={styles.venueNeighborhood}>{venue.neighborhood}</Text>
            </View>
            <View style={styles.pricingContainer}>
              <Text style={styles.pricing}>{venue.pricing || 'N/A'}</Text>
            </View>
          </View>

          <Text style={styles.description}>{venue.description || 'No description available'}</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Hours</Text>
            <Text style={styles.statValue}>{venue.hours || 'N/A'}</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.crowdDot, { backgroundColor: getCrowdColor(venue.crowdLevel) }]} />
            <Text style={styles.statLabel}>Crowd</Text>
            <Text style={styles.statValue}>{formatCrowdLevel(venue.crowdLevel)}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="car-outline" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Uber</Text>
            <Text style={styles.statValue}>{venue.estimatedUber || 'N/A'}</Text>
          </View>
        </View>

        {/* Details Cards - Organized by Database Fields */}
        <View style={styles.detailsGrid}>
          {/* Name - Already shown in header */}
          {/* Pricing - Already shown in header */}
          
          {venue.averageDrinkPrice && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>AVERAGE DRINK PRICE</Text>
              <Text style={styles.detailValue}>{venue.averageDrinkPrice}</Text>
            </View>
          )}

          {/* Description - Already shown above */}
          
          {venue.whereYouGoIf && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>WHERE YOU GO IF</Text>
              <Text style={styles.detailValue}>{venue.whereYouGoIf}</Text>
            </View>
          )}

          {/* Bar Type - Already shown in hero overlay */}
          {/* Hours - Already shown in quick stats */}
          
          {venue.ambiance && venue.ambiance.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>YOU CAN EXPECT</Text>
              <Text style={styles.detailValue}>
                {(() => {
                  const ambienceText = Array.isArray(venue.ambiance) ? venue.ambiance.join(', ') : venue.ambiance;
                  return ambienceText ? ambienceText.toUpperCase() : '';
                })()}
              </Text>
            </View>
          )}

          {venue.cuisine && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>CUISINE</Text>
              <Text style={styles.detailValue}>{venue.cuisine}</Text>
            </View>
          )}

          {venue.recommendedDrinks && venue.recommendedDrinks.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>DRINKS</Text>
              <Text style={styles.detailValue}>{Array.isArray(venue.recommendedDrinks) ? venue.recommendedDrinks.join(', ') : 'N/A'}</Text>
            </View>
          )}

          {venue.recommendations && venue.recommendations.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>RECOMMENDATIONS</Text>
              <Text style={styles.detailValue}>{venue.recommendations.join(', ')}</Text>
            </View>
          )}

          {venue.recs && venue.recs.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>RECS</Text>
              <Text style={styles.detailValue}>{venue.recs.join(', ')}</Text>
            </View>
          )}

          {venue.accolades && venue.accolades !== '—' && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>ACCOLADES</Text>
              <Text style={styles.detailValue}>{venue.accolades}</Text>
            </View>
          )}

          {/* Tags - Already shown below */}
          
          {venue.musicGenre && venue.musicGenre.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>MUSIC GENRE</Text>
              <Text style={styles.detailValue}>{Array.isArray(venue.musicGenre) ? venue.musicGenre.join(', ') : 'N/A'}</Text>
            </View>
          )}

          {venue.goodToKnow && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>GOOD TO KNOW</Text>
              <Text style={styles.detailValue}>{venue.goodToKnow}</Text>
            </View>
          )}
        </View>

        {/* Tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.tagsTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {Array.isArray(venue.tags) && venue.tags.length > 0 ? venue.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            )) : (
              <Text style={styles.tagText}>No tags available</Text>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleDirections}>
            <Ionicons name="navigate" size={20} color={colors.white} />
            <Text style={styles.primaryButtonText}>GET DIRECTIONS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleCall}>
            <Ionicons name="call" size={20} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>CALL VENUE</Text>
          </TouchableOpacity>

          {/* Social Media & External Links */}
          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>SOCIAL MEDIA & LINKS</Text>
            <View style={styles.linksRow}>
              {venue.instagram && (
                <TouchableOpacity onPress={() => openUrl(venue.instagram)} style={styles.linkIconBtn}>
                  <Ionicons name="logo-instagram" size={24} color={colors.primary} />
                  <Text style={styles.linkText}>Instagram</Text>
                </TouchableOpacity>
              )}
              {venue.tiktok && (
                <TouchableOpacity onPress={() => openUrl(venue.tiktok)} style={styles.linkIconBtn}>
                  <Ionicons name="logo-tiktok" size={24} color={colors.primary} />
                  <Text style={styles.linkText}>TikTok</Text>
                </TouchableOpacity>
              )}
              {venue.yelpUrl && (
                <TouchableOpacity onPress={() => openUrl(venue.yelpUrl)} style={styles.linkIconBtn}>
                  <Ionicons name="globe-outline" size={24} color={colors.primary} />
                  <Text style={styles.linkText}>Yelp</Text>
                </TouchableOpacity>
              )}
              {(venue.resyUrl || venue.openTableUrl) && (
                <TouchableOpacity onPress={() => openUrl(venue.resyUrl || venue.openTableUrl)} style={styles.linkIconBtn}>
                  <Ionicons name="restaurant" size={24} color={colors.primary} />
                  <Text style={styles.linkText}>Reservations</Text>
                </TouchableOpacity>
              )}
              {venue.website && (
                <TouchableOpacity onPress={() => openUrl(venue.website)} style={styles.linkIconBtn}>
                  <Ionicons name="globe-outline" size={24} color={colors.primary} />
                  <Text style={styles.linkText}>Website</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  shareButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  galleryList: {
    position: 'absolute',
    bottom: 0,
  },
  galleryImage: {
    width: 120,
    height: 80,
    marginRight: spacing.sm,
    borderRadius: borderRadius.small,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  venueTypeTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  venueTypeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  ratingContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  ratingText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
  },
  mainInfo: {
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  venueName: {
    ...typography.venue,
    color: colors.text,
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  venueNeighborhood: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  pricingContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  pricing: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.small,
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  crowdDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  detailsGrid: {
    padding: spacing.md,
  },
  detailCard: {
    backgroundColor: '#FFFDF5', // subtle cream
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.small,
  },
  detailTitle: {
    ...typography.small,
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  detailContent: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    ...typography.small,
    fontSize: 12,
    color: colors.textSecondary,
    width: 90,
    fontWeight: 'bold',
  },
  detailValue: {
    ...typography.small,
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  tagsSection: {
    padding: spacing.md,
    backgroundColor: colors.white,
    marginTop: spacing.sm,
  },
  tagsTitle: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagText: {
    ...typography.small,
    color: colors.textSecondary,
    fontSize: 12,
  },
  actionButtons: {
    padding: spacing.md,
    backgroundColor: colors.white,
    marginTop: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.sm,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.white,
    marginLeft: spacing.sm,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.primary,
    marginLeft: spacing.sm,
    letterSpacing: 1,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
  socialSection: {
    padding: spacing.md,
    backgroundColor: colors.white,
    marginTop: spacing.sm,
  },
  socialTitle: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.md,
  },
  linkIconBtn: {
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.medium,
    minWidth: 80,
  },
  linkText: {
    ...typography.small,
    color: colors.primary,
    fontSize: 10,
    marginTop: spacing.xs,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 