import { Image, StyleSheet, Text, View } from 'react-native';
import { Theme } from "../theme/types";
import { useTheme } from "../theme";
import { colors } from "../theme/colors";
import { Button } from './Button';
import { diff } from 'react-native-reanimated';

interface TreasureCardProps {
  id: string;
  name: string,
  zone: string,
  creator: string,
  difficulty: string,
}

export function TreasureCard({ id, name , zone, creator , difficulty }: TreasureCardProps) {
  const { theme, currentTheme } = useTheme();
  const themedStyles = styles(theme);

  var difficultyColor;
  if (difficulty == "Easy") {
    difficultyColor = colors.green
  }
  else if (difficulty == "Medium") {
    difficultyColor = colors.orange
  }
  else if (difficulty == "Hard") {
    difficultyColor = colors.red
  }

  

  return (
    <View style={themedStyles.wrapper}>
   
      <Image
        source={require('../assets/images/BeeArea.png')}
        style={{ width: 75, height: 75, borderRadius: 10}}
      />
    

    <View style={{ paddingLeft: 10, flex: 5 }}>
      <View style={{ flex: 3 }}>
        <Text
          style={{
            fontSize: 22,
            color: colors.white,
          }}
        >
          {id + "- " + name}
        </Text>
        <Text
          style={{
            marginTop: -3,
            color: difficultyColor,
            fontSize: 13,
          }}
        >
          {difficulty}
        </Text>
        <Text
          style={{
            marginTop: -3,
            color: colors.white,
            fontSize: 13,
          }}
        >
          {zone}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/images/alpImage.png')}
          style={themedStyles.image}
        />
        <Text
          style={{
            marginLeft: 5,
            color: colors.white,
          }}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {creator}
        </Text>
      </View>
    </View>
    <View style={themedStyles.buttonWrapper}>
      <Button size="large">GO</Button>
    </View>
  </View>
        
    
  );
}

const styles = (theme: Theme) => {
    return StyleSheet.create({
        wrapper: {
            padding: 10,
            backgroundColor: colors.lightRoyalBlue,
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 10,
          },
          buttonWrapper: {
            flex: 2,
            justifyContent: 'center',
          },
          image: {
            width: 25,
            height: 25,
            borderRadius: 90,
          },
      
    });
  };
