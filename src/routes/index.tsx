import { useState } from "react";
import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import {
  IconPlus, IconHeart, IconCheck,
  IconTrash, IconSearch, IconStar, IconArrowRight,
  IconCalendar, IconMapPin, IconSun, IconMoon,
  IconHome, IconReceipt, IconBuildingEstate, IconSettings,
} from "@tabler/icons-react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
import { Badge } from "@/components/Badge";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { DatePickerInput } from "@/components/DatePickerInput";
import { ListBox } from "@/components/ListBox";
import { MedTable } from "@/components/Table";
import { KeyValueList } from "@/components/KeyValueList";
import { Navbar } from "@/components/Navbar";
import { SegmentedControl } from "@/components/SegmentedControl";
import { StatCard } from "@/components/StatCard";
import type { ListBoxItem } from "@/components/ListBox";
import type { TableColumn } from "@/components/Table";
import type { KVItem } from "@/components/KeyValueList";

export const Route = createFileRoute("/")({
  component: ShowcasePage,
});

// ─── Layout ───────────────────────────────────────────────────────────────────

const Page = styled.main`
  min-height: 100dvh;
  background-color: var(--med-color-bg);
  padding: 32px 16px 96px;  /* extra bottom space for floating Navbar */
`;

const PageInner = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const PageHeader = styled.header`
  margin-bottom: 36px;
  text-align: center;
  position: relative;
`;

const PageTitle = styled.h1`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.1;
  color: var(--med-color-text-primary);
  letter-spacing: 0.01em;
  margin-bottom: 8px;
`;

const PageSubtitle = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--med-color-text-secondary);
  max-width: 480px;
  margin: 0 auto;
`;

const ThemeToggleWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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
  color: var(--med-color-text-secondary);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 0.5px solid var(--med-color-divider);
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
  border: 1px solid var(--med-color-border);
`;

const SwatchLabel = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 0.625rem;
  color: var(--med-color-text-secondary);
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
`;

const ColourRow = styled.div`
  display: grid;
  grid-template-columns: 56px 1fr 1fr 1fr;
  gap: 8px;
  align-items: center;
`;

const ColLabel = styled.span`
  font-family: "DM Sans", sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--med-color-text-muted);
  letter-spacing: 0.04em;
  white-space: nowrap;
`;

const SubLabel = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--med-color-text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const CodeBlock = styled.pre`
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--med-color-text-primary);
  background: var(--med-color-surface-deep);
  border: 1px solid var(--med-color-border);
  border-radius: 10px;
  padding: 14px 16px;
  overflow-x: auto;
`;

// TableScroll is now built into MedTable — wrapper no longer needed

// ─── Data ──────────────────────────────────────────────────────────────────────

const bookings: ListBoxItem[] = [
  {
    id: "1",
    name: "Sofia Esposito",
    subtitle: "Superior Suite · 4 nights",
    meta: "Villa Amalfi · Positano",
    status: "Active",
    statusVariant: "copper",
    value: "€ 3,200",
    date: "28 Mar",
  },
  {
    id: "2",
    name: "Marco & Giulia Bianchi",
    subtitle: "Penthouse · 6 nights",
    meta: "Palazzo Ravello · Ravello",
    status: "Confirmed",
    statusVariant: "sage",
    value: "€ 5,800",
    date: "1 Apr",
  },
  {
    id: "3",
    name: "James Thornton",
    subtitle: "Presidential Villa · 5 nights",
    meta: "Torre del Mar · Taormina",
    status: "Pending",
    statusVariant: "sky",
    value: "€ 12,500",
    date: "8 Apr",
  },
  {
    id: "4",
    name: "Isabelle Moreau",
    subtitle: "Garden Suite · 7 nights",
    meta: "Villa Capri · Capri",
    status: "Pending",
    statusVariant: "sky",
    value: "€ 7,400",
    date: "12 Apr",
  },
  {
    id: "5",
    name: "Ana Santos",
    subtitle: "Family Villa · 8 nights",
    meta: "Masseria Apulia · Alberobello",
    status: "On Hold",
    statusVariant: "sand",
    value: "€ 4,100",
    date: "15 Apr",
  },
  {
    id: "6",
    name: "Chen Wei",
    subtitle: "Deluxe Room · 3 nights",
    meta: "Grotta Azzurra · Positano",
    status: "Cancelled",
    statusVariant: "sienna",
    value: "€ 2,900",
    date: "20 Apr",
  },
];

type PropertyRow = Record<string, unknown>;

const properties: PropertyRow[] = [
  { property: "Villa Amalfi",    location: "Positano, IT",    type: "Villa",         capacity: 8,  status: "Available",   price: "€ 1,100" },
  { property: "Palazzo Ravello", location: "Ravello, IT",     type: "Boutique Hotel",capacity: 12, status: "Occupied",    price: "€ 850"   },
  { property: "Torre del Mar",   location: "Taormina, IT",    type: "Villa",         capacity: 6,  status: "Available",   price: "€ 2,200" },
  { property: "Masseria Apulia", location: "Alberobello, IT", type: "Masseria",      capacity: 16, status: "Maintenance", price: "€ 430"   },
  { property: "Grotta Azzurra",  location: "Positano, IT",    type: "Trullo",        capacity: 4,  status: "Available",   price: "€ 680"   },
  { property: "Villa Capri",     location: "Capri, IT",       type: "Villa",         capacity: 10, status: "Occupied",    price: "€ 1,850" },
];

const statusBadge: Record<string, ReactElement> = {
  Available:   <Badge variant="sage"    size="sm">Available</Badge>,
  Occupied:    <Badge variant="sky"     size="sm">Occupied</Badge>,
  Maintenance: <Badge variant="sand"    size="sm">Maintenance</Badge>,
};

const propertyColumns: TableColumn[] = [
  { key: "property", label: "Property",  width: "22%" },
  { key: "location", label: "Location",  width: "20%" },
  { key: "type",     label: "Type",      width: "18%" },
  { key: "capacity", label: "Guests", align: "center", width: "10%",
    render: (v) => <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "0.8125rem" }}>{String(v)}</span> },
  { key: "status",   label: "Status",    width: "16%",
    render: (v) => statusBadge[String(v)] ?? <Badge variant="sand" size="sm">{String(v)}</Badge> },
  { key: "price",    label: "/ Night", align: "right", width: "14%",
    render: (v) => <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "0.8125rem", color: "var(--med-color-accent)" }}>{String(v)}</span> },
];

// ─── Theme Toggle ──────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="subtle"
      size="md"
      aria-label="Toggle colour scheme"
      styles={{
        root: {
          borderRadius: "999px",
          color: "var(--med-color-text-secondary)",
          "&:hover": { background: "var(--med-color-row-hover)", color: "var(--med-color-accent)" },
        },
      }}
    >
      {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<string | undefined>(undefined);
  const [activeNav, setActiveNav] = useState("home");
  const [listView, setListView] = useState("all");

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
          <ThemeToggleWrap>
            <ThemeToggle />
          </ThemeToggleWrap>
        </PageHeader>

        {/* ── Palette ────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Colour Palette</SectionLabel>
          <ColorGrid>
            <Swatch>
              <SwatchColor style={{ background: "var(--med-color-bg)" }} />
              <SwatchLabel>Background</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "var(--med-color-surface)", backdropFilter: "blur(20px)" }} />
              <SwatchLabel>Surface Glass</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "var(--med-color-surface-deep)" }} />
              <SwatchLabel>Surface Deep</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#B87333" }} />
              <SwatchLabel>Accent Copper</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#D4A882" }} />
              <SwatchLabel>Accent Soft</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#4A7828" }} />
              <SwatchLabel>Sage</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#B82D26" }} />
              <SwatchLabel>Sienna</SwatchLabel>
            </Swatch>
            <Swatch>
              <SwatchColor style={{ background: "#A8C4D4" }} />
              <SwatchLabel>Coastal Sky</SwatchLabel>
            </Swatch>
          </ColorGrid>
        </Section>

        {/* ── Stat Cards ─────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Stat Cards</SectionLabel>
          <Grid>
            <StatCard
              label="Active bookings"
              value="12"
              trend={{ label: "+3 vs last month", direction: "up" }}
              icon={<IconCalendar size={15} />}
            />
            <StatCard
              label="Monthly revenue"
              value="€ 47.2k"
              accent
              trend={{ label: "+18.4% vs last month", direction: "up" }}
              icon={<IconReceipt size={15} />}
            />
            <StatCard
              label="Avg stay"
              value="5.4 nights"
              trend={{ label: "same as last month", direction: "neutral" }}
            />
            <StatCard
              label="Occupancy rate"
              value="84%"
              trend={{ label: "−6% vs last month", direction: "down" }}
              icon={<IconBuildingEstate size={15} />}
            />
          </Grid>
        </Section>

        {/* ── Segmented Control ──────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Segmented Control</SectionLabel>
          <Card compact>
            <Stack>
              <SegmentedControl
                value={listView}
                onChange={setListView}
                data={[
                  { label: "All",       value: "all" },
                  { label: "Active",    value: "active" },
                  { label: "Pending",   value: "pending" },
                  { label: "Cancelled", value: "cancelled" },
                ]}
              />
              <SegmentedControl
                defaultValue="month"
                data={["Week", "Month", "Quarter", "Year"]}
              />
            </Stack>
          </Card>
        </Section>

        {/* ── Buttons ────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Buttons</SectionLabel>
          <Stack>

            {/* Variant × colour matrix */}
            <Card compact style={{ overflow: "hidden" }}>
              <div style={{ overflowX: "auto", margin: "0 -16px", padding: "0 16px 2px" }}>
                <div style={{ minWidth: 320 }}>
                  <Stack>
                    <ColourRow>
                      <ColLabel />
                      <ColLabel>Copper</ColLabel>
                      <ColLabel>Sage</ColLabel>
                      <ColLabel>Sienna</ColLabel>
                    </ColourRow>
                    <ColourRow>
                      <ColLabel>Primary</ColLabel>
                      <Button variant="primary" color="copper" size="sm">Book</Button>
                      <Button variant="primary" color="sage"   size="sm">Confirm</Button>
                      <Button variant="primary" color="sienna" size="sm">Delete</Button>
                    </ColourRow>
                    <ColourRow>
                      <ColLabel>Outline</ColLabel>
                      <Button variant="outline" color="copper" size="sm">Details</Button>
                      <Button variant="outline" color="sage"   size="sm">Save</Button>
                      <Button variant="outline" color="sienna" size="sm">Cancel</Button>
                    </ColourRow>
                    <ColourRow>
                      <ColLabel>Ghost</ColLabel>
                      <Button variant="ghost" color="copper" size="sm">Dismiss</Button>
                      <Button variant="ghost" color="sage"   size="sm">Skip</Button>
                      <Button variant="ghost" color="sienna" size="sm">Undo</Button>
                    </ColourRow>
                  </Stack>
                </div>
              </div>
            </Card>

            {/* Sizes */}
            <Card compact>
              <Stack>
                <Row>
                  <Button variant="primary" size="xs">XSmall</Button>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </Row>
                <Row>
                  <Button variant="outline" size="xs">XSmall</Button>
                  <Button variant="outline" size="sm">Small</Button>
                  <Button variant="outline" size="md">Medium</Button>
                  <Button variant="outline" size="lg">Large</Button>
                </Row>
              </Stack>
            </Card>

            {/* Icon buttons — round pills, sm + md */}
            <Card compact>
              <Stack>
                <SubLabel>Icon only — all sizes</SubLabel>
                <Row style={{ alignItems: "flex-end" }}>
                  <IconButton variant="primary" color="copper" size="xl"><IconPlus size={22} /></IconButton>
                  <IconButton variant="primary" color="copper" size="lg"><IconPlus size={18} /></IconButton>
                  <IconButton variant="primary" color="copper" size="md"><IconPlus size={16} /></IconButton>
                  <IconButton variant="primary" color="copper" size="sm"><IconPlus size={14} /></IconButton>
                  <IconButton variant="primary" color="copper" size="xs"><IconPlus size={11} /></IconButton>
                </Row>
                <Row style={{ alignItems: "flex-end" }}>
                  <IconButton variant="outline" color="copper" size="xl"><IconSearch size={22} /></IconButton>
                  <IconButton variant="outline" color="copper" size="lg"><IconHeart size={18} /></IconButton>
                  <IconButton variant="outline" color="copper" size="md"><IconMapPin size={16} /></IconButton>
                  <IconButton variant="outline" color="copper" size="sm"><IconHeart size={14} /></IconButton>
                  <IconButton variant="outline" color="copper" size="xs"><IconSearch size={11} /></IconButton>
                </Row>
                <Row style={{ alignItems: "flex-end" }}>
                  <IconButton variant="primary" color="sage"   size="lg"><IconCheck size={18} /></IconButton>
                  <IconButton variant="primary" color="sienna" size="lg"><IconTrash size={18} /></IconButton>
                  <IconButton variant="ghost"   color="copper" size="lg"><IconStar size={18} /></IconButton>
                  <IconButton variant="primary" color="sage"   size="md"><IconCheck size={16} /></IconButton>
                  <IconButton variant="primary" color="sienna" size="md"><IconTrash size={16} /></IconButton>
                  <IconButton variant="ghost"   color="copper" size="md"><IconStar size={16} /></IconButton>
                  <IconButton variant="primary" color="sage"   size="sm"><IconCheck size={14} /></IconButton>
                  <IconButton variant="primary" color="sienna" size="sm"><IconTrash size={14} /></IconButton>
                  <IconButton variant="ghost"   color="copper" size="sm"><IconStar size={14} /></IconButton>
                </Row>
                <SubLabel>Icon + label</SubLabel>
                <Row>
                  <Button variant="primary" color="copper" size="sm" leftSection={<IconPlus size={14} />}>Add property</Button>
                  <Button variant="outline" color="sage"   size="sm" leftSection={<IconCheck size={14} />}>Confirm stay</Button>
                  <Button variant="outline" color="sienna" size="sm" leftSection={<IconTrash size={14} />}>Remove</Button>
                </Row>
                <Row>
                  <Button variant="primary" color="copper" size="sm" rightSection={<IconArrowRight size={14} />}>Continue</Button>
                  <Button variant="outline" color="copper" size="sm" leftSection={<IconCalendar size={14} />}>Pick dates</Button>
                  <Button variant="ghost"   color="copper" size="sm" leftSection={<IconHeart size={14} />}>Save for later</Button>
                </Row>
              </Stack>
            </Card>

            {/* Disabled states */}
            <Card compact>
              <SubLabel>Disabled</SubLabel>
              <Row style={{ marginTop: 8 }}>
                <Button variant="primary" size="sm" disabled>Primary</Button>
                <Button variant="outline" size="sm" disabled>Outline</Button>
                <Button variant="ghost"   size="sm" disabled>Ghost</Button>
                <IconButton variant="primary" color="copper" size="sm" disabled><IconPlus size={14} /></IconButton>
                <IconButton variant="outline" color="copper" size="sm" disabled><IconHeart size={14} /></IconButton>
              </Row>
            </Card>

          </Stack>
        </Section>

        {/* ── List Box ───────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>List Box</SectionLabel>
          <ListBox
            caption="Upcoming bookings"
            items={bookings}
            selectedId={selectedBooking}
            onSelect={setSelectedBooking}
          />
        </Section>

        {/* ── Key-Value List ─────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Key-Value List</SectionLabel>
          <Grid>
            <KeyValueList
              caption="Booking details"
              items={[
                { label: "Guest",       value: "Sofia Esposito" },
                { label: "Check-in",    value: "28 Mar 2025" },
                { label: "Check-out",   value: "1 Apr 2025" },
                { label: "Nights",      value: "4" },
                { label: "Room",        value: "Superior Suite" },
                { label: "Status",      value: <Badge variant="copper" size="sm">Active</Badge> },
              ] as KVItem[]}
            />
            <KeyValueList
              caption="Property info"
              items={[
                { label: "Property",    value: "Villa Amalfi" },
                { label: "Location",    value: "Positano, IT" },
                { label: "Type",        value: "Villa" },
                { label: "Capacity",    value: "8 guests" },
                { label: "Price",       value: "€ 1,100 / night" },
                { label: "Availability",value: <Badge variant="sage" size="sm">Available</Badge> },
              ] as KVItem[]}
            />
          </Grid>
        </Section>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Table</SectionLabel>
          <MedTable
            caption="Property portfolio"
            columns={propertyColumns}
            data={properties}
            getRowKey={(row) => String(row.property)}
          />
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
                placeholder="Sofia Esposito"
                value={name}
                onChange={(e) => setName(e.target.value)}
                hint="As it appears on your passport"
              />
              <TextInput
                label="Email address"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                label="Message"
                placeholder="Tell us about your stay…"
              />
              <TextInput
                label="Invalid email"
                defaultValue="wrong@"
                error="Please enter a valid email address"
              />
              <TextInput
                label="Disabled"
                value="Cannot edit"
                disabled
              />
            </Stack>
          </Card>
          {/* Compact size — smaller height, still 16px font (no iOS zoom) */}
          <Card compact style={{ maxWidth: 480 }}>
            <SubLabel style={{ marginBottom: 10 }}>Compact inputs (36px height, font-size 16px)</SubLabel>
            <Stack>
              <TextInput compact label="Property name" placeholder="Villa Amalfi" />
              <TextInput compact label="Nightly rate" placeholder="€ 1,100" hint="Per adult, per night" />
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
              <Badge variant="sage">Sage</Badge>
              <Badge variant="sienna">Sienna</Badge>
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
              <Badge variant="sage">Confirmed</Badge>
              <Badge variant="sienna">Cancelled</Badge>
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
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", color: "var(--med-color-text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>Display — Cormorant Garamond</p>
                <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2.25rem", fontWeight: 600, color: "var(--med-color-text-primary)", lineHeight: 1.1 }}>
                  The light on the sea<br />never lies.
                </h1>
              </div>
              <Card.Divider />
              <div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", color: "var(--med-color-text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>Body — DM Sans</p>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.9375rem", color: "var(--med-color-text-primary)", lineHeight: 1.65 }}>
                  Stone worn smooth by salt wind. Whitewash walls that absorb
                  the morning sun and hold its warmth into the blue evening.
                  A table under a pergola, a carafe of local wine, the sound
                  of water below — this is the material of the good life.
                </p>
              </div>
              <Card.Divider />
              <div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", color: "var(--med-color-text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>Mono — JetBrains Mono</p>
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

        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <Section>
          <SectionLabel>Navbar</SectionLabel>
          <Card compact>
            <Card.Body>
              iOS 26-style frosted-glass tab bar. Copper active pill springs in
              behind the icon. Adapts to dark mode. Supports 2–6 items. In production,
              render it once at the root — it is{" "}
              <code style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "0.8125rem" }}>
                position: fixed
              </code>
              .
            </Card.Body>
          </Card>
        </Section>

      </PageInner>

      {/* Fixed bottom navbar — shown across the whole showcase */}
      <Navbar
        activeId={activeNav}
        onSelect={setActiveNav}
        items={[
          { id: "home",       icon: <IconHome size={20} />,           label: "Home" },
          { id: "bookings",   icon: <IconCalendar size={20} />,       label: "Bookings" },
          { id: "properties", icon: <IconBuildingEstate size={20} />, label: "Properties" },
          { id: "expenses",   icon: <IconReceipt size={20} />,        label: "Expenses" },
          { id: "settings",   icon: <IconSettings size={20} />,       label: "Settings" },
        ]}
      />
    </Page>
  );
}
