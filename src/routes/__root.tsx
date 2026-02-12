import { createRootRoute, Outlet } from "@tanstack/react-router";
import { GlobalStyles } from "@/styles/global";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <GlobalStyles />
      <Outlet />
    </>
  );
}
