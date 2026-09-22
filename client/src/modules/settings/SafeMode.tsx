import { settingsAtom, useSettingsAtom } from "modules/atoms/settingsAtom";
import { Card, Switch } from "@heroui/react";

export const SafeMode = () => {
  const { safemode } = useSettingsAtom();

  return (
    <Card variant="secondary">
      <Card.Content>
        <div className="flex items-center justify-between">
          <div>
            <Card.Title>Safe mode</Card.Title>
            <Card.Description>Blur images to avoid unexpected public exposure.</Card.Description>
          </div>
          <Switch
            isSelected={safemode}
            onChange={(selected) => settingsAtom.setKey("safemode", selected)}
            aria-label="Safe mode"
          >
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
        </div>
      </Card.Content>
    </Card>
  );
};
