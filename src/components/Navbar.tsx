import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode } from "react";

// ─── Mediterranean Navbar ─────────────────────────────────────────────────────
// iOS 26-style frosted-glass bottom tab bar.
// Supports up to 6 items. Active item shows a spring-animated copper pill
// behind the icon + copper-tinted label. Inactive items are muted.
// Place <Navbar /> once at the root of your app — it is position: fixed.

export interface NavbarItem {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface NavbarProps {
  items: NavbarItem[];     // 2–6 items
  activeId?: string;
  onSelect?: (id: string) => void;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const NavWrap = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--med-navbar-bg);
  backdrop-filter: blur(28px) saturate(1.6);
  -webkit-backdrop-filter: blur(28px) saturate(1.6);
  border-top: 0.5px solid var(--med-color-border);
  /* iPhone home-indicator safe area */
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 56px;
  max-width: 640px;
  margin: 0 auto;
  padding: 0 4px;
`;

const NavBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  min-width: 0;
  padding: 0 4px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: opacity 150ms ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    opacity: 0.65;
  }
`;

/* Animated glass pill behind the active icon */
const ActivePill = styled.div`
  position: absolute;
  top: 7px;
  width: 40px;
  height: 28px;
  border-radius: 999px;
  background: rgba(184, 115, 51, 0.13);
  border: 0.5px solid rgba(184, 115, 51, 0.22);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity  180ms ease;
`;

const IconWrap = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const NavLabel = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  position: relative;
  z-index: 1;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar({ items, activeId, onSelect }: NavbarProps) {
  const display = items.slice(0, 6);
  return (
    <NavWrap>
      <NavInner>
        {display.map((item) => {
          const isActive = item.id === activeId;
          return (
            <NavBtn
              key={item.id}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect?.(item.id)}
              style={{
                color: isActive
                  ? "var(--med-color-accent)"
                  : "var(--med-navbar-inactive)",
              }}
            >
              <ActivePill
                style={{
                  transform: isActive ? "scale(1)" : "scale(0.5)",
                  opacity: isActive ? 1 : 0,
                }}
              />
              <IconWrap>{item.icon}</IconWrap>
              <NavLabel>{item.label}</NavLabel>
            </NavBtn>
          );
        })}
      </NavInner>
    </NavWrap>
  );
}
