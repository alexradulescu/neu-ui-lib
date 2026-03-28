import { createGlobalStyle } from "@alex.radulescu/styled-static";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    /* ── Typefaces ─────────────────────────────────────────────────────── */
    --med-font-display: "Cormorant Garamond", Georgia, "Times New Roman", serif;
    --med-font-sans: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    --med-font-mono: "JetBrains Mono", "SF Mono", ui-monospace, monospace;

    /* ── Mediterranean Palette (light) ─────────────────────────────────── */
    --med-color-bg:             #F5F0EA;
    --med-color-surface:        rgba(255, 250, 244, 0.72);
    --med-color-surface-deep:   #EDE5D8;
    --med-color-border:         rgba(180, 155, 120, 0.25);
    --med-color-divider:        rgba(180, 155, 120, 0.18);
    --med-color-text-primary:   #2A2118;
    --med-color-text-secondary: #7A6850;
    --med-color-text-muted:     #A89880;
    --med-color-accent:         #B87333;
    --med-color-accent-soft:    #D4A882;
    --med-color-sky:            #A8C4D4;
    --med-color-card-shimmer:   rgba(255, 245, 230, 0.60);

    /* ── Table & List ─────────────────────────────────────────────────── */
    --med-color-row-hover:      rgba(180, 155, 120, 0.09);
    --med-color-row-stripe:     rgba(180, 155, 120, 0.04);

    /* ── Input ────────────────────────────────────────────────────────── */
    --med-color-input-bg:       rgba(255, 250, 244, 0.65);
    --med-color-input-bg-hover: rgba(255, 250, 244, 0.85);
    --med-color-input-bg-focus: rgba(255, 250, 244, 0.95);
    --med-color-input-border:   rgba(180, 155, 120, 0.40);
    --med-color-dropdown-bg:    rgba(255, 250, 244, 0.97);

    /* ── Navbar ───────────────────────────────────────────────────────── */
    --med-navbar-bg:            rgba(245, 240, 234, 0.84);
    --med-navbar-inactive:      rgba(100, 82, 62, 0.52);

    /* ── Spacing (8px base grid) ──────────────────────────────────────── */
    --med-space-xs:  4px;
    --med-space-sm:  8px;
    --med-space-md:  16px;
    --med-space-lg:  24px;
    --med-space-xl:  32px;
    --med-space-2xl: 48px;

    /* ── Radius ───────────────────────────────────────────────────────── */
    --med-radius-sm:   8px;
    --med-radius-md:   12px;
    --med-radius-lg:   16px;
    --med-radius-xl:   24px;
    --med-radius-full: 9999px;

    /* ── Shadows (warm-tinted, no cool grey) ──────────────────────────── */
    --med-shadow-sm: 0 2px 8px rgba(120, 80, 40, 0.06);
    --med-shadow-md: 0 4px 32px rgba(120, 80, 40, 0.10);
    --med-shadow-lg: 0 8px 48px rgba(120, 80, 40, 0.14);

    /* ── Motion ───────────────────────────────────────────────────────── */
    --med-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --med-ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --med-ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
    --med-duration-sm: 200ms;
    --med-duration-md: 320ms;

    /* ── Legacy neu tokens (aliased for backward compatibility) ───────── */
    --neu-font-sans:  var(--med-font-sans);
    --neu-font-mono:  var(--med-font-mono);
    --neu-space-xs:   var(--med-space-xs);
    --neu-space-sm:   var(--med-space-sm);
    --neu-space-md:   var(--med-space-md);
    --neu-space-lg:   var(--med-space-lg);
    --neu-space-xl:   var(--med-space-xl);
    --neu-space-2xl:  var(--med-space-2xl);
    --neu-radius-sm:  var(--med-radius-sm);
    --neu-radius-md:  var(--med-radius-md);
    --neu-radius-lg:  var(--med-radius-lg);
    --neu-radius-xl:  var(--med-radius-xl);
    --neu-radius-full: var(--med-radius-full);
    --neu-color-bg:               var(--med-color-bg);
    --neu-color-surface:          var(--med-color-surface);
    --neu-color-surface-elevated: rgba(255, 250, 244, 0.90);
    --neu-color-text-primary:     var(--med-color-text-primary);
    --neu-color-text-secondary:   var(--med-color-text-secondary);
    --neu-color-text-tertiary:    #A89880;
    --neu-color-separator:        var(--med-color-border);
    --neu-color-accent:           var(--med-color-accent);
    --neu-color-accent-hover:     #9A5E25;
  }

  /* ── Dark Mediterranean theme ──────────────────────────────────────────── */
  [data-mantine-color-scheme="dark"] {
    --med-color-bg:             #14100C;
    --med-color-surface:        rgba(30, 23, 14, 0.88);
    --med-color-surface-deep:   #1C1610;
    --med-color-border:         rgba(120, 90, 50, 0.32);
    --med-color-divider:        rgba(120, 90, 50, 0.22);
    --med-color-text-primary:   #EDE4D0;
    --med-color-text-secondary: #A08864;
    --med-color-text-muted:     #6A5840;
    --med-color-accent:         #C68D4A;
    --med-color-accent-soft:    #9A7048;
    --med-color-card-shimmer:   rgba(255, 200, 120, 0.06);

    --med-navbar-bg:            rgba(18, 14, 8, 0.88);
    --med-navbar-inactive:      rgba(162, 138, 102, 0.55);

    --med-color-row-hover:      rgba(184, 115, 51, 0.11);
    --med-color-row-stripe:     rgba(80, 55, 25, 0.22);

    --med-color-input-bg:       rgba(22, 16, 9, 0.72);
    --med-color-input-bg-hover: rgba(32, 24, 13, 0.85);
    --med-color-input-bg-focus: rgba(36, 27, 14, 0.95);
    --med-color-input-border:   rgba(120, 90, 50, 0.42);
    --med-color-dropdown-bg:    rgba(22, 17, 10, 0.97);

    --med-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.35);
    --med-shadow-md: 0 4px 32px rgba(0, 0, 0, 0.45);
    --med-shadow-lg: 0 8px 48px rgba(0, 0, 0, 0.55);
  }

  html {
    font-family: var(--med-font-sans);
    font-size: 16px;
    line-height: 1.7;
    color: var(--med-color-text-primary);
    background-color: var(--med-color-bg);
    -webkit-text-size-adjust: 100%;
  }

  body {
    min-height: 100dvh;
    overscroll-behavior: none;
    background-color: var(--med-color-bg);
  }

  #root {
    min-height: 100dvh;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  button, a, input, select, textarea {
    -webkit-tap-highlight-color: transparent;
  }

  input, select, textarea {
    font-size: 16px;
  }

  /* Remove default browser focus ring — each component uses warm copper glow */
  :focus-visible {
    outline: none;
  }

  /* ── Modal: iOS 26 bottom sheet on mobile ─────────────────────────────── */
  @media (max-width: 599px) {
    .med-modal-inner {
      align-items: flex-end !important;
      padding: 0 !important;
    }

    .med-modal-content {
      border-radius: 24px 24px 0 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      max-height: 92dvh !important;
      margin: 0 !important;
      /* Safe area padding at bottom (iPhone home indicator) */
      padding-bottom: env(safe-area-inset-bottom);
    }
  }

  /* Desktop: centred with a bit more room */
  @media (min-width: 600px) {
    .med-modal-inner {
      align-items: center;
    }

    .med-modal-content {
      max-width: 480px;
      width: 100%;
    }
  }
`;
