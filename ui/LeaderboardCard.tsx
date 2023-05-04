import { StyleSheet, Text, View } from "react-native";
import { Theme } from "../theme/types";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
interface LeaderboardCardProps {
  username: string;
  rank: number;
  timeText: string;
}

export function LeaderboardCard({
  username,
  rank,
  timeText,
}: LeaderboardCardProps) {
  const { theme } = useTheme();

  const themedStyles = styles(theme);

  return (
    <View style={themedStyles.wrapper}>
      <View
        style={{
          backgroundColor: colors.lightRoyalBlue,
          borderRadius: 8,
          height: 28,
          width: "10%",
          paddingHorizontal: 8,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.white, textAlign: "center" }}>{rank}</Text>
      </View>
      <View
        style={{
          backgroundColor: colors.lightRoyalBlue,
          borderRadius: 8,
          height: 28,
          justifyContent: "center",
          paddingHorizontal: 8,
          width: "50%",
          marginLeft: 4,
        }}
      >
        <Text style={{ color: colors.white, textAlign: "center" }}>
          {username}
        </Text>
      </View>
      <View
        style={{
          marginLeft: 4,
          backgroundColor: colors.lightRoyalBlue,
          borderRadius: 8,
          height: 28,
          justifyContent: "center",
          paddingHorizontal: 8,
          width: "40%",
        }}
      >
        <Text style={{ color: colors.white, textAlign: "center" }}>
          {timeText}
        </Text>
      </View>
    </View>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      marginTop: 4,
    },
  });
};
