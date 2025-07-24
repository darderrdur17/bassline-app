import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows, fonts } from '../styles/theme';

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.heroWrap}>
        <Image source={require('../../assets/icon.png')} style={styles.heroLogo} />
        <Text style={styles.brand}>BASSLINE</Text>
        <Text style={styles.tagline}>THE CITY NEVER SLEEPS, NEITHER SHOULD YOU.</Text>
      </View>

      {/* How it works */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="bulb" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>How Bassline Works</Text>
        </View>
        <Text style={styles.paragraph}>
          • Discover the best bars, restaurants, lounges, and clubs in San Francisco.
          {'\n'}• Search by mood, venue name, music genre, or neighborhood.
          {'\n'}• Tap colored pins on the map to preview spots and see details.
          {'\n'}• Save favorites, get directions, and follow venues on social media.
        </Text>
      </View>

      {/* Pin colours */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="pin" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Pin Colors</Text>
        </View>
        <View style={styles.legendList}>
          {[
            { label: 'Bar', color: '#2196F3' }, // Blue
            { label: 'Restaurant', color: '#E53935' }, // Red
            { label: 'Lounge', color: '#FFEB3B' }, // Yellow
            { label: 'Club', color: '#4CAF50' }, // Green
          ].map((item) => (
            <View key={item.label} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Book & Follow */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="link" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Book & Follow</Text>
        </View>
        <Text style={styles.paragraph}>
          Tap the Instagram, Yelp, or Resy icons on each venue page to book a table, see reviews, or follow your favorite spots.
        </Text>
      </View>

      {/* Tips */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Pro Tips</Text>
        </View>
        <Text style={styles.paragraph}>
          • Use the filter panel for advanced search (price, ambiance, crowd).
          {'\n'}• Enable location to sort venues by distance.
          {'\n'}• Save favorites for a personalized map.
          {'\n'}• Try the web version for easy sharing: bassline.com
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { 
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg 
  },
  heroWrap: { alignItems: 'center', marginBottom: spacing.xl },
  heroLogo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: spacing.sm },
  brand: { 
    ...typography.brand, 
    color: colors.primary, 
    textAlign: 'center',
    fontSize: 48, // make it bigger like other screens
  },
  tagline: { 
    ...typography.small, 
    color: colors.primary, 
    textAlign: 'center', 
    letterSpacing: 1,
    fontSize: 20, // make it bigger
    fontFamily: fonts.helveticaWorld,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  cardTitle: { 
    ...typography.title, 
    color: colors.primary, 
    marginLeft: spacing.sm, 
    fontSize: 24, // make it bigger
    fontFamily: fonts.komsomol,
  },
  title: { ...typography.title, color: colors.primary, textAlign: 'center', marginBottom: spacing.lg },
  subtitle: { ...typography.venue, color: colors.primary, marginTop: spacing.lg, marginBottom: spacing.sm },
  paragraph: { 
    ...typography.body, 
    color: colors.textSecondary, 
    lineHeight: 24, // increase line height for better readability
    fontSize: 16, // make it bigger
    fontFamily: fonts.helveticaWorld,
  },
  legendList: { marginTop: spacing.sm },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: spacing.sm },
  legendLabel: { 
    ...typography.small, 
    color: colors.text,
    fontSize: 16, // make it bigger
    fontFamily: fonts.helveticaWorld,
  },
}); 