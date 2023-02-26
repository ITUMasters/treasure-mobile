import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../theme";
import { View, Image, Text, Switch } from "react-native";

import { Theme } from "../theme/types";
import { FONTS } from "../consts";
import { Button } from "../ui/Button";
import { colors } from "../theme/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavBar } from "../ui/NavBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "../ui/Icon";
import { Achievement } from "../ui/Achievement";
import { FriendCard } from "../ui/FriendCard";
import { Input } from "../ui/Input";
import { useState } from "react";
import { TreasureCard } from "../ui/TreasureCard";
import { useModal } from "../hooks/useModal";
import { SearchBottomSheet } from "../ui/SearchBottomSheet";
import { useSetNavbarOpen } from "../recoil-store/navbar/NavbarStoreHooks";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";

export function HomePage({ route }: any) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const bottomSheetController = useModal();
  const [selectedCategory, setSelectedCategory] = useState("MAP");
  const setNavbarOpen = useSetNavbarOpen();
  const navigator = useNavigation();
  const categories = ["ITU", "METU", "Boğaziçi", "Bilkent", "Koç"];

  const { name } = route.params;
  useEffect(() => {
    setSelectedCategory(name !== undefined ? name : "MAP");
  }, [name]);

  const mockTreasureCards = [
    {
      id: "1",
      name: "Bee Road",
      zone: "ITU",
      creator: "Alp Kartal",
      difficulty: "Medium",
    },
    {
      id: "2",
      name: "Dogs",
      zone: "ITU",
      creator: "Alp Kartal",
      difficulty: "Easy",
    },
    {
      id: "3",
      name: "SecretPlace",
      zone: "METU",
      creator: "Faruk",
      difficulty: "Hard",
    },
  ];
  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.wrapper}>
          <View style={themedStyles.searchBar}>
            <View style={themedStyles.searchInput}>
              <Input size="medium" title="Search Treasure" />
            </View>
            <View style={themedStyles.searchButton}>
              <Button
                onPress={() => navigator.navigate("MAPS" as never, {} as never)}
                size="xlarge"
              >
                {selectedCategory}
              </Button>
            </View>
          </View>
          <View style={themedStyles.treasures}>
            {mockTreasureCards
              .filter(
                (element) =>
                  element.zone === selectedCategory ||
                  selectedCategory === "MAP"
              )
              .map((element) => (
                <TreasureCard
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  zone={element.zone}
                  creator={element.creator}
                  difficulty={element.difficulty}
                />
              ))}
          </View>
        </View>
      </ScrollView>

      <SearchBottomSheet
        categories={categories}
        selectedCategory={selectedCategory}
        onPress={(e) => setSelectedCategory(e)}
        bottomSheetController={bottomSheetController}
        onClose={() => setNavbarOpen(true)}
        onOpen={() => setNavbarOpen(false)}
      />

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
      flexDirection: "row",
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
