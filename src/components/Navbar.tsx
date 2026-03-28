import { styled } from "@alex.radulescu/styled-static";
import type { ReactNode } from "react";

// ─── Mediterranean Navbar — iOS 26 Floating Liquid Glass ─────────────────────
// Floating pill detached from screen edges.
// Active tab: full-height glass chip, 2px inset from the wrapper — border-radius
// follows the continuous corner formula (r_inner = r_outer − inset = 28 − 2 = 26px).

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

const NavWrap = styled.nav`
  position: fixed;
  left: 12px;
  right: 12px;
  /* Sit above iPhone home indicator */
  bottom: max(12px, calc(env(safe-area-inset-bottom) + 8px));
  z-index: 200;
  border-radius: 28px;

  background: var(--med-navbar-bg);
  backdrop-filter: blur(32px) saturate(1.8) brightness(1.04);
  -webkit-backdrop-filter: blur(32px) saturate(1.8) brightness(1.04);

  border: 0.5px solid var(--med-color-border);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.14),
    0 2px 8px  rgba(0, 0, 0, 0.08),
    inset 0 1px 0 var(--med-color-card-shimmer);
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;   /* buttons fill full height */
  height: 58px;
  /* No horizontal padding — chip's inset: 2px on edge buttons
     already produces the correct 2px gap from the NavWrap edge */
`;

/* Each tab item — stretches to full NavInner height */
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
  position: relative;     /* anchor for the absolute GlassChip */
  -webkit-tap-highlight-color: transparent;
  transition: opacity 120ms ease;

  &:active {
    opacity: 0.6;
  }
`;

/*
 * Glass chip: covers the entire button minus 2px on every edge.
 * border-radius: 26px = 28px (NavWrap) − 2px (inset) — continuous corner alignment.
 * Scales in from 0 with spring easing so it feels physical.
 */
const GlassChip = styled.div`
  position: absolute;
  inset: 2px;
  border-radius: 26px;
  transform: scale(0);
  opacity: 0;
  transform-origin: center center;

  background: rgba(184, 115, 51, 0.13);
  border: 0.5px solid rgba(184, 115, 51, 0.26);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 230, 180, 0.22);

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
  max-width: 60px;
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
            >
              {/* Glass chip: full-height, 2px inset, spring animation */}
              <GlassChip
                style={
                  isActive
                    ? { transform: "scale(1)", opacity: 1 }
                    : undefined
                }
              />
              <IconWrap
                style={{
                  color: isActive
                    ? "var(--med-color-accent)"
                    : "var(--med-navbar-inactive)",
                }}
              >
                {item.icon}
              </IconWrap>
              <NavLabel
                style={{
                  color: isActive
                    ? "var(--med-color-accent)"
                    : "var(--med-navbar-inactive)",
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
