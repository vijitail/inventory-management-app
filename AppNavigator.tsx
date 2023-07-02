import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ManageCategoriesScreen } from "./screens/manage-categories";
import { DrawerContent } from "./components/DrawerContent";
import { ManageItemsScreen } from "./screens/manage-items";

const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={ManageItemsScreen}
        options={{ drawerItemStyle: { height: 0 } }}
      />
      <Drawer.Screen
        name="Manage Categories"
        component={ManageCategoriesScreen}
      />
    </Drawer.Navigator>
  );
};
