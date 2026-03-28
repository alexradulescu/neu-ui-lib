import type { ReactNode } from "react";
import css from "./mediterranean.module.css";

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

export function Navbar({ items, activeId, onSelect }: NavbarProps) {
  return (
    <nav className={css.navWrap}>
      <div className={css.navInner}>
        {items.slice(0, 6).map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              className={css.navBtn}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect?.(item.id)}
            >
              <div
                className={`${css.glassChip}${isActive ? ` ${css.glassChipActive}` : ""}`}
              />
              <span
                className={css.iconWrap}
                style={{
                  color: isActive
                    ? "var(--med-color-accent)"
                    : "var(--med-navbar-inactive)",
                }}
              >
                {item.icon}
              </span>
              <span
                className={css.navLabel}
                style={{
                  color: isActive
                    ? "var(--med-color-accent)"
                    : "var(--med-navbar-inactive)",
                  fontWeight: isActive ? "600" : "400",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
