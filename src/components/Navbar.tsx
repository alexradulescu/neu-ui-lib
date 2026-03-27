import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode } from "react";

// ─── Mediterranean Navbar — iOS 26 Floating Liquid Glass ─────────────────────
// iOS 26 tab bar: a detached pill floating above the bottom edge.
// "Liquid glass" = strong blur, warm translucent tint, subtle inner shimmer.
// Active item: glass chip behind icon springs in via cubic-bezier spring.
// Inactive items: muted, icon-only weight.
// Safe-area aware for iPhone home indicator.
// Max 6 items.

export interface NavbarItem {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface NavbarProps {
  items: NavbarItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

/* Floating pill detached from screen edges — the iOS 26 signature shape */
const NavWrap = styled.nav`
  position: fixed;
  bottom: 12px;
  left: 12px;
  right: 12px;
  /* Push above iPhone home indicator */
  bottom: max(12px, calc(env(safe-area-inset-bottom) + 8px));
  z-index: 200;
  border-radius: 28px;

  /* Liquid glass material */
  background: var(--med-navbar-bg);
  backdrop-filter: blur(32px) saturate(1.8) brightness(1.04);
  -webkit-backdrop-filter: blur(32px) saturate(1.8) brightness(1.04);

  /* Warm border + inner shimmer — characteristic of liquid glass */
  border: 0.5px solid var(--med-color-border);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.14),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 var(--med-color-card-shimmer);
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 58px;
  padding: 0 8px;
`;

/* Each tab item */
const NavBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex: 1;
  min-width: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 120ms ease;

  &:active {
    opacity: 0.6;
  }
`;

/* Glass chip behind the active icon — springs in from scale(0) */
const GlassChip = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 32px;
  border-radius: 12px;
  transform-origin: center center;
  transform: translate(-50%, -62%) scale(0);
  opacity: 0;
  /* Liquid glass chip */
  background: rgba(184, 115, 51, 0.14);
  border: 0.5px solid rgba(184, 115, 51, 0.24);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255, 230, 180, 0.20);
  transition:
    transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity   200ms ease;
  pointer-events: none;
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
  line-height: 1;
  letter-spacing: 0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 56px;
  position: relative;
  z-index: 1;
  transition: font-weight 160ms ease;
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
            >
              {/* Glass chip springs in when active */}
              <GlassChip
                style={
                  isActive
                    ? { transform: "translate(-50%, -62%) scale(1)", opacity: 1 }
                    : undefined
                }
              />
              <IconWrap
                style={{ color: isActive ? "var(--med-color-accent)" : "var(--med-navbar-inactive)" }}
              >
                {item.icon}
              </IconWrap>
              <NavLabel
                style={{
                  color: isActive ? "var(--med-color-accent)" : "var(--med-navbar-inactive)",
                  fontWeight: isActive ? "600" : "400",
                }}
              >
                {item.label}
              </NavLabel>
            </NavBtn>
          );
        })}
      </NavInner>
    </NavWrap>
  );
}
