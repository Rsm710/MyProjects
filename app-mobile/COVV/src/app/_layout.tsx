import { ShowerHead } from "@tamagui/lucide-icons";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, View, createTamagui } from 'tamagui'
import {config} from '@tamagui/config/v3'
import { useFonts } from 'expo-font';
import AuthProvider from "../provider/AuthProvider";
import QueryProvider from "../provider/QueryProvider";
import { PortalProvider } from "tamagui";
import { useEffect, useState } from "react";
import AnimationScreen from "../components/animation";
import { useAuth } from "../provider/AuthProvider";
import * as Notifications from "expo-notifications";
import BatteryMonitor from "../components/notificationProvider";
import tamaguiConfig from "@/tamagui.config";


export default function Layout(){
    const [appReady,setAppReady] = useState(false);
    const [splashAnimationFinished,setSplashAnimationFinished] = useState(false);
    const [fontsloaded,fontError] = useFonts({
        'Arista-Bold':require('@/assets/fonts/Arista-Pro-Bold-trial.ttf'),
        'Arista-Light':require('@/assets/fonts/Arista-Pro-Light-trial.ttf'),
        'Inter-Black':require('@/assets/fonts/Inter-Black.ttf'),
        'Inter-Regular':require('@/assets/fonts/Inter-Regular.ttf'),
        'Futura-Light':require('@/assets/fonts/FuturaPTLight.otf'),
        'Futura-Bold':require('@/assets/fonts/FuturaPTBold.otf'),
        'Futura-Medium':require('@/assets/fonts/FuturaPTMedium.otf'),
        'Gotham-Black':require('@/assets/fonts/Gotham-Black.otf'),
        'Gotham-Medium':require('@/assets/fonts/GothamMedium.ttf'),
        'Gotham-Bold':require('@/assets/fonts/GothamBold.ttf'),
    });
    useEffect(() => {
        const requestPermissions = async () => {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Vous devez autoriser les notifications !');
          }
        };
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
          });
        requestPermissions();
      }, []);
    useEffect(() =>{
        if(fontsloaded || fontError){
            setAppReady(true);
        }
    },[fontsloaded,fontError]);
    return(
        <AuthProvider>
            <QueryProvider>
            <PortalProvider>
            <TamaguiProvider config={tamaguiConfig}>
                <BatteryMonitor/>
                <Stack>
                    <Stack.Screen name ="(auth)" options={{headerShown:false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
                    <Stack.Screen name="(unconnected)" options={{headerShown:false}}/>
                    <Stack.Screen name="(stack)" options={{headerShown:false}}/>
                    <Stack.Screen name="(unconnectedStack)" options={{headerShown:false}}/>
                </Stack>
            </TamaguiProvider>
            </PortalProvider>
            </QueryProvider>
        </AuthProvider>
    );
}