import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import type { CSSVariablesResolver } from "@mantine/core";

// Mantine base styles (component CSS)
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

// Mediterranean typefaces
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/jetbrains-mono/400.css";

import { mediterraneanTheme } from "@/theme/mediterranean";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Override Mantine's own CSS variables for warm Mediterranean light/dark palettes
const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    "--mantine-color-body":           "#F5F0EA",
    "--mantine-color-text":           "#2A2118",
    "--mantine-color-default":        "rgba(255, 250, 244, 0.72)",
    "--mantine-color-default-border": "rgba(180, 155, 120, 0.25)",
    "--mantine-color-placeholder":    "#A89880",
    "--mantine-color-dimmed":         "#7A6850",
  },
  dark: {
    "--mantine-color-body":           "#14100C",
    "--mantine-color-text":           "#EDE4D0",
    "--mantine-color-default":        "rgba(30, 23, 14, 0.88)",
    "--mantine-color-default-border": "rgba(120, 90, 50, 0.32)",
    "--mantine-color-placeholder":    "#6A5840",
    "--mantine-color-dimmed":         "#A08864",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={mediterraneanTheme}
      defaultColorScheme="light"
      cssVariablesResolver={cssVariablesResolver}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
