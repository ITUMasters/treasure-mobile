import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../theme";
import { View, Image, Text, Switch, TouchableOpacity } from "react-native";

import { Theme } from "../theme/types";
import { FONTS } from "../consts";
import { Button } from "../ui/Button";
import { colors } from "../theme/colors";
import { NavBar } from "../ui/NavBar";

import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";

import { Achievement } from "../ui/Achievement";
import { FriendCard } from "../ui/FriendCard";
import { useId, useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { getItem, removeItem } from "../utils/storage";
import { useUser } from "../react-query/hooks";
import { Loading } from "./Loading";
import { useState } from "react";
import { usePagination } from "../context/PaginationContext";
import { ImageDownloader } from "../utils/ImageDownloader";
import { addFriend } from "../icons";
import { Input } from "../ui/Input";

export function ProfilePage() {
  const { theme, toggle: toggleTheme, currentTheme } = useTheme();
  const { pagination, toggle: togglePagination } = usePagination();

  const themedStyles = styles(theme);
  const navigator = useNavigation();
  const setId = useSetId();
  const setAuth = useSetAuth();
  const userId = useId();
  const { user, isFetching } = useUser(userId);

  const logout = async () => {
    setId(0);
    setAuth(false);
    await removeItem("access_token");
    await removeItem("remember_me");
  };
  const [imageName, setImageName] = useState("");

  if (isFetching) {
    return <Loading />;
  }
  const photoLink = user.photo_link;

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        {photoLink !== null && (
          <ImageDownloader
            imageName={photoLink}
            setState={(e) => setImageName(e)}
          />
        )}

        <View style={themedStyles.topPart}>
          <View style={themedStyles.imageViewStyle}>
            {(photoLink === null || imageName !== "") && (
              <Image
                style={themedStyles.imageStyle}
                source={
                  photoLink !== null
                    ? { uri: imageName }
                    : require("../assets/images/avatar.png")
                }
              ></Image>
            )}
            {photoLink !== null && imageName == "" && <Loading />}
          </View>
          <View style={themedStyles.middleTopPart}>
            <Text style={themedStyles.name}>
              {user.name + " " + user.surname}
            </Text>
            <Text style={themedStyles.username}>{user.username}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigator.navigate(PATHS.FINISHED_TREASURES as never)
                }
              >
                <Image
                  style={themedStyles.mapImageStyle}
                  source={require("../assets/images/map.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "column", flex: 0.2 }}>
            <View style={themedStyles.gold}>
              <Text style={themedStyles.goldAmount}>{user.coin}</Text>
              <Image
                source={require("../assets/images/coin.png")}
                style={themedStyles.goldImage}
              ></Image>
            </View>
            <View
              style={{
                marginRight: 12,
              }}
            >
              <Button size="small" onPress={logout}>
                Logout
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <Switch
            style={{ marginLeft: 5 }}
            onValueChange={toggleTheme}
            value={currentTheme === "dark"}
            trackColor={{ false: "#767577", true: colors.blue }}
            thumbColor={colors.white}
          ></Switch>
          <Text
            style={{
              color: theme.text.default.color,
              fontFamily: FONTS.PoppinsMedium,
            }}
          >
            Dark Mode
          </Text>
          <Switch
            style={{ marginLeft: 5 }}
            onValueChange={togglePagination}
            value={pagination}
            trackColor={{ false: "#767577", true: colors.blue }}
            thumbColor={colors.white}
          ></Switch>
          <Text
            style={{
              color: theme.text.default.color,
              fontFamily: FONTS.PoppinsMedium,
            }}
          >
            Pagination
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            marginLeft: 20,
            flex: 1,
            alignSelf: "center",
          }}
        >
          <View style={{ width: "35%" }}>
            <View style={{ width: "100%" }}>
              <Button
                size="small"
                bending="high"
                onPress={() => {
                  navigator.navigate(PATHS.EDIT_PROFILE as never);
                }}
              >
                Edit Profile
              </Button>
            </View>
          </View>
        </View>

        <View style={themedStyles.addFriend}>
          <View style={themedStyles.addFriendInput}>
            <Input size="medium" title="Friend Name" />
          </View>
          <View style={themedStyles.addFriendButton}>
            <Button size="medium" iconAtTheRight={addFriend}>
              Add Friend
            </Button>
          </View>
        </View>
        <View style={themedStyles.friendsWrapper}>
          <View style={themedStyles.achievementsWrapper}>
            <View style={themedStyles.achivementsHead}>
              <Text style={themedStyles.achievementText}>Friends</Text>
            </View>
            <View style={themedStyles.achievementsBody}>
              <FriendCard name="Punisher"></FriendCard>
              <FriendCard name="Warchere"></FriendCard>
              <FriendCard name="MkaanTheKing"></FriendCard>
            </View>
          </View>
        </View>
      </ScrollView>
      <NavBar pageNo="0" />
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
    topPart: {
      flex: 1,
      marginLeft: 24,
      marginTop: 32,
      flexDirection: "row",
    },
    imageStyle: {
      width: 96,
      height: 96,
      borderRadius: 60,
      alignSelf: "center",
    },
    imageViewStyle: {
      flex: 0.35,
      justifyContent: "center",
    },
    middleTopPart: {
      flex: 0.45,
      marginLeft: 24,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    mapImageStyle: {
      width: 32,
      height: 32,
    },
    name: {
      color: theme.text.default.color,
      fontFamily: FONTS.PoppinsBold,
      fontSize: 16,
    },
    username: {
      color: theme.text.default.color,
      fontFamily: FONTS.PoppinsBold,
      fontSize: 13,
    },
    gold: {
      flex: 0.2,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
      marginRight: 16,
    },
    goldAmount: {
      color: theme.text.default.color,
      marginRight: 4,
      fontSize: 18,
      justifyContent: "center",
    },
    goldImage: {
      width: 24,
      height: 24,
    },

    achievementsWrapper: {
      flex: 1,
    },
    achivementsHead: {
      justifyContent: "center",
      flexDirection: "row",
    },
    achievementsTitle: {
      flex: 1,
    },
    achievementText: {
      color: theme.text.default.color,
      fontWeight: "bold",
      fontSize: 24,
      justifyContent: "center",
    },
    trophy: {
      marginTop: 2.5,
      marginLeft: 17.5,
      width: 24,
      height: 24,
    },
    achievementsBody: {
      justifyContent: "center",
    },
    friendsWrapper: {
      flex: 1,
      marginTop: 16,
      marginBottom: 32,
    },
    addFriendButton: {
      flex: 0.35,
      alignSelf: "center",
    },
    addFriend: {
      flexDirection: "row",
      width: "100%",
      marginTop: 40,
      flex: 1,
      paddingLeft: "4%",
      paddingRight: "4%",
    },
    addFriendInput: {
      flex: 0.65,
      marginRight: "3%",
    },
  });
};
