import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "./hooks";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContextProvider } from "./theme";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { eyeOff, eyeOn, facebook, google, mail } from "./icons";

export default function App() {
  const [fontsLoaded] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <View style={styles.container}>
        <Button size="xlarge" bending="low" xml={facebook}>
          Facebook
        </Button>
        <Input size="large" xml={mail} isPassword={false} title="Mail" />
      </View>
    </ThemeContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
