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
import { useAllTreasures, useTreasureByPageId } from "../react-query/hooks";
import { Loading } from "./Loading";
import { Pagination } from "../ui/Pagination";
import { authorizedQueryClient } from "../react-query";
import { QUERY_KEYS } from "../react-query/queryKeys";
import { Treasure } from "../react-query/types";
import { StateSetter } from "../ui/StateSetter";

export function HomePage({ route }: any) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const bottomSheetController = useModal();
  const [selectedCategory, setSelectedCategory] = useState("MAP");
  const [selectedRegionId, setSelectedRegionId] = useState(7);
  const setNavbarOpen = useSetNavbarOpen();
  const navigator = useNavigation();
  const categories = ["ITU", "METU", "Boğaziçi", "Bilkent", "Koç"];
  const [foundTreasures, setFoundTreasures] = useState([] as Treasure[]);
  const [initializingFlag, setInitializingFlag] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  let { treasures, pageCount, isFetching } = useTreasureByPageId(
    currentPage,
    selectedRegionId !== -1 ? selectedRegionId : 7 //TODO: BURAYI DUZELTMEK LAZIM SIMDILIK DEFAULT REGIONA ITU ATIYORUM.
  );
  const name2 = route.params ?? route.params;
  useEffect(() => {
    setSelectedCategory(
      name2 !== undefined && name2.name !== undefined ? name2.name : "MAP"
    );
  }, [name2]);

  if (isFetching) {
    return <Loading />;
  }

  function searchTreasures(input: string) {
    let filteredTreasures = treasures.filter((element) => {
      return (
        element.name.slice(0, input.length).toLowerCase() == input.toLowerCase()
      );
    });
    if (filteredTreasures.length === 0) {
      filteredTreasures = treasures;
    }
    setFoundTreasures(filteredTreasures);
    setInitializingFlag(true);
  }

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <StateSetter setSpecificState={() => searchTreasures(searchedText)} />
        <View style={themedStyles.wrapper}>
          <View style={themedStyles.searchBar}>
            <View style={themedStyles.searchInput}>
              <Input
                size="medium"
                title="Search Treasure"
                value={searchedText}
                onChangeText={(text) => {
                  setSearchedText(text);
                  searchTreasures(text);
                }}
              />
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
            {(initializingFlag ? foundTreasures : treasures).map(
              (element, index) => (
                <TreasureCard
                  key={index + 1}
                  id={element.id.toString()}
                  name={element.name}
                  zone={element.location.region.name}
                  creator={"SIMDILIK FARUK"}
                  difficulty={element.hardness}
                  treasureId={element.id}
                />
              )
            )}
          </View>
          <View style={{ marginTop: 12, marginBottom: 40 }}>
            <Pagination
              currentPage={currentPage}
              maxPage={pageCount}
              backPage={() => {
                setCurrentPage(currentPage - 1);
                authorizedQueryClient.refetchQueries([
                  "treasureByPageId",
                  currentPage - 1,
                  selectedRegionId,
                ]);
                setInitializingFlag(false);
              }}
              nextPage={() => {
                setCurrentPage(currentPage + 1);
                authorizedQueryClient.refetchQueries([
                  "treasureByPageId",
                  currentPage + 1,
                  selectedRegionId,
                ]);
                setInitializingFlag(false);
              }}
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
