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
interface Review {
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }
export default function ReviewListItem(props : {Review:Review,loading:boolean}){
    const {Review,loading} = props;
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(
            <Text key={i} style={styles.star}>
              {i < rating ? '★' : '☆'}
            </Text>
          );
        }
        return stars;
      };
    return(
        <View style={{shadowColor:"#000", shadowOffset:{height:4,width:0}, shadowOpacity:0.30, shadowRadius:4.65, elevation:8}}>
        <Card elevate size={"$5"} width={360} height={220} alignSelf="center" overflow="hidden" borderRadius={"$5"} animation={"quickest"} pressStyle={{scale:0.875}}  >
            <Card.Header  >     
                <SizableText flexWrap="wrap">{Review.author_name}</SizableText>
                <SizableText flexWrap="wrap">{renderStars(Review.rating)}</SizableText>
            </Card.Header>
            <Card.Footer paddingLeft={8} paddingBottom={2} paddingTop={50} overflow="hidden">
            <SizableText flexWrap="wrap">{Review.text}</SizableText>
            </Card.Footer>
            <Card.Background backgroundColor={'white'}>
            </Card.Background>
        </Card>
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
    star: {
        color: '#FFD700', // Couleur dorée pour les étoiles
        fontSize: 18,
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