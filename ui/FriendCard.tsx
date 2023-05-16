import { Image, StyleSheet, Text, View } from "react-native";
import { Theme } from "../theme/types";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";

interface FriendCardProps {
  name: string;
}

export function FriendCard({ name }: FriendCardProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  return (
    <View style={themedStyles.wrapper}>
      <View style={themedStyles.box}>
        <View style={themedStyles.nameWrapper}>
          <Text style={themedStyles.name}>{name}</Text>
        </View>

        <View style={themedStyles.photoWrapper}>
          <Image
            style={themedStyles.photo}
            source={require("../assets/images/avatar.png")}
          ></Image>
        </View>
      </View>
    </View>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      alignItems: "center",
      marginTop: 1,
    },
    box: {
      justifyContent: "center",
      marginTop: 5,
      flexDirection: "row",
      height: 30,
      borderRadius: 10,
      width: 250,
      backgroundColor: colors.lightGrey,
    },
    nameWrapper: {
      alignItems: "center",
      flex: 3,
    },

    name: {
      fontWeight: "bold",
      paddingLeft: 60,
      marginVertical: 5,
    },
    photoWrapper: {
      justifyContent: "flex-end",
      flex: 1,
    },
    photo: {
      marginVertical: 2,
      marginLeft: 10,
      width: 24,
      height: 24,
      borderRadius: 12,
    },
  });
};
