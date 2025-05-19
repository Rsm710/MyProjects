import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { Image } from "react-native-elements";
import { Dimensions } from "react-native";
import { View } from "tamagui";
import {Tabs} from "expo-router";
import { useRouter } from "expo-router";
import { Spinner } from "tamagui";
import { createStackNavigator } from "@react-navigation/stack";
export default function Layout(){
    const { session, loading } = useAuth();

    // While loading, you might want to show a loading indicator instead of redirecting

    if (session) {
        return <Redirect href={'/(tabs)'} />;
    }
    const {width} = Dimensions.get("window");
    const LogoWidth = width * 0.4;
    const router = useRouter();
    function LogoTitle(){
        return(
            <Image source = {{uri : 'https://i.postimg.cc/Y0tdPRY8/LOGO-COVV-Plan-de-travail-1-02-1.png'}}
            style={{width:LogoWidth,height:80,bottom:10}}
            />
        );
    }


    return(
        <Tabs
            screenOptions={{
                headerStyle: {
                    height:120,
                }
            }}
        >
            <Tabs.Screen
                name="sign-in"
                options={{
                    headerShadowVisible:false,
                    headerTitle:props => <LogoTitle/>,
                    headerShown:true,
                    href:null
                }}
            />
            <Tabs.Screen
                name="sign-up"
                options={{
                    headerShadowVisible:false,
                    headerTitle:props => <LogoTitle/>,
                    headerShown:true,
                    href:null
                }}
            />
           
        </Tabs>
    );
}