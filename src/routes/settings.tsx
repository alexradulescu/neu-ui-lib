import { useState, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { TextInput } from "@mantine/core";
import { IconHome, IconPencil, IconBookmark, IconUser, IconCamera, IconCheck, IconLogout } from "@tabler/icons-react";
import { Navbar } from "@/components/Navbar";
import { avatarBg, initials, COPPER_GRADIENT } from "@/components/PostComponents";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

// ─── Styled ───────────────────────────────────────────────────────────────────

const Page = styled.main`
  min-height: 100dvh;
  background: var(--med-color-bg);
  padding-bottom: 88px;
`;

const PageInner = styled.div`
  max-width: 520px;
  margin: 0 auto;
  padding: 0 16px 24px;
`;

const GlassCard = styled.div`
  background: var(--med-color-surface);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 16px;
  border: 1px solid var(--med-color-border);
  overflow: hidden;
`;

const SectionLabel = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--med-color-text-muted);
  margin: 0 0 8px;
  padding: 0 4px;
`;

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "feed",     icon: <IconHome size={20} />,     label: "Feed" },
  { id: "post",     icon: <IconPencil size={20} />,   label: "New Post" },
  { id: "saved",    icon: <IconBookmark size={20} />, label: "Saved" },
  { id: "settings", icon: <IconUser size={20} />,     label: "Profile" },
];

// ─── Settings Page ────────────────────────────────────────────────────────────

function SettingsPage() {
  const navigate   = useNavigate();
  const fileRef    = useRef<HTMLInputElement>(null);

  const [name,        setName]        = useState("Alex");
  const [email,       setEmail]       = useState("alex@family.com");
  const [newPass,     setNewPass]     = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [avatarUrl,   setAvatarUrl]   = useState<string | null>(null);
  const [saved,       setSaved]       = useState(false);
  const [confirmOut,  setConfirmOut]  = useState(false);

  const passError = newPass && confirmPass && newPass !== confirmPass ? "Passwords don't match" : undefined;
  const canSave   = name.trim().length > 0 && !passError;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleNav = (id: string) => {
    if (id === "feed" || id === "post") navigate({ to: "/feed" });
    else if (id === "saved") navigate({ to: "/saved" });
  };

  return (
    <Page>
      <PageInner>

        {/* Header */}
        <header style={{ padding: "32px 0 28px", textAlign: "center" }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "2.1rem", fontWeight: 600, lineHeight: 1.1, color: "var(--med-color-text-primary)", margin: 0, letterSpacing: "0.01em" }}>
            Profile
          </h1>
        </header>

        {/* Avatar + name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ position: "relative" }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ width: 88, height: 88, borderRadius: "50%", background: avatarBg("Alex"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"DM Sans", sans-serif', fontSize: 32, fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>
                {initials(name || "A")}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: COPPER_GRADIENT, border: "2.5px solid var(--med-color-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
            >
              <IconCamera size={13} />
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "1.1rem", fontWeight: 600, color: "var(--med-color-text-primary)" }}>
              {name || "Your Name"}
            </div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem", color: "var(--med-color-text-muted)" }}>
              {email}
            </div>
          </div>
        </div>

        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) setAvatarUrl(URL.createObjectURL(f)); }} />

        {/* Personal info */}
        <SectionLabel>Personal Info</SectionLabel>
        <GlassCard style={{ padding: "16px 16px 8px", marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <TextInput label="Full name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            <TextInput label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
        </GlassCard>

        {/* Password */}
        <SectionLabel>Change Password</SectionLabel>
        <GlassCard style={{ padding: "16px 16px 8px", marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <TextInput label="New password" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="••••••••" />
            <TextInput label="Confirm password" type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="••••••••" error={passError} />
          </div>
        </GlassCard>

        {/* Save button */}
        <button
          onClick={handleSave} disabled={!canSave}
          style={{
            width: "100%", padding: 14, borderRadius: 14, marginBottom: 24,
            background: canSave ? COPPER_GRADIENT : "var(--med-color-border)",
            border: "none", cursor: canSave ? "pointer" : "default",
            fontFamily: '"DM Sans", sans-serif', fontSize: "0.9375rem", fontWeight: 600,
            color: canSave ? "#fff" : "var(--med-color-text-muted)",
            transition: "all 140ms ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          }}
        >
          {saved ? <><IconCheck size={16} /> Saved!</> : "Save Changes"}
        </button>

        {/* Sign out */}
        <SectionLabel>Account</SectionLabel>
        <GlassCard>
          {!confirmOut ? (
            <button
              onClick={() => setConfirmOut(true)}
              style={{ width: "100%", padding: "15px 16px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: '"DM Sans", sans-serif', fontSize: "0.9375rem", fontWeight: 500, color: "#B82D26" }}
            >
              <IconLogout size={18} />
              Sign Out
            </button>
          ) : (
            <div style={{ padding: "14px 16px" }}>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", color: "var(--med-color-text-secondary)", margin: "0 0 12px" }}>
                Sign out of your account?
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setConfirmOut(false)}
                  style={{ flex: 1, padding: "9px", borderRadius: 999, border: "1px solid var(--med-color-border)", background: "transparent", cursor: "pointer", fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", fontWeight: 500, color: "var(--med-color-text-secondary)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setConfirmOut(false)}
                  style={{ flex: 1, padding: "9px", borderRadius: 999, background: "#B82D26", border: "none", cursor: "pointer", fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </GlassCard>

      </PageInner>

      <Navbar activeId="settings" onSelect={handleNav} items={NAV} />
    </Page>
  );
}
