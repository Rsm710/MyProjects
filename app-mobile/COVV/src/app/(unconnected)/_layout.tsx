import { Link, Tabs } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { Button } from "tamagui";
import { useRouter } from "expo-router";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLeftLong} from '@fortawesome/free-solid-svg-icons/faLeftLong';
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Dimensions } from "react-native";
import Index from ".";
import DetailBar from "../(unconnectedStack)/[id]";
import Map from "./map";
import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect } from "expo-router";
import { Spinner } from "tamagui";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function TabLayout(){
    const { session, loading } = useAuth();

    // While loading, you might want to show a loading indicator instead of redirecting
    if (session) {
        return <Redirect href={'/(tabs)'} />;
    }
    const {width} = Dimensions.get("window");
    const LogoWidth = width * 0.4;
    const router = useRouter();
    function BackButton(){
        return(
        <FontAwesomeIcon icon={faLeftLong}/>
        );
    }
    function LogoTitle(){
        return(
            <Image source = {{uri : 'https://i.postimg.cc/Y0tdPRY8/LOGO-COVV-Plan-de-travail-1-02-1.png'}}
            style={{width:LogoWidth,height:80,bottom:10}}
            />
        );
    }

    const Stack = createStackNavigator();

    return(
        <Tabs
            screenOptions={{
                headerStyle: {
                    height:120,
                }
            }}
        >
            
            <Tabs.Screen
                name="index"
                options={{
                    headerShadowVisible:false,
                    headerTitle:props => <LogoTitle/>,
                    headerShown:true,
                    tabBarIcon: () => <FontAwesomeIcon icon={faHome} size={20}/>,
                    tabBarShowLabel:false,
                    tabBarActiveBackgroundColor:"grey",
                }}
            />
            <Tabs.Screen
                name="ProposeNousTonBar"
                options={{
                    headerShadowVisible:false,
                    headerTitle:props => <LogoTitle/>,
                    headerLeft:() => <Button onPress={router.back} icon={BackButton} backgroundColor={'white'} color={'#243e86'} />,
                    headerShown:true,
                    href:null
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    headerShadowVisible:false,
                    headerShown:true,
                    headerTitle:LogoTitle,
                    tabBarIcon: () => <FontAwesomeIcon icon={faMap} size={20}/>,
                    tabBarShowLabel:false,
                    tabBarActiveBackgroundColor:"grey",
                }}
                
            />
            <Tabs.Screen
                name="DetailStack"
                options={{
                href: "/(unconnectedStack)/", // Redirige vers le layout Stack
                headerShown: false, // Cache l'onglet
                }}
            />
        </Tabs>
    )
}