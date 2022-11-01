import { account, mail, treasure } from '../icons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

import { Logo } from './Logo';
import { useState } from 'react';
import { NavButton } from './NavButton';
import { PATHS } from '../consts/paths';
import { Icon } from './Icon';

export const NavBar = () => {
  const themedStyles = styles();
  // const router = useRouter(route);
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <View style={themedStyles.wrapper}>
      <NavButton
        as={PATHS.ACCOUNT}
        onPress={() => setCurrentPage(0)}
        isCurrentPage={currentPage === 0}
        text="ACCOUNT"
        xml={account}
        buttonWidth="20%"
      />
      <NavButton
        as={PATHS.LEADERBOARD}
        onPress={() => setCurrentPage(1)}
        isCurrentPage={currentPage === 1}
        text="JOIN"
        xml={mail}
        buttonWidth="20%"
      />

      <NavButton
        as={PATHS.HOME}
        onPress={() => setCurrentPage(2)}
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
        onPress={() => setCurrentPage(3)}
        isCurrentPage={currentPage === 3}
        text="PLAY"
        xml={mail}
        buttonWidth="20%"
      />
      <NavButton
        as={PATHS.SETTINGS}
        onPress={() => setCurrentPage(4)}
        isCurrentPage={currentPage === 4}
        text="SETTINGS"
        xml={mail}
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

