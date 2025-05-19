import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    FlatList
  } from 'react-native';
import { Button } from "tamagui";
import { Link } from "expo-router";

export default function BarListItem(props : {Bar:bar}){
    const {Bar} = props;
    return(
    <View style={{margin:20, top:30}}>
        <Link href={`/(admin)/${Bar.id}`} asChild>
                <Button style={styles.FilterButton} scaleIcon={1.5} circular={false} size='$6' color='white' >{Bar.nom}</Button>
        </Link>
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