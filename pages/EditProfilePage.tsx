import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../theme";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { NavBar } from "../ui/NavBar";
import { addFriend } from "../icons/index";

export function EditProfilePage() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <Image
          style={themedStyles.imageStyle}
          source={require("../assets/images/alpImage.png")}
        ></Image>
        <View style={themedStyles.uploadPhoto}>
          <Button size="small" bending="high">
            Upload Photo
          </Button>
        </View>
        <View style={themedStyles.nameInput}>
          <Input size="medium" title="Name" />
        </View>
        <View style={themedStyles.usernameInput}>
          <Input size="medium" title="Username" />
        </View>
        <View style={themedStyles.updateChangesButton}>
          <Button size="small">Update Changes</Button>
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
    imageStyle: {
      width: 96,
      height: 96,
      borderRadius: 60,
      marginTop: 42,
      alignSelf: "center",
    },
    uploadPhoto: {
      marginTop: 16,
      width: "100%",
      paddingLeft: "35%",
      paddingRight: "35%",
      alignItems: "center",
    },
    nameInput: {
      paddingLeft: "20%",
      paddingRight: "20%",
      marginTop: 48,
    },
    usernameInput: {
      paddingLeft: "20%",
      paddingRight: "20%",
      marginTop: 16,
    },
    updateChangesButton: {
      marginTop: 16,
      paddingLeft: "30%",
      paddingRight: "30%",
      alignItems: "center",
    },
    addFriend: {
      flexDirection: "row",
      width: "100%",
      marginTop: 32,
      flex: 1,
      paddingLeft: "4%",
      paddingRight: "4%",
    },
    addFriendInput: {
      flex: 0.65,
      marginRight: "3%",
    },
    addFriendButton: {
      flex: 0.35,
      alignSelf: "center",
    },
  });
};
