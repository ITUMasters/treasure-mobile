import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "./hooks";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContextProvider, useTheme } from "./theme";
import { Theme } from "./theme/types";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NavBar } from "./ui/NavBar";
import { InGamePage } from "./pages/InGamePage";
import { OTP_VerificationPage } from "./pages/OTP_VerificationPage";
import { ProfilePage } from "./pages/ProfilePage";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { getHeaderStylesByTheme } from "./utils/HeaderStyles";
import { HomePage } from "./pages/HomePage";
import { color } from "react-native-reanimated";
import { colors } from "./theme/colors";

export default function App() {
  const [fontsLoaded] = useAppFonts();
  const { theme } = useTheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeContextProvider>
        <AppEntrance />
      </ThemeContextProvider>
    </NavigationContainer>
  );
}

function AppEntrance() {
  const { theme } = useTheme();
  const navbarHeaderOptions = getHeaderStylesByTheme(theme);
  const Drawer = createDrawerNavigator();
  const usedStyles = styles(theme);
  return (
    <>
      <Drawer.Navigator screenOptions={{drawerType: 'front', headerTintColor: colors.white,drawerStyle: usedStyles.drawerStyle, drawerLabelStyle: {color: colors.white}}}>
        <Drawer.Screen
          name="Login"
          component={LoginPage}
          options={{ ...navbarHeaderOptions, title: "Login Page" }}
        />
        <Drawer.Screen
          name="Register"
          component={RegisterPage}
          options={{ ...navbarHeaderOptions, title: "Register Page" }}
        />
        <Drawer.Screen
          name="Home"
          component={HomePage}
          options={{ ...navbarHeaderOptions, title: "Home Page" }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfilePage}
          options={{ ...navbarHeaderOptions, title: "Profile Page" }}
        />
        <Drawer.Screen
          name="InGame"
          component={InGamePage}
          options={{ ...navbarHeaderOptions, title: "In Game Page" }}
        />
      </Drawer.Navigator>
    </>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appBackground.backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    drawerStyle: {
      backgroundColor: colors.lightRoyalBlue,
    }
  });
};
