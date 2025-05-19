import { Stack } from "expo-router";
import { Image } from "tamagui";
import { useAuth } from "@/src/provider/AuthProvider";
import { Dimensions } from "react-native";
import { Redirect } from "expo-router";
import { height } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { View } from "tamagui";

export default function StackLayout() {
    const { session } = useAuth();
      const { width } = Dimensions.get("window");
      const LogoWidth = width * 0.4;
     function LogoTitle() {
        return (
          <Image
            source={{ uri: 'https://i.postimg.cc/Y0tdPRY8/LOGO-COVV-Plan-de-travail-1-02-1.png' }}
            style={{ width: LogoWidth, height: 80, bottom: 10 }}
          />
        );
      }
  return (
    <Stack screenOptions={{
      gestureEnabled: true,  // Active le swipe-back
      gestureDirection: "horizontal",
      
    }}>
      <Stack.Screen 
        name="[id]" 
        options={{ 
            header: (props) =>
                (
                  <View height={120} backgroundColor={"white"} justifyContent="center">
                    <Image
                        source={{ uri: 'https://i.postimg.cc/Y0tdPRY8/LOGO-COVV-Plan-de-travail-1-02-1.png' }}
                        style={{ width: LogoWidth, height: 80, bottom: 10,alignSelf:'center',marginTop:35 }}
                    />
                  </View>
                ),
        }}
      />
    </Stack>
  );
}
