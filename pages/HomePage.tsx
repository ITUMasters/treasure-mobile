import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
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
import {
  useAllTreasures,
  useInfiniteTreasureByPageId,
  useJoinMutation,
  useTreasureByPageId,
} from "../react-query/hooks";
import { Loading } from "./Loading";
import { Pagination } from "../ui/Pagination";
import { authorizedQueryClient } from "../react-query";
import { QUERY_KEYS } from "../react-query/queryKeys";
import { Treasure } from "../react-query/types";
import { StateSetter } from "../ui/StateSetter";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { getDefaultErrorMessage, showAlert } from "../utils/alert";
import { usePagination } from "../context/PaginationContext";
import { FlatList } from "react-native-gesture-handler";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { removeItem } from "../utils/storage";

export function HomePage({ route }: any) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const bottomSheetController = useModal();
  const [selectedCategory, setSelectedCategory] = useState("MAP");
  const [selectedRegionId, setSelectedRegionId] = useState(-1);
  const setNavbarOpen = useSetNavbarOpen();
  const navigator = useNavigation();
  const categories = ["ITU", "METU", "Boğaziçi", "Bilkent", "Koç"];
  const [foundTreasures, setFoundTreasures] = useState([] as Treasure[]);
  const [initializingFlag, setInitializingFlag] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const { pagination, toggle: togglePagination } = usePagination();

  const setId = useSetId();
  const setAuth = useSetAuth();

  const logout = async () => {
    setId(0);
    setAuth(false);
    await removeItem("access_token");
    await removeItem("remember_me");
  };

  const name2 = route.params ?? route.params;
  useEffect(() => {
    setSelectedCategory(
      name2 !== undefined && name2.name !== undefined ? name2.name : "MAP"
    );
    setSelectedRegionId(
      name2 !== undefined && name2.regionId !== undefined ? name2.regionId : -1
    );
  }, [name2]);

  let { treasures, pageCount, isFetching, isLoading } = useTreasureByPageId(
    currentPage,
    selectedRegionId !== -1 ? selectedRegionId : null
  );

  const JoinMutation = useJoinMutation({
    onSuccess: async (res) => {
      navigator.navigate(
        PATHS.PLAY as never,
        {
          treasureId: res.data.treasureId,
          interactionId: res.data.id,
        } as never
      );
    },
    onError: (err) => {
      const errFormated = err as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        logout();
      }
      showAlert("Join Error", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const join = (treasureId: number) => {
    JoinMutation.mutate({
      treasureId: treasureId,
    });
  };

  const {
    isFetching: isFetchingInfinite,
    isLoading: isLoadingInfinite,
    treasures: treasuresInfinite,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteTreasureByPageId(
    currentPage,
    selectedRegionId !== -1 ? selectedRegionId : null
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading || isLoadingInfinite) {
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
      setInitializingFlag(false);
      return;
    }
    setFoundTreasures(filteredTreasures);
    setInitializingFlag(true);
  }
  function renderTreasure(treasure: Treasure, index: any) {
    return (
      <TreasureCard
        key={index}
        id={treasure.id.toString()}
        name={treasure.name}
        zone={treasure.location.region.name}
        creator={"SIMDILIK FARUK"}
        difficulty={treasure.hardness}
        treasureId={treasure.id}
        joinTreasure={() => join(treasure.id)}
        isWeekly={index === 0}
      />
    );
  }

  let mockWeeklyChallenge = treasures[0]; //TODO: bunu farkli endpointten alacagim.
  mockWeeklyChallenge.id = -5;
  return (
    <SafeAreaView style={themedStyles.container}>
      {pagination && (
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
            <View style={{ marginTop: 15 }}>
              <TreasureCard
                id={mockWeeklyChallenge.id.toString()}
                name={mockWeeklyChallenge.name}
                zone={mockWeeklyChallenge.location.region.name}
                creator={"SIMDILIK FARUK"}
                difficulty={mockWeeklyChallenge.hardness}
                treasureId={mockWeeklyChallenge.id}
                joinTreasure={() => join(mockWeeklyChallenge.id)}
                isWeekly={true}
              />
            </View>

            {!initializingFlag && (
              <View>
                <Text style={themedStyles.notFound}>NOT FOUND!</Text>
                <Text style={themedStyles.allIsReturned}>
                  SHOWING ALL TREASURES
                </Text>
              </View>
            )}
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
                    joinTreasure={() => join(element.id)}
                    isWeekly={false}
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
      )}
      {!pagination && (
        <View style={themedStyles.scrollViewStyle}>
          <FlatList
            style={themedStyles.wrapper}
            data={[mockWeeklyChallenge, ...treasuresInfinite]}
            renderItem={({ item, index }) => {
              return renderTreasure(item, index);
            }}
            onEndReached={loadMore}
            ListFooterComponent={
              isFetchingNextPage
                ? () => (
                    <ActivityIndicator
                      style={{ marginTop: 10 }}
                      size={"large"}
                    />
                  )
                : null
            }
          />
        </View>
      )}
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
      marginHorizontal: 25,
    },
    searchBar: {
      marginTop: 50,
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
      marginTop: 0,
    },
    notFound: {
      color: theme.input.textColor,
      alignSelf: "center",
      marginTop: 15,
      fontSize: 20,
    },
    allIsReturned: {
      color: theme.input.textColor,
      alignSelf: "center",
      fontSize: 20,
    },
  });
};
