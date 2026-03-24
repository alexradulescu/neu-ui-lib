import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Card,
  Paper,
  Group,
  Stack,
  Container,
  Title,
  Text,
  Input,
  Checkbox,
  Switch,
  Slider,
  Badge,
  Avatar,
  Progress,
  Alert,
  Modal,
  Tooltip,
  Tabs,
  Accordion,
  List,
  Table,
  TextInput,
  NumberInput,
  Textarea,
  Code,
  Blockquote,
  ThemeIcon,
  Loader,
  Skeleton,
  Notification,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHeart,
  IconStar,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconSettings,
  IconUser,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useState } from "react";

export const Route = createFileRoute("/showcase")({
  component: ShowcasePage,
});

// Glass card wrapper for each section
function GlassCard({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) {
  return (
    <Paper
      radius="lg"
      shadow="sm"
      p="xl"
      mb="xl"
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <Title order={3} mb={description ? "xs" : "md"} c="blue">
        {title}
      </Title>
      {description && <Text size="sm" c="dimmed" mb="md">{description}</Text>}
      {children}
    </Paper>
  );
}

function ShowcasePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Container size="xl" py="xl">
      {/* Header */}
      <Paper
        radius="xl"
        p="xl"
        mb="xl"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <Group justify="space-between">
          <div>
            <Title order={1}>Component Showcase</Title>
            <Text c="dimmed" mt="xs">
              Apple-inspired Mantine v9 theme with glassmorphism
            </Text>
          </div>
          <ActionIcon
            size="xl"
            radius="xl"
            variant="light"
            onClick={toggleColorScheme}
            aria-label="Toggle color scheme"
          >
            {colorScheme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
          </ActionIcon>
        </Group>
      </Paper>

      {/* Buttons */}
      <GlassCard title="Buttons" description="Variants and sizes">
        <Stack gap="md">
          <Group>
            <Button variant="filled">Filled</Button>
            <Button variant="light">Light</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
          </Group>
          <Group>
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
          </Group>
          <Group>
            <Button color="blue">Blue</Button>
            <Button color="red">Red</Button>
            <Button color="green">Green</Button>
            <Button color="yellow">Yellow</Button>
            <Button color="gray">Gray</Button>
          </Group>
          <Group>
            <Button leftSection={<IconHeart size={16} />}>With Icon</Button>
            <Button rightSection={<IconStar size={16} />}>Right Icon</Button>
          </Group>
        </Stack>
      </GlassCard>

      {/* Action Icons */}
      <GlassCard title="Action Icons" description="Compact icon buttons">
        <Group>
          <ActionIcon variant="filled" color="blue"><IconHeart size={16} /></ActionIcon>
          <ActionIcon variant="light"><IconStar size={16} /></ActionIcon>
          <ActionIcon variant="outline"><IconSettings size={16} /></ActionIcon>
          <ActionIcon variant="subtle"><IconUser size={16} /></ActionIcon>
          <ActionIcon size="xs" radius="xl" color="red"><IconX size={12} /></ActionIcon>
          <ActionIcon size="lg" radius="xl" color="green"><IconCheck size={20} /></ActionIcon>
        </Group>
      </GlassCard>

      {/* Cards */}
      <GlassCard title="Cards" description="Content containers">
        <Group>
          <Card padding="lg" radius="md" withBorder shadow="xs">
            <Text fw={500}>Basic Card</Text>
            <Text size="sm" c="dimmed" mt="xs">Simple card with border</Text>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>With Badge</Text>
              <Badge color="blue">New</Badge>
            </Group>
            <Text size="sm" c="dimmed">Card with badge</Text>
          </Card>
          <Card shadow="md" padding="xl" radius="lg">
            <Avatar src="https://i.pravatar.cc/150?img=68" radius="xl" mx="auto" />
            <Text ta="center" fw={500} mt="md">User Card</Text>
            <Text ta="center" size="sm" c="dimmed">@username</Text>
          </Card>
        </Group>
      </GlassCard>

      {/* Inputs */}
      <GlassCard title="Inputs" description="Form controls">
        <Stack gap="md">
          <TextInput label="Text input" placeholder="Enter text..." leftSection={<IconUser size={16} />} />
          <Input.Wrapper label="With description" description="This is a helpful description">
            <Input placeholder="Wrapped input" />
          </Input.Wrapper>
          <NumberInput label="Number input" placeholder="Enter number..." defaultValue={42} />
          <Textarea label="Textarea" placeholder="Enter multiple lines..." rows={3} />
        </Stack>
      </GlassCard>

      {/* Checkbox & Switch */}
      <GlassCard title="Selection Controls" description="Checkboxes and switches">
        <Stack gap="md">
          <Checkbox label="I agree to the terms" defaultChecked />
          <Checkbox label="Subscribe to newsletter" description="Get weekly updates" />
          <Divider />
          <Switch label="Enable notifications" defaultChecked />
          <Switch label="Dark mode" description="Enable dark mode across the application" />
          <Group>
            <Switch size="xs" label="XS" />
            <Switch size="sm" label="SM" />
            <Switch size="md" label="MD" />
            <Switch size="lg" label="LG" />
          </Group>
        </Stack>
      </GlassCard>

      {/* Slider */}
      <GlassCard title="Slider" description="Range selection">
        <Stack gap="xl">
          <Slider defaultValue={40} marks={[{ value: 20, label: "20%" }, { value: 50, label: "50%" }, { value: 80, label: "80%" }]} />
          <Slider defaultValue={50} />
        </Stack>
      </GlassCard>

      {/* Badges */}
      <GlassCard title="Badges" description="Status indicators">
        <Group gap="xs">
          <Badge>Default</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="red">Red</Badge>
          <Badge color="green">Green</Badge>
          <Badge color="yellow">Yellow</Badge>
          <Badge variant="light">Light</Badge>
          <Badge variant="outline">Outline</Badge>
        </Group>
      </GlassCard>

      {/* Avatars */}
      <GlassCard title="Avatars" description="User representations">
        <Group gap="sm">
          <Avatar src="https://i.pravatar.cc/150?img=1" radius="xl" />
          <Avatar src="https://i.pravatar.cc/150?img=2" radius="lg" />
          <Avatar src="https://i.pravatar.cc/150?img=3" radius="md" />
          <Avatar radius="xl" color="blue">JD</Avatar>
          <Avatar radius="xl" color="red" alt="No image" />
        </Group>
      </GlassCard>

      {/* Progress */}
      <GlassCard title="Progress" description="Progress indicators">
        <Stack gap="md">
          <Progress value={50} size="md" />
          <Progress value={75} color="red" size="lg" />
          <Progress value={25} color="green" striped />
          <Progress value={90} animated />
        </Stack>
      </GlassCard>

      {/* Alerts */}
      <GlassCard title="Alerts" description="Informational messages">
        <Stack gap="md">
          <Alert variant="light" color="blue" title="Info" icon={<IconAlertCircle size={16} />}>
            This is an informational alert message.
          </Alert>
          <Alert variant="light" color="green" title="Success" icon={<IconCheck size={16} />}>
            Your changes have been saved successfully.
          </Alert>
        </Stack>
      </GlassCard>

      {/* Modal */}
      <GlassCard title="Modal" description="Overlay dialogs">
        <Button onClick={open}>Open Modal</Button>
        <Modal opened={opened} onClose={close} title={<Text fw={500}>Modal Title</Text>} centered>
          <Text>This is a glassmorphism modal with backdrop blur.</Text>
        </Modal>
      </GlassCard>

      {/* Tooltip */}
      <GlassCard title="Tooltip" description="Hover information">
        <Group>
          <Tooltip label="This is a tooltip">
            <Button variant="light">Hover me</Button>
          </Tooltip>
          <Tooltip label="With arrow" withArrow>
            <Button variant="light">Arrow tooltip</Button>
          </Tooltip>
        </Group>
      </GlassCard>

      {/* Tabs */}
      <GlassCard title="Tabs" description="Content organization">
        <Tabs defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">First Tab</Tabs.Tab>
            <Tabs.Tab value="second">Second Tab</Tabs.Tab>
            <Tabs.Tab value="third">Third Tab</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="first">
            <Text mt="md">Content for the first tab panel.</Text>
          </Tabs.Panel>
          <Tabs.Panel value="second">
            <Text mt="md">Content for the second tab panel.</Text>
          </Tabs.Panel>
          <Tabs.Panel value="third">
            <Text mt="md">Content for the third tab panel.</Text>
          </Tabs.Panel>
        </Tabs>
      </GlassCard>

      {/* Accordion */}
      <GlassCard title="Accordion" description="Collapsible sections">
        <Accordion>
          <Accordion.Item value="first">
            <Accordion.Control>First Section</Accordion.Control>
            <Accordion.Panel>Content for the first accordion item.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="second">
            <Accordion.Control>Second Section</Accordion.Control>
            <Accordion.Panel>Content for the second accordion item.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="third">
            <Accordion.Control>Third Section</Accordion.Control>
            <Accordion.Panel>Content for the third accordion item.</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </GlassCard>

      {/* List */}
      <GlassCard title="List" description="Ordered and unordered items">
        <Group>
          <div>
            <Text fw={500} mb="xs">Unordered List</Text>
            <List>
              <List.Item>First item</List.Item>
              <List.Item>Second item</List.Item>
              <List.Item>Third item</List.Item>
            </List>
          </div>
          <div>
            <Text fw={500} mb="xs">With Icons</Text>
            <List icon={<IconStar size={16} color="yellow" />} spacing="sm">
              <List.Item>Feature one</List.Item>
              <List.Item>Feature two</List.Item>
              <List.Item>Feature three</List.Item>
            </List>
          </div>
        </Group>
      </GlassCard>

      {/* Table */}
      <GlassCard title="Table" description="Data display">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>John Doe</Table.Td>
              <Table.Td>john@example.com</Table.Td>
              <Table.Td>Admin</Table.Td>
              <Table.Td><Badge color="green">Active</Badge></Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Jane Smith</Table.Td>
              <Table.Td>jane@example.com</Table.Td>
              <Table.Td>User</Table.Td>
              <Table.Td><Badge color="blue">Pending</Badge></Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </GlassCard>

      {/* Paper */}
      <GlassCard title="Paper" description="Versatile container">
        <Stack gap="sm">
          <Paper shadow="xs" p="md">
            <Text size="sm">Paper with shadow xs</Text>
          </Paper>
          <Paper shadow="sm" p="md">
            <Text size="sm">Paper with shadow sm</Text>
          </Paper>
          <Paper shadow="md" p="md" withBorder>
            <Text size="sm">Paper with shadow md and border</Text>
          </Paper>
        </Stack>
      </GlassCard>

      {/* Typography */}
      <GlassCard title="Typography" description="Text components">
        <Stack gap="md">
          <Title order={1}>Heading 1</Title>
          <Title order={2}>Heading 2</Title>
          <Title order={3}>Heading 3</Title>
          <Title order={4}>Heading 4</Title>
          <Title order={5}>Heading 5</Title>
          <Title order={6}>Heading 6</Title>
          <Divider />
          <Text size="lg">Large body text</Text>
          <Text>Default body text</Text>
          <Text size="sm" c="dimmed">Small muted text</Text>
          <Divider />
          <Code>Inline code snippet</Code>
          <Blockquote color="blue">Blockquote text</Blockquote>
        </Stack>
      </GlassCard>

      {/* Theme Icons */}
      <GlassCard title="Theme Icons" description="Circular icon containers">
        <Group>
          <ThemeIcon color="blue" size="lg" radius="md"><IconHeart size={18} /></ThemeIcon>
          <ThemeIcon color="red" size="xl" radius="lg"><IconStar size={20} /></ThemeIcon>
          <ThemeIcon color="green" size="md" radius="xl"><IconCheck size={16} /></ThemeIcon>
          <ThemeIcon variant="light" size="lg"><IconSettings size={18} /></ThemeIcon>
          <ThemeIcon variant="outline" size="xl"><IconUser size={20} /></ThemeIcon>
        </Group>
      </GlassCard>

      {/* Loading States */}
      <GlassCard title="Loading States" description="Skeletons and loaders">
        <Stack gap="md">
          <Group>
            <Loader size="sm" />
            <Loader size="md" />
            <Loader size="lg" />
            <Loader color="blue" />
          </Group>
          <Paper p="md" withBorder>
            <Stack gap="xs">
              <Skeleton height={20} width="60%" radius="xs" />
              <Skeleton height={16} mt="sm" />
              <Skeleton height={16} mt="xs" width="80%" />
            </Stack>
          </Paper>
        </Stack>
      </GlassCard>

      {/* Notifications */}
      <GlassCard title="Notifications" description="Informational toasts">
        <Stack gap="md">
          <Notification withCloseButton={false} color="blue" title="Info">
            Something happened!
          </Notification>
          <Notification withCloseButton={false} color="green" title="Success" icon={<IconCheck size={16} />}>
            Everything is working!
          </Notification>
        </Stack>
      </GlassCard>

      {/* Footer */}
      <Paper
        radius="lg"
        p="md"
        mt="xl"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <Text ta="center" size="sm" c="dimmed">
          Apple-inspired Mantine v9 Theme • Glassmorphism • Elegant Depth
        </Text>
      </Paper>
    </Container>
  );
}
