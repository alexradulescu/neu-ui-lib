import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  Group,
  Stack,
  Text,
  Divider,
  Indicator,
  Progress,
  RingProgress,
  Loader,
  Skeleton,
  Timeline,
  ThemeIcon,
  Alert,
  List,
  ListItem,
  Code,
  Blockquote,
  Highlight,
  Mark,
  Kbd,
} from "@mantine/core";
import { SectionCard } from "./SectionCard";
import { useMantineColorScheme } from "@mantine/core";

export function DisplayDemo() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack gap="lg">
      <SectionCard title="Avatars & Badges">
        <Stack gap="md">
          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Avatars
          </Text>
          <Group gap="sm">
            <Avatar src="https://api.dicebear.com/9.x/notionists/svg?seed=Alex" size="sm" />
            <Avatar src="https://api.dicebear.com/9.x/notionists/svg?seed=Sam" size="md" />
            <Avatar src="https://api.dicebear.com/9.x/notionists/svg?seed=Jordan" size="lg" />
            <Avatar>JD</Avatar>
            <Avatar color="blue">AB</Avatar>
            <Avatar color="green">CD</Avatar>
            <Indicator color="green" size={10} offset={4}>
              <Avatar src="https://api.dicebear.com/9.x/notionists/svg?seed=Maria" size="lg" />
            </Indicator>
          </Group>
          <AvatarGroup>
            {["Alex", "Sam", "Jordan", "Maria", "Chris"].map((name) => (
              <Avatar
                key={name}
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${name}`}
                size="md"
              />
            ))}
            <Avatar size="md">+5</Avatar>
          </AvatarGroup>

          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Badges
          </Text>
          <Group gap="sm" wrap="wrap">
            <Badge>Default</Badge>
            <Badge color="red">Alert</Badge>
            <Badge color="green">Success</Badge>
            <Badge color="yellow">Warning</Badge>
            <Badge variant="light" color="blue">Light</Badge>
            <Badge variant="outline" color="violet">Outline</Badge>
            <Badge variant="dot" color="teal">Online</Badge>
            <Badge size="lg">Large</Badge>
            <Badge size="xs">Tiny</Badge>
          </Group>
        </Stack>
      </SectionCard>

      <SectionCard title="Progress & Loaders">
        <Stack gap="md">
          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Progress Bars
          </Text>
          <Progress value={35} size="sm" />
          <Progress value={60} color="green" size="md" />
          <Progress value={85} color="orange" size="lg" animated />
          <Progress.Root size="xl">
            <Progress.Section value={35} color="blue">
              <Progress.Label>Downloads</Progress.Label>
            </Progress.Section>
            <Progress.Section value={28} color="violet">
              <Progress.Label>Uploads</Progress.Label>
            </Progress.Section>
            <Progress.Section value={15} color="teal">
              <Progress.Label>Other</Progress.Label>
            </Progress.Section>
          </Progress.Root>

          <Group justify="space-around" align="center">
            <RingProgress
              size={100}
              thickness={8}
              sections={[
                { value: 40, color: "blue" },
                { value: 25, color: "green" },
                { value: 15, color: "orange" },
              ]}
              label={
                <Text ta="center" fz="xs" fw={700}>
                  80%
                </Text>
              }
            />
            <RingProgress
              size={120}
              thickness={12}
              roundCaps
              sections={[{ value: 72, color: "violet" }]}
              label={
                <Text ta="center" fz="sm" fw={700}>
                  72%
                </Text>
              }
            />
            <Stack gap="xs" align="center">
              <Loader size="sm" />
              <Loader size="md" color="violet" />
              <Loader size="lg" type="dots" />
            </Stack>
          </Group>

          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Skeletons
          </Text>
          <Stack gap="xs">
            <Skeleton height={20} radius="xl" width="80%" />
            <Skeleton height={20} radius="xl" width="60%" />
            <Skeleton height={20} radius="xl" width="90%" />
          </Stack>
        </Stack>
      </SectionCard>

      <SectionCard title="Timeline">
        <Timeline active={2} bulletSize={24} lineWidth={2}>
          <Timeline.Item
            bullet={<ThemeIcon size={22} radius="xl" color="blue">✦</ThemeIcon>}
            title="App Created"
          >
            <Text c="dimmed" size="sm">
              Initial commit — project bootstrapped with Vite + React
            </Text>
            <Text size="xs" mt={4} c="dimmed">
              Jan 15, 2026
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<ThemeIcon size={22} radius="xl" color="green">★</ThemeIcon>}
            title="Mantine Added"
          >
            <Text c="dimmed" size="sm">
              Mantine v9 alpha installed with iOS 26 liquid glass theme
            </Text>
            <Text size="xs" mt={4} c="dimmed">
              Mar 20, 2026
            </Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<ThemeIcon size={22} radius="xl" color="violet">❤</ThemeIcon>}
            title="Demo Built"
            lineVariant="dashed"
          >
            <Text c="dimmed" size="sm">
              Full component demo with liquid glass aesthetic
            </Text>
            <Text size="xs" mt={4} c="dimmed">
              Now
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Ship it 🚀" lineVariant="dotted">
            <Text c="dimmed" size="sm">
              Coming soon…
            </Text>
          </Timeline.Item>
        </Timeline>
      </SectionCard>

      <SectionCard title="Alerts & Lists">
        <Stack gap="md">
          <Alert title="Success" color="green">
            Your profile has been updated successfully.
          </Alert>
          <Alert title="Warning" color="orange">
            You are about to perform an irreversible action.
          </Alert>
          <Alert title="Error" color="red">
            Something went wrong. Please try again later.
          </Alert>
          <Alert title="Info" color="blue" variant="light">
            Mantine v9 requires React 19.2+.
          </Alert>

          <Divider label="Ordered List" labelPosition="left" />
          <List type="ordered" spacing="xs">
            <ListItem>Install Mantine v9 alpha</ListItem>
            <ListItem>Configure iOS 26 liquid glass theme</ListItem>
            <ListItem>Build your app with style</ListItem>
          </List>

          <Divider label="Typography" labelPosition="left" />
          <Stack gap="xs">
            <Text>
              Use <Mark>mark</Mark> to highlight text inline.
            </Text>
            <Text>
              Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette.
            </Text>
            <Text>
              Inline <Code>code snippet</Code> looks great.
            </Text>
            <Blockquote cite="– iOS 26 Design Team" mt="xs">
              Liquid glass is the future of UI — transparent, blurred, beautiful.
            </Blockquote>
            <Highlight highlight={["liquid glass", "Mantine"]} fz="sm">
              Mantine v9 with liquid glass theming brings iOS 26 aesthetics to the web.
            </Highlight>
          </Stack>
        </Stack>
      </SectionCard>

      <SectionCard title="Cards">
        <Stack gap="md">
          {[
            {
              title: "Liquid Glass",
              desc: "Semi-transparent surfaces with backdrop blur for iOS 26",
              color: "#007aff",
              emoji: "💧",
            },
            {
              title: "Safe Areas",
              desc: "Full PWA support with iOS notch and home indicator awareness",
              color: "#34c759",
              emoji: "📱",
            },
            {
              title: "System Fonts",
              desc: "SF Pro Display / SF Pro Text for native iOS feel",
              color: "#ff9500",
              emoji: "✍️",
            },
          ].map((item) => (
            <Card
              key={item.title}
              radius="lg"
              p="lg"
              style={{
                background: isDark
                  ? "rgba(28,28,30,0.5)"
                  : "rgba(255,255,255,0.5)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)"}`,
              }}
            >
              <Group gap="md" wrap="nowrap">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${item.color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {item.emoji}
                </div>
                <div>
                  <Text fw={600} fz="md" style={{ letterSpacing: "-0.01em" }}>
                    {item.title}
                  </Text>
                  <Text fz="sm" c="dimmed" mt={2}>
                    {item.desc}
                  </Text>
                </div>
              </Group>
            </Card>
          ))}
        </Stack>
      </SectionCard>
    </Stack>
  );
}
