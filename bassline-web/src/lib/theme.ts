// Import shared design tokens and adapt for web units
import sharedTheme from '../../../shared/theme';

export const { colors, spacing, borderRadius, shadows } = sharedTheme;

// Convert numeric font sizes to px strings for web typography
export const typography = Object.fromEntries(
  Object.entries(sharedTheme.typography).map(([key, value]) => {
    const copy: any = { ...value };
    if (typeof copy.fontSize === 'number') {
      copy.fontSize = `${copy.fontSize}px`;
    }
    return [key, copy];
  })
) as typeof sharedTheme.typography; 