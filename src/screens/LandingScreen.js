import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, fonts } from '../styles/theme';

export default function LandingScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const quickMoods = [
    { label: 'CHILL', emoji: '😌', color: colors.crowdEmpty },
    { label: 'PARTY', emoji: '🎉', color: colors.crowdBusy },
    { label: 'DATE', emoji: '💕', color: colors.primary },
    { label: 'CLASSY', emoji: '🥂', color: colors.crowdModerate },
    { label: 'MUSIC', emoji: '🎵', color: colors.primaryDark },
    { label: 'DRINKS', emoji: '🍸', color: colors.warning },
  ];

  const handleSearch = () => {
    navigation.navigate('Map', { searchQuery: searchText });
  };

  const handleMoodPress = (mood) => {
    navigation.navigate('Map', { mood: mood.label.toLowerCase() });
  };

  const handleMapPress = () => {
    navigation.navigate('Map');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Character Illustration */}
        <View style={styles.heroSection}>
          <View style={styles.characterContainer}>
            {/* Placeholder for character - using emoji for now */}
            <Image source={require('../../assets/icon.png')} style={styles.heroLogo} />
            <View style={styles.characterAccent} />
          </View>
        </View>

        {/* Branding */}
        <View style={styles.brandingSection}>
          <Text style={styles.brandTitle}>BASSLINE</Text>
          <Text style={styles.brandTagline}>THE CITY NEVER SLEEPS, NEITHER SHOULD YOU.</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.searchLabel}>WHAT ARE YOU FEELING TONIGHT?</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Ionicons name="search" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Map Link */}
        <View style={styles.mapSection}>
          <Text style={styles.mapText}>OR GO STRAIGHT TO OUR</Text>
          <TouchableOpacity style={styles.mapButton} onPress={handleMapPress}>
            <Text style={styles.mapButtonText}>MAP</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Moods */}
        <View style={styles.moodsSection}>
          <Text style={styles.moodsTitle}>Quick Moods:</Text>
          <View style={styles.moodsGrid}>
            {quickMoods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.moodButton, { backgroundColor: mood.color }]}
                onPress={() => handleMoodPress(mood)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  characterAccent: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
  },
  brandingSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brandTitle: {
    ...typography.brand,
    fontSize: 56, // make as wide as tagline visually
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  brandTagline: {
    ...typography.small,
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 22, // bigger description
    fontFamily: fonts.helveticaWorld,
  },
  searchSection: {
    marginBottom: spacing.xl,
  },
  searchLabel: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md,
    letterSpacing: 0.5,
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
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  searchButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  mapText: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  mapButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
  },
  mapButtonText: {
    ...typography.button,
    color: colors.white,
    letterSpacing: 1,
  },
  moodsSection: {
    marginTop: spacing.lg,
  },
  moodsTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  moodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodButton: {
    width: '28%',
    aspectRatio: 1,
    borderRadius: borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginHorizontal: spacing.xs,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  moodLabel: {
    ...typography.small,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroLogo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
    resizeMode: 'contain',
  },
}); 