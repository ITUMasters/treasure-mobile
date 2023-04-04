import { Image, StyleSheet, Text, View } from "react-native";
import { Theme } from "../theme/types";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Button } from "./Button";
import { diff } from "react-native-reanimated";
import { useState } from "react";

interface HintCardProps {
  hintNumber: string;
  hintText: string;
  cost: string;
  isLocked: Boolean;
  purchase?: () => void;
}

export function HintCard({
  hintNumber,
  hintText,
  cost,
  isLocked,
  purchase,
}: HintCardProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  if (isLocked) {
    return (
      <View style={themedStyles.wrapper}>
        <Button
          onPress={() => {
            purchase !== undefined ? purchase() : null;
          }}
          size="large"
        >
          Pay {cost} gold to unlock Hint {hintNumber}
        </Button>
      </View>
    );
  }
  return (
    <View style={themedStyles.wrapper}>
      <Text style={themedStyles.hintHeader}>Hint {hintNumber}</Text>
      <View style={{ flexShrink: 1 }}>
        <Text style={{ color: colors.white }}>{hintText}</Text>
      </View>
    </View>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      marginRight: 20,
      padding: 10,
      backgroundColor: colors.lightRoyalBlue,
      flexDirection: "column",
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    hintHeader: {
      color: colors.white,
      fontWeight: "bold",
    },
  });
};
