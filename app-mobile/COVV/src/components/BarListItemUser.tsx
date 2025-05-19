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
import { Link } from "expo-router";
import { Database } from "../database.types";
import RemoteImage from "./RemoteImage";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { Skeleton } from "moti/skeleton";
export default function BarListItemuser(props : {Bar,loading:boolean}){
    const {Bar,loading} = props;
    console.log(Bar.id);
    return(
        <Skeleton show={false}>
        <View style={{shadowColor:"#000", shadowOffset:{height:4,width:0}, shadowOpacity:0.30, shadowRadius:4.65, elevation:8}}>
        <Link href={`../(stack)/${Bar.id}`} asChild>
        <Card elevate size={"$5"} width={360} height={220} alignSelf="center" overflow="hidden" borderRadius={"$5"} animation={"quickest"} pressStyle={{scale:0.875}}  >
            <Card.Header padded>     
            <RemoteImage
                        style={{borderRadius:100,width:60,aspectRatio:1}}
                        path={Bar.logo}
                        fallback="http/pvsrdumazwathfmlrl.supabase.co/storage/v1/object/sign/bar-images/ac078bc2-9e55-4c15-803a-a589bce7d630.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXItaW1hZ2VzL2FjMDc4YmMyLTllNTUtNGMxNS04MDNhLWE1ODliY2U3ZDYzMC5wbmciLCJpYXQiOjE3MTMyNzY0NzYsImV4cCI6MTcxMzg4MTI3Nn0.ZU8uXtcPLf3fG6lh6-IGcNtzog5QPiGGwk1tIYXWfpU&t=2024-04-16T14%3A07%3A56.651Z"
                    />
            </Card.Header>
            <Card.Footer paddingLeft={8} paddingBottom={2}>
                <YStack alignItems="center" alignContent="center">
                    <SizableText color={"black"} alignSelf="flex-start" size={"$3"} style={{fontFamily:'Gotham-Medium'}}>{Bar.nom}</SizableText>
                    <SizableText color={"gray"} alignSelf="flex-start" size={"$1"} style={{fontFamily:'Gotham-Medium'}}>en savoir plus</SizableText>
                </YStack>
            </Card.Footer>
            <Card.Background backgroundColor={'white'}>
            <RemoteImage
                    style={{width:360,height:170,alignSelf:'center',resizeMode:'cover'}}
                    path={Bar.image}
                    fallback="http/pvsrdumazwathfmlrl.supabase.co/storage/v1/object/sign/bar-images/ac078bc2-9e55-4c15-803a-a589bce7d630.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXItaW1hZ2VzL2FjMDc4YmMyLTllNTUtNGMxNS04MDNhLWE1ODliY2U3ZDYzMC5wbmciLCJpYXQiOjE3MTMyNzY0NzYsImV4cCI6MTcxMzg4MTI3Nn0.ZU8uXtcPLf3fG6lh6-IGcNtzog5QPiGGwk1tIYXWfpU&t=2024-04-16T14%3A07%3A56.651Z"
                />
            </Card.Background>
        </Card>
        
        </Link>
        </View>
        </Skeleton>
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