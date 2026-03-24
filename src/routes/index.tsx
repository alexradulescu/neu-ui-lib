import { createFileRoute, Link } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { Button } from "@mantine/core";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: var(--neu-space-lg);
  gap: var(--neu-space-lg);
`;

const Card = styled.div`
  background: var(--neu-color-surface);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--neu-radius-lg);
  border: 1px solid var(--neu-color-separator);
  padding: var(--neu-space-xl);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--neu-color-text-primary);
  margin-bottom: var(--neu-space-sm);
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: var(--neu-color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--neu-space-md);
`;

function HomePage() {
  return (
    <Page>
      <Card>
        <Title>Neu UI</Title>
        <Subtitle>
          An iOS-inspired UI component library built with React, styled-static,
          and Mantine v9.
        </Subtitle>
        <Link to="/showcase">
          <Button radius="md" size="lg">
            View Showcase
          </Button>
        </Link>
      </Card>
    </Page>
  );
}
