/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Brand colors
        brand: {
          red: '#E53935',
          'red-dark': '#C62828',
          cream: '#F5F5DC',
          accent: '#FF6B35',
        },
        // Status colors
        crowd: {
          empty: '#4CAF50',
          moderate: '#FF9800',
          busy: '#FF5722',
          packed: '#F44336',
        },
        // UI colors
        ui: {
          background: '#F5F5DC',
          surface: '#FFFFFF',
          'surface-hover': '#FAFAF0',
          border: '#E0E0E0',
          'border-hover': '#CCCCCC',
          text: '#1A1A1A',
          'text-secondary': '#666666',
          'text-muted': '#999999',
        }
      },
      fontFamily: {
        // Primary typography system
        'brand': ['var(--font-anton)', 'Impact', 'sans-serif'],
        'hero': ['var(--font-anton)', 'Impact', 'sans-serif'],
        'venue': ['var(--font-anton)', 'Impact', 'sans-serif'],
        'heading': ['var(--font-anton)', 'Impact', 'sans-serif'],
        'subheading': ['var(--font-oswald)', 'Arial', 'sans-serif'],
        'body': ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        'body-secondary': ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        'small': ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        'xsmall': ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        'button': ['var(--font-oswald)', 'Arial', 'sans-serif'],
        'button-small': ['var(--font-oswald)', 'Arial', 'sans-serif'],
        'label': ['var(--font-oswald)', 'Arial', 'sans-serif'],
        'tagline': ['var(--font-oswald)', 'Arial', 'sans-serif'],

        // Legacy mappings (for backward compatibility)
        'title': ['var(--font-anton)', 'Impact', 'sans-serif'],
        'mono': ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Base sizes (mobile-first)
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],

        // Brand typography scale
        'brand-sm': ['1.5rem', { lineHeight: '1.1', letterSpacing: '0.1em' }],
        'brand-base': ['2rem', { lineHeight: '1.1', letterSpacing: '0.12em' }],
        'brand-lg': ['2.25rem', { lineHeight: '1.05', letterSpacing: '0.14em' }],
        'brand-xl': ['2.5rem', { lineHeight: '1.05', letterSpacing: '0.16em' }],

        // Hero text
        'hero-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '0.08em' }],
        'hero-base': ['3rem', { lineHeight: '1.05', letterSpacing: '0.1em' }],
        'hero-lg': ['3.25rem', { lineHeight: '1.02', letterSpacing: '0.12em' }],
        'hero-xl': ['3.75rem', { lineHeight: '1.02', letterSpacing: '0.14em' }],

        // Venue names
        'venue-sm': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0.05em' }],
        'venue-base': ['1.75rem', { lineHeight: '1.2', letterSpacing: '0.06em' }],
        'venue-lg': ['2rem', { lineHeight: '1.15', letterSpacing: '0.07em' }],
        'venue-xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '0.08em' }],

        // Headings
        'heading-sm': ['1.25rem', { lineHeight: '1.3', letterSpacing: '0.06em' }],
        'heading-base': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.07em' }],
        'heading-lg': ['1.75rem', { lineHeight: '1.25', letterSpacing: '0.08em' }],
        'heading-xl': ['2rem', { lineHeight: '1.25', letterSpacing: '0.09em' }],

        // Subheadings
        'subheading-sm': ['1rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'subheading-base': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
        'subheading-lg': ['1.25rem', { lineHeight: '1.35', letterSpacing: '0.07em' }],

        // Body text
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'body-base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65', letterSpacing: '0.01em' }],

        // Buttons
        'button-sm': ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.04em' }],
        'button-base': ['1rem', { lineHeight: '1.2', letterSpacing: '0.05em' }],
        'button-lg': ['1.0625rem', { lineHeight: '1.2', letterSpacing: '0.06em' }],

        // Labels/Tags
        'label-sm': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.04em' }],
        'label-base': ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.05em' }],
        'label-lg': ['1rem', { lineHeight: '1.3', letterSpacing: '0.06em' }],

        // Taglines
        'tagline-sm': ['1.125rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
        'tagline-base': ['1.25rem', { lineHeight: '1.2', letterSpacing: '0.09em' }],
        'tagline-lg': ['1.5rem', { lineHeight: '1.15', letterSpacing: '0.1em' }],

        // Legacy sizes (for backward compatibility)
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'anton': '400', // Anton is naturally bold
        'oswald-regular': '400',
        'oswald-semibold': '600',
        'roboto-regular': '400',
        'roboto-medium': '500',
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0.01em',
        'wide': '0.02em',
        'wider': '0.04em',
        'widest': '0.08em',
        // Brand-specific spacing
        'brand': '0.12em',
        'brand-lg': '0.16em',
        'hero': '0.1em',
        'heading': '0.07em',
        'subheading': '0.06em',
        'button': '0.05em',
        'label': '0.05em',
        'tagline': '0.09em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-scale': 'fadeInScale 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(229, 57, 53, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(229, 57, 53, 0.5)' },
        },
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(229, 57, 53, 0.3)',
        'glow-red-lg': '0 0 40px rgba(229, 57, 53, 0.4)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
