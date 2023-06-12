import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FONTS } from "../consts";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Theme } from "../theme/types";
import { Button } from "../ui/Button";
import { HintCard } from "../ui/HintCard";
import { NavBar } from "../ui/NavBar";
import * as ImagePicker from "expo-image-picker";
import {
  useHintPurchaseMutation,
  useHintsByTreasureId,
  useTreasureById,
  useTreasureSubmission,
  useTreasureSubmissionByInteractionId,
  useUploadImageMutation,
} from "../react-query/hooks";
import { Loading } from "./Loading";
import * as Location from "expo-location";
import { getDefaultErrorMessage, showAlert } from "../utils/alert";
import { authorizedQueryClient } from "../react-query";
import { PATHS } from "../consts/paths";
import { AxiosError } from "axios";
import { useSetId } from "../recoil-store/auth/IdStoreHooks";
import { useSetAuth } from "../recoil-store/auth/AuthStoreHooks";
import { removeItem } from "../utils/storage";
import { TouchableOpacity } from "react-native";
import { ImageDownloader } from "../utils/ImageDownloader";
import { Camera } from "expo-camera";
import { Icon } from "../ui/Icon";
import { leftArrowPurple, leftArrowWhite } from "../icons";

export type statusType = "Accepted" | "Wrong" | "Not Solved";

export function InGamePage({ route }: any) {
  const { theme, currentTheme } = useTheme();
  const navigator = useNavigation<any>();
  const treasureId = route.params.treasureId;
  const interactionId = route.params.interactionId;

  const [fileName, setFileName] = useState("");
  const [formDataObject, setFormDataObject] = useState(undefined);

  const treasureById = useTreasureById(treasureId);
  const hints = useHintsByTreasureId(treasureId);
  const treasureSubmissions =
    useTreasureSubmissionByInteractionId(interactionId);
  const setId = useSetId();
  const setAuth = useSetAuth();
  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState("");

  const logout = async () => {
    setId(0);
    setAuth(false);
    await removeItem("access_token");
    await removeItem("remember_me");
  };
  const TreasureSubmissionMutation = useTreasureSubmission({
    onSuccess: async (res) => {
      console.log("Success.");
      authorizedQueryClient.refetchQueries([
        "TreasureSubmissionByInteractionId",
        interactionId,
      ]);
      setUploading(false);
    },
    onError: (err) => {
      const errFormated = err as AxiosError;
      setUploading(false);
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        logout();
      }
      showAlert("Treasure Submission is failed", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const submitTreasure = (latitude: number, longitude: number) => {
    TreasureSubmissionMutation.mutate({
      interactionId: interactionId,
      latitude: latitude,
      longitude: longitude,
      altitude: 1,
      imageName: fileName,
    });
  };

  const submitLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert("You should give permission");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.BestForNavigation,
        });
        submitTreasure(location.coords.latitude, location.coords.longitude);
      } catch (e) {
        showAlert("We could not find your location!");
      }
    })();
  };

  const HintPurchaseMutation = useHintPurchaseMutation({
    onSuccess: async (res) => {
      console.log("Success.");
      authorizedQueryClient.refetchQueries(["HintsByTreasureId", treasureId]);
    },
    onError: (err) => {
      const errFormated = err as AxiosError;
      const errorData = (errFormated.response?.data as any).error;
      if (errorData === "jwt expired" || errFormated.response?.status === 401) {
        logout();
      }
      showAlert("Purchase failed", {
        message: getDefaultErrorMessage(err) as any,
      });
    },
  });

  const purchaseHint = (hintId: number) => {
    HintPurchaseMutation.mutate({
      hintId: hintId,
    });
  };

  const uploadImageMutation = useUploadImageMutation({
    onSuccess: (res) => {
      console.log("IMAGE IS SUCCESSFULLY UPLOADED!");
      setFileName(res.data.fileName);
      submitLocation();
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
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        const result: any = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [3, 4],
          quality: 1,
        });

        if (result.cancelled) {
          showAlert("Image choose cancelled");
          return;
        }
        const uri: string = result.uri;
        const fileExtension = uri.slice(uri.lastIndexOf(".") + 1);

        setFormDataObject({
          name: `image.${fileExtension}`,
          uri: result.uri,
          type: "image/${fileExtension}",
        } as any);

        setImageUri(result.uri);
      } else {
        showAlert("Camera access denied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const executeUploadImageMutation = () => {
    setUploading(true);
    const formdata = new FormData();
    formdata.append("image", formDataObject);
    uploadImageMutation.mutate(formdata);
  };
  const [treasureImageUri, setTreasureImageUri] = useState("");

  if (
    treasureById.isFetching ||
    hints.isFetching ||
    treasureSubmissions.isFetching ||
    uploadImageMutation.isLoading ||
    HintPurchaseMutation.isLoading ||
    TreasureSubmissionMutation.isLoading ||
    uploading
  ) {
    return <Loading />;
  }

  const treasure = treasureById.treasure;
  const hardness =
    treasure.hardness[0].toUpperCase() +
    treasure.hardness.substring(1, treasure.hardness.length);

  const unlockedHints = hints.hints.filter((e) => e.isowned === true);
  const lockedHints = hints.hints.filter((e) => e.isowned === false);
  const treasureSubmits = treasureSubmissions.treasureSubmissions;
  const status: statusType =
    treasureSubmits.length === 0
      ? "Not Solved"
      : treasureSubmits[treasureSubmits.length - 1].isSuccess
      ? "Accepted"
      : "Wrong";

  const themedStyles = styles(theme, hardness, status);

  const imageName = treasure.photoLink;

  const goBack = () => {
    navigator.navigate(PATHS.HOME as never, {} as never);
  };
  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollViewStyle}>
        <View style={themedStyles.goBackBar}>
          <View style={themedStyles.goBackIcon}>
            <Icon
              xml={currentTheme === "light" ? leftArrowPurple : leftArrowWhite}
              width="40"
              height="40"
              onPress={goBack}
            ></Icon>
          </View>
        </View>
        <View style={themedStyles.wrapper}>
          {imageName !== null && (
            <ImageDownloader
              imageName={imageName as string}
              setState={(e: string) => setTreasureImageUri(e)}
            />
          )}
          <Text style={themedStyles.questionNameStyle}>
            {treasure.id.toString() + ". " + treasure.name}{" "}
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: theme.text.default.color,
            }}
          >
            {treasure.location.region.name}
          </Text>

          <Text style={themedStyles.hardness}>{hardness}</Text>
          <View style={{ width: "25%", marginBottom: 12 }}>
            <Button
              size="small"
              onPress={() => {
                navigator.navigate(PATHS.SHARE_TREASURE, {
                  treasureId: treasureId,
                  interactionId: interactionId,
                });
              }}
            >
              Share
            </Button>
          </View>

          <View>
            <Text style={themedStyles.directiveTextForPhotos}>
              Original Treasure Photo:
            </Text>
          </View>

          {imageName === null && (
            <Image
              source={require("../assets/images/BeeArea.png")}
              style={themedStyles.imageStyle}
            />
          )}

          {imageName !== null && treasureImageUri !== "" && (
            <Image
              source={{ uri: treasureImageUri }}
              style={themedStyles.imageStyle}
            />
          )}

          {imageName !== null && treasureImageUri === "" && <Loading />}

          <View style={{ marginTop: 35 }}>
            <Text style={themedStyles.directiveTextForPhotos}>
              Upload Your Treasure Photo:
            </Text>
          </View>

          <TouchableOpacity
            onPress={uploadImage}
            activeOpacity={0.9}
            style={{ marginTop: 12, marginBottom: 12 }}
          >
            {uploading ? (
              <Loading />
            ) : (
              <Image
                source={
                  imageUri === ""
                    ? require("../assets/images/PhotoPlaceholder.png")
                    : { uri: imageUri }
                }
                style={themedStyles.imageStyle}
              />
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              flex: 1,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={themedStyles.statusStyle}>Status: {status}</Text>
            <View
              style={{
                flex: 0.5,
                width: "100%",
                paddingRight: 24,
                alignItems: "flex-end",
                paddingLeft: 100,
                justifyContent: "center",
              }}
            >
              <Button
                size="xxlarge"
                onPress={executeUploadImageMutation}
                disabled={imageUri === ""}
              >
                SUBMIT
              </Button>
            </View>
          </View>
          <Text style={themedStyles.hint}>Hints</Text>
          <View style={{ marginBottom: 20 }}>
            {unlockedHints.map((e, index) => (
              <HintCard
                key={index}
                cost={e.cost.toString()}
                hintNumber={(index + 1).toString()}
                hintText={e.content as string}
                isLocked={false}
              />
            ))}
            {lockedHints.map((e, index) => (
              <>
                <HintCard
                  key={index}
                  cost={e.cost.toString()}
                  hintNumber={(index + 1).toString()}
                  hintText={e.content as string}
                  isLocked={true}
                  purchase={() => purchaseHint(e.id)}
                ></HintCard>
              </>
            ))}
          </View>
        </View>
      </ScrollView>
      <NavBar pageNo="3" />
    </SafeAreaView>
  );
}

const styles = (theme: Theme, hardness: string, status: statusType) => {
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
    wrapper: { marginLeft: 20 },
    questionNameStyle: {
      fontFamily: FONTS.PoppinsBold,
      fontSize: 35,
      color: theme.text.default.color,
      marginTop: 16,
    },
    hardness: {
      color:
        hardness === "Easy"
          ? colors.green
          : hardness === "Medium"
          ? colors.orange
          : colors.red,
      fontFamily: FONTS.PoppinsSemiBold,
      fontSize: 20,
    },
    hint: {
      fontFamily: FONTS.PoppinsBold,
      fontSize: 20,
      color: theme.text.default.color,
      marginTop: 8,
    },
    statusStyle: {
      width: "100%",
      color:
        status === "Accepted"
          ? colors.green
          : status === "Wrong"
          ? colors.red
          : colors.orange,
      fontFamily: FONTS.PoppinsBold,
      flex: 0.5,
      justifyContent: "flex-start",
      alignSelf: "center",
      alignItems: "center",
    },

    directiveTextForPhotos: {
      marginTop: 5,
      fontFamily: FONTS.PoppinsBold,
      fontSize: 20,
      color: theme.text.default.color,
    },
    imageStyle: {
      width: 300,
      height: 400,
      alignSelf: "center",
      marginRight: 20,
      marginTop: 4,
      borderRadius: 40,
    },
    goBackBar: {
      backgroundColor: theme.appBackground.backgroundColor,
      width: "100%",
      height: 28,
    },
    goBackIcon: {
      marginLeft: 15,
    },
  });
};
