import "@mantine/core/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import { routeTree } from "./routeTree.gen";
import { ios26Theme } from "./theme";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={ios26Theme} defaultColorScheme="auto">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
