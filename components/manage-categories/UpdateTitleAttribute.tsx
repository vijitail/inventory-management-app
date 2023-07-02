import { useState } from "react";
import { Button, Menu } from "react-native-paper";
import { Category } from "../../types";
import { useCategoryStore } from "../../stores/category-store";

export interface UpdateTitleAttribute {
  category: Category;
}

export const UpdateTitleAttribute = ({ category }: UpdateTitleAttribute) => {
  const [isVisible, setVisible] = useState(false);
  const toggle = () => setVisible((isVisible) => !isVisible);

  const editCategory = useCategoryStore((state) => state.editCategory);

  const handleAttributeSelect = (attributeId: string) => () => {
    editCategory({ ...category, titleAttributeId: attributeId });
    toggle();
  };

  return (
    <Menu
      visible={isVisible}
      onDismiss={toggle}
      anchor={
        <Button icon="update" onPress={toggle}>
          Update Title Attribute
        </Button>
      }
      anchorPosition="top"
    >
      {Object.values(category.attributes)
        .filter((category) => !!category.name)
        .map((attribute) => (
          <Menu.Item
            key={attribute.id}
            title={attribute.name}
            onPress={handleAttributeSelect(attribute.id)}
          />
        ))}
    </Menu>
  );
};
