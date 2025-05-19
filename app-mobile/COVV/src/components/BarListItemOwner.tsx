import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    
    Pressable,
    FlatList
  } from 'react-native';
import { Button,Card,CardProps, H2, XStack,Image,SizableText } from "tamagui";
import { Link } from "expo-router";
import { Database } from "../database.types";
import RemoteImage from "./RemoteImage";

export default function BarListItemOwner(props : {Bar}){
    const {Bar} = props;
    return(
        <View>
        <Link href={`../(owner)/${Bar.id}`} asChild>
        <Card elevate size={"$5"} width={190} height={120} alignSelf="center" borderRadius={20} overflow="hidden" animation={"quickest"}  pressStyle={{scale:0.875}}>
            <Card.Header padded>                
            </Card.Header>
            <Card.Footer padded>
            </Card.Footer>
            <Card.Background backgroundColor={'gray'}>
            <RemoteImage
                    style={{width:190,height:120,alignSelf:'center',resizeMode:'cover'}}
                    path={Bar.image}
                    fallback="http/pvsrdumazwathfmlrl.supabase.co/storage/v1/object/sign/bar-images/ac078bc2-9e55-4c15-803a-a589bce7d630.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXItaW1hZ2VzL2FjMDc4YmMyLTllNTUtNGMxNS04MDNhLWE1ODliY2U3ZDYzMC5wbmciLCJpYXQiOjE3MTMyNzY0NzYsImV4cCI6MTcxMzg4MTI3Nn0.ZU8uXtcPLf3fG6lh6-IGcNtzog5QPiGGwk1tIYXWfpU&t=2024-04-16T14%3A07%3A56.651Z"
                />
            </Card.Background>
        </Card>
        </Link>
        <SizableText size={"$6"} margin={10}>{Bar.nom}</SizableText>
        </View>
        
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