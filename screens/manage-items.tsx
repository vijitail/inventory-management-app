import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useCategoryStore } from "../stores/category-store";
import ScreenWrapper from "../components/ScreenWrapper";
import { View, StyleSheet } from "react-native";
import { useItemStore } from "../stores/item-store";
import { SectionList } from "react-native";
import { AddEditItem } from "../components/manage-items/AddEditItem";
import { Button, Divider, Text } from "react-native-paper";

export const ManageItemsScreen = () => {
  const { params } = useRoute();

  const { categoryId } = (params || {}) as never;

  const navigation = useNavigation();

  const categories = useCategoryStore((state) => state.categories);

  const items = useItemStore((state) => state.items);

  const addItem = useItemStore((state) => state.addItem);

  const sectionListData = Object.values(categories)
    .filter((category) =>
      categoryId ? category.id === categoryId : !!category.categoryName
    )
    .map((category) => {
      return {
        id: category.id,
        title: category.categoryName,
        data: items[category.id] ? Object.values(items[category.id]) : [],
      };
    });

  useEffect(() => {
    if (categoryId)
      navigation.setOptions({
        title: categories[categoryId].categoryName || "Dashboard",
      });
    else
      navigation.setOptions({
        title: "Dashboard",
      });
  }, [categoryId]);

  const handleAddItem = (categoryId: string) => () => {
    addItem(categoryId);
  };

  const navigateToManageCategories = () => {
    navigation.navigate("Manage Categories" as never);
  };

  return (
    <ScreenWrapper withScrollView={false}>
      <View style={styles.container}>
        {Object.values(categories)?.length ? (
          <SectionList
            sections={sectionListData}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 16 }}>
                <AddEditItem item={item} />
              </View>
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.addContainer}>
                {!section.data.length && <Text>No {section.title} Found!</Text>}
                <Button
                  onPress={handleAddItem(section.id)}
                  mode="contained"
                  style={styles.button}
                >
                  Add {section.title}
                </Button>
              </View>
            )}
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled={false}
            renderSectionFooter={() => (
              <Divider style={styles.sectionDivider} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        ) : (
          <View style={styles.noCategoriesFoundContainer}>
            <Text>No Categories Found!</Text>
            <Button
              mode="contained"
              onPress={navigateToManageCategories}
              style={styles.button}
            >
              Manage Categories
            </Button>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addContainer: {
    maxWidth: 320,
    alignSelf: "center",
    marginVertical: 16,
  },
  button: {
    marginTop: 10,
  },
  sectionDivider: {
    marginVertical: 10,
  },
  noCategoriesFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
