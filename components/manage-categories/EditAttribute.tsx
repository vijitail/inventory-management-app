import { View, StyleSheet } from "react-native";
import { Attribute, AttributeDataTypes } from "../../types";
import { IconButton, TextInput } from "react-native-paper";
import { useCategoryStore } from "../../stores/category-store";
import { AttributeTypeSelector } from "./AttributeTypeSelector";

export interface EditAttributeProps {
  categoryId: string;
  attribute: Attribute;
}

export const EditAttribute = ({
  categoryId,
  attribute,
}: EditAttributeProps) => {
  const editAttribute = useCategoryStore((state) => state.editAttribute);
  const removeAttribute = useCategoryStore((state) => state.removeAttribute);

  const handleAttributeTextChange = (text: string) => {
    const updateAttribute = { ...attribute, name: text };
    editAttribute(categoryId, updateAttribute);
  };

  const handleAttributeTypeChange = (type: AttributeDataTypes) => {
    const updateAttribute = { ...attribute, type };
    editAttribute(categoryId, updateAttribute);
  };

  const handleRemoveAttribute = () => {
    removeAttribute(categoryId, attribute.id);
  };

  return (
    <View style={styles.attributeRow} key={attribute.id}>
      <TextInput
        mode="outlined"
        style={styles.attributeText}
        label="Attribute Name"
        value={attribute.name}
        onChangeText={handleAttributeTextChange}
      />

      <AttributeTypeSelector
        onSelect={handleAttributeTypeChange}
        value={attribute.type}
      />

      <IconButton icon="delete" size={20} onPress={handleRemoveAttribute} />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    marginBottom: 8,
  },
  attributeRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  attributeText: {
    flex: 5,
  },
  addAttributeContainer: {
    marginTop: 10,
  },
});
