import { Button, Card, Text } from "react-native-paper";
import { Item } from "../../types";
import { AttributeInput } from "./AttributeInput";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useCategoryStore } from "../../stores/category-store";
import { useItemStore } from "../../stores/item-store";

export interface AddEditItemProps {
  item: Item;
}

export const AddEditItem = ({ item }: AddEditItemProps) => {
  const category = useCategoryStore(
    (state) => state.categories[item.categoryId]
  );

  const titleAttribute = item.attributes[category.titleAttributeId];

  const removeItem = useItemStore((state) => state.removeItem);

  const handleItemRemove = () => {
    removeItem(item.categoryId, item.id);
  };

  const attributes = Object.values(item.attributes || {}).filter(
    (itemAttribute) => !!category.attributes[itemAttribute.attributeId].name
  );

  return (
    <Card mode="outlined">
      <Card.Title title={titleAttribute?.value || `Untitled Item`} />
      <Card.Content>
        <KeyboardAvoidingView behavior="height">
          {attributes.length ? (
            attributes.map((attribute) => (
              <View key={attribute.attributeId} style={styles.attributeInput}>
                <AttributeInput
                  attributeId={attribute.attributeId}
                  item={item}
                />
              </View>
            ))
          ) : (
            <Text>No Attributes Added</Text>
          )}
        </KeyboardAvoidingView>
      </Card.Content>
      <Card.Actions>
        <Button icon="delete" mode="text" onPress={handleItemRemove}>
          Remove
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  attributeInput: {
    marginBottom: 8,
  },
});
