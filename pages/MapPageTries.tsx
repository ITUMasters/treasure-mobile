import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../theme';
import { Theme } from '../theme/types';
import { useState } from 'react';
import MapView, { Callout, Circle, Marker, Polygon } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { PATHS } from '../consts/paths';
import { useLocations } from '../react-query/hooks';

export function MapPageTries() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigator = useNavigation<any>();
  var regionColor = '#000000';

  const locations = useLocations().locations;
  console.log(locations);

  function randColor() {
    return (regionColor =
      '#' +
      ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
      '42');
  }

  return (
    <SafeAreaView style={themedStyles.container}>
      <MapView
        style={themedStyles.map}
        initialRegion={{
          // Use region property
          latitude: 41.10826473247252,
          longitude: 29.02571209390856,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
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
      width: '100%',
      backgroundColor: theme.appBackground.backgroundColor,
    },
    scrollViewStyle: {
      width: '100%',
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
};

