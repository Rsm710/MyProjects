import React from "react";
import { View,Text } from "react-native";
import LottieView from 'lottie-react-native';
import { Stack } from "expo-router";
export default function AnimationScreen({onAnimationFinish=(isCancelled) =>{}}: {onAnimationFinish ?: (isCancelled:boolean) => void}){
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center', backgroundColor:'white'}}>
            <LottieView
                onAnimationFinish={onAnimationFinish}
                loop={false}
                autoPlay
                style={{
                    width:'80%',
                    maxWidth:400,
                }}
                source={require('@/assets/lottie/splashScreen.json')}
            />
        </View>
    );
}