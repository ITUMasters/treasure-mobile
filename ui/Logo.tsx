import { View } from 'react-native';
import { treasure } from '../icons';
import { colors } from '../theme/colors';
import { Icon } from './Icon';

type LogoProps = {
  width?: number;
  height?: number;
};
export const Logo = ({ width = 160, height = 160 }: LogoProps) => {
  return (
    <View
      style={{
        backgroundColor: colors.lightRoyalBlue,
        width: width,
        height: height,
        borderRadius: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        xml={treasure}
        width={String(width * 0.65)}
        height={String(height * 0.65)}
      />
    </View>
  );
};

