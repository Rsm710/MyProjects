import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    
    Pressable,
    FlatList
  } from 'react-native';
import { Button,Card,CardProps, H2, XStack,Image } from "tamagui";
import { Link } from "expo-router";
import { Database } from "../database.types";

export default function SearchBarItem(props : {Bar}){
    const {Bar} = props;
    return(
        <H2>{Bar.nom}</H2>
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