import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../consts';
import {
  eyeOff,
  eyeOn,
  facebook,
  google,
  logo,
  mail,
  treasure,
} from '../icons';
import { useTheme } from '../theme';
import { colors } from '../theme/colors';
import { Theme } from '../theme/types';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Icon } from '../ui/Icon';
import { Input } from '../ui/Input';
import { Logo } from '../ui/Logo';
import { NavBar } from '../ui/NavBar';

export function LoginPage() {
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState('');
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const defaulTextColor = theme.text.default.color;

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.logoStyle}>
          <Logo />
        </View>
        <Text style={themedStyles.signInStyle}>Sign in</Text>
        <View
          style={{ width: '100%', paddingLeft: '20%', paddingRight: '20%' }}
        >
          <View
            style={{
              marginTop: '2.6%',
              width: '100%',
            }}
          >
            <Input size="large" title="Username or Mail" xml={mail} />
          </View>
          <View style={{ marginTop: '3%', width: '100%' }}>
            <Input
              size="large"
              title="Password"
              xml={passwordVisibility ? eyeOn : eyeOff}
              value={password}
              onChangeText={setPassword}
              isPassword={!passwordVisibility}
              onTouched={() => setPasswordVisibility(!passwordVisibility)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '3%',
            alignItems: 'center',
            alignContent: 'flex-start',
            marginLeft: '20%',
          }}
        >
          <Checkbox
            checked={checkboxVal}
            onPress={() => {
              setCheckboxVal(!checkboxVal);
            }}
          />
          <Text style={{ marginLeft: '1.2%', color: defaulTextColor }}>
            Remember me
          </Text>
        </View>
        <View
          style={{
            paddingLeft: '20%',
            paddingRight: '20%',
            marginTop: '2%',
            marginBottom: '1.8%',
          }}
        >
          <Button size="xlarge">Sign in</Button>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingLeft: '20%',
            paddingRight: '20%',
          }}
        >
          <View style={{ marginBottom: '1.2%' }}>
            <Text style={{ fontSize: 14, color: defaulTextColor }}>
              Or sign in with
            </Text>
          </View>
          <View style={{ marginTop: '1.5%', width: '100%' }}>
            <Button size="large" xml={google}>
              Google
            </Button>
          </View>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '6%',
              alignSelf: 'center',
            }}
          >
            <Text style={{ color: defaulTextColor }}>
              Don't have an account?{' '}
            </Text>
            <Text
              style={{
                color: colors.lightRoyalBlue,
                fontFamily: FONTS.PoppinsSemiBold,
              }}
            >
              Create Account
            </Text>
          </View>
          <Text
            style={{ color: colors.red, fontFamily: FONTS.PoppinsSemiBold }}
          >
            Forgot Password
          </Text>
        </View>
      </ScrollView>
      <NavBar pageNo="1" />
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
    logoStyle: {
      marginTop: '5.83%',
      alignItems: 'center',
    },
    signInStyle: {
      color: theme.text.default.color,
      fontSize: 24,
      fontFamily: FONTS.PoppinsSemiBold,
      marginTop: '6%',
      alignSelf: 'center',
    },
    scrollViewStyle: {
      width: '100%',
      flex: 1,
    },
  });
};

