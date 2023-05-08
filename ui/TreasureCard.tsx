import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Theme } from "../theme/types";
import { useState, useEffect } from "react";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Button } from "./Button";
import { diff } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";
import { Icon } from "./Icon";
import { standing } from "../icons";
import { ImageDownloader } from "../utils/ImageDownloader";

interface TreasureCardProps {
  id: string;
  name: string;
  zone: string;
  creator: string;
  difficulty: string;
  treasureId: number;
  joinTreasure: () => void;
  isWeekly: boolean;
  photoLink: null | string;
  gift: number;
}

export function TreasureCard({
  id,
  name,
  zone,
  creator,
  difficulty,
  treasureId,
  joinTreasure,
  isWeekly,
  photoLink,
  gift,
}: TreasureCardProps) {
  const { theme, currentTheme } = useTheme();
  const themedStyles = styles(theme, isWeekly);

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

  const [treasureImageUri, setTreasureImageUri] = useState("");
  const navigator = useNavigation<any>();

  if (treasureImageUri === "") {
    return (
      <View>
        <ActivityIndicator style={themedStyles.wrapper} />
        <ImageDownloader
          imageName={photoLink as string}
          setState={(e: string) => setTreasureImageUri(e)}
        />
      </View>
    );
  }
  return (
    <View style={themedStyles.wrapper}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {treasureImageUri === "" ? (
          <ActivityIndicator
            style={{ width: 75, height: 75, borderRadius: 10 }}
          />
        ) : (
          <Image
            source={{ uri: treasureImageUri }}
            style={{ width: 75, height: 75, borderRadius: 10 }}
          />
        )}
      </View>

      <View style={{ paddingLeft: 10, flex: 5 }}>
        <View style={{ flex: 3 }}>
          {isWeekly && (
            <Text
              style={{
                fontSize: 22,
                color: colors.goldenYellow,
                marginBottom: 4,
                fontWeight: "500",
              }}
            >
              Weekly Challange
            </Text>
          )}
          <Text
            style={{
              fontSize: isWeekly ? 18 : 22,
              color: colors.white,
            }}
          >
            {"#" + id + " " + name}
          </Text>
          <Text
            style={{
              marginTop: 2,
              color: difficultyColor,
              fontSize: 13,
            }}
          >
            {difficulty}
          </Text>
          <Text
            style={{
              marginTop: 2,
              color: colors.white,
              fontSize: 13,
            }}
          >
            {zone}
          </Text>
          {isWeekly && (
            <Text style={{ color: colors.white }}>
              Remaining time: 3d, 2h, 10m
            </Text>
          )}
        </View>
      </View>
      <View style={themedStyles.buttonWrapper}>
        <View style={{ flexDirection: "column" }}>
          <Button
            size="large"
            onPress={joinTreasure}
            anotherBgColor={isWeekly ? colors.goldenYellow : undefined}
            anotherTextColor={isWeekly ? colors.challengeColor : undefined}
          >
            GO
          </Button>
          {isWeekly && (
            <View
              style={{
                marginTop: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                xml={standing}
                color={colors.goldenYellow}
                onPress={() =>
                  navigator.navigate(PATHS.LEADERBOARD, {
                    treasureId: treasureId, //"DUZELT: NORMALDE BURAYA treasureId: treasureId" demen lazim!!!!
                  })
                }
              />
            </View>
          )}
          <View style={themedStyles.goldPart}>
            <Text style={{ color: colors.white }}>{gift}</Text>
            <Image
              style={themedStyles.goldImage}
              source={require("../assets/images/coin.png")}
            ></Image>
            {isWeekly && (
              <Image
                style={themedStyles.x2Image}
                source={require("../assets/images/iconx2.png")}
              ></Image>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = (theme: Theme, isWeekly: undefined | boolean) => {
  return StyleSheet.create({
    wrapper: {
      padding: 10,
      backgroundColor: isWeekly ? colors.challengeColor : colors.lightRoyalBlue,
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
    goldImage: {
      width: 12,
      height: 12,
      marginLeft: 4,
    },
    goldPart: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
    },
    x2Image: {
      width: 30,
      height: 30,
      marginLeft: 4,
    },
  });
};
