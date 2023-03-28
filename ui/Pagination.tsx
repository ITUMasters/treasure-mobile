import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Theme } from "../theme/types";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Icon } from "./Icon";
import { leftArrow, rightArrow } from "../icons";

type PaginationProps = {
  currentPage: number;
  maxPage: number;
  backPage: () => void;
  nextPage: () => void;
};

export const Pagination = ({
  currentPage,
  maxPage,
  backPage,
  nextPage,
}: PaginationProps) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  return (
    <View style={themedStyles.container}>
      {currentPage !== 1 && (
        <TouchableOpacity
          style={themedStyles.paginationComponent}
          onPress={backPage}
          activeOpacity={1}
        >
          <Icon xml={leftArrow} width="16" height="16" color={colors.white} />
        </TouchableOpacity>
      )}
      <View
        style={{
          marginLeft: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={themedStyles.paginationComponent}>
          <Text style={{ fontSize: 20, color: colors.white }}>
            {currentPage}
          </Text>
        </View>
      </View>
      {currentPage !== maxPage && (
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={nextPage}
          activeOpacity={1}
        >
          <View style={themedStyles.paginationComponent}>
            <Icon
              xml={rightArrow}
              width="16"
              height="16"
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      flex: 1,
    },
    paginationComponent: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: 40,
      height: 40,
      backgroundColor: theme.pagination.bg,
    },
  });
};
