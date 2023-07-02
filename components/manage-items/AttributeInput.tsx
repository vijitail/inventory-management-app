import { Switch, Text, TextInput } from "react-native-paper";
import { useCategoryStore } from "../../stores/category-store";
import { AttributeDataTypes, Item } from "../../types";
import { useItemStore } from "../../stores/item-store";
import { View, StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";

export interface AttributeInputProps {
  item: Item;
  attributeId: string;
}

export const AttributeInput = ({ item, attributeId }: AttributeInputProps) => {
  const editItem = useItemStore((state) => state.editItem);

  const category = useCategoryStore(
    (state) => state.categories[item.categoryId]
  );

  const attribute = category.attributes[attributeId];

  const value = item.attributes[attributeId].value;

  const handleTextChange = (text: string) => {
    const updateItem = { ...item };
    updateItem.attributes[attributeId] = {
      ...updateItem.attributes[attributeId],
      value: text,
    };
    editItem(updateItem);
  };

  const handleSwitchChange = () => {
    const newValue = value === "YES" ? "NO" : "YES";
    const updateItem = { ...item };
    updateItem.attributes[attributeId] = {
      ...updateItem.attributes[attributeId],
      value: newValue,
    };
    editItem(updateItem);
  };

  const handleDateChange = (date?: Date) => {
    const updateItem = { ...item };

    updateItem.attributes[attributeId] = {
      ...updateItem.attributes[attributeId],
      value: date ? date.toString() : "",
    };
    editItem(updateItem);
  };

  if (!attribute.name) return <></>;

  switch (attribute.type) {
    case AttributeDataTypes.TEXT:
      return (
        <TextInput
          label={attribute.name}
          value={value}
          onChangeText={handleTextChange}
          mode="outlined"
        />
      );
    case AttributeDataTypes.NUMBER:
      return (
        <TextInput
          label={attribute.name}
          keyboardType="numeric"
          value={value}
          onChangeText={handleTextChange}
          mode="outlined"
        />
      );
    case AttributeDataTypes.CHECKBOX:
      return (
        <View style={styles.switchContainer}>
          <Text>{attribute.name}</Text>
          <Switch value={value === "YES"} onChange={handleSwitchChange} />
        </View>
      );
    case AttributeDataTypes.DATE:
      return (
        <DatePickerInput
          locale="en"
          label={attribute.name}
          value={value ? new Date(value) : undefined}
          onChange={handleDateChange}
          inputMode="start"
          mode="outlined"
        />
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
