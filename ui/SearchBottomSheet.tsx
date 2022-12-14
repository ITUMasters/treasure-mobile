import { ModalController } from '../hooks/useModal';
import { View } from 'react-native';

import { BottomSheet } from '../ui/BottomSheet';
import { Button } from './Button';
import { colors } from '../theme/colors';

type SearchBottomSheetProps = {
  categories: string[];
  selectedCategory: string;
  onPress: (e: string) => void;
  bottomSheetController: ModalController;
  onOpen: () => void;
  onClose: () => void;
};

function setCategory(onPress: (e: string) => void, category: string) {
  onPress(category);
}

export const SearchBottomSheet = ({
  categories,
  selectedCategory,
  onPress,
  bottomSheetController,
  onOpen,
  onClose,
}: SearchBottomSheetProps) => {
  return (
    <BottomSheet
      header="ZONES"
      onClose={onClose}
      controller={bottomSheetController}
      onOpen={onOpen}
    >
      <View
        style={{
          width: '100%',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            height: 75,
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            marginTop: 150,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((element) => (
            <View
              key={element}
              style={{ marginTop: 16, marginLeft: 10, marginRight: 10 }}
            >
              <Button
                size="large"
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => setCategory(onPress, element)}
              >
                {element}
              </Button>
            </View>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
};

