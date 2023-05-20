import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import MapView, { Callout, Circle, LatLng, Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import { useCompletedTreasures } from "../react-query/hooks";
import { Loading } from "./Loading";
import { leftArrowWhite } from "../icons";
import { Icon } from "../ui/Icon";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

export function FinishedMapsOnMap() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const { height, width } = Dimensions.get("window");

  const mockFinishedTreasures = [
    {
      latitude: 41.441,
      longitude: 31.80889,
    },
    {
      latitude: 37.93976,
      longitude: 32.44143,
    },
    {
      latitude: 38.48113,
      longitude: 27.14095,
    },
    {
      latitude: 38.48113,
      longitude: 27.14095,
    },
    {
      latitude: 37.65929,
      longitude: 36.8606,
    },
  ];

  const navigator = useNavigation();
  const goBack = () => {
    navigator.navigate("Profile" as never, {} as never);
  };

  const { completedTreasures, isFetching } = useCompletedTreasures();
  if (isFetching) {
    <Loading />;
  }

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
        {completedTreasures !== undefined &&
          completedTreasures.map((e, index) => (
            <View key={index}>
              <Marker
                coordinate={
                  {
                    latitude: e.location.latitude as number,
                    longitude: e.location.longitude as number,
                  } as any
                }
              >
                <Image
                  source={require("../assets/images/treasure.png")}
                  style={themedStyles.markerStyle}
                />
              </Marker>
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
    markerStyle: {
      width: 32,
      height: 32,
      resizeMode: "contain",
    },
    goBackBar: {
      backgroundColor: colors.lightRoyalBlue,
      width: "100%",
      height: 28,
    },
    goBackIcon: {
      marginTop: -6,
      marginLeft: 6,
    },
  });
};
