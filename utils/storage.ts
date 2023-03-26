import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (error) {
    console.error(error);
  }
};

export const getItem = async (key: string) => {
  try {
    const val = await AsyncStorage.getItem(`@${key}`);
    return val;
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (error) {
    console.error(error);
  }
};
