import { account, emptySettings, mail, settings, treasure } from '../icons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

import { Logo } from './Logo';
import { useState } from 'react';
import { NavButton } from './NavButton';
import { PATHS } from '../consts/paths';
import { Icon } from './Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InGamePage } from '../pages/InGamePage';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

type navbarType = {
  pageNo: string;
};
export const NavBar = ({ pageNo }: navbarType) => {
  const themedStyles = styles();
  const navigator = useNavigation();

  const [currentPage, setCurrentPage] = useState(parseInt(pageNo));

  return (
    <View style={themedStyles.wrapper}>
      <NavButton
        as={PATHS.ACCOUNT}
        onPress={() => {
          navigator.navigate('Profile' as never, {} as never);
        }}
        isCurrentPage={currentPage === 0}
        text="ACCOUNT"
        xml={account}
        buttonWidth="20%"
      />
      <NavButton
        as={PATHS.JOIN}
        onPress={() => {
          navigator.navigate('Join' as never, {} as never);
        }}
        isCurrentPage={currentPage === 1}
        text="JOIN"
        xml={mail}
        buttonWidth="20%"
      />

      <NavButton
        as={PATHS.HOME}
        onPress={() => {
          navigator.navigate('Home' as never, {} as never);
        }}
        isCurrentPage={currentPage === 2}
        text="HOME"
        xml={mail}
        buttonWidth="20%"
      >
        <View style={styles().treasure}>
          <Icon xml={treasure} width="65" height="65" />
        </View>
      </NavButton>

      <NavButton
        as={PATHS.PLAY}
        onPress={() => {
          navigator.navigate('InGame' as never, {} as never);
        }}
        isCurrentPage={currentPage === 3}
        text="PLAY"
        xml={go}
        buttonWidth="20%"
      />
      <NavButton
        as={PATHS.SETTINGS}
        onPress={() => {
          navigator.navigate(PATHS.SETTINGS as never, {} as never);
        }}
        isCurrentPage={currentPage === 4}
        text="SETTINGS"
        xml={emptySettings}
        buttonWidth="20%"
      />
    </View>
  );
};

// Styles
const styles = () => {
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 64,
    },
    treasure: {
      position: 'absolute',
      top: '-58%',
      zIndex: 10,
    },
  });
};

