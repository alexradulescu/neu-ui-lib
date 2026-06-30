import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IconArchive,
  IconBuildingEstate,
  IconCalendar,
  IconCheck,
  IconChevronLeft,
  IconClipboard,
  IconDots,
  IconHome,
  IconMapPin,
  IconMoon,
  IconPlus,
  IconReceipt,
  IconSearch,
  IconSettings,
  IconSun,
  IconTrash,
} from "@tabler/icons-react";
import {
  AppShell,
  Badge,
  Button,
  Card,
  Combobox,
  DataList,
  DateField,
  Dialog,
  IconButton,
  InputGroup,
  KeyValueList,
  NavigationBar,
  Select,
  SegmentedControl,
  StatCard,
  Table,
  Textarea,
  TextField,
  Toolbar,
  useThemeMode,
} from "@/ui";
import type { DataListItem, NavItem, TableColumn } from "@/ui";

export const Route = createFileRoute("/")({
  component: ShowcasePage,
});

const nav: NavItem[] = [
  { id: "home", icon: <IconHome size={19} />, label: "Home" },
  { id: "bookings", icon: <IconCalendar size={19} />, label: "Bookings", badge: "12" },
  { id: "properties", icon: <IconBuildingEstate size={19} />, label: "Properties" },
  { id: "expenses", icon: <IconReceipt size={19} />, label: "Expenses" },
  { id: "settings", icon: <IconSettings size={19} />, label: "Settings" },
];

const bookings: DataListItem[] = [
  {
    id: "1",
    icon: <IconCalendar size={18} />,
    title: "Sofia Esposito",
    subtitle: "Superior Suite · 4 nights",
    meta: "Villa Amalfi · Positano",
    badge: <Badge color="primary">Active</Badge>,
    value: "€ 3,200",
  },
  {
    id: "2",
    icon: <IconCheck size={18} />,
    title: "Marco & Giulia Bianchi",
    subtitle: "Penthouse · 6 nights",
    meta: "Palazzo Ravello · Ravello",
    badge: <Badge color="success">Confirmed</Badge>,
    value: "€ 5,800",
  },
  {
    id: "3",
    icon: <IconArchive size={18} />,
    title: "James Thornton",
    subtitle: "Presidential Villa · 5 nights",
    meta: "Torre del Mar · Taormina",
    badge: <Badge color="info">Pending</Badge>,
    value: "€ 12,500",
  },
  {
    id: "4",
    icon: <IconTrash size={18} />,
    title: "Ana Santos",
    subtitle: "Family Villa · 8 nights",
    meta: "Masseria Apulia · Alberobello",
    badge: <Badge color="warning">Hold</Badge>,
    value: "€ 4,100",
  },
];

type PropertyRow = {
  property: string;
  location: string;
  type: string;
  capacity: number;
  status: string;
  price: string;
};

const properties: PropertyRow[] = [
  { property: "Villa Amalfi", location: "Positano, IT", type: "Villa", capacity: 8, status: "Available", price: "€ 1,100" },
  { property: "Palazzo Ravello", location: "Ravello, IT", type: "Boutique", capacity: 12, status: "Occupied", price: "€ 850" },
  { property: "Torre del Mar", location: "Taormina, IT", type: "Villa", capacity: 6, status: "Available", price: "€ 2,200" },
  { property: "Masseria Apulia", location: "Alberobello, IT", type: "Masseria", capacity: 16, status: "Maintenance", price: "€ 430" },
];

const propertyColumns: TableColumn<PropertyRow>[] = [
  { key: "property", label: "Property", width: "24%" },
  { key: "location", label: "Location", width: "22%" },
  { key: "type", label: "Type", width: "16%" },
  { key: "capacity", label: "Guests", align: "center", width: "12%" },
  {
    key: "status",
    label: "Status",
    width: "16%",
    render: (value) => {
      const status = String(value);
      const color = status === "Available" ? "success" : status === "Occupied" ? "info" : "warning";
      return <Badge color={color}>{status}</Badge>;
    },
  },
  { key: "price", label: "/ Night", align: "right", width: "12%" },
];

const selectData = [
  {
    label: "Italy",
    items: [
      { value: "amalfi", label: "Amalfi Coast" },
      { value: "tuscany", label: "Tuscany" },
      { value: "sicily", label: "Sicily" },
    ],
  },
  {
    label: "Greece",
    items: [
      { value: "santorini", label: "Santorini" },
      { value: "crete", label: "Crete" },
    ],
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="neu-section">
      <div className="neu-section-head">
        <h2 className="neu-section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ShowcasePage() {
  const [activeNav, setActiveNav] = useState("bookings");
  const [selectedBooking, setSelectedBooking] = useState("1");
  const [segment, setSegment] = useState("all");
  const [region, setRegion] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeMode();

  const toolbar = (
    <Toolbar
      title="Bookings"
      subtitle="Bookings · 12 active"
      leading={<IconButton aria-label="Back" variant="subtle"><IconChevronLeft size={18} /></IconButton>}
      search={
        <TextField
          aria-label="Search"
          placeholder="Search bookings"
          size="sm"
          leftSection={<IconSearch size={16} />}
        />
      }
      actions={
        <>
          <IconButton aria-label="Toggle theme" variant="subtle" onClick={toggleTheme}>
            {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </IconButton>
          <Button size="sm" leftSection={<IconPlus size={15} />} onClick={() => setDialogOpen(true)}>
            New
          </Button>
        </>
      }
    />
  );

  const navigationBar = (
    <NavigationBar
      title="Bookings"
      subtitle="12 active · Amalfi"
      leading={<IconButton aria-label="Back" variant="subtle"><IconChevronLeft size={18} /></IconButton>}
      trailing={
        <>
          <IconButton aria-label="Toggle theme" variant="subtle" onClick={toggleTheme}>
            {isDark ? <IconSun size={17} /> : <IconMoon size={17} />}
          </IconButton>
          <IconButton aria-label="New booking" onClick={() => setDialogOpen(true)}>
            <IconPlus size={17} />
          </IconButton>
        </>
      }
      search={
        <TextField
          aria-label="Search"
          placeholder="Search bookings"
          size="sm"
          leftSection={<IconSearch size={15} />}
        />
      }
    />
  );

  return (
    <AppShell
      title="NeuUI"
      nav={nav}
      activeId={activeNav}
      onNavigate={setActiveNav}
      toolbar={toolbar}
      navigationBar={navigationBar}
    >
      <div className="neu-showcase-hero">
        <div>
          <div className="neu-hero-kicker">Today</div>
          <h1 className="neu-hero-title">Bookings</h1>
          <p className="neu-hero-copy">
            Twelve active stays across four properties. Three arrivals need confirmation before 18:00.
          </p>
        </div>
        <Card variant="elevated" padding="md" className="neu-colors-card">
          <Card.Header>
            <div>
              <Card.Title>System status</Card.Title>
              <Card.Description>Semantic colours mapped through the active theme.</Card.Description>
            </div>
          </Card.Header>
          <div className="neu-row">
            <Badge color="primary">primary</Badge>
            <Badge color="brand">brand</Badge>
            <Badge color="info">info</Badge>
            <Badge color="success">success</Badge>
            <Badge color="warning">warning</Badge>
            <Badge color="danger">danger</Badge>
          </div>
        </Card>
      </div>

      <Section title="Stats">
        <div className="neu-grid">
          <div className="neu-col-3"><StatCard label="Active bookings" value="12" trend={{ label: "+3 vs last month", direction: "up" }} icon={<IconCalendar size={16} />} /></div>
          <div className="neu-col-3"><StatCard label="Monthly revenue" value="€ 47.2k" accent trend={{ label: "+18.4% vs last month", direction: "up" }} icon={<IconReceipt size={16} />} /></div>
          <div className="neu-col-3"><StatCard label="Avg stay" value="5.4" trend={{ label: "same as last month", direction: "neutral" }} icon={<IconClipboard size={16} />} color="neutral" /></div>
          <div className="neu-col-3"><StatCard label="Occupancy" value="84%" trend={{ label: "-6% vs last month", direction: "down" }} icon={<IconBuildingEstate size={16} />} color="danger" /></div>
        </div>
      </Section>

      <Section title="Actions">
        <Card>
          <div className="neu-stack">
            <div className="neu-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button variant="outline" color="success" leftSection={<IconCheck size={15} />}>Confirm</Button>
              <Button variant="light" color="danger" leftSection={<IconTrash size={15} />}>Delete</Button>
            </div>
            <div className="neu-row">
              <IconButton aria-label="Add"><IconPlus size={18} /></IconButton>
              <IconButton aria-label="Search" variant="outline"><IconSearch size={18} /></IconButton>
              <IconButton aria-label="More" variant="light"><IconDots size={18} /></IconButton>
              <SegmentedControl value={segment} onValueChange={setSegment} data={[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "pending", label: "Pending" },
                { value: "cancelled", label: "Cancelled" },
              ]} />
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Forms">
        <div className="neu-grid">
          <div className="neu-col-6">
            <Card>
              <div className="neu-stack">
                <TextField label="Guest name" placeholder="Sofia Esposito" description="As shown on passport" />
                <TextField
                  label="Search with grouped sections"
                  placeholder="Find a property"
                  leftSection={
                    <InputGroup>
                      <IconSearch size={16} />
                      <Badge color="info">AI</Badge>
                    </InputGroup>
                  }
                  rightSection={<IconButton aria-label="Locate" size="sm" variant="subtle"><IconMapPin size={15} /></IconButton>}
                />
                <Textarea label="Message" placeholder="Tell us about the stay..." />
              </div>
            </Card>
          </div>
          <div className="neu-col-6">
            <Card>
              <div className="neu-stack">
                <Select
                  label="Region"
                  value={region ?? undefined}
                  onValueChange={setRegion}
                  placeholder="Choose region"
                  data={selectData}
                />
                <Combobox
                  label="Property"
                  placeholder="Search properties"
                  data={properties.map((property) => ({
                    value: property.property,
                    label: property.property,
                    description: property.location,
                  }))}
                />
                <DateField label="Check-in" description="Native field for now; iOS quirks expected." />
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section title="Lists">
        <div className="neu-grid">
          <div className="neu-col-7">
            <DataList
              caption="Upcoming bookings"
              items={bookings}
              selectedId={selectedBooking}
              onSelect={setSelectedBooking}
            />
          </div>
          <div className="neu-col-5">
            <KeyValueList
              caption="Booking details"
              items={[
                { label: "Guest", value: "Sofia Esposito" },
                { label: "Check-in", value: "28 Mar 2026" },
                { label: "Check-out", value: "1 Apr 2026" },
                { label: "Room", value: "Superior Suite" },
                { label: "Status", value: <Badge color="primary">Active</Badge> },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title="Desktop Table">
        <Table
          caption="Property portfolio"
          columns={propertyColumns}
          data={properties}
          getRowKey={(row) => row.property}
        />
      </Section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Reserve your stay" description="Base UI dialog, NeuUI styling.">
        <Dialog.Body>
          Your selection at Villa Amalfi is held for 15 minutes. Complete guest details to secure
          the booking.
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="subtle" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
        </Dialog.Footer>
      </Dialog>
    </AppShell>
  );
}
