import { FONTS } from '../consts';
import { colors } from '../theme/colors';
import { ModalController } from '../hooks/useModal';
import { ReactNode, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../theme';
import { Theme } from '../theme/types';
import { color } from 'react-native-reanimated';

type Props = {
  controller: ModalController;
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  header: string;
};

const START_POS_LIMIT = 50;
const MIN_DRAG_AMOUNT = 30;

export const BottomSheet = ({
  controller,
  children,
  onClose,
  onOpen,
  header,
}: Props) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  const animatedViewHeight = useRef(new Animated.Value(0)).current;

  const dragEventStartY = useRef(0);
  const isDragging = useRef(false);

  const animatedHeightStyle = {
    height: animatedViewHeight,
  };

  useEffect(() => {
    if (controller.isOpen) {
      Animated.timing(animatedViewHeight, {
        toValue: Dimensions.get('screen').height - 200,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onOpen?.();
    } else {
      Animated.timing(animatedViewHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onClose?.();
    }
  }, [controller.isOpen, animatedViewHeight]);

  return (
    <Animated.View
      onTouchStart={(e) => {
        const startPosY = e.nativeEvent.locationY;
        if (startPosY < START_POS_LIMIT) {
          isDragging.current = true;
        } else {
          isDragging.current = false;
        }
        dragEventStartY.current = e.nativeEvent.locationY;
      }}
      onTouchEnd={(e) => {
        const touchEndY = e.nativeEvent.locationY;
        const diff = touchEndY - dragEventStartY.current;
        if (diff > MIN_DRAG_AMOUNT && isDragging.current) {
          controller.close();
        }
      }}
      style={{ ...themedStyles.wrapper, ...(animatedHeightStyle as any) }}
    >
      <View style={themedStyles.thumb}></View>
      <ScrollView>
        <Text style={themedStyles.header}>{header}</Text>
        {children}
      </ScrollView>
    </Animated.View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: Dimensions.get('window').width,
      backgroundColor: colors.lightRoyalBlue,
      shadowColor: colors.black,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      elevation: 0,
      shadowOpacity: 0.4,
      shadowRadius: 4,
    },
    thumb: {
      width: 32,
      height: 4,
      marginTop: 12,
      borderRadius: 12,
      backgroundColor: colors.black,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    header: {
      fontSize: 20,
      color: colors.white,
      fontFamily: FONTS.PoppinsBold,
      marginTop: 12,
      marginBottom: 12,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });
};

