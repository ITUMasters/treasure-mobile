import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme';
import { Theme } from '../theme/types';
import { NavBar } from '../ui/NavBar';
import QRCode from 'react-native-qrcode-svg';

export function ShareTreasure({ route }: any) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const routeParams = route.params ?? route.params;

  function generateURL(treasureId: number, interactionId: number) {
    return (
      'exp://192.168.137.78:19000/--/game/' +
      treasureId.toString() +
      '/' +
      interactionId.toString()
    );
  }

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}></ScrollView>
      <View style={themedStyles.qr}>
        <QRCode
          size={300}
          value={generateURL(routeParams.treasureId, routeParams.interactionId)}
        />
      </View>

      <NavBar pageNo="2" />
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
    qr: {
      flex: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

