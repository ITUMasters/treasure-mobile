import { Alert } from "react-native";

export const showAlert = (
  title: string,
  {
    message,
    cancellable = false,
  }: {
    message?: string;
    cancellable?: boolean;
  } = {
    message: undefined,
    cancellable: false,
  }
) => {
  const buttons: any[] = [{ text: "OK" }];

  if (cancellable) {
    buttons.unshift({
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    });
  }
  Alert.alert(title, message, buttons);
  return true;
};

export const getDefaultErrorMessage = (error: any): string | null => {
  const errors = error?.response?.data?.errors ?? error?.response?.data?.error;

  if (errors == null) {
    return null;
  }

  if (Array.isArray(errors)) {
    return errors[0].msg;
  } else {
    return errors;
  }
};
