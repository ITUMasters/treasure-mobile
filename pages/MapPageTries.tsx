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
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";

export function MapPageTries() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigator = useNavigation<any>();
  const mockLocations = [
    {
      name: "ITU",
      latitude: 41.10826473247252,
      longitude: 29.02571209390856,
      id: 7,
    },
    {
      name: "METU",
      latitude: 39.89455861403798,
      longitude: 32.78077025408293,
      id: 25,
    },
  ];

  return (
    <SafeAreaView style={themedStyles.container}>
      <MapView
        style={themedStyles.map}
        initialRegion={{
          latitude: 41.10826473247252,
          longitude: 29.02571209390856,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
        scrollEnabled={true}
        zoomControlEnabled={true}
      >
        {mockLocations.map((element: any) => (
          <View key={element.name}>
            <Marker
              coordinate={{
                latitude: element.latitude,
                longitude: element.longitude,
              }}
              pinColor={"red"}
              onPress={() => {
                navigator.navigate(PATHS.HOME, {
                  name: element.name,
                  regionId: element.id,
                });
              }}
            ></Marker>
            <Circle
              center={{
                latitude: element.latitude,
                longitude: element.longitude,
              }}
              radius={500}
            />
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
  });
};
