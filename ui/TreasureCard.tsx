import { Image, StyleSheet, Text, View } from "react-native";
import { Theme } from "../theme/types";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Button } from "./Button";
import { diff } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";

interface TreasureCardProps {
  id: string;
  name: string;
  zone: string;
  creator: string;
  difficulty: string;
  treasureId: number;
}

export function TreasureCard({
  id,
  name,
  zone,
  creator,
  difficulty,
  treasureId,
}: TreasureCardProps) {
  const { theme, currentTheme } = useTheme();
  const themedStyles = styles(theme);

  var difficultyColor;
  if (difficulty == "easy") {
    difficultyColor = colors.green;
  } else if (difficulty == "medium") {
    difficultyColor = colors.orange;
  } else if (difficulty == "hard") {
    difficultyColor = colors.red;
  }
  difficulty =
    difficulty[0].toUpperCase() + difficulty.substring(1, difficulty.length);

  const navigator = useNavigation<any>();
  return (
    <View style={themedStyles.wrapper}>
      <Image
        source={require("../assets/images/BeeArea.png")}
        style={{ width: 75, height: 75, borderRadius: 10 }}
      />

      <View style={{ paddingLeft: 10, flex: 5 }}>
        <View style={{ flex: 3 }}>
          <Text
            style={{
              fontSize: 22,
              color: colors.white,
            }}
          >
            {id + "- " + name}
          </Text>
          <Text
            style={{
              marginTop: -3,
              color: difficultyColor,
              fontSize: 13,
            }}
          >
            {difficulty}
          </Text>
          <Text
            style={{
              marginTop: -3,
              color: colors.white,
              fontSize: 13,
            }}
          >
            {zone}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/alpImage.png")}
            style={themedStyles.image}
          />
          <Text
            style={{
              marginLeft: 5,
              color: colors.white,
            }}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {creator}
          </Text>
        </View>
      </View>
      <View style={themedStyles.buttonWrapper}>
        <Button
          size="large"
          onPress={() =>
            navigator.navigate(PATHS.PLAY, { treasureId: treasureId })
          }
        >
          GO
        </Button>
      </View>
    </View>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      padding: 10,
      backgroundColor: colors.lightRoyalBlue,
      flexDirection: "row",
      borderRadius: 10,
      marginTop: 10,
    },
    buttonWrapper: {
      flex: 2,
      justifyContent: "center",
    },
    image: {
      width: 25,
      height: 25,
      borderRadius: 90,
    },
  });
};
