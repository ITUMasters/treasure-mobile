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

import { RecoilRoot } from "recoil";
import { JoinPage } from "./pages/JoinPage";

import { EditProfilePage } from "./pages/EditProfilePage";

import { HomePage } from "./pages/HomePage";
import { color } from "react-native-reanimated";
import { colors } from "./theme/colors";
import { SettingsPage } from "./pages/SettingsPage";
import { MapPageTries } from "./pages/MapPageTries";
import { FinishedMapsOnMap } from "./pages/FinishedTreasuresOnMap";
import { useAuth } from "./recoil-store/auth/AuthStoreHooks";

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
    <RecoilRoot>
      <AppWithRecoil />
    </RecoilRoot>
  );
}

function AppWithRecoil() {
  const auth = useAuth();

  return (
    <NavigationContainer>
      <ThemeContextProvider>
        {auth ? <AuthorizedApp /> : <UnauthorizedApp />}
      </ThemeContextProvider>
    </NavigationContainer>
  );
}
const Drawer1 = createDrawerNavigator();
function AuthorizedApp() {
  const { theme } = useTheme();
  const navbarHeaderOptions = getHeaderStylesByTheme(theme);

  const usedStyles = styles(theme);
  return (
    <>
      <Drawer1.Navigator
        screenOptions={{
          drawerType: "front",
          headerTintColor: colors.white,
          drawerStyle: usedStyles.drawerStyle,
          drawerLabelStyle: { color: colors.white },
        }}
      >
        <Drawer1.Screen
          name="Profile"
          component={ProfilePage}
          options={{ ...navbarHeaderOptions, title: "Profile Page" }}
        />
        <Drawer1.Screen
          name="Home"
          component={HomePage}
          options={{ ...navbarHeaderOptions, title: "Home Page" }}
        />
        <Drawer1.Screen
          name="InGame"
          component={InGamePage}
          options={{ ...navbarHeaderOptions, title: "In Game Page" }}
        />
        <Drawer1.Screen
          name="EditProfile"
          component={EditProfilePage}
          options={{
            ...navbarHeaderOptions,
            title: "Edit Profile Page",
            drawerItemStyle: { height: 0 },
          }}
        />
        <Drawer1.Screen
          name="Join"
          component={JoinPage}
          options={{ ...navbarHeaderOptions, title: "Join Page" }}
        />
        <Drawer1.Screen
          name="SETTINGS"
          component={SettingsPage}
          options={{ ...navbarHeaderOptions, title: "Settings Page" }}
        />
        <Drawer1.Screen
          name="MAPS"
          component={MapPageTries}
          options={{
            ...navbarHeaderOptions,
            title: "Map Page",
            drawerItemStyle: { height: 0 },
          }}
        />
        <Drawer1.Screen
          name="FINISHED_TREASURES"
          component={FinishedMapsOnMap}
          options={{
            ...navbarHeaderOptions,
            title: "Completed Treasures",
            drawerItemStyle: { height: 0 },
          }}
        />
      </Drawer1.Navigator>
    </>
  );
}
const Drawer = createDrawerNavigator();
function UnauthorizedApp() {
  const { theme } = useTheme();
  const navbarHeaderOptions = getHeaderStylesByTheme(theme);

  const usedStyles = styles(theme);
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "front",
          headerTintColor: colors.white,
          drawerStyle: usedStyles.drawerStyle,
          drawerLabelStyle: { color: colors.white },
        }}
      >
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
    },
  });
};
