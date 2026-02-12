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
    --neu-font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    --neu-font-mono: "SF Mono", SFMono-Regular, ui-monospace, monospace;

    /* iOS-inspired spacing scale */
    --neu-space-xs: 4px;
    --neu-space-sm: 8px;
    --neu-space-md: 16px;
    --neu-space-lg: 24px;
    --neu-space-xl: 32px;
    --neu-space-2xl: 48px;

    /* iOS-inspired radius scale */
    --neu-radius-sm: 8px;
    --neu-radius-md: 12px;
    --neu-radius-lg: 16px;
    --neu-radius-xl: 24px;
    --neu-radius-full: 9999px;

    /* Light theme colors — inspired by iOS 26 liquid glass */
    --neu-color-bg: #f2f2f7;
    --neu-color-surface: rgba(255, 255, 255, 0.72);
    --neu-color-surface-elevated: rgba(255, 255, 255, 0.85);
    --neu-color-text-primary: #000000;
    --neu-color-text-secondary: #3c3c43;
    --neu-color-text-tertiary: #8e8e93;
    --neu-color-separator: rgba(60, 60, 67, 0.12);
    --neu-color-accent: #007aff;
    --neu-color-accent-hover: #0066d6;
    --neu-color-destructive: #ff3b30;
    --neu-color-success: #34c759;
    --neu-color-warning: #ff9500;
  }

  [data-theme="dark"] {
    --neu-color-bg: #000000;
    --neu-color-surface: rgba(28, 28, 30, 0.72);
    --neu-color-surface-elevated: rgba(44, 44, 46, 0.85);
    --neu-color-text-primary: #ffffff;
    --neu-color-text-secondary: #ebebf5;
    --neu-color-text-tertiary: #8e8e93;
    --neu-color-separator: rgba(84, 84, 88, 0.36);
    --neu-color-accent: #0a84ff;
    --neu-color-accent-hover: #409cff;
    --neu-color-destructive: #ff453a;
    --neu-color-success: #30d158;
    --neu-color-warning: #ff9f0a;
  }

  html {
    font-family: var(--neu-font-sans);
    font-size: 16px;
    line-height: 1.5;
    color: var(--neu-color-text-primary);
    background-color: var(--neu-color-bg);

    /* iOS-specific: prevent text size adjustment on orientation change */
    -webkit-text-size-adjust: 100%;
  }

  body {
    min-height: 100dvh;
    overscroll-behavior: none;
  }

  /* iOS safe area support */
  #root {
    min-height: 100dvh;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  /* Prevent iOS tap highlight */
  button,
  a,
  input,
  select,
  textarea {
    -webkit-tap-highlight-color: transparent;
  }

  /* Prevent iOS zoom on input focus */
  input,
  select,
  textarea {
    font-size: 16px;
  }
`;
