import React, {useState} from "react";
import {
    Text,
    StyleSheet,
    
    Pressable,
    FlatList
  } from 'react-native';
import { Button,Card,CardProps, H2, XStack,Image,SizableText, YStack, Spinner,View } from "tamagui";
import { Link } from "expo-router";
import { Database } from "../database.types";
import RemoteImage from "./RemoteImage";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { Skeleton } from "moti/skeleton";

export default function NoFav(props : {loading:boolean}){
    const{loading} = props;
    if (loading){
        return(
            <Spinner/>
        )
    }
    else{
    return(
        <View justifyContent="center" backgroundColor={'white'} width={"100%"} height={"100%"}>
            <SizableText alignSelf="center" marginTop="$20">Tu n'as pas encore d'établissement favori</SizableText>
        </View>
    );
}
}



const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width:120,
        aspectRatio:1,
        borderRadius:100
    },
    map: {
        width: '100%',
        height: '100%',
      },
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