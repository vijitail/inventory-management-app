import { AttributeDataTypes } from "../../types";
import { useState } from "react";
import { Menu, Button } from "react-native-paper";

export interface AttributeTypeSelectorProps {
  onSelect: (type: AttributeDataTypes) => void;
  value: AttributeDataTypes;
}

export const AttributeTypeSelector = ({
  onSelect,
  value = AttributeDataTypes.TEXT,
}: AttributeTypeSelectorProps) => {
  const [isVisible, setVisible] = useState(false);
  const toggle = () => setVisible((isVisible) => !isVisible);

  const handleAttributeTypeSelect = (type: AttributeDataTypes) => {
    return () => {
      onSelect(type);
      toggle();
    };
  };

  return (
    <Menu
      visible={isVisible}
      onDismiss={toggle}
      anchor={
        <Button
          mode="contained-tonal"
          onPress={toggle}
          style={{
            alignSelf: "flex-end",
            alignItems: "center",
            height: 50,
            borderRadius: 0,
          }}
          contentStyle={{ alignSelf: "center", flex: 1 }}
        >
          {value}
        </Button>
      }
      anchorPosition="top"
    >
      {Object.values(AttributeDataTypes).map((type) => (
        <Menu.Item
          key={type}
          onPress={handleAttributeTypeSelect(type)}
          title={type}
        />
      ))}
    </Menu>
  );
};
