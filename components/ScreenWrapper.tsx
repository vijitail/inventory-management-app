import * as React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ScreenWrapperProps extends ScrollViewProps {
  children: React.ReactNode;
  withScrollView?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ScreenWrapper = ({
  children,
  withScrollView = true,
  style,
  contentContainerStyle,
  ...rest
}: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.left,
    },
  ];

  return (
    <>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={[
            contentContainerStyle,
            styles.contentContainerStyle,
          ]}
          keyboardShouldPersistTaps="always"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[containerStyle, style]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[containerStyle, style]}>{children}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
  },
});

export default ScreenWrapper;
