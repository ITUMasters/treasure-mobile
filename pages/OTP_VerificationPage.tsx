import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../consts';
import { eyeOff, eyeOn } from '../icons';
import { useTheme } from '../theme';
import { Theme } from '../theme/types';
import { Button } from '../ui/Button';

import { Input } from '../ui/Input';
import { Logo } from '../ui/Logo';

export function OTP_VerificationPage() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState('');
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.wrapper}>
          <View style={themedStyles.logoStyle}>
            <Logo />
          </View>
          <Text style={themedStyles.header}>Enter the OTP Code</Text>
          <View style={themedStyles.input}>
            <Input
              size="large"
              title="OTP"
              xml={passwordVisibility ? eyeOn : eyeOff}
              value={password}
              onChangeText={setPassword}
              isPassword={!passwordVisibility}
              onTouched={() => setPasswordVisibility(!passwordVisibility)}
              keyboardType="number-pad"
            />
          </View>
          <View style={themedStyles.remainingTimeOutWrapper}>
            <View style={themedStyles.remianingTimeInWrapper}>
              <View>
                <Text style={themedStyles.remainingTimeText}>
                  Remaining Time:
                </Text>
              </View>
              <View>
                <Text style={themedStyles.remainingTimeText}>00.00</Text>
              </View>
            </View>
          </View>

          <View style={themedStyles.button}>
            <Button size="xlarge">Send OTP Code</Button>
          </View>
        </View>
      </ScrollView>
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
    wrapper: { alignItems: 'center' },
    logoStyle: {
      marginTop: 30,
      alignItems: 'center',
    },
    header: {
      color: theme.text.default.color,
      fontSize: 24,
      fontFamily: FONTS.PoppinsSemiBold,
      marginTop: 60,
    },
    input: {
      marginTop: 10,
      width: 260,
    },
    remainingTimeOutWrapper: {
      marginTop: 5,
      alignItems: 'flex-end',
      width: 260,
      height: 50,
    },
    remianingTimeInWrapper: {
      width: 120,
      height: '100%',
    },
    remainingTimeText: {
      color: theme.text.default.color,

      textAlign: 'right',
      fontSize: 13,
    },
    button: {
      paddingTop: 10,
      width: 260,
    },
  });
};

