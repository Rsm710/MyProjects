import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList
  } from 'react-native';
  import { Spinner } from "tamagui";
import { Button,Card,CardProps, H2, XStack,Image,SizableText, YStack } from "tamagui";
import { Link, router } from "expo-router";
import { Database } from "../database.types";
import RemoteImage from "./RemoteImage";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { Skeleton } from "moti/skeleton";
import { useLocalSearchParams } from "expo-router";
export default function FiltersList(props : {filtre:any}){
    const filtresActive = useLocalSearchParams<{filtre:string[]}>();
    const {filtre} = props;
    const handleClick =() =>{
        const newFiltre = filtresActive.filtre.includes(filtre.nom)
        ? filtresActive.filtre.filter(favId => favId !== filtre.nom) 
        : [...filtresActive.filtre, filtre.nom]; // Create a new array instead of mutating
        router.setParams({filtre : newFiltre});
    }
    const filtercolor = filtresActive.filtre.includes(filtre.nom) ? 'black' : '#05123B';
    return(
        <Button style={{fontFamily:'Inter-Black'}} alignSelf="center" onPress={handleClick} color={"white"} borderRadius={15} backgroundColor={filtercolor}>{filtre.nom}</Button>
    );
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