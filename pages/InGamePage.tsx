import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FONTS } from "../consts";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";
import { HintCard } from "../ui/HintCard";
import { NavBar } from "../ui/NavBar";
import {
  useHintPurchaseMutation,
  useHintsByTreasureId,
  useTreasureById,
  useUser,
} from "../react-query/hooks";
import { Loading } from "./Loading";
import * as Location from "expo-location";
import { getDefaultErrorMessage, showAlert } from "../utils/alert";
import { authorizedQueryClient } from "../react-query";

export function InGamePage({ route }: any) {
  const { theme } = useTheme();

  const treasureId = route.params.treasureId;
  const treasureById = useTreasureById(treasureId);
  const hints = useHintsByTreasureId(treasureId);
  const [location, setLocation] = useState("");

  const submitLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert("You should give permission");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.BestForNavigation,
        });
        setLocation(JSON.stringify(location));
      } catch (e) {
        showAlert("We could not find your location!");
      }
    })();
  };

  const HintPurchaseMutation = useHintPurchaseMutation({
    onSuccess: async (res) => {
      console.log("Success.");
      authorizedQueryClient.refetchQueries(["HintsByTreasureId", treasureId]);
    },
    onError: (err) => {
      showAlert("Purchase failed", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const purchaseHint = (hintId: number) => {
    HintPurchaseMutation.mutate({
      hintId: hintId,
    });
  };

  if (treasureById.isFetching || hints.isFetching) {
    return <Loading />;
  }

  const treasure = treasureById.treasure;
  const hardness =
    treasure.hardness[0].toUpperCase() +
    treasure.hardness.substring(1, treasure.hardness.length);

  const themedStyles = styles(theme, hardness, "Accepted");
  const unlockedHints = hints.hints.filter((e) => e.isowned === true);
  const lockedHints = hints.hints.filter((e) => e.isowned === false);

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <Text>{location}</Text>
        <Text style={themedStyles.questionNameStyle}>
          {treasure.id.toString() + ". " + treasure.name}{" "}
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontSize: 20,
            color: theme.text.default.color,
          }}
        >
          {treasure.location.region.name}
        </Text>
        <Text style={themedStyles.hardness}>{hardness}</Text>
        <Image
          style={{
            width: 300,
            height: 400,
            alignSelf: "center",
            marginRight: 20,
            marginTop: 4,
            borderRadius: 40,
          }}
          source={require("../assets/images/BeeArea.png")}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            flex: 1,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={themedStyles.statusStyle}>Status: Accepted</Text>
          <View
            style={{
              flex: 0.5,
              width: "100%",
              paddingRight: 24,
              alignItems: "flex-end",
              paddingLeft: 100,
              justifyContent: "center",
            }}
          >
            <Button size="xxlarge" onPress={submitLocation}>
              SUBMIT
            </Button>
          </View>
        </View>
        <Text style={themedStyles.hint}>Hints</Text>
        {unlockedHints.map((e, index) => (
          <HintCard
            key={index}
            cost={e.cost.toString()}
            hintNumber={(index + 1).toString()}
            hintText={e.content as string}
            isLocked={false}
          />
        ))}
        {lockedHints.map((e, index) => (
          <>
            <HintCard
              key={index}
              cost={e.cost.toString()}
              hintNumber={(index + 1).toString()}
              hintText={e.content as string}
              isLocked={true}
              purchase={() => purchaseHint(e.id)}
            ></HintCard>
          </>
        ))}
      </ScrollView>
      <NavBar pageNo="3" />
    </SafeAreaView>
  );
}

const styles = (theme: Theme, hardness: string, status: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.appBackground.backgroundColor,
    },
    scrollViewStyle: {
      width: "100%",
      flex: 1,
      marginLeft: 20,
      marginRight: 20,
      paddingRight: 20,
    },
    questionNameStyle: {
      fontFamily: FONTS.PoppinsBold,
      fontSize: 35,
      color: theme.text.default.color,
      marginTop: 16,
    },
    hardness: {
      color:
        hardness === "Easy"
          ? colors.green
          : hardness === "Medium"
          ? colors.orange
          : colors.red,
      fontFamily: FONTS.PoppinsSemiBold,
      fontSize: 20,
      marginTop: 4,
    },
    hint: {
      fontFamily: FONTS.PoppinsBold,
      fontSize: 20,
      color: theme.text.default.color,
      marginTop: 8,
    },
    statusStyle: {
      color: status === "Accepted" ? colors.green : colors.red,
      fontFamily: FONTS.PoppinsBold,
      flex: 0.5,
      justifyContent: "flex-start",
      alignSelf: "center",
      alignItems: "center",
    },
  });
};
