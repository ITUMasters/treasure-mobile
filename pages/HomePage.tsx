import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../theme";
import { View, Image, Text, Switch } from "react-native";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";
import { NavBar } from "../ui/NavBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Input } from "../ui/Input";
import { useState } from "react";
import { TreasureCard } from "../ui/TreasureCard";
import { useModal } from "../hooks/useModal";
import { SearchBottomSheet } from "../ui/SearchBottomSheet";
import { useSetNavbarOpen } from "../recoil-store/navbar/NavbarStoreHooks";
import { useEffect } from "react";
import { PATHS } from "../consts/paths";
import { useAllTreasures } from "../react-query/hooks";
import { Loading } from "./Loading";
import { Pagination } from "../ui/Pagination";

export function HomePage({ route }: any) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const bottomSheetController = useModal();
  const [selectedCategory, setSelectedCategory] = useState("MAP");
  const setNavbarOpen = useSetNavbarOpen();
  const navigator = useNavigation();
  const categories = ["ITU", "METU", "Boğaziçi", "Bilkent", "Koç"];
  const { treasures, isFetching } = useAllTreasures();
  const [currentPage, setCurrentPage] = useState(1);

  const name2 = route.params ?? route.params;
  useEffect(() => {
    setSelectedCategory(
      name2 !== undefined && name2.name !== undefined ? name2.name : "MAP"
    );
  }, [name2]);

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

  if (isFetching) {
    return <Loading />;
  }
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
                onPress={() => navigator.navigate(PATHS.MAPS as never)}
                size="xlarge"
              >
                {selectedCategory}
              </Button>
            </View>
          </View>
          <View style={themedStyles.treasures}>
            {/*mockTreasureCards
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
              ))*/}
            {treasures.map((element, index) => (
              <TreasureCard
                key={index + 1}
                id={(index + 1).toString()}
                name={"Isim Olayi gelecek"}
                zone={"SIMDILIK ITU"}
                creator={"SIMDILIK FARUK"}
                difficulty={element.hardness}
                treasureId={element.id}
              />
            ))}
          </View>
          <View style={{ marginTop: 12, marginBottom: 40 }}>
            <Pagination
              currentPage={currentPage}
              maxPage={12}
              backPage={() => setCurrentPage(currentPage - 1)}
              nextPage={() => setCurrentPage(currentPage + 1)}
            />
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
