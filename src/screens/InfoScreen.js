import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

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
          <Text style={styles.cardTitle}>How It Works</Text>
        </View>
        <Text style={styles.paragraph}>
          • Search by mood, venue name or music genre.
          {'\n'}• Tap coloured pins to preview spots.
          {'\n'}• Swipe left / right on the card to browse.
          {'\n'}• Open full details for photos, hours & more.
        </Text>
      </View>

      {/* Pin colours */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="pin" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Pin Colours</Text>
        </View>
        <View style={styles.legendList}>
          {[
            { label: 'Bar', color: colors.primary },
            { label: 'Restaurant', color: colors.crowdModerate },
            { label: 'Lounge', color: colors.crowdBusy },
            { label: 'Club', color: colors.primaryDark },
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
          Open Yelp, Resy / OpenTable or follow venues on Instagram and TikTok – just tap the icons on each venue page.
        </Text>
      </View>

      {/* Tips */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Pro Tips</Text>
        </View>
        <Text style={styles.paragraph}>
          • Use the filter panel to layer advanced filters.
          {'\n'}• Enable location to sort venues by distance.
          {'\n'}• Save favourites for a personalised map.
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
  brand: { ...typography.brand, color: colors.primary, textAlign: 'center' },
  tagline: { ...typography.small, color: colors.primary, textAlign: 'center', letterSpacing: 1 },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  cardTitle: { ...typography.venue, color: colors.primary, marginLeft: spacing.sm, fontSize: 20 },
  title: { ...typography.title, color: colors.primary, textAlign: 'center', marginBottom: spacing.lg },
  subtitle: { ...typography.venue, color: colors.primary, marginTop: spacing.lg, marginBottom: spacing.sm },
  paragraph: { ...typography.body, color: colors.textSecondary, lineHeight: 22 },
  legendList: { marginTop: spacing.sm },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: spacing.sm },
  legendLabel: { ...typography.small, color: colors.text },
}); 