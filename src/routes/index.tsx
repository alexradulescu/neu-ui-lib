import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Stack } from "@mantine/core";
import { AppShell } from "@/components/AppShell";
import { OverviewDemo } from "@/components/demo/OverviewDemo";
import { ButtonsDemo } from "@/components/demo/ButtonsDemo";
import { InputsDemo } from "@/components/demo/InputsDemo";
import { DisplayDemo } from "@/components/demo/DisplayDemo";
import { NavigationDemo } from "@/components/demo/NavigationDemo";
import { OverlayDemo } from "@/components/demo/OverlayDemo";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const TABS = [
  { id: "overview", label: "Overview", icon: "◈", activeIcon: "◉" },
  { id: "buttons", label: "Actions", icon: "⊕", activeIcon: "⊕" },
  { id: "inputs", label: "Inputs", icon: "✎", activeIcon: "✏" },
  { id: "display", label: "Display", icon: "◻", activeIcon: "◼" },
  { id: "nav", label: "Nav", icon: "⊞", activeIcon: "⊟" },
  { id: "overlays", label: "Overlays", icon: "⊡", activeIcon: "⊞" },
];

function HomePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabTitles: Record<string, string> = {
    overview: "Neu UI · iOS 26",
    buttons: "Buttons & Actions",
    inputs: "Form Inputs",
    display: "Display",
    nav: "Navigation",
    overlays: "Overlays",
  };

  return (
    <AppShell
      title={tabTitles[activeTab] ?? "Neu UI"}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <Stack gap="lg" p="md">
        {activeTab === "overview" && <OverviewDemo />}
        {activeTab === "buttons" && <ButtonsDemo />}
        {activeTab === "inputs" && <InputsDemo />}
        {activeTab === "display" && <DisplayDemo />}
        {activeTab === "nav" && <NavigationDemo />}
        {activeTab === "overlays" && <OverlayDemo />}
      </Stack>
    </AppShell>
  );
}
