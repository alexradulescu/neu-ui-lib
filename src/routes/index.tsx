import { createFileRoute } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const Page = styled.main`
  min-height: 100dvh;
  padding: var(--neu-space-lg);
  padding-bottom: var(--neu-space-2xl);

  /* iOS-style gradient background to showcase glass effect */
  background: linear-gradient(
    160deg,
    #1a1a2e 0%,
    #16213e 30%,
    #0f3460 60%,
    #533483 100%
  );
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--neu-space-md) 0;
  margin-bottom: var(--neu-space-xl);
`;

const AppTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.9);
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--neu-space-xl);
  max-width: 480px;
  margin: 0 auto;
`;

const SectionLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: var(--neu-space-sm);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: var(--neu-space-sm);
  flex-wrap: wrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--neu-space-md);
`;

const CardTitle = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--neu-space-sm);
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.5;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: var(--neu-space-md) 0;
`;

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <Button size="sm" onClick={onToggle}>
      {dark ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}

function HomePage() {
  const [dark, setDark] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  }

  return (
    <Page>
      <TopBar>
        <AppTitle>Neu UI</AppTitle>
        <ThemeToggle dark={dark} onToggle={toggleTheme} />
      </TopBar>

      <Sections>
        {/* Buttons */}
        <div>
          <SectionLabel>Buttons</SectionLabel>
          <Card padding="md">
            <CardTitle>Button Variants</CardTitle>
            <CardSubtitle>Liquid Glass tinting for semantic meaning</CardSubtitle>
            <Divider />
            <Row>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
            </Row>
          </Card>
        </div>

        <div>
          <SectionLabel>Button Sizes</SectionLabel>
          <Card padding="md">
            <Row>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Row>
          </Card>
        </div>

        <div>
          <SectionLabel>Full Width</SectionLabel>
          <Card padding="md">
            <Column>
              <Button variant="primary" fullWidth>Continue</Button>
              <Button variant="secondary" fullWidth>Cancel</Button>
              <Button variant="destructive" fullWidth disabled>Delete Account</Button>
            </Column>
          </Card>
        </div>

        {/* Inputs */}
        <div>
          <SectionLabel>Inputs</SectionLabel>
          <Card padding="md">
            <Column>
              <Input
                label="Email"
                placeholder="you@example.com"
                type="email"
              />
              <Input
                label="Search"
                placeholder="Search…"
                leadingIcon={<SearchIcon />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                type="password"
                trailingIcon={<EyeIcon />}
              />
              <Input
                label="Username"
                placeholder="john_doe"
                error="This username is already taken"
              />
              <Input
                label="Disabled field"
                placeholder="Not editable"
                disabled
              />
            </Column>
          </Card>
        </div>

        {/* Cards */}
        <div>
          <SectionLabel>Cards</SectionLabel>
          <Card variant="default" padding="md">
            <CardTitle>Default Card</CardTitle>
            <CardSubtitle>
              Standard Liquid Glass surface — translucent, frosted, floating above content.
            </CardSubtitle>
          </Card>

          <br />

          <Card variant="elevated" padding="md">
            <CardTitle>Elevated Card</CardTitle>
            <CardSubtitle>
              Higher opacity and deeper shadow — for modals, sheets, and focal content.
            </CardSubtitle>
            <Divider />
            <Row>
              <Button variant="primary" size="sm">Accept</Button>
              <Button variant="secondary" size="sm">Dismiss</Button>
            </Row>
          </Card>

          <br />

          <Card variant="tinted" padding="md">
            <CardTitle>Tinted Card</CardTitle>
            <CardSubtitle>
              Accent-tinted glass for highlighted states, featured sections, or CTAs.
            </CardSubtitle>
          </Card>
        </div>

        {/* Concentric nesting */}
        <div>
          <SectionLabel>Concentric Nesting</SectionLabel>
          <Card variant="default" padding="lg">
            <CardTitle>Outer Card</CardTitle>
            <CardSubtitle>Inner elements adapt corner radius concentrically.</CardSubtitle>
            <Divider />
            <Card variant="elevated" padding="sm">
              <CardSubtitle>Nested elevated card inside default card</CardSubtitle>
            </Card>
          </Card>
        </div>
      </Sections>
    </Page>
  );
}
