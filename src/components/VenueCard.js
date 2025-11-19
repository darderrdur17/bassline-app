import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, fonts } from '../styles/theme';

const { width } = Dimensions.get('window');

export default function VenueCard({ venue, onPress, onClose, preview = false, onNext, onPrev }) {
  // Fade-in & slide-up animation for hover notification / preview card
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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

  const previewStyles = preview ? {
    padding: 0,
    borderRadius: borderRadius.large,
    width: '92%',
    alignSelf: 'center',
  } : {};

  const heroHeight = preview ? 140 : 0;

  return (
    <Animated.View style={[styles.container, preview && { transform: [{ translateY }], opacity } ]}>
      <TouchableOpacity style={[styles.card, previewStyles]} onPress={onPress} activeOpacity={0.9}>
        {/* Close Button */}
        {!preview && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        )}

        {preview && (
          <TouchableOpacity style={styles.previewClose} onPress={onClose}>
            <Ionicons name="close" size={16} color={colors.white} />
          </TouchableOpacity>
        )}

        {/* Hero Image */}
        {preview && (
        <View style={[styles.heroWrapper, { height: heroHeight }]}> 
          <Image source={{ uri: venue.heroImage }} style={styles.heroImageFull} />
          <TouchableOpacity style={styles.previewArrowLeft} onPress={onPrev || onClose}>
            <Ionicons name="chevron-back" size={32} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.previewArrowRight} onPress={onNext}>
            <Ionicons name="chevron-forward" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>
        )}

        {/* Content */}
        <View style={[styles.content, preview && { flex: 1 }] }>
          {/* Header */}
          <View style={[styles.header, preview && { paddingRight: 40 }]}>
            <View style={styles.titleContainer}>
              <Text style={styles.venueName}>{venue.name}</Text>
              {/* Short Description */}
              {venue.description ? (
                <Text style={styles.shortDescription}>{venue.description}</Text>
              ) : null}
              {preview ? null : <Text style={styles.venueNeighborhood}>{venue.neighborhood}</Text>}
              {/* Accolades */}
              {venue.accolades ? (
                <Text style={styles.accolades}>{venue.accolades}</Text>
              ) : null}
            </View>
            <View style={styles.pricingContainer}>
              <Text style={styles.pricing}>{venue.pricing}</Text>
            </View>
          </View>

          {/* Preview price badge */}
          {preview && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
              <Ionicons name="time-outline" size={16} color={colors.white} />
              <Text style={{ color: colors.white, marginLeft: spacing.xs }}>{venue.hours}</Text>
            </View>
          )}

          {/* Quick Info */}
          {!preview && (
          <>
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="musical-notes-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.infoText}>{venue.musicGenre.join(', ')}</Text>
            </View>
            {/* Cuisine */}
            {venue.food ? (
              <View style={styles.infoItem}>
                <Ionicons name="restaurant-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.infoText}>{venue.food}</Text>
              </View>
            ) : null}
          </View>

          {/* Ambiance & Crowd */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>AMBIANCE:</Text>
              <Text style={styles.detailValue}>
                {(() => {
                  const ambienceText = Array.isArray(venue.ambiance) ? venue.ambiance.join(', ') : venue.ambiance;
                  return ambienceText ? ambienceText.toUpperCase() : '';
                })()}
              </Text>
            </View>
          </View>

          {/* Crowd Level & Uber */}
          {venue.crowdLevel && (
            <View style={styles.statusRow}>
              <View style={styles.crowdIndicator}>
                <View style={[styles.crowdDot, { backgroundColor: getCrowdColor(venue.crowdLevel) }]} />
                <Text style={styles.crowdText}>{formatCrowdLevel(venue.crowdLevel)}</Text>
              </View>
              {venue.estimatedUber && <Text style={styles.uberCost}>{venue.estimatedUber} Uber</Text>}
            </View>
          )}

          {/* Social Media Buttons */}
          <View style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
            {venue.instagram && (
              <TouchableOpacity onPress={() => Linking.openURL(venue.instagram)} style={{ marginRight: 12 }}>
                <Ionicons name="logo-instagram" size={22} color={colors.white} />
              </TouchableOpacity>
            )}
            {venue.yelpUrl && (
              <TouchableOpacity onPress={() => Linking.openURL(venue.yelpUrl)} style={{ marginRight: 12 }}>
                <Ionicons name="globe-outline" size={22} color={colors.white} />
              </TouchableOpacity>
            )}
            {venue.resyUrl && (
              <TouchableOpacity onPress={() => Linking.openURL(venue.resyUrl)} style={{ marginRight: 12 }}>
                <Ionicons name="restaurant" size={22} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="navigate-outline" size={16} color={colors.white} />
              <Text style={styles.primaryButtonText}>DIRECTIONS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="call-outline" size={16} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>CALL</Text>
            </TouchableOpacity>
          </View>

          {/* Nearby Suggestions */}
          <View style={styles.nearbySection}>
            <Text style={styles.nearbyTitle}>BARS NEARBY:</Text>
            <Text style={styles.nearbyTitle}>CLUBS NEARBY:</Text>
            <Text style={styles.nearbyTitle}>MUNCHIES NEARBY:</Text>
          </View>
          </>
          )}

          {preview && (
            <View style={{ marginTop: spacing.sm }}>
              {[
                { label: 'VENUE', value: venue.type },
                // Cuisine descriptor if available
                ...(venue.food ? [{ label: 'CUISINE', value: venue.food }] : []),
                { label: 'AMBIANCE', value: (() => {
                    const ambienceText = Array.isArray(venue.ambiance) ? venue.ambiance.join(', ') : venue.ambiance;
                    return ambienceText ? ambienceText.toUpperCase() : '';
                  })() },
                { label: 'GENRE', value: venue.musicGenre.join(', ') },
                { label: 'CROWD', value: Array.isArray(venue.crowd) ? venue.crowd.join(', ') : venue.crowd },
                { label: 'ESTIMATED UBER', value: venue.estimatedUber },
              ].map((item) => (
                <Text key={item.label} style={{ color: colors.white, fontSize: 12, marginBottom: 1, lineHeight: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.label}: </Text>{item.value}
                </Text>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    ...shadows.large,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.round,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  imageContainer: {
    height: 120,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  venueType: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  venueName: {
    ...typography.brand,
    color: colors.white,
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  venueNeighborhood: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.8,
  },
  pricingContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    marginLeft: spacing.md,
  },
  pricing: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickInfo: {
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoText: {
    color: colors.white,
    fontSize: 14,
    marginLeft: spacing.xs,
    opacity: 0.9,
    fontFamily: fonts.helveticaWorld,
  },
  detailsRow: {
    marginBottom: spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginRight: spacing.xs,
  },
  detailValue: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.9,
    flex: 1,
    fontFamily: fonts.helveticaWorld,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  crowdIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  crowdDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  crowdText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  waitTime: {
    color: colors.white,
    fontSize: 12,
    marginRight: spacing.md,
    opacity: 0.8,
  },
  uberCost: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
    marginRight: spacing.sm,
  },
  primaryButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: spacing.xs,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  secondaryButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: spacing.xs,
    letterSpacing: 0.5,
  },
  nearbySection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: spacing.sm,
  },
  nearbyTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  previewArrowLeft: {
    position: 'absolute',
    top: '50%',
    left: 5,
    marginTop: -15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.round,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewArrowRight: {
    position: 'absolute',
    top: '50%',
    right: 5,
    marginTop: -15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.round,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewClose: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.round,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  heroWrapper: {
    position: 'relative',
  },
  heroImageFull: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  shortDescription: {
    color: colors.white,
    fontSize: 18,
    opacity: 0.95,
    marginBottom: spacing.xs,
    fontFamily: fonts.helveticaWorld,
  },
  accolades: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
}); 