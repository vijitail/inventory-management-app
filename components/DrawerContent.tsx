import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import { useCategoryStore } from "../stores/category-store";
import { useEffect, useState } from "react";

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation, state } = props;
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useCategoryStore((state) =>
    Object.values(state.categories)
  );

  useEffect(() => {
    const activeScreen = state.routes[state.index]?.name;
    if (activeScreen !== "Dashboard") setActiveCategory("");
  }, [state]);

  const navigateToCategory = (categoryId?: string) => () => {
    setActiveCategory(categoryId || "All");
    navigation.navigate("Dashboard", { categoryId });
  };

  return (
    <DrawerContentScrollView style={styles.drawerContent}>
      <DrawerItem
        label="Dashboard"
        onPress={navigateToCategory()}
        focused={activeCategory === "All"}
      />
      {categories
        .filter((category) => !!category.categoryName)
        .map((category) => (
          <DrawerItem
            key={category.id}
            label={category.categoryName}
            onPress={navigateToCategory(category.id)}
            focused={activeCategory === category.id}
          />
        ))}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 16,
  },
  collapsedSection: {
    width: "100%",
  },
});
