import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import { filterOptions } from '../data/venues';

export default function FilterPanel({ filters, onFiltersChange, onClearFilters }) {
  const [activeCategory, setActiveCategory] = React.useState('neighborhood');

  const toggleFilter = (category, value) => {
    const currentFilters = { ...filters };
    const categoryFilters = currentFilters[category] || [];
    
    if (categoryFilters.includes(value)) {
      currentFilters[category] = categoryFilters.filter(item => item !== value);
    } else {
      currentFilters[category] = [...categoryFilters, value];
    }
    
    onFiltersChange(currentFilters);
  };

  const isFilterActive = (category, value) => {
    return filters[category] && filters[category].includes(value);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((total, categoryFilters) => {
      return total + (categoryFilters ? categoryFilters.length : 0);
    }, 0);
  };

  const filterCategories = [
    { key: 'neighborhood', label: 'AREA', options: filterOptions.neighborhood },
    { key: 'hours', label: 'HOURS', options: filterOptions.hours },
    { key: 'distance', label: 'DIST', options: filterOptions.distance },
    { key: 'venueType', label: 'VENUE', options: filterOptions.venueType },
    { key: 'musicGenre', label: 'GENRE', options: filterOptions.musicGenre },
    { key: 'ambianceDensity', label: 'VIBE', options: filterOptions.ambianceDensity },
    { key: 'pricing', label: 'PRICE', options: filterOptions.pricing },
    { key: 'dressCode', label: 'DRESS', options: filterOptions.dressCode },
    { key: 'crowdScene', label: 'SCENE', options: filterOptions.crowdScene },
  ];

  return (
    <View style={styles.container}>
      {/* Main Filter Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.mainFilters}
        contentContainerStyle={styles.mainFiltersContent}
      >
        {filterCategories.map((category) => {
          const activeCount = filters[category.key] ? filters[category.key].length : 0;
          const isActive = activeCount > 0;
          
          return (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.mainFilterButton,
                (activeCategory === category.key || isActive) && styles.mainFilterButtonActive,
              ]}
              onPress={() => setActiveCategory(category.key)}
            >
              <Text style={[
                styles.mainFilterText,
                (activeCategory === category.key || isActive) && styles.mainFilterTextActive,
              ]}>
                {category.label}
                {activeCount > 0 && ` (${activeCount})`}
              </Text>
              <Ionicons 
                name="chevron-down" 
                size={16} 
                color={isActive ? colors.white : colors.primary} 
              />
            </TouchableOpacity>
          );
        })}
        
        {/* Clear Filters Button */}
        {getActiveFiltersCount() > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={onClearFilters}
          >
            <Ionicons name="close-circle" size={16} color={colors.primary} />
            <Text style={styles.clearButtonText}>CLEAR</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Filter Options */}
      <ScrollView style={styles.filterOptions} showsVerticalScrollIndicator={false}>
        {filterCategories
          .filter((cat) => cat.key === activeCategory)
          .map((category) => (
            <View key={category.key} style={styles.filterCategory}>
              <Text style={styles.categoryTitle}>{category.label}</Text>
              <View style={styles.optionsGrid}>
                {category.options.map((option) => {
                  const isActive = isFilterActive(category.key, option);
                  
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionButton,
                        isActive && styles.optionButtonActive,
                      ]}
                      onPress={() => toggleFilter(category.key, option)}
                    >
                      <Text style={[
                        styles.optionText,
                        isActive && styles.optionTextActive,
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    maxHeight: 320,
  },
  mainFilters: {
    paddingVertical: spacing.sm,
  },
  mainFiltersContent: {
    paddingHorizontal: spacing.md,
  },
  mainFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.large,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    ...shadows.small,
  },
  mainFilterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  mainFilterText: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: spacing.xs,
    letterSpacing: 1,
  },
  mainFilterTextActive: {
    color: colors.white,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  clearButtonText: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
    letterSpacing: 0.5,
  },
  filterOptions: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  filterCategory: {
    marginBottom: spacing.md,
  },
  categoryTitle: {
    ...typography.small,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    minWidth: '28%',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    ...typography.small,
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
  },
  optionTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
}); 