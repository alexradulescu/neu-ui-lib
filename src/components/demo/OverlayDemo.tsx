import { useState } from "react";
import {
  Button,
  Modal,
  Drawer,
  Popover,
  Tooltip,
  Menu,
  Notification,
  Stack,
  Text,
  Group,
  Accordion,
  HoverCard,
  Avatar,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SectionCard } from "./SectionCard";

export function OverlayDemo() {
  const [modalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [drawerOpen, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [drawerPos, setDrawerPos] = useState<"bottom" | "right">("bottom");
  const [showNotif, setShowNotif] = useState(false);

  return (
    <Stack gap="lg">
      <SectionCard title="Modal & Drawer">
        <Stack gap="sm">
          <Group gap="sm">
            <Button onClick={openModal}>Open Modal</Button>
            <Button
              variant="light"
              onClick={() => { setDrawerPos("bottom"); openDrawer(); }}
            >
              Bottom Sheet
            </Button>
            <Button
              variant="light"
              color="violet"
              onClick={() => { setDrawerPos("right"); openDrawer(); }}
            >
              Side Drawer
            </Button>
          </Group>

          <Modal
            opened={modalOpen}
            onClose={closeModal}
            title="iOS 26 Modal"
            overlayProps={{ blur: 8, backgroundOpacity: 0.4 }}
          >
            <Stack gap="md">
              <Text fz="sm" c="dimmed">
                This modal uses Mantine's overlay system with a blurred backdrop,
                matching the iOS 26 liquid glass aesthetic.
              </Text>
              <Group justify="flex-end" gap="sm">
                <Button variant="subtle" onClick={closeModal}>Cancel</Button>
                <Button onClick={closeModal}>Confirm</Button>
              </Group>
            </Stack>
          </Modal>

          <Drawer
            opened={drawerOpen}
            onClose={closeDrawer}
            position={drawerPos}
            title={drawerPos === "bottom" ? "Bottom Sheet" : "Side Drawer"}
            overlayProps={{ blur: 6, backgroundOpacity: 0.35 }}
            size={drawerPos === "bottom" ? "45%" : "320px"}
          >
            <Stack gap="md">
              <Text fz="sm" c="dimmed">
                {drawerPos === "bottom"
                  ? "Bottom sheets are a core iOS navigation pattern — swipe down to dismiss."
                  : "Side drawers work great for navigation menus on iPad and wider screens."}
              </Text>
              <Button fullWidth onClick={closeDrawer}>
                Dismiss
              </Button>
            </Stack>
          </Drawer>
        </Stack>
      </SectionCard>

      <SectionCard title="Popover, Tooltip & HoverCard">
        <Stack gap="md">
          <Group gap="md" wrap="wrap">
            <Tooltip label="This is a tooltip" position="top" radius="md">
              <Button variant="light">Hover me (tooltip)</Button>
            </Tooltip>

            <Tooltip
              label="Multi-line tooltip with rich text"
              multiline
              w={180}
              withArrow
            >
              <Button variant="outline">Multi-line tooltip</Button>
            </Tooltip>
          </Group>

          <Group gap="md" wrap="wrap">
            <Popover width={260} position="bottom" shadow="md" radius="lg">
              <Popover.Target>
                <Button variant="light" color="green">Popover</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text fz="sm" fw={600} mb="xs">Quick Note</Text>
                <Text fz="sm" c="dimmed">
                  Popovers are anchored overlays for contextual info or mini-forms.
                </Text>
              </Popover.Dropdown>
            </Popover>

            <HoverCard width={280} shadow="md" radius="lg">
              <HoverCard.Target>
                <Avatar
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=HoverCard"
                  size="lg"
                  style={{ cursor: "pointer" }}
                />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Group gap="sm">
                  <Avatar src="https://api.dicebear.com/9.x/notionists/svg?seed=HoverCard" size="md" />
                  <div>
                    <Text fz="sm" fw={700}>Alex Radulescu</Text>
                    <Text fz="xs" c="dimmed">@alexradulescu</Text>
                  </div>
                </Group>
                <Divider my="sm" />
                <Text fz="xs" c="dimmed">
                  Building iOS-inspired UIs for the web with Mantine v9 and liquid glass.
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        </Stack>
      </SectionCard>

      <SectionCard title="Menu">
        <Group gap="sm">
          <Menu shadow="md" width={220} radius="lg">
            <Menu.Target>
              <Button variant="light">Open Menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item leftSection="👤">Profile</Menu.Item>
              <Menu.Item leftSection="⚙️">Settings</Menu.Item>
              <Menu.Item leftSection="🔔">Notifications</Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item color="red" leftSection="🗑️">
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </SectionCard>

      <SectionCard title="Notification">
        <Stack gap="sm">
          <Button
            variant="light"
            onClick={() => setShowNotif(true)}
          >
            Show notification
          </Button>
          {showNotif && (
            <Notification
              title="Upload complete"
              onClose={() => setShowNotif(false)}
              color="green"
              radius="lg"
            >
              Your file has been uploaded successfully to iCloud Drive.
            </Notification>
          )}
        </Stack>
      </SectionCard>

      <SectionCard title="Accordion">
        <Accordion radius="md" variant="separated">
          {[
            {
              value: "liquid-glass",
              label: "What is Liquid Glass?",
              content:
                "Liquid Glass is Apple's new UI language introduced in iOS 26. It features semi-transparent surfaces with a 50% opacity and a 5px backdrop blur to create a glass-like appearance that refracts and blurs content behind it.",
            },
            {
              value: "pwa-support",
              label: "PWA Safe Area Support",
              content:
                "The app shell uses CSS env(safe-area-inset-*) variables to account for the iPhone notch, Dynamic Island, and home indicator. Both the top and bottom bars are fixed and semi-transparent so content scrolls freely underneath them.",
            },
            {
              value: "mantine-v9",
              label: "Why Mantine v9 Alpha?",
              content:
                "Mantine v9 (alpha.6) requires React 19.2+, introduces new hooks like useScrollDirection and useFloatingWindow, adds namespace type exports, and ships the new @mantine/schedule calendar package. Full release is planned for March 31, 2026.",
            },
          ].map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control>
                <Text fw={600} fz="sm">
                  {item.label}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text fz="sm" c="dimmed">
                  {item.content}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </SectionCard>
    </Stack>
  );
}
