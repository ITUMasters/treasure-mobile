import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import { NavBar } from "../ui/NavBar";
import { useLeaderboard } from "../react-query/hooks";
import { Loading } from "./Loading";
import { LeaderboardCard } from "../ui/LeaderboardCard";

const adjustTime = (time: number) => {
  const day = Math.floor(time / (24 * 60 * 60));
  time -= day * (24 * 60 * 60);
  const hour = Math.floor(time / (60 * 60));
  time -= hour * 60 * 60;
  const minute = Math.floor(time / 60);
  time -= minute * 60;
  const second = Math.floor(time);
  return (
    (day > 0 ? day.toString() + "d " : "") +
    (hour > 0 ? hour.toString() + "h " : "") +
    (minute > 0 ? minute.toString() + "m " : "") +
    (second > 0 ? second.toString() + "s" : "")
  );
};

const compare = (a: any, b: any) => {
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  return 0;
};

export function LeaderboardPage({ route }: any) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const treasureId = route.params.treasureId;
  const { leaderboard, isFetching } = useLeaderboard(treasureId);

  if (isFetching) {
    return <Loading />;
  }

  const leaderboardReal = leaderboard.leaderboard;
  leaderboardReal.sort((a: any, b: any) => compare(a, b));
  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <Text style={themedStyles.titleStyle}>
          {"Leaderboard of " +
            treasureId.toString() +
            "." +
            leaderboard.treasure.name}
        </Text>
        <View style={themedStyles.leaderboardCard}>
          {leaderboardReal.map((element: any, index: number) => (
            <LeaderboardCard
              key={index}
              username={element.user.username}
              rank={element.rank}
              timeText={adjustTime(element.time)}
            />
          ))}
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
      width: "100%",
      backgroundColor: theme.appBackground.backgroundColor,
    },
    scrollViewStyle: {
      width: "100%",
      flex: 1,
    },
    qr: {
      flex: 200,
      justifyContent: "center",
      alignItems: "center",
    },
    leaderboardCard: {
      paddingHorizontal: "8%",
      marginTop: 20,
    },
    titleStyle: {
      color: theme.text.default.color,
      textAlign: "center",
      marginTop: 12,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
};
