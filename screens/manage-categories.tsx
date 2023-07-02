import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { useCategoryStore } from "../stores/category-store";
import { AddEditCategory } from "../components/manage-categories/AddEditCategory";
import { Button, Text } from "react-native-paper";
import { useColumns } from "../hooks/useColumnWidth";
// import KeyboardSpacer from "react-native-keyboard-spacer";

export const ManageCategoriesScreen = () => {
  const categories = useCategoryStore((state) =>
    Object.values(state.categories)
  );

  const addCategory = useCategoryStore((state) => state.addCategory);

  const { columns, columnWidth } = useColumns();

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
                style={[
                  styles.addEditCategoryContainer,
                  { maxWidth: columnWidth },
                ]}
              >
                <AddEditCategory category={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            key={columns}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={[
              styles.listContainer,
              {
                width: (columnWidth + 16) * columns,
              },
            ]}
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
    marginTop: 10,
    marginBottom: 30,
  },
  addEditCategoryContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginHorizontal: 8,
  },
  listContainer: {
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
