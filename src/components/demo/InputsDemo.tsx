import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Textarea,
  NumberInput,
  Select,
  MultiSelect,
  Autocomplete,
  Stack,
  Text,
  Switch,
  Checkbox,
  Radio,
  CheckboxGroup,
  RadioGroup,
  Slider,
  RangeSlider,
} from "@mantine/core";
import { SectionCard } from "./SectionCard";

export function InputsDemo() {
  const [switchVal, setSwitchVal] = useState(false);
  const [checkVal, setCheckVal] = useState<string[]>([]);
  const [radioVal, setRadioVal] = useState("react");
  const [sliderVal, setSliderVal] = useState(40);
  const [rangeVal, setRangeVal] = useState<[number, number]>([20, 70]);

  return (
    <Stack gap="lg">
      <SectionCard title="Text Inputs">
        <Stack gap="sm">
          <TextInput
            label="Name"
            placeholder="Your full name"
            description="Used to personalize your experience"
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
          />
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself…"
            autosize
            minRows={2}
            maxRows={4}
          />
          <NumberInput
            label="Age"
            placeholder="25"
            min={0}
            max={120}
          />
          <TextInput
            label="Error State"
            placeholder="bad@input"
            error="This field is required"
          />
          <TextInput
            label="Disabled"
            placeholder="Cannot edit"
            disabled
            value="Locked value"
          />
        </Stack>
      </SectionCard>

      <SectionCard title="Select & Autocomplete">
        <Stack gap="sm">
          <Select
            label="Framework"
            placeholder="Pick one"
            data={["React", "Vue", "Angular", "Svelte", "Solid"]}
          />
          <MultiSelect
            label="Skills"
            placeholder="Pick multiple"
            data={["TypeScript", "React", "CSS", "Node.js", "GraphQL", "Rust"]}
            searchable
          />
          <Autocomplete
            label="Country"
            placeholder="Start typing…"
            data={[
              "United States",
              "United Kingdom",
              "Germany",
              "France",
              "Japan",
              "Australia",
              "Canada",
            ]}
          />
        </Stack>
      </SectionCard>

      <SectionCard title="Toggles & Selectors">
        <Stack gap="md">
          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Switches
          </Text>
          <Stack gap="sm">
            <Switch
              label="Notifications"
              checked={switchVal}
              onChange={(e) => setSwitchVal(e.currentTarget.checked)}
            />
            <Switch label="Dark mode" defaultChecked />
            <Switch label="Location services" color="green" defaultChecked />
            <Switch label="Analytics" disabled />
          </Stack>

          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Checkboxes
          </Text>
          <CheckboxGroup value={checkVal} onChange={setCheckVal}>
            <Stack gap="xs">
              <Checkbox value="email" label="Email notifications" />
              <Checkbox value="sms" label="SMS alerts" />
              <Checkbox value="push" label="Push notifications" />
            </Stack>
          </CheckboxGroup>

          <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.05em" }}>
            Radio
          </Text>
          <RadioGroup value={radioVal} onChange={setRadioVal}>
            <Stack gap="xs">
              <Radio value="react" label="React" />
              <Radio value="vue" label="Vue" />
              <Radio value="angular" label="Angular" />
            </Stack>
          </RadioGroup>
        </Stack>
      </SectionCard>

      <SectionCard title="Sliders">
        <Stack gap="xl">
          <div>
            <Text fz="sm" fw={500} mb="sm">
              Single value: {sliderVal}
            </Text>
            <Slider
              value={sliderVal}
              onChange={setSliderVal}
              marks={[
                { value: 0, label: "0" },
                { value: 50, label: "50" },
                { value: 100, label: "100" },
              ]}
            />
          </div>
          <div>
            <Text fz="sm" fw={500} mb="sm">
              Range: {rangeVal[0]} – {rangeVal[1]}
            </Text>
            <RangeSlider
              value={rangeVal}
              onChange={setRangeVal}
              minRange={10}
            />
          </div>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
