import { MantineTheme } from '@mantine/core';

/**
 * Apple-Inspired Mantine v9 Theme
 *
 * Design Philosophy:
 * - iOS 26/iPadOS 26/macOS 26 liquid glass aesthetic
 * - Semi-transparency: 50% opacity with 5px backdrop blur
 * - Elegant depth: Fine shadows (0.04-0.08 opacity)
 * - Luxurious minimalism: Clean layouts with thoughtful details
 * - Typography: Cormorant Garamond (headings) + Inter (body)
 */

export const mantineTheme: Partial<MantineTheme> = {
  // Font Family Configuration
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif',
  fontFamilyMonospace: '"SF Mono", SFMono-Regular, ui-monospace, "Menlo", "Monaco", "Cascadia Code", monospace',

  // Headings - Elegant Serif
  headings: {
    fontFamily: 'Cormorant Garamond, Georgia, "Times New Roman", serif',
    fontWeight: '600',
    textWrap: 'wrap',
    sizes: {
      h1: { fontSize: '2.5rem', fontWeight: '600', lineHeight: '1.2' },
      h2: { fontSize: '2rem', fontWeight: '600', lineHeight: '1.3' },
      h3: { fontSize: '1.75rem', fontWeight: '600', lineHeight: '1.35' },
      h4: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.45' },
      h6: { fontSize: '1rem', fontWeight: '600', lineHeight: '1.5' },
    },
  },

  // Radius - iOS 26 inspired
  radius: {
    xs: '6px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },

  // Spacing Scale
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // Shadows - Fine, Elegant Depth
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 4px 6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.08), 0 10px 10px rgba(0, 0, 0, 0.04)',
  },

  // Component Styles - Glassmorphism Effect
  components: {
    // Card - Glass container
    Card: {
      styles: {
        root: {
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },

    // Modal - Glass overlay
    Modal: {
      styles: {
        content: {
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
      },
    },

    // Paper - Glass surface
    Paper: {
      styles: {
        root: {
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        },
      },
    },

    // Popover - Glass popover
    Popover: {
      styles: {
        dropdown: {
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
      },
    },

    // Tooltip - Minimal tooltip
    Tooltip: {
      styles: {
        tooltip: {
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        },
      },
    },

    // Drawer - Glass side panel
    Drawer: {
      styles: {
        content: {
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        },
      },
    },

    // Input - Subtle border
    Input: {
      styles: {
        input: {
          borderColor: 'rgba(0, 0, 0, 0.1)',
          '&:focus': {
            borderColor: '#007aff',
          },
        },
      },
    },

    // Button - Elegant transitions
    Button: {
      styles: {
        root: {
          transition: 'all 150ms ease',
        },
      },
    },
  },

  // Cursor types
  cursorType: 'pointer',

  // Focus ring
  focusRing: 'always',

  // Theme colors for dark mode support
  primaryColor: 'blue',
  primaryShade: 5,
};
