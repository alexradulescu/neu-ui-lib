import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
import { Badge } from "@/components/Badge";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { DatePickerInput } from "@/components/DatePickerInput";

export const Route = createFileRoute("/")({
  component: ShowcasePage,
});

// ─── Layout ───────────────────────────────────────────────────────────────────

const Page = styled.main`
  min-height: 100dvh;
  background-color: #F5F0EA;
  padding: 32px 16px 56px;
`;

const PageInner = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const PageHeader = styled.header`
  margin-bottom: 36px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2.25rem;
  font-weight: 400;
  line-height: 1.1;
  color: #2A2118;
  letter-spacing: 0.01em;
  margin-bottom: 8px;
`;

const PageSubtitle = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #7A6850;
  max-width: 480px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionLabel = styled.h2`
  font-family: "DM Sans", sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #7A6850;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 0.5px solid rgba(180, 155, 120, 0.30);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Swatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SwatchColor = styled.div`
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(180, 155, 120, 0.20);
`;

const SwatchLabel = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 0.625rem;
  color: #7A6850;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
`;

const CodeBlock = styled.pre`
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: #2A2118;
  background: rgba(237, 229, 216, 0.60);
  border: 1px solid rgba(180, 155, 120, 0.25);
  border-radius: 10px;
  padding: 14px 16px;
  overflow-x: auto;
`;

// ─── Showcase ─────────────────────────────────────────────────────────────────

function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckInChange = (val: any) => setCheckIn(val as Date | null);

  return (
    <Page>
      <PageInner>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <PageHeader>
          <PageTitle>Mediterranean UI</PageTitle>
          <PageSubtitle>
            Sun-bleached Italian coastal architecture meets iOS 26 spatial depth —
            warm travertine, aged copper, frosted glass.
          </PageSubtitle>
        </PageHeader>

        {/* ── Palette ────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Colour Palette</SectionLabel>
          <ColorGrid>
            <Swatch>
              <SwatchColor style={{ background: "#F5F0EA" }} />
              <SwatchLabel>Background</SwatchLabel>
              <SwatchLabel>#F5F0EA</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "rgba(255,250,244,0.72)", backdropFilter: "blur(20px)" }} />
              <SwatchLabel>Surface Glass</SwatchLabel>
              <SwatchLabel>rgba …0.72</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#EDE5D8" }} />
              <SwatchLabel>Surface Deep</SwatchLabel>
              <SwatchLabel>#EDE5D8</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#B87333" }} />
              <SwatchLabel>Accent Copper</SwatchLabel>
              <SwatchLabel>#B87333</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#D4A882" }} />
              <SwatchLabel>Accent Soft</SwatchLabel>
              <SwatchLabel>#D4A882</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#A8C4D4" }} />
              <SwatchLabel>Coastal Sky</SwatchLabel>
              <SwatchLabel>#A8C4D4</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#2A2118" }} />
              <SwatchLabel>Espresso</SwatchLabel>
              <SwatchLabel>#2A2118</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#7A6850" }} />
              <SwatchLabel>Warm Stone</SwatchLabel>
              <SwatchLabel>#7A6850</SwatchLabel>
            </Swatch>
          </ColorGrid>
        </Section>

        {/* ── Buttons ────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Buttons</SectionLabel>
          <Stack>
            <Row>
              <Button variant="primary">Book a villa</Button>
              <Button variant="ghost">View details</Button>
              <Button variant="subtle">Dismiss</Button>
            </Row>
            <Row>
              <Button variant="primary" size="xs">XSmall</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Row>
            <Row>
              <Button variant="primary" disabled>Unavailable</Button>
              <Button variant="ghost" disabled>Disabled ghost</Button>
            </Row>
          </Stack>
        </Section>

        {/* ── Cards ──────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Cards</SectionLabel>
          <Grid>
            <Card>
              <Card.Title>Amalfi Coast</Card.Title>
              <Card.Body>
                Perched above the Tyrrhenian Sea, where terracotta rooftops
                cascade down limestone cliffs to meet the azure water below.
              </Card.Body>
              <Card.Footer>
                <Badge variant="terracotta">Campania</Badge>
                <Badge variant="sky">Coastal</Badge>
              </Card.Footer>
            </Card>

            <Card>
              <Card.Title>Villa Romana</Card.Title>
              <Card.Body>
                Sun-weathered stone columns frame a courtyard of bougainvillea,
                fountain spray catching the afternoon light like scattered salt.
              </Card.Body>
              <Card.Footer>
                <Badge variant="copper">Historic</Badge>
                <Badge variant="sand">Estate</Badge>
              </Card.Footer>
            </Card>

            <Card compact>
              <Card.Title>Compact Card</Card.Title>
              <Card.Body>
                Tighter layout for dense information contexts — same glass
                surface, reduced padding.
              </Card.Body>
            </Card>
          </Grid>
        </Section>

        {/* ── Text Inputs ────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Text Inputs</SectionLabel>
          <Card style={{ maxWidth: 480 }}>
            <Stack>
              <TextInput
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                hint="As it appears on your passport"
              />
              <TextInput
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                label="Arrival date"
                type="date"
                defaultValue=""
              />
              <TextInput
                label="Invalid field"
                defaultValue="wrong@"
                error="Please enter a valid email address"
              />
              <TextInput
                label="Disabled"
                defaultValue="Cannot edit"
                disabled
              />
            </Stack>
          </Card>
        </Section>

        {/* ── Badges ─────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Badges</SectionLabel>
          <Stack>
            <Row>
              <Badge variant="terracotta">Terracotta</Badge>
              <Badge variant="copper">Copper</Badge>
              <Badge variant="sky">Sky</Badge>
              <Badge variant="sand">Sand</Badge>
            </Row>
            <Row>
              <Badge variant="terracotta" size="sm">Small</Badge>
              <Badge variant="terracotta" size="md">Medium</Badge>
              <Badge variant="terracotta" size="lg">Large</Badge>
            </Row>
            <Row>
              <Badge variant="copper">Available</Badge>
              <Badge variant="sand">Pending</Badge>
              <Badge variant="sky">Sea view</Badge>
              <Badge variant="terracotta">Breakfast incl.</Badge>
              <Badge variant="sand">Last room</Badge>
            </Row>
          </Stack>
        </Section>

        {/* ── Modal ──────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Modal</SectionLabel>
          <Card compact style={{ maxWidth: 380 }}>
            <Card.Body>
              On mobile: iOS 26-style bottom sheet. On desktop: centred panel.
              Both use frosted glass with a warm backdrop.
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
            </Card.Footer>
          </Card>

          <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Reserve your stay"
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            Your selection at Villa Amalfi has been held for 15 minutes. Please
            complete your details to secure the booking. Flexible cancellation
            applies up to 48 hours before arrival.
          </Modal>
        </Section>

        {/* ── Select ─────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Select</SectionLabel>
          <Card style={{ maxWidth: 480 }}>
            <Stack>
              <Select
                label="Region"
                placeholder="Choose a region"
                value={region}
                onChange={setRegion}
                hint="Filter properties by location"
                data={[
                  { group: "Italy", items: ["Amalfi Coast", "Cinque Terre", "Tuscany", "Sicily"] },
                  { group: "Greece", items: ["Santorini", "Mykonos", "Crete", "Rhodes"] },
                  { group: "Spain", items: ["Ibiza", "Mallorca", "Costa Brava"] },
                ]}
              />
              <Select
                label="Property type"
                placeholder="Any type"
                data={["Villa", "Masseria", "Boutique hotel", "Agriturismo", "Trullo"]}
                clearable
              />
              <Select
                label="Guests"
                defaultValue="2"
                data={["1", "2", "3", "4", "5", "6", "7", "8+"]}
              />
              <Select
                label="Disabled"
                placeholder="Not available"
                data={["Option A"]}
                disabled
              />
            </Stack>
          </Card>
        </Section>

        {/* ── Date Picker ─────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Date Picker</SectionLabel>
          <Card style={{ maxWidth: 480 }}>
            <Stack>
              <DatePickerInput
                label="Check-in date"
                placeholder="Select a date"
                value={checkIn}
                onChange={handleCheckInChange}
                hint="Arrival day — flexible by ±1 night"
                minDate={new Date()}
              />
              <DatePickerInput
                label="Stay period"
                placeholder="Select dates"
                type="range"
                hint="Select your arrival and departure"
              />
              <DatePickerInput
                label="Flexible dates"
                placeholder="Pick multiple"
                type="multiple"
              />
              <DatePickerInput
                label="Disabled"
                placeholder="Not available"
                disabled
              />
            </Stack>
          </Card>
        </Section>

        {/* ── Typography ─────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Typography</SectionLabel>
          <Card>
            <Stack>
              <div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", color: "#7A6850", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>Display — Cormorant Garamond</p>
                <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2.25rem", fontWeight: 400, color: "#2A2118", lineHeight: 1.1 }}>
                  The light on the sea<br />never lies.
                </h1>
              </div>
              <Card.Divider />
              <div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", color: "#7A6850", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>Body — DM Sans</p>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.9375rem", color: "#2A2118", lineHeight: 1.65 }}>
                  Stone worn smooth by salt wind. Whitewash walls that absorb
                  the morning sun and hold its warmth into the blue evening.
                  A table under a pergola, a carafe of local wine, the sound
                  of water below — this is the material of the good life.
                </p>
              </div>
              <Card.Divider />
              <div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", color: "#7A6850", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>Mono — JetBrains Mono</p>
                <CodeBlock>{`const theme = createTheme({
  primaryColor: 'copper',
  fontFamily: '"DM Sans", sans-serif',
  headings: {
    fontFamily: '"Cormorant Garamond", serif',
  },
});`}</CodeBlock>
              </div>
            </Stack>
          </Card>
        </Section>

      </PageInner>
    </Page>
  );
}
