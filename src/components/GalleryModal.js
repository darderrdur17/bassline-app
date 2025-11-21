import React, { useState, useRef } from 'react';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Animated,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

const { width, height } = Dimensions.get('window');

export default function GalleryModal({ visible, images = [], onClose, venueName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: Math.max(0, Math.min(index, images.length - 1)),
        animated: true,
      });
    }
  };

  const renderImage = ({ item, index }) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={item}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    );
  };

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const keyExtractor = (item, index) => index.toString();

  if (!visible || !images || images.length === 0) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{venueName}</Text>
            <Text style={styles.counter}>
              {currentIndex + 1} / {images.length}
            </Text>
          </View>
        </View>

        {/* Image Gallery */}
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderImage}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={getItemLayout}
          initialScrollIndex={0}
          style={styles.gallery}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {currentIndex > 0 && (
              <TouchableOpacity
                style={[styles.navArrow, styles.leftArrow]}
                onPress={() => scrollToIndex(currentIndex - 1)}
              >
                <Ionicons name="chevron-back" size={32} color={colors.white} />
              </TouchableOpacity>
            )}

            {currentIndex < images.length - 1 && (
              <TouchableOpacity
                style={[styles.navArrow, styles.rightArrow]}
                onPress={() => scrollToIndex(currentIndex + 1)}
              >
                <Ionicons name="chevron-forward" size={32} color={colors.white} />
              </TouchableOpacity>
            )}
          </>
        )}

        {/* Thumbnail Indicators */}
        {images.length > 1 && (
          <View style={styles.indicators}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator,
                ]}
                onPress={() => scrollToIndex(index)}
              />
            ))}
          </View>
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.xl + 20, // Account for status bar
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  closeButton: {
    padding: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.round,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.subheading,
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  counter: {
    ...typography.small,
    color: colors.white,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  gallery: {
    flex: 1,
    marginTop: 80, // Account for header
  },
  imageContainer: {
    width: width,
    height: height - 160, // Account for header and indicators
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  navArrow: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.round,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    left: spacing.md,
  },
  rightArrow: {
    right: spacing.md,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing.xl + 20, // Account for safe area
    paddingTop: spacing.md,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: colors.white,
    width: 24,
  },
});
