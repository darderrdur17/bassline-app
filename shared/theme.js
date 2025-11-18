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
  anton: 'Anton_400Regular',
  bungee: 'Bungee_400Regular',
  oswaldRegular: 'Oswald_400Regular',
  oswaldSemiBold: 'Oswald_600SemiBold',
  // Using Anton for bold sans-serif brand/title font (matches image style)
  brand: 'Anton_400Regular',
  // Using Roboto for clean body text
  body: 'Roboto_400Regular',
  // Using Oswald for buttons (bold, uppercase style)
  button: 'Oswald_400Regular',
};

export const typography = {
  // Large bold uppercase brand name (BASSLINE)
  brand: {
    fontSize: 32,
    fontWeight: '400', // Anton is already bold
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
  },
  // Bold uppercase titles and headings
  title: {
    fontSize: 24,
    fontWeight: '400', // Anton is already bold
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
  },
  // Large venue names
  venue: {
    fontSize: 52,
    fontWeight: '400', // Anton is already bold
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: fonts.anton,
  },
  // Body text - clean sans-serif
  body: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.body,
  },
  // Small text
  small: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.body,
  },
  // Buttons - bold uppercase
  button: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: fonts.button,
  },
  // Slogan/tagline style - bold uppercase red text
  tagline: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: fonts.body,
  },
  // Label style for "WHAT ARE YOU FEELING TONIGHT?" etc.
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: fonts.body,
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

export default {
  colors,
  fonts,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
}; 