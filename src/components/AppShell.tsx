import {
  ActionIcon,
  Text,
  useMantineColorScheme,
} from "@mantine/core";

// Tab definition
export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface AppShellProps {
  title: string;
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}

/**
 * iOS 26 App Shell:
 * - Semi-transparent top navigation bar (50% opacity + blur 5px)
 * - Semi-transparent bottom tab bar (50% opacity + blur 5px)
 * - Content scrolls freely under both bars
 * - Respects iOS safe area insets for PWA fullscreen mode
 */
export function AppShell({
  title,
  tabs,
  activeTab,
  onTabChange,
  children,
  rightAction,
}: AppShellProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const glassBg = isDark
    ? "rgba(28, 28, 30, 0.5)"
    : "rgba(255, 255, 255, 0.5)";
  const glassBorder = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(255, 255, 255, 0.6)";

  return (
    <div
      style={{
        minHeight: "100dvh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── TOP NAVIGATION BAR ─────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          // Liquid glass
          background: glassBg,
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          borderBottom: `1px solid ${glassBorder}`,
          // Safe area top (iPhone notch / Dynamic Island)
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
            paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
            gap: 8,
          }}
        >
          {/* Left: color scheme toggle */}
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            onClick={() => toggleColorScheme()}
            aria-label="Toggle color scheme"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.06)",
              color: isDark ? "#fff" : "#000",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </ActionIcon>

          {/* Center: title */}
          <Text
            fw={700}
            fz="md"
            style={{
              letterSpacing: "-0.02em",
              flex: 1,
              textAlign: "center",
              color: isDark ? "#fff" : "#000",
            }}
          >
            {title}
          </Text>

          {/* Right: custom action or placeholder */}
          <div style={{ width: 40, display: "flex", justifyContent: "flex-end" }}>
            {rightAction ?? null}
          </div>
        </div>
      </header>

      {/* ── SCROLLABLE CONTENT ─────────────────────────────────────────── */}
      {/*
        Padding-top = top bar + safe-area-top so first content is not hidden.
        Padding-bottom = bottom bar + safe-area-bottom so last content is not hidden.
        We use negative margins trick to let content *visually* scroll under the bars.
      */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          // Push content below the fixed top bar
          paddingTop: "calc(56px + env(safe-area-inset-top, 0px))",
          // Push content above the fixed bottom bar
          paddingBottom: "calc(68px + env(safe-area-inset-bottom, 0px))",
          paddingLeft: "env(safe-area-inset-left, 0px)",
          paddingRight: "env(safe-area-inset-right, 0px)",
          // Smooth iOS momentum scrolling
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>

      {/* ── BOTTOM TAB BAR ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          // Liquid glass
          background: glassBg,
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          borderTop: `1px solid ${glassBorder}`,
          // Safe area bottom (iPhone home indicator)
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div
          style={{
            height: 68,
            display: "flex",
            alignItems: "center",
            paddingLeft: "env(safe-area-inset-left, 0px)",
            paddingRight: "env(safe-area-inset-right, 0px)",
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 4px",
                  borderRadius: 12,
                  transition: "opacity 0.15s ease",
                  opacity: isActive ? 1 : 0.5,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    lineHeight: 1,
                    color: isActive
                      ? isDark ? "#0a84ff" : "#007aff"
                      : isDark ? "#8e8e93" : "#8e8e93",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), color 0.15s",
                    display: "block",
                  }}
                >
                  {isActive ? (tab.activeIcon ?? tab.icon) : tab.icon}
                </span>
                <Text
                  fz={10}
                  fw={isActive ? 600 : 400}
                  style={{
                    color: isActive
                      ? isDark ? "#0a84ff" : "#007aff"
                      : isDark ? "#8e8e93" : "#8e8e93",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    transition: "color 0.15s",
                  }}
                >
                  {tab.label}
                </Text>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
