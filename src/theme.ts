import { createTheme, rem } from "@mantine/core";

/**
 * iOS 26 "Liquid Glass" inspired Mantine v9 theme.
 *
 * Design principles:
 * - 50% transparent surfaces with backdrop-blur(5px) = liquid glass
 * - SF Pro system fonts
 * - iOS 26 color palette
 * - Generous border-radius (iOS-style pill/rounded rect)
 * - Safe-area aware app shell
 */
export const ios26Theme = createTheme({
  // SF Pro system font stack
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace:
    '"SF Mono", SFMono-Regular, ui-monospace, "Cascadia Code", monospace',

  // iOS 26 sizes — slightly larger touch targets
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(22),
  },

  // iOS-style radius
  radius: {
    xs: rem(6),
    sm: rem(10),
    md: rem(14),
    lg: rem(20),
    xl: rem(28),
  },

  // iOS 26 spacing (generous)
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  // Line heights matching iOS typography
  lineHeights: {
    xs: "1.3",
    sm: "1.4",
    md: "1.5",
    lg: "1.6",
    xl: "1.7",
  },

  // Default component props for iOS feel
  components: {
    Button: {
      defaultProps: {
        radius: "xl",
      },
      styles: {
        root: {
          fontWeight: 600,
          letterSpacing: "-0.01em",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        padding: "lg",
      },
      styles: {
        root: {
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
    Textarea: {
      defaultProps: {
        radius: "md",
      },
    },
    NumberInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Modal: {
      defaultProps: {
        radius: "xl",
        centered: true,
      },
      styles: {
        content: {
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        },
      },
    },
    Drawer: {
      styles: {
        content: {
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: "xl",
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: "xl",
      },
    },
    Menu: {
      defaultProps: {
        radius: "lg",
      },
    },
    Tooltip: {
      defaultProps: {
        radius: "md",
      },
    },
    Notification: {
      defaultProps: {
        radius: "lg",
      },
    },
    Paper: {
      defaultProps: {
        radius: "lg",
      },
      styles: {
        root: {
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
    },
    Chip: {
      defaultProps: {
        radius: "xl",
      },
    },
    SegmentedControl: {
      defaultProps: {
        radius: "xl",
      },
    },
    Tabs: {
      defaultProps: {
        radius: "md",
      },
    },
    Alert: {
      defaultProps: {
        radius: "lg",
      },
    },
    NavLink: {
      defaultProps: {
        radius: "md",
      },
    },
    Avatar: {
      defaultProps: {
        radius: "xl",
      },
    },
  },
});
