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
import { EditProfilePage } from "./pages/EditProfilePage";

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

  return (
    <>
      <Drawer.Navigator>
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
          name="Profile"
          component={ProfilePage}
          options={{ ...navbarHeaderOptions, title: "Profile Page" }}
        />
        <Drawer.Screen
          name="InGame"
          component={InGamePage}
          options={{ ...navbarHeaderOptions, title: "In Game Page" }}
        />
        <Drawer.Screen
          name="EditProfile"
          component={EditProfilePage}
          options={{
            ...navbarHeaderOptions,
            title: "Edit Profile Page",
            drawerItemStyle: { height: 0 },
          }}
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
  });
};
