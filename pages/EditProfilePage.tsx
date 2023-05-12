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
import { addFriend, eyeOff, leftArrow } from "../icons/index";
import { getDefaultErrorMessage, showAlert } from "../utils/alert";
import { useState, useMemo } from "react";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import {
  useAccountChangeMutation,
  useUploadImageMutation,
  useUser,
} from "../react-query/hooks";
import { useId, useSetId } from "../recoil-store/auth/IdStoreHooks";
import { Loading } from "./Loading";
import { StateSetter } from "../ui/StateSetter";
import { authorizedQueryClient } from "../react-query";
import { AxiosError } from "axios";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { removeItem } from "../utils/storage";
import { ImageDownloader } from "../utils/ImageDownloader";
import { colors } from "../theme/colors";
import { Icon } from "../ui/Icon";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../consts/paths";

export function EditProfilePage() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const [uploading, setUploading] = useState(false);
  const userId = useId();
  const { user, isFetching } = useUser(userId);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const setId = useSetId();
  const setAuth = useSetAuth();

  const [imageName, setImageName] = useState("");

  const logout = async () => {
    setId(0);
    setAuth(false);
    await removeItem("access_token");
    await removeItem("remember_me");
  };

  const AccountChangeMutation = useAccountChangeMutation({
    onSuccess: async (res) => {
      authorizedQueryClient.refetchQueries(["user", user.id]);
      setUploading(false);
    },
    onError: (err) => {
      const errFormated = err as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        logout();
      }
      showAlert("Error message", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const changeAccount = () => {
    const fullnameParts = fullName.split(" ");
    const partCount = fullnameParts.length;

    AccountChangeMutation.mutate({
      surname: fullnameParts[partCount - 1],
      name: fullName.substring(
        0,
        fullName.length - fullnameParts[partCount - 1].length - 1
      ),
      username: username,
    });
  };

  const uploadImageMutation = useUploadImageMutation({
    onSuccess: (res) => {
      AccountChangeMutation.mutate({
        photo_link: res.data.fileName,
      });
    },
    onError: (error) => {
      const errFormated = error as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        logout();
      }
      if (error) {
        logout();
      }
    },
  });

  const uploadImage = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (result.cancelled) {
      showAlert("Image choose cancelled");
      return;
    }

    const uri: string = result.uri;

    const fileExtension = uri.slice(uri.lastIndexOf(".") + 1);

    const formdata = new FormData();

    formdata.append("image", {
      name: `image.${fileExtension}`,
      uri: result.uri,
      type: "image/${fileExtension}",
    } as any);

    setUploading(true);
    uploadImageMutation.mutate(formdata);
  };

  const isButtonDisabled = useMemo(() => {
    const c1 = username.trim() === "";
    const c2 = fullName.trim().split(/\s+/).length <= 1;
    const c3 = !/^[a-zA-Z]+$/.test(username);
    let c4 = false;
    let lastLetterIndex = -1;
    if (fullName.length > 0 && !fullName[0].match("^[a-zA-Z()]+$")) {
      c4 = true;
    }

    if (
      fullName.length > 0 &&
      !fullName[fullName.length - 1].match("^[a-zA-Z()]+$")
    ) {
      c4 = true;
    }
    for (let i = 0; i < fullName.length && !c4; i++) {
      if (!fullName[i].match("^[a-zA-Z()]+$") && lastLetterIndex !== i - 1) {
        c4 = true;
        break;
      }

      if (fullName[i].match("^[a-zA-Z()]+$")) {
        lastLetterIndex = i;
      }
    }

    return c1 || c2 || c3 || c4;
  }, [fullName, username]);

  if (
    isFetching ||
    AccountChangeMutation.isLoading ||
    uploadImageMutation.isLoading
  ) {
    return <Loading />;
  }

  const photoLink = user.photo_link;

  const navigator = useNavigation();
  const goBack = () => {
    navigator.navigate("Profile" as never, {} as never);
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.goBackBar}>
          <View style={themedStyles.goBackIcon}>
            <Icon
              xml={leftArrow}
              width="28"
              height="28"
              onPress={goBack}
            ></Icon>
          </View>
        </View>
        <StateSetter
          setSpecificState={() => {
            setFullName(user.name + " " + user.surname),
              setUsername(user.username);
          }}
        />
        {photoLink !== null && (
          <ImageDownloader
            imageName={photoLink}
            setState={(e) => setImageName(e)}
          />
        )}
        {!uploading && (photoLink === null || imageName !== "") && (
          <Image
            style={themedStyles.imageStyle}
            source={
              photoLink !== null
                ? { uri: imageName }
                : require("../assets/images/avatar.png")
            }
          ></Image>
        )}
        {uploading && photoLink !== null && imageName === "" && <Loading />}
        <View style={themedStyles.uploadPhoto}>
          <Button size="small" bending="high" onPress={uploadImage}>
            Upload Photo
          </Button>
        </View>
        <View style={themedStyles.nameInput}>
          <Input
            size="medium"
            title="Full Name"
            value={fullName}
            onChangeText={(e) => setFullName(e)}
          />
        </View>
        <View style={themedStyles.usernameInput}>
          <Input
            size="medium"
            title="Username"
            value={username}
            onChangeText={(e) => setUsername(e)}
          />
        </View>
        <View style={themedStyles.updateChangesButton}>
          <Button
            size="small"
            disabled={isButtonDisabled}
            onPress={changeAccount}
          >
            Update Changes
          </Button>
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
    goBackBar: {
      backgroundColor: colors.lightRoyalBlue,
      width: "100%",
      height: 28,
    },
    goBackIcon: {
      marginLeft: 15,
    },
  });
};
