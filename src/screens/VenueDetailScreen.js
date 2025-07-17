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
// custom fonts not loaded yet

export default function VenueDetailScreen({ navigation, route }) {
  const { venue } = route.params;

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
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const handleDirections = () => {
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
          <Image source={{ uri: venue.heroImage }} style={styles.heroImage} />
          {venue.gallery && (
            <FlatList
              data={venue.gallery}
              keyExtractor={(item, idx) => idx.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.galleryList}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.galleryImage} />
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
              <Text style={styles.venueTypeText}>{venue.type.toUpperCase()}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{venue.rating}</Text>
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
              <Text style={styles.pricing}>{venue.pricing}</Text>
            </View>
          </View>

          <Text style={styles.description}>{venue.description}</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Hours</Text>
            <Text style={styles.statValue}>{venue.hours}</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.crowdDot, { backgroundColor: getCrowdColor(venue.crowdLevel) }]} />
            <Text style={styles.statLabel}>Crowd</Text>
            <Text style={styles.statValue}>{formatCrowdLevel(venue.crowdLevel)}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="car-outline" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Uber</Text>
            <Text style={styles.statValue}>{venue.estimatedUber}</Text>
          </View>
        </View>

        {/* Details Cards */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>MUSIC & VIBES</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Genre:</Text>
              <Text style={styles.detailValue}>{venue.musicGenre.join(', ')}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Ambiance:</Text>
              <Text style={styles.detailValue}>{venue.ambiance.join(', ')}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Best Time:</Text>
              <Text style={styles.detailValue}>{venue.optimalTime}</Text>
            </View>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>CROWD & DRESS</Text>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Crowd:</Text>
              <Text style={styles.detailValue}>{Array.isArray(venue.crowd) ? venue.crowd.join(', ') : venue.crowd}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Dress Code:</Text>
              <Text style={styles.detailValue}>{venue.dressCode}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Wait Time:</Text>
              <Text style={styles.detailValue}>{venue.waitTime} minutes</Text>
            </View>
          </View>

          {venue.food && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>FOOD & DRINKS</Text>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Food:</Text>
                <Text style={styles.detailValue}>{venue.food}</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Recommended:</Text>
                <Text style={styles.detailValue}>{venue.recommendedDrinks.join(', ')}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.tagsTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {venue.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
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

          {/* External links row */}
          <View style={styles.linksRow}>
            {venue.yelpUrl && (
              <TouchableOpacity onPress={() => openUrl(venue.yelpUrl)} style={styles.linkIconBtn}>
                <Ionicons name="globe-outline" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
            {(venue.resyUrl || venue.openTableUrl) && (
              <TouchableOpacity onPress={() => openUrl(venue.resyUrl || venue.openTableUrl)} style={styles.linkIconBtn}>
                <Ionicons name="restaurant" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
            {venue.instagram && (
              <TouchableOpacity onPress={() => openUrl(venue.instagram)} style={styles.linkIconBtn}>
                <Ionicons name="logo-instagram" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
            {venue.tiktok && (
              <TouchableOpacity onPress={() => openUrl(venue.tiktok)} style={styles.linkIconBtn}>
                <Ionicons name="logo-tiktok" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
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
    marginBottom: spacing.md,
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
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  linkIconBtn: {
    marginHorizontal: spacing.sm,
  },
}); 