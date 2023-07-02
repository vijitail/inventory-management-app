import { Button, Menu } from "react-native-paper";
import { useCategoryStore } from "../../stores/category-store";
import { ViewStyle, View } from "react-native";
import { useState } from "react";
import { AttributeDataTypes } from "../../types";

export interface AddAttributeProps {
  categoryId: string;
  containerStyle: ViewStyle;
}

export const AddAttribute = ({
  categoryId,
  containerStyle,
}: AddAttributeProps) => {
  const [isVisible, setVisible] = useState(false);
  const toggle = () => setVisible((isVisible) => !isVisible);

  const addAttribute = useCategoryStore((state) => state.addAttribute);

  const handleAddAttribute = (type: AttributeDataTypes) => () => {
    addAttribute(categoryId, type);
    toggle();
  };

  return (
    <View style={containerStyle}>
      <Menu
        visible={isVisible}
        onDismiss={toggle}
        anchor={
          <Button mode="contained" onPress={toggle}>
            Add Attribute
          </Button>
        }
        anchorPosition="top"
      >
        {Object.values(AttributeDataTypes).map((type) => (
          <Menu.Item
            key={type}
            onPress={handleAddAttribute(type)}
            title={type}
          />
        ))}
      </Menu>
    </View>
  );
};
