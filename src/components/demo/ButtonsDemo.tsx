import {
  Button,
  Group,
  Stack,
  Text,
  ActionIcon,
  CloseButton,
} from "@mantine/core";
import { SectionCard } from "./SectionCard";

export function ButtonsDemo() {
  return (
    <SectionCard title="Buttons & Actions">
      <Stack gap="md">
        <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
          Variants
        </Text>
        <Group gap="sm" wrap="wrap">
          <Button variant="filled">Filled</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="transparent">Transparent</Button>
          <Button variant="white">White</Button>
        </Group>

        <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
          Colors
        </Text>
        <Group gap="sm" wrap="wrap">
          <Button color="blue">Blue</Button>
          <Button color="red">Red</Button>
          <Button color="green">Green</Button>
          <Button color="orange">Orange</Button>
          <Button color="violet">Violet</Button>
          <Button color="teal">Teal</Button>
        </Group>

        <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
          Sizes
        </Text>
        <Group gap="sm" align="center" wrap="wrap">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </Group>

        <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
          Action Icons
        </Text>
        <Group gap="sm">
          <ActionIcon size="lg" variant="filled">✦</ActionIcon>
          <ActionIcon size="lg" variant="light">❤</ActionIcon>
          <ActionIcon size="lg" variant="outline">★</ActionIcon>
          <ActionIcon size="lg" variant="subtle">⚙</ActionIcon>
          <CloseButton size="lg" />
        </Group>

        <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
          States
        </Text>
        <Group gap="sm" wrap="wrap">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full Width</Button>
        </Group>
      </Stack>
    </SectionCard>
  );
}
