import {
  Modal as MantineModal,
  type ModalProps as MantineModalProps,
} from "@mantine/core";
import type { ReactNode } from "react";
import { styled } from "@alex.radulescu/styled-static";

// ─── Mediterranean Modal ──────────────────────────────────────────────────────
// Full glassmorphism panel that rises from below with spring easing.
// Backdrop: darkened warm overlay + blur.
// Content: frosted warm-cream glass, warm-tinted shadow.

const ModalTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.625rem;
  font-weight: 400;
  line-height: 1.25;
  color: #2A2118;
  letter-spacing: 0.01em;
`;

const ModalBody = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #7A6850;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
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
      centered
      radius="lg"
      overlayProps={{
        backgroundOpacity: 0.28,
        blur: 6,
        color: "#2A2118",
      }}
      transitionProps={{
        transition: "slide-up",
        duration: 320,
        timingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        exitDuration: 180,
      }}
      title={title ? <ModalTitle>{title}</ModalTitle> : undefined}
      styles={{
        content: {
          background: "rgba(255, 250, 244, 0.88)",
          backdropFilter: "blur(24px) saturate(1.5)",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          border: "1px solid rgba(180, 155, 120, 0.30)",
          boxShadow:
            "0 8px 48px rgba(120, 80, 40, 0.18), " +
            "0 2px 8px rgba(120, 80, 40, 0.10), " +
            "inset 0 1px 0 rgba(255, 245, 230, 0.60)",
          borderRadius: "20px",
          overflow: "hidden",
        },
        header: {
          background: "transparent",
          paddingBottom: "4px",
        },
        close: {
          color: "#7A6850",
          borderRadius: "50%",
          transition: "background 200ms ease, color 200ms ease",
          "&:hover": {
            background: "rgba(180, 155, 120, 0.16)",
            color: "#2A2118",
          },
        },
        body: {
          paddingTop: "8px",
        },
        inner: {
          padding: "24px",
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
