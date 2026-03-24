import { createRootRoute, Outlet } from "@tanstack/react-router";
import { GlobalStyles } from "@/styles/global";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "@/theme/mantine-theme";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <GlobalStyles />
      <Outlet />
    </MantineProvider>
  );
}
