import { useState } from "react";
import {
  Tabs,
  SegmentedControl,
  NavLink,
  Breadcrumbs,
  Anchor,
  Pagination,
  Stack,
  Text,
  Group,
  Chip,
  ChipGroup,
  Stepper,
  Button,
} from "@mantine/core";
import { SectionCard } from "./SectionCard";

export function NavigationDemo() {
  const [activeTab, setActiveTab] = useState<string | null>("overview");
  const [segVal, setSegVal] = useState("list");
  const [chipVal, setChipVal] = useState<string[]>(["ts"]);
  const [activePage, setActivePage] = useState(1);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Stack gap="lg">
      <SectionCard title="Tabs">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
            <Tabs.Tab value="activity">Activity</Tabs.Tab>
            <Tabs.Tab value="billing">Billing</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview" pt="md">
            <Text fz="sm" c="dimmed">
              Overview content — summary of your account and recent activity.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="settings" pt="md">
            <Text fz="sm" c="dimmed">
              Configure your preferences, notifications, and privacy settings.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="activity" pt="md">
            <Text fz="sm" c="dimmed">
              Recent activity log showing the last 30 days of actions.
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="billing" pt="md">
            <Text fz="sm" c="dimmed">
              Manage your subscription, payment methods, and invoices.
            </Text>
          </Tabs.Panel>
        </Tabs>
      </SectionCard>

      <SectionCard title="Segmented Control">
        <Stack gap="md">
          <SegmentedControl
            value={segVal}
            onChange={setSegVal}
            data={[
              { value: "list", label: "List" },
              { value: "grid", label: "Grid" },
              { value: "map", label: "Map" },
            ]}
            fullWidth
          />
          <Text fz="sm" c="dimmed" ta="center">
            Active: <b>{segVal}</b>
          </Text>
        </Stack>
      </SectionCard>

      <SectionCard title="Chips">
        <ChipGroup multiple value={chipVal} onChange={setChipVal}>
          <Group gap="sm" wrap="wrap">
            <Chip value="ts">TypeScript</Chip>
            <Chip value="react">React</Chip>
            <Chip value="node">Node.js</Chip>
            <Chip value="css">CSS</Chip>
            <Chip value="sql">SQL</Chip>
            <Chip value="rust">Rust</Chip>
          </Group>
        </ChipGroup>
        <Text fz="xs" c="dimmed" mt="sm">
          Selected: {chipVal.join(", ") || "none"}
        </Text>
      </SectionCard>

      <SectionCard title="NavLinks">
        <Stack gap={2}>
          <NavLink label="Dashboard" leftSection="🏠" active />
          <NavLink label="Messages" leftSection="💬" rightSection={
            <Text fz="xs" fw={600} c="blue">5</Text>
          } />
          <NavLink label="Settings" leftSection="⚙️">
            <NavLink label="Account" />
            <NavLink label="Privacy" />
            <NavLink label="Notifications" />
          </NavLink>
          <NavLink label="Help" leftSection="❓" />
          <NavLink label="Sign out" leftSection="🚪" color="red" />
        </Stack>
      </SectionCard>

      <SectionCard title="Breadcrumbs">
        <Breadcrumbs separator="›">
          <Anchor href="#" fz="sm">Home</Anchor>
          <Anchor href="#" fz="sm">Components</Anchor>
          <Text fz="sm" c="dimmed">Breadcrumbs</Text>
        </Breadcrumbs>
      </SectionCard>

      <SectionCard title="Pagination">
        <Pagination
          total={10}
          value={activePage}
          onChange={setActivePage}
          radius="xl"
        />
      </SectionCard>

      <SectionCard title="Stepper">
        <Stack gap="md">
          <Stepper active={activeStep} onStepClick={setActiveStep}>
            <Stepper.Step label="Account" description="Create account">
              <Text fz="sm" c="dimmed" mt="sm">
                Enter your email and password to create your account.
              </Text>
            </Stepper.Step>
            <Stepper.Step label="Profile" description="Set up profile">
              <Text fz="sm" c="dimmed" mt="sm">
                Add your name, avatar, and bio to personalize your profile.
              </Text>
            </Stepper.Step>
            <Stepper.Step label="Preferences" description="Final step">
              <Text fz="sm" c="dimmed" mt="sm">
                Choose your notification preferences and theme.
              </Text>
            </Stepper.Step>
            <Stepper.Completed>
              <Text fz="sm" c="green" mt="sm" fw={600}>
                ✓ All done! Your account is ready.
              </Text>
            </Stepper.Completed>
          </Stepper>
          <Group justify="space-between" mt="sm">
            <Button
              variant="subtle"
              onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
              disabled={activeStep === 3}
            >
              {activeStep === 2 ? "Finish" : "Next"}
            </Button>
          </Group>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
