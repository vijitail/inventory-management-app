import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { useCategoryStore } from "../stores/category-store";
import { AddEditCategory } from "../components/manage-categories/AddEditCategory";
import { Button, Text } from "react-native-paper";
// import KeyboardSpacer from "react-native-keyboard-spacer";

export const ManageCategoriesScreen = () => {
  const categories = useCategoryStore((state) =>
    Object.values(state.categories)
  );

  const addCategory = useCategoryStore((state) => state.addCategory);

  return (
    <ScreenWrapper withScrollView={false}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="height">
          <FlatList
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
              <View style={{ marginHorizontal: 16 }}>
                <AddEditCategory category={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
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
