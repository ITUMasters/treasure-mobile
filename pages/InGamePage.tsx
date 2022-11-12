import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import { TopBar } from "../ui/TopBar";

export function InGamePlage() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  return (
    <SafeAreaView style={themedStyles.container}>
      <TopBar />
      <ScrollView style={themedStyles.scrollViewStyle}></ScrollView>
    </SafeAreaView>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.appBackground.backgroundColor,
    },
    scrollViewStyle: {
      width: "100%",
      flex: 1,
    },
  });
};
