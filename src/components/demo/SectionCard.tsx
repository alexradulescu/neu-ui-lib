import { Paper, Text, Stack } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Paper
      radius="lg"
      p="lg"
      style={{
        background: isDark
          ? "rgba(28, 28, 30, 0.5)"
          : "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)"}`,
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <Stack gap="md">
        <Text
          fw={700}
          fz="lg"
          style={{
            letterSpacing: "-0.02em",
            color: isDark ? "#fff" : "#000",
          }}
        >
          {title}
        </Text>
        {children}
      </Stack>
    </Paper>
  );
}
