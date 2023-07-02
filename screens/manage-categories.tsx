import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { useCategoryStore } from "../stores/category-store";
import { AddEditCategory } from "../components/manage-categories/AddEditCategory";
import { Button, Text } from "react-native-paper";
import { useEffect, useState } from "react";
// import KeyboardSpacer from "react-native-keyboard-spacer";

export const ManageCategoriesScreen = () => {
  const categories = useCategoryStore((state) =>
    Object.values(state.categories)
  );

  const addCategory = useCategoryStore((state) => state.addCategory);

  const { width } = useWindowDimensions();

  const columnWidth = 320;

  const calculateColumns = (width: number) => {
    return width > (columnWidth + 16) * 2 ? 2 : 1;
  };

  const [columns, setColumns] = useState(1);

  useEffect(() => {
    setColumns(calculateColumns(width));
  }, [width]);

  return (
    <ScreenWrapper withScrollView={false}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="height">
          <FlatList
            numColumns={columns}
            ListHeaderComponent={() => (
              <View style={styles.addCategoryContainer}>
                {!categories.length && <Text>No Categories Found!</Text>}
                <Button
                  onPress={addCategory}
                  mode="contained"
                  style={styles.button}
                >
                  Add Category
                </Button>
              </View>
            )}
            data={categories}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  maxWidth: columnWidth,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 8,
                }}
              >
                <AddEditCategory category={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            key={columns}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              width: (columnWidth + 16) * columns,
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 10,
  },
  addCategoryContainer: {
    maxWidth: 320,
    alignSelf: "center",
    marginVertical: 10,
  },
});
