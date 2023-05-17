import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "treasure-mobile",
  name: "Treasure",
  ios: {
    config: {
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    },
  },
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
      },
    },
    package: "com.itumasters.treasure",
  },
});
