import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../theme";
import { View, Image, Text, Switch } from "react-native";

import { Theme } from "../theme/types";
import { FONTS } from "../consts";
import { Button } from "../ui/Button";
import { colors } from "../theme/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavBar } from "../ui/NavBar";
import { useRoute } from "@react-navigation/native";
import { Icon } from "../ui/Icon";
import { Achievement } from "../ui/Achievement";
import { FriendCard } from "../ui/FriendCard";
import { Input } from "../ui/Input";
import { useState } from "react";
import { TreasureCard } from "../ui/TreasureCard";

export function HomePage() {
  const { theme} = useTheme();
  const themedStyles = styles(theme);

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.wrapper}>
          <View style={themedStyles.searchBar}>
            <View style= {themedStyles.searchInput}><Input  size="medium" title="Search Treasure"/></View>
            <View style={themedStyles.searchButton}><Button size="xlarge">Search</Button></View>
          </View>
          <View style={themedStyles.treasures}>
            <TreasureCard id={"1"} name={"Bee Road"} zone={"Istanbul Technical University"} creator={"Alp Kartal"} difficulty={"Medium"}></TreasureCard>
            <TreasureCard id={"2"} name={"Dogs"} zone={"Istanbul Technical University"} creator={"Alp Kartal"} difficulty={"Easy"}></TreasureCard>
            
          </View>
        </View>
      </ScrollView>
      <NavBar pageNo="2" />
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
    wrapper: {
      marginTop: 50,
      marginHorizontal: 25,
    },
    searchBar: {
      flexDirection:'row',
    },
    searchInput: {
      borderRadius: 10,
      flex: 3,
    },
    searchButton: {
      marginLeft: 10,
      flex: 2,
    },
    treasures: {
      marginTop: 15,
    },
    
  });
};
