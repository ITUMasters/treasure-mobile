import { Image, StyleSheet, Text, View } from 'react-native';
import { Theme } from "../theme/types";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";

interface AchievementProps {
  challengeName: string;
  rank: string,
}

export function Achievement({ challengeName, rank }: AchievementProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  return (
    <View style = {themedStyles.wrapper}>
        <View style={themedStyles.challengeNameBox}>
          <Text style = {themedStyles.challengeNameText}>{challengeName}</Text>
        </View>
        <View style={themedStyles.rankBox}>
          <Text style = {themedStyles.rankText}>{rank}</Text>
        </View>
    </View>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      marginTop: 6,
      flexDirection: 'row',
      height: 30,
    },
    challengeNameBox: {
        width: 100,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 35,
        backgroundColor: colors.lightGrey,
    },
    challengeNameText: {
        fontWeight:'bold',
        marginVertical: 5,
    },
    rankBox: {
        width: 40,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 30,
        backgroundColor: colors.lightRoyalBlue,
    },
    rankText: {   
        color: colors.white,
        fontWeight:'bold',     
        marginVertical: 5,
    },
  });
};
