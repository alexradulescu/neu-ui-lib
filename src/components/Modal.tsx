import {
  Modal as MantineModal,
  type ModalProps as MantineModalProps,
} from "@mantine/core";
import type { ReactNode } from "react";
import { styled } from "@alex.radulescu/styled-static";

// ─── Mediterranean Modal ──────────────────────────────────────────────────────
// Mobile  (<600px): iOS 26-style bottom sheet — full-width, anchored to the
//                   bottom edge, rounded top corners, slides up.
// Desktop (≥600px): centred floating panel with glassmorphism.
// Both: frosted warm-cream glass surface, warm overlay backdrop.

const ModalTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.1;
  color: #2A2118;
  letter-spacing: 0.01em;
`;

const ModalBody = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #7A6850;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 0.5px solid rgba(180, 155, 120, 0.30);
`;

// ─── Public API ───────────────────────────────────────────────────────────────

export interface ModalProps
  extends Omit<MantineModalProps, "title" | "styles"> {
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Modal({ title, children, footer, ...props }: ModalProps) {
  return (
    <MantineModal
      {...props}
      // classNames hook into responsive CSS defined in global.ts
      classNames={{
        inner: "med-modal-inner",
        content: "med-modal-content",
      }}
      radius="lg"
      overlayProps={{
        backgroundOpacity: 0.28,
        blur: 6,
        color: "#2A2118",
      }}
      transitionProps={{
        transition: "slide-up",
        duration: 300,
        timingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        exitDuration: 160,
      }}
      title={title ? <ModalTitle>{title}</ModalTitle> : undefined}
      styles={{
        content: {
          background: "rgba(255, 250, 244, 0.90)",
          backdropFilter: "blur(24px) saturate(1.5)",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          border: "1px solid rgba(180, 155, 120, 0.30)",
          boxShadow:
            "0 8px 48px rgba(120, 80, 40, 0.18), " +
            "0 2px 8px rgba(120, 80, 40, 0.10), " +
            "inset 0 1px 0 rgba(255, 245, 230, 0.60)",
          // Desktop default — overridden to 24px 24px 0 0 on mobile via CSS class
          borderRadius: "20px",
        },
        header: {
          background: "transparent",
          paddingBottom: "2px",
        },
        close: {
          color: "#7A6850",
          borderRadius: "50%",
          "&:hover": {
            background: "rgba(180, 155, 120, 0.16)",
            color: "#2A2118",
          },
        },
        body: {
          paddingTop: "4px",
        },
        inner: {
          padding: "16px",
        },
      }}
    >
      {children && <ModalBody>{children}</ModalBody>}
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </MantineModal>
  );
}

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
