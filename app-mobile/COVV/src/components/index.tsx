import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { Button } from "tamagui";
import { StyleSheet } from "react-native";
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { TamaguiConfig } from "@tamagui/core";
import {config} from '@tamagui/config/v3'
import { useAuth } from "../provider/AuthProvider";


const tamaguiConfig = createTamagui(config)

type Conf = typeof tamaguiConfig
declare module '@tamagui/core'{
  interface TamaguiCustomConfig extends Conf{}
}

export default function index(){
    const {session,loading,isAdmin} = useAuth();

    if(loading){
        return <ActivityIndicator/>;
    }

    if(!session){
        return <Redirect href={'/sign-in'}/>;
    }
    if(!isAdmin){
        return <Redirect href={'/(app)'}/>
    }
    return(
        <View style={{flex:1,justifyContent:'center',padding:10}}>
            <Link href="../(app)" asChild style={{margin:20}}>
                <Button style={styles.MenuButton} scaleIcon={1.5} circular={false} size='$6' color='black'>User</Button>
            </Link>
            <Link href="(admin)" asChild style={{margin:20}}>
                <Button style={styles.MenuButton} scaleIcon={1.5} circular={false} size='$6' color='black'>Admin</Button>
            </Link>
            <Link href="(tabs)/Index.tsx" asChild style={{margin:20}}>
                <Button style={styles.MenuButton} scaleIcon={1.5} circular={false} size='$6' color='black'>Main</Button>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    MenuButton:{
        backgroundColor:'white', 
        padding:15,
        shadowColor: '#000', 
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5,
    },
    FilterButton:{
        backgroundColor:'black', 
        padding:15,
        shadowColor: '#000', 
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5,
    }
})