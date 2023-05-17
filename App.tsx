import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "./hooks";
import { SetStateAction, useEffect, useState } from "react";
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
import { useAuth, useSetAuth } from "./recoil-store/auth/AuthStoreHooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { authorizedQueryClient, unauthorizedQueryClient } from "./react-query";
import { PaginationContextProvider } from "./context/PaginationContext";
import { ShareTreasure } from "./pages/ShareTreasure";
import * as Linking from "expo-linking";
import { AuthVerify } from "./utils/AuthVerify";
import { useSetId } from "./recoil-store/auth/IdStoreHooks";
import { removeItem } from "./utils/storage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { Button } from "./ui/Button";
import { notification } from "./icons";
import { Icon } from "./ui/Icon";

export default function App() {
  const [fontsLoaded] = useAppFonts();
  const { theme } = useTheme();
  const [url, setURL] = useState(null);

  function handleDeepLink(event: any) {
    let url: any = Linking.parse(event.url);
    setURL(url);
  }

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        let url: any = Linking.parse(initialURL);
        setURL(url);
      }
    }
    const subscription = Linking.addEventListener("url", handleDeepLink);
    if (!url) {
      getInitialURL();
    }

    return () => subscription.remove();
  }, []);

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
  const prefix = Linking.createURL("/");
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        InGame: {
          path: "game/:treasureId/:interactionId",
          parse: {
            treasureId: (treasureId: string) => `${treasureId}`,
            interactionId: (interactionId: string) => `${interactionId}`,
          },
        },
      },
    },
    param: {},
  };
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <PaginationContextProvider>
        <ThemeContextProvider>
          {auth ? <AuthorizedApp /> : <UnauthorizedApp />}
        </ThemeContextProvider>
      </PaginationContextProvider>
    </NavigationContainer>
  );
}
const Drawer1 = createDrawerNavigator();
function AuthorizedApp() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navbarHeaderOptions = getHeaderStylesByTheme(theme);

  const [isNotificationDropdownVisible, setIsNotifactionDropdownVisible] =
    useState(false);
  const openNotificationDropdown = () => {
    setIsNotifactionDropdownVisible(true);
    if (isNotificationDropdownVisible) {
      return <View style={themedStyles.notificationDropdown}></View>;
    }
  };

  const usedStyles = styles(theme);
  return (
    <QueryClientProvider client={authorizedQueryClient}>
      <Drawer1.Navigator
        screenOptions={{
          drawerType: "front",
          headerTintColor: colors.white,
          drawerStyle: usedStyles.drawerStyle,
          drawerLabelStyle: { color: colors.white },
          unmountOnBlur: true,
          headerRight: () => (
            <View
              style={{
                marginRight: 15,
              }}
            >
              <Icon
                height="24"
                width="24"
                onPress={openNotificationDropdown}
                xml={notification}
              ></Icon>
            </View>
          ),
        }}
      >
        <Drawer1.Screen
          name="Home"
          component={HomePage}
          options={{ ...navbarHeaderOptions, title: "Home Page" }}
        />
        <Drawer1.Screen
          name="Profile"
          component={ProfilePage}
          options={{ ...navbarHeaderOptions, title: "Profile" }}
        />
        <Drawer1.Screen
          name="Join"
          component={JoinPage}
          options={{ ...navbarHeaderOptions, title: "Join Treasure" }}
        />
        <Drawer1.Screen
          name="MAPS"
          component={MapPageTries}
          options={{
            ...navbarHeaderOptions,
            title: "Map",
          }}
        />
        <Drawer1.Screen
          name="FINISHED_TREASURES"
          component={FinishedMapsOnMap}
          options={{
            ...navbarHeaderOptions,
            title: "Completed Treasures",
          }}
        />

        <Drawer1.Screen
          name="InGame"
          component={InGamePage}
          options={{
            ...navbarHeaderOptions,
            title: "TREASURE PAGE",
            drawerItemStyle: { height: 0 },
          }}
        />

        <Drawer1.Screen
          name="EditProfile"
          component={EditProfilePage}
          options={{
            ...navbarHeaderOptions,
            title: "EDIT PROFILE",
            drawerItemStyle: { height: 0 },
          }}
        />

        <Drawer1.Screen
          name="LEADERBOARD"
          component={LeaderboardPage}
          options={{
            ...navbarHeaderOptions,
            title: "LEADERBOARD",
            drawerItemStyle: { height: 0 },
          }}
        />

        <Drawer1.Screen
          name="SHARE_TREASURE"
          component={ShareTreasure}
          options={{
            ...navbarHeaderOptions,
            title: "SHARE TREASURE",
            drawerItemStyle: { height: 0 },
          }}
        />
      </Drawer1.Navigator>
      <AuthVerify />
    </QueryClientProvider>
  );
}
const Drawer = createDrawerNavigator();
function UnauthorizedApp() {
  const { theme } = useTheme();
  const navbarHeaderOptions = getHeaderStylesByTheme(theme);

  const usedStyles = styles(theme);
  return (
    <QueryClientProvider client={unauthorizedQueryClient}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "front",
          headerTintColor: colors.white,
          drawerStyle: usedStyles.drawerStyle,
          drawerLabelStyle: { color: colors.white },
          unmountOnBlur: true, //Reset local screen states.
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
    </QueryClientProvider>
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
    notificationDropdown: { borderWidth: 1, width: 50, height: 200 },
  });
};
