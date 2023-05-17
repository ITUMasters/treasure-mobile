import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import { useState } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";
import { useLocations } from "../react-query/hooks";
import { colors } from "../theme/colors";
import { Icon } from "../ui/Icon";
import { leftArrowWhite } from "../icons";

export function MapPageTries() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigator = useNavigation<any>();
  var regionColor = "#000000";

  const locations = useLocations().locations;

  function randColor() {
    return (regionColor =
      "#" +
      ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0") +
      "aa");
  }

  const goBack = () => {
    navigator.navigate(PATHS.HOME as never);
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <View style={themedStyles.goBackBar}>
        <View style={themedStyles.goBackIcon}>
          <Icon
            xml={leftArrowWhite}
            width="40"
            height="40"
            onPress={goBack}
          ></Icon>
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={themedStyles.map}
        initialRegion={{
          latitude: 38.6264,
          longitude: 34.7139,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
        scrollEnabled={true}
        zoomControlEnabled={true}
      >
        {locations?.entities.map((element: any) => (
          <View key={element.name}>
            <Marker
              coordinate={{
                latitude: element.center.latitude,
                longitude: element.center.longitude,
              }}
              pinColor={randColor()}
              onPress={() => {
                navigator.navigate(PATHS.HOME, {
                  name: element.name,
                  regionId: element.id,
                });
              }}
            ></Marker>
            <Polygon
              coordinates={element.paths}
              strokeColor={regionColor}
              fillColor={regionColor}
            ></Polygon>
          </View>
        ))}
      </MapView>
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
    map: {
      width: "100%",
      height: "100%",
    },
    goBackBar: {
      backgroundColor: colors.lightRoyalBlue,
      width: "100%",
      height: 28,
    },
    goBackIcon: {
      marginLeft: 15,
    },
  });
};
