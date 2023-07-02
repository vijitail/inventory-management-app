import "react-native-gesture-handler";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./AppNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <Provider>
          <AppNavigator />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
