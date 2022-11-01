import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from './hooks';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContextProvider, useTheme } from './theme';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { eyeOff, eyeOn, facebook, google, mail } from './icons';
import { Theme } from './theme/types';
import { colors } from './theme/colors';
import { Checkbox } from './ui/Checkbox';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NavBar } from './ui/NavBar';

export default function App() {
  const [fontsLoaded] = useAppFonts();
  const { theme } = useTheme();
  const [checkState, setCheckState] = useState(false);

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
      <View style={styles(theme).container}>
        <LoginPage />
      </View>
      <View>
        <NavBar />
      </View>
    </ThemeContextProvider>
  );

  return (
    <ThemeContextProvider>
      <View style={styles(theme).container}>
        <Button size="xlarge" bending="low" xml={google}>
          Facebook
        </Button>
        <Input size="large" xml={mail} isPassword={true} title="Mail" />
        <Checkbox
          checked={checkState}
          onPress={() => {
            setCheckState(!checkState);
          }}
        />
      </View>
    </ThemeContextProvider>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appBackground.backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

