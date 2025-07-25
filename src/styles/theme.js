export * from '../../shared/theme';

// Ensure named export `fonts` is available directly (some bundlers miss it on export *)
import shared from '../../shared/theme';
export const fonts = shared.fonts; 