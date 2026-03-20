import {
  Stack,
  Text,
  Title,
  Group,
  Badge,
  SimpleGrid,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import { SectionCard } from "./SectionCard";

const features = [
  {
    icon: "💧",
    color: "#007aff",
    title: "Liquid Glass",
    desc: "50% transparent surfaces with 5px backdrop blur — the iOS 26 design language.",
  },
  {
    icon: "📱",
    color: "#34c759",
    title: "PWA Ready",
    desc: "Safe area insets for notch, Dynamic Island, and home indicator.",
  },
  {
    icon: "🎨",
    color: "#ff9500",
    title: "iOS 26 Theme",
    desc: "Mantine v9 alpha customized with SF Pro fonts, iOS radii, and system colors.",
  },
  {
    icon: "⚡️",
    color: "#af52de",
    title: "Mantine v9",
    desc: "Latest alpha (9.0.0-alpha.6) with React 19.2+, new hooks, namespace types.",
  },
  {
    icon: "🌗",
    color: "#ff2d55",
    title: "Dark Mode",
    desc: "Full dark/light support via MantineProvider with auto color scheme detection.",
  },
  {
    icon: "📐",
    color: "#5ac8fa",
    title: "App Shell",
    desc: "Fixed top & bottom bars that blur content scrolling beneath them.",
  },
];

export function OverviewDemo() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack gap="lg">
      {/* Hero */}
      <div
        style={{
          borderRadius: 24,
          padding: "32px 24px",
          background: isDark
            ? "linear-gradient(135deg, rgba(10,132,255,0.3) 0%, rgba(175,82,222,0.3) 100%)"
            : "linear-gradient(135deg, rgba(0,122,255,0.15) 0%, rgba(175,82,222,0.15) 100%)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)"}`,
          textAlign: "center",
        }}
      >
        <Text fz={48} style={{ lineHeight: 1 }}>💧</Text>
        <Title
          order={1}
          mt="sm"
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: isDark ? "#fff" : "#000",
          }}
        >
          Neu UI
        </Title>
        <Text
          fz="lg"
          c="dimmed"
          mt="xs"
          style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          iOS 26 Liquid Glass · Mantine v9 Alpha
        </Text>
        <Group justify="center" gap="sm" mt="md">
          <Badge color="blue" variant="light" size="lg">Mantine 9.0.0-alpha.6</Badge>
          <Badge color="green" variant="light" size="lg">React 19</Badge>
          <Badge color="orange" variant="light" size="lg">iOS 26</Badge>
        </Group>
      </div>

      <SectionCard title="Design System Features">
        <SimpleGrid cols={2} spacing="sm">
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                borderRadius: 16,
                padding: "12px",
                background: `${f.color}14`,
                border: `1px solid ${f.color}30`,
              }}
            >
              <Group gap="sm" wrap="nowrap" align="flex-start">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${f.color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <Text fz="sm" fw={700} style={{ letterSpacing: "-0.01em" }}>
                    {f.title}
                  </Text>
                  <Text fz="xs" c="dimmed" mt={2}>
                    {f.desc}
                  </Text>
                </div>
              </Group>
            </div>
          ))}
        </SimpleGrid>
      </SectionCard>

      <SectionCard title="Design Tokens">
        <Stack gap="sm">
          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            iOS 26 Colors
          </Text>
          <Group gap="sm" wrap="wrap">
            {[
              { name: "Blue", color: "#007aff" },
              { name: "Green", color: "#34c759" },
              { name: "Orange", color: "#ff9500" },
              { name: "Red", color: "#ff3b30" },
              { name: "Purple", color: "#af52de" },
              { name: "Teal", color: "#5ac8fa" },
              { name: "Yellow", color: "#ffcc00" },
              { name: "Pink", color: "#ff2d55" },
            ].map((c) => (
              <div key={c.name} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: c.color,
                    marginBottom: 4,
                  }}
                />
                <Text fz={10} c="dimmed">{c.name}</Text>
              </div>
            ))}
          </Group>

          <Divider my="sm" />

          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Border Radius Scale
          </Text>
          <Group gap="sm" align="flex-end">
            {[
              { name: "xs", r: 6 },
              { name: "sm", r: 10 },
              { name: "md", r: 14 },
              { name: "lg", r: 20 },
              { name: "xl", r: 28 },
              { name: "full", r: 9999 },
            ].map((r) => (
              <div key={r.name} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: Math.min(r.r * 2.5, 56),
                    height: Math.min(r.r * 2.5, 56),
                    borderRadius: r.r,
                    background: isDark
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(0,122,255,0.15)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,122,255,0.3)"}`,
                    marginBottom: 4,
                  }}
                />
                <Text fz={10} c="dimmed">{r.name}</Text>
              </div>
            ))}
          </Group>

          <Divider my="sm" />

          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Typography
          </Text>
          <Stack gap="xs">
            {[
              { size: 32, weight: 800, label: "Large Title" },
              { size: 24, weight: 700, label: "Title 1" },
              { size: 20, weight: 700, label: "Title 2" },
              { size: 18, weight: 600, label: "Headline" },
              { size: 16, weight: 400, label: "Body" },
              { size: 14, weight: 400, label: "Callout" },
              { size: 12, weight: 400, label: "Caption" },
            ].map((t) => (
              <div key={t.label} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <Text
                  fz={t.size}
                  fw={t.weight}
                  style={{ letterSpacing: t.size >= 20 ? "-0.03em" : "-0.01em", lineHeight: 1.2 }}
                >
                  {t.label}
                </Text>
                <Text fz="xs" c="dimmed">{t.size}px / {t.weight}</Text>
              </div>
            ))}
          </Stack>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
