import { View, StyleSheet } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { Category } from "../../types";

import { useCategoryStore } from "../../stores/category-store";
import { AddAttribute } from "./AddAttribute";
import { UpdateTitleAttribute } from "./UpdateTitleAttribute";
import { EditAttribute } from "./EditAttribute";

export interface AddEditCategoryProps {
  category: Category;
}

export const AddEditCategory = ({ category }: AddEditCategoryProps) => {
  const { categoryName, attributes, id: categoryId } = category;

  const editCategory = useCategoryStore((state) => state.editCategory);
  const removeCategory = useCategoryStore((state) => state.removeCategory);

  const handleCategoryNameChange = (text: string) => {
    editCategory({ ...category, categoryName: text });
  };

  const handleCategoryRemove = () => removeCategory(categoryId);

  return (
    <Card mode="outlined">
      <Card.Title
        title={categoryName || "Untitled Category"}
        subtitle={
          category.attributes[category.titleAttributeId]?.name
            ? `Title Attribute: ${
                category.attributes[category.titleAttributeId].name
              }`
            : `Title Attribute not set`
        }
      />

      <Card.Content>
        <View>
          <TextInput
            mode="outlined"
            label="Category Name"
            value={categoryName}
            style={styles.categoryTitle}
            onChangeText={handleCategoryNameChange}
          />
          {Object.values(attributes).map((attribute) => (
            <EditAttribute
              key={attribute.id}
              categoryId={categoryId}
              attribute={attribute}
            />
          ))}

          <AddAttribute
            categoryId={categoryId}
            containerStyle={styles.addAttributeContainer}
          />
        </View>
      </Card.Content>

      <Card.Actions>
        <Button icon="delete" mode="text" onPress={handleCategoryRemove}>
          Remove
        </Button>
        <UpdateTitleAttribute category={category} />
      </Card.Actions>
    </Card>
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
