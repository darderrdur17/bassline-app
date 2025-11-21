export * from '../../shared/theme';

// Ensure named exports are available directly (some bundlers miss them on export *)
import shared from '../../shared/theme';
export const fonts = shared.fonts;
export const getResponsiveTypography = shared.getResponsiveTypography; 