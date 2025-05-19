import { Tabs } from "expo-router";
import { Image, Dimensions } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap, faHome, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect } from "expo-router";

export default function TabLayout() {
  const { session } = useAuth();
  if (!session) {
    return <Redirect href={'/(auth)/sign-in'} />;
  }

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
    <Tabs screenOptions={{ headerStyle: { height: 120 } }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitle: () => <LogoTitle />,
          tabBarIcon: () => <FontAwesomeIcon icon={faHome} size={18} />,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "grey",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          headerShadowVisible: false,
          headerTitle: () => <LogoTitle />,
          tabBarIcon: () => <FontAwesomeIcon icon={faStar} size={18} />,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "grey",
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: LogoTitle,
          tabBarIcon: () => <FontAwesomeIcon icon={faMap} size={18} />,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "grey",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: LogoTitle,
          tabBarIcon: () => <FontAwesomeIcon icon={faUser} size={18} />,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "grey",
        }}
      />
      <Tabs.Screen
        name="editAccount"
        options={{
            href:null,
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: LogoTitle,
            tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="ProposeNousTonBar"
        options={{
            href:null,
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: LogoTitle,
            tabBarShowLabel: false,
        }}
      />
      {/* Ajout d'une fausse entrée qui redirige vers le stack */}
      <Tabs.Screen
        name="DetailStack"
        options={{
          href: "/(stack)/", // Redirige vers le layout Stack
          headerShown: false, // Cache l'onglet
        }}
      />
    </Tabs>
  );
}