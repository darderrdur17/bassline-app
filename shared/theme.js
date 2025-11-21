export const colors = {
  // Primary brand colors from design
  primary: '#E53935', // Bassline red
  primaryDark: '#C62828',
  background: '#F5F5DC', // Cream/beige background
  white: '#FFFFFF',
  black: '#000000',

  // UI colors
  cardBackground: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E0E0E0',

  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',

  // Crowd level indicators
  crowdEmpty: '#4CAF50',
  crowdModerate: '#FF9800',
  crowdBusy: '#FF5722',
  crowdPacked: '#F44336',
};

export const fonts = {
  // Primary brand fonts (consistent across platforms)
  anton: 'Anton_400Regular',
  oswaldRegular: 'Oswald_400Regular',
  oswaldSemiBold: 'Oswald_600SemiBold',
  robotoRegular: 'Roboto_400Regular',
  robotoMedium: 'Roboto_500Medium',

  // Web font fallbacks (for Tailwind CSS)
  'anton-web': 'Anton, Impact, sans-serif',
  'oswald-web': 'Oswald, Arial, sans-serif',
  'roboto-web': 'Roboto, system-ui, sans-serif',

  // Legacy font mappings (deprecated - use primary fonts above)
  bungee: 'Bungee_400Regular',
  komsomol: 'Anton_400Regular',
  lucidityCondensed: 'Oswald_400Regular',
  brand: 'Anton_400Regular',
  body: 'Roboto_400Regular',
  button: 'Oswald_400Regular',
};

export const typography = {
  // Brand Identity (Anton - Bold, uppercase, consistent across platforms)
  brand: {
    fontSize: 32,
    fontWeight: '400', // Anton is already bold
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
    lineHeight: 1.1,
  },

  // Hero/Banner Text (Anton - Large, impactful)
  hero: {
    fontSize: 48,
    fontWeight: '400',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
    lineHeight: 1.05,
  },

  // Large venue names on cards/details
  venue: {
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
    lineHeight: 1.2,
  },

  // Section headings (Anton - Medium)
  heading: {
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
    lineHeight: 1.3,
  },

  // Subheadings (Oswald - Condensed, uppercase)
  subheading: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: fonts.oswaldRegular,
    lineHeight: 1.4,
  },

  // Body text (Roboto - Clean, readable)
  body: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.robotoRegular,
    lineHeight: 1.6,
  },

  // Secondary body text
  bodySecondary: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: fonts.robotoRegular,
    lineHeight: 1.5,
  },

  // Small text/captions
  small: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.robotoRegular,
    lineHeight: 1.4,
  },

  // Extra small text
  xsmall: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fonts.robotoRegular,
    lineHeight: 1.3,
  },

  // Buttons (Oswald - Bold, uppercase)
  button: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: fonts.oswaldSemiBold,
    lineHeight: 1.2,
  },

  // Button small
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: fonts.oswaldSemiBold,
    lineHeight: 1.2,
  },

  // Labels and tags (Oswald - Condensed)
  label: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: fonts.oswaldRegular,
    lineHeight: 1.3,
  },

  // Tagline/Slogan (Oswald - Bold condensed)
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: fonts.oswaldSemiBold,
    lineHeight: 1.2,
  },

  // Legacy mappings (deprecated - use new typography above)
  title: {
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
    lineHeight: 1.3,
  },
};

// Responsive typography scale for different screen sizes
export const responsiveTypography = {
  // Mobile (320px - 767px)
  mobile: {
    brand: { fontSize: 28, letterSpacing: 1.8 },
    hero: { fontSize: 36, letterSpacing: 1.2 },
    venue: { fontSize: 24, letterSpacing: 0.8 },
    heading: { fontSize: 20, letterSpacing: 1 },
    subheading: { fontSize: 16, letterSpacing: 0.8 },
    body: { fontSize: 15, lineHeight: 1.5 },
    button: { fontSize: 15, letterSpacing: 0.8 },
  },

  // Tablet (768px - 1023px)
  tablet: {
    brand: { fontSize: 32, letterSpacing: 2 },
    hero: { fontSize: 44, letterSpacing: 1.4 },
    venue: { fontSize: 26, letterSpacing: 0.9 },
    heading: { fontSize: 22, letterSpacing: 1.1 },
    subheading: { fontSize: 17, letterSpacing: 0.9 },
    body: { fontSize: 16, lineHeight: 1.6 },
    button: { fontSize: 16, letterSpacing: 1 },
  },

  // Desktop (1024px+)
  desktop: {
    brand: { fontSize: 36, letterSpacing: 2.2 },
    hero: { fontSize: 52, letterSpacing: 1.6 },
    venue: { fontSize: 30, letterSpacing: 1.1 },
    heading: { fontSize: 26, letterSpacing: 1.3 },
    subheading: { fontSize: 19, letterSpacing: 1.1 },
    body: { fontSize: 17, lineHeight: 1.7 },
    button: { fontSize: 17, letterSpacing: 1.1 },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  round: 50,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const layout = {
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    ...shadows.medium,
  },
};

// Utility function for responsive typography
export const getResponsiveTypography = (baseStyle, screenWidth) => {
  // Determine screen size category
  let sizeCategory = 'mobile';
  if (screenWidth >= 1024) sizeCategory = 'desktop';
  else if (screenWidth >= 768) sizeCategory = 'tablet';

  // Get responsive overrides
  const responsiveOverrides = responsiveTypography[sizeCategory][baseStyle.fontSize] || {};

  return {
    ...baseStyle,
    ...responsiveOverrides,
  };
};

export default {
  colors,
  fonts,
  typography,
  responsiveTypography,
  spacing,
  borderRadius,
  shadows,
  layout,
  getResponsiveTypography,
}; 