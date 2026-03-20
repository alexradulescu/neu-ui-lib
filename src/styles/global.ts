import { createGlobalStyle } from "@alex.radulescu/styled-static";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    /* iOS 26 Liquid Glass design tokens */
    --glass-bg-light: rgba(255, 255, 255, 0.5);
    --glass-bg-dark: rgba(28, 28, 30, 0.5);
    --glass-border-light: rgba(255, 255, 255, 0.4);
    --glass-border-dark: rgba(255, 255, 255, 0.12);
    --glass-blur: blur(5px);

    /* App shell bar heights + safe areas */
    --top-bar-height: 56px;
    --bottom-bar-height: 68px;
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
    --safe-left: env(safe-area-inset-left, 0px);
    --safe-right: env(safe-area-inset-right, 0px);

    /* Effective bar heights including safe areas */
    --top-bar-total: calc(var(--top-bar-height) + var(--safe-top));
    --bottom-bar-total: calc(var(--bottom-bar-height) + var(--safe-bottom));
  }

  html {
    font-family:
      -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
      "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100dvh;
    overscroll-behavior: none;
    /* iOS 26 wallpaper-style gradient background */
    background: linear-gradient(
      160deg,
      #c8d8ff 0%,
      #e8d5f5 30%,
      #fdd9c8 60%,
      #ffecd2 100%
    );
    background-attachment: fixed;
  }

  [data-mantine-color-scheme="dark"] body {
    background: linear-gradient(
      160deg,
      #0a0f2e 0%,
      #1a0a2e 30%,
      #2e0a1a 60%,
      #0a1a2e 100%
    );
    background-attachment: fixed;
  }

  #root {
    min-height: 100dvh;
  }

  /* Prevent iOS tap highlight */
  button, a, input, select, textarea {
    -webkit-tap-highlight-color: transparent;
  }

  /* Prevent iOS zoom on input focus */
  input, select, textarea {
    font-size: 16px;
  }
`;
