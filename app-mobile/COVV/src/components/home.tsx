import React, {useState,useEffect,useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Text,Modal} from 'react-native';
import { Image } from 'expo-image';
import {Menu, LocateFixed,ListFilter, AlignCenter} from '@tamagui/lucide-icons'
import MapView, {Callout, LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location'
import { Link } from 'expo-router';
import { Button } from 'tamagui';
import CustomMarker from './CustomMarker';
import { Region,Marker } from 'react-native-maps';
import type { SheetProps } from 'tamagui';
import { Sheet, useSheet,YStack,SizableText } from 'tamagui';
import CustomMenu from './Menu';
import { VisuallyHidden,Spinner,XStack } from 'tamagui';
import { useBarList } from '../api/bars';
import AdminButton from './adminButton';
import { supabase } from '../lib/supabase';
import OwnerButton from './OwnerButton';
import { MapViewRoute } from 'react-native-maps-routes';
import RemoteImage from './RemoteImage';

export default function Home(){
    const [isNavActiv,setNavActiv] = useState(false);
    const [destination,setDestination] = useState({latitude:0,longitude:0});
    const [origin,setOrigin] = useState({latitude:0,longitude:0});
    const [location, setLocation] = useState<Location.LocationObject>();
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [position, setPosition] = useState(0);
    useEffect(() =>{
        const getPermission = async() =>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                console.log("please grant location permissions");
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location:");
            console.log(location);
        };
        getPermission();
    },[]);
    const {data:bars,error,isLoading} = useBarList();
    if (isLoading){
        return <Spinner size='large' color={'#E4FEFF'} alignSelf='center'/>;
    }
    if (error){
        return <Text>failed to fetch bars</Text>
    }
    let region:Region;
    if(location?.coords.latitude && location.coords.longitude){
        region={latitude:location?.coords.latitude,longitude:location?.coords.longitude,latitudeDelta:0.01,longitudeDelta:0.01};
    }
    const getRegion=()=>{
        if(region){
            return region;
        }
        return;
    }
    const startNav = async(dest:LatLng)=>{
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setDestination(dest);
        if(location?.coords.latitude && location.coords.longitude){
        setOrigin({latitude:location.coords.latitude,longitude:location.coords.longitude});
        setNavActiv(true);
        console.log('nav');
        }
    }
    return(
        <YStack style={styles.container}>
            <MapView style={styles.map} initialRegion={getRegion()} showsUserLocation showsMyLocationButton showsPointsOfInterest={false}>
                {bars?.map((bar) =>(
                    <Marker coordinate={{latitude:bar.latitude,longitude:bar.longitude}}
                    title={bar.nom}>
                        <Callout tooltip={true} onPress={async()=>startNav({latitude:bar.latitude,longitude:bar.longitude})}>
                            <View style={{display:'flex', flex:1,height:200,width:200,backgroundColor:'#E4FEFF'}}>
                                <View style={{flex:1,alignContent:'center',marginTop:15}}>
                                    <RemoteImage
                                        style={{alignSelf:'center',width:85,height:85}}
                                        path={bar.image}
                                        fallback="https://pvsrdumanbzwathfmlrl.supabase.co/storage/v1/object/sign/bar-images/ac078bc2-9e55-4c15-803a-a589bce7d630.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXItaW1hZ2VzL2FjMDc4YmMyLTllNTUtNGMxNS04MDNhLWE1ODliY2U3ZDYzMC5wbmc"
                                    />
                                    <SizableText alignSelf='center'>{bar.nom}</SizableText>
                                </View>
                                <View style={{flex:1,alignContent:'center',marginTop:25}}>
                                    <Button alignSelf='center' backgroundColor={'$blue8'}>Je m'y rend</Button>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}
                <Route IsActive={isNavActiv} origine={origin} destination={destination}/>
            </MapView>
            <View style={{position:'absolute',flex:1,top:50}}>
                <Image source='https://i.postimg.cc/L8BzBc50/image0-1.jpg' style={styles.logo}/>
            </View>
            <View style={{position:'absolute',bottom:40,left:10}}>
            <Button style={styles.MenuButton} scaleIcon={1.5} icon={Menu} circular={true} size='$6' color='black' onPress={() => setMenuVisibility(true)}></Button>
            </View>
            <View style={{position:'absolute',bottom:40}}>
                <Link href="/Filter" asChild>
                <Button style={styles.FilterButton} scaleIcon={1.5} icon={ListFilter} circular={false} size='$6' color='white' backgroundColor={"$blue6"} >Filtre</Button>
                </Link>
            </View>
            <Sheet
                forceRemoveScrollEnabled={menuVisibility}
                modal={true}
                open={menuVisibility}
                onOpenChange={setMenuVisibility}
                snapPointsMode='fit'
                dismissOnSnapToBottom
                position={position}
                onPositionChange={setPosition}
                zIndex={100_000}
                animation="medium"
            >
                <Sheet.Overlay
                    animation="lazy"
                    enterStyle={{opacity:0}}
                    exitStyle={{opacity:0}}
                />
                <Sheet.Handle/>
                <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" style={{backgroundColor:'#E4FEFF'}}>
                    <YStack gap={10} alignContent="flex-start">
                    <Link href='/' asChild>
                        <SizableText size="$9" onPress={() => setMenuVisibility(false)}>Les nouveautées</SizableText>
                        </Link>
                        <Link href='/ProposeNousTonBar' asChild>
                        <SizableText size="$9" onPress={() => setMenuVisibility(false)}>Propose nous ton bar</SizableText>
                        </Link>
                        <Link href='/' asChild>
                            <SizableText size="$9" onPress={() => setMenuVisibility(false)}>Nos partenaires</SizableText>
                        </Link>
                        <Link href='/NotreHistoire' asChild>
                            <SizableText size="$9" onPress={() => setMenuVisibility(false)}>Notre Histoire</SizableText>
                        </Link>
                        <Link href='/' asChild>
                            <SizableText size="$9" onPress={() => setMenuVisibility(false)}>Aide & mention légales</SizableText>
                        </Link>
                        <Link href='/' asChild>
                            <SizableText size="$9" onPress={()=>supabase.auth.signOut()}>Déconnexion</SizableText>
                        </Link>
                        <AdminButton onPress={() => setMenuVisibility(false)}/>
                        <OwnerButton onPress={() => setMenuVisibility(false)}/>
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </YStack>
    ); 
}

function Route(props : {IsActive:boolean,origine:LatLng,destination:LatLng}){
    const {IsActive,origine,destination} = props;
    if(IsActive){
    return(
    <MapViewRoute origin={origine} destination={destination} apiKey=''/>
    );
    }
    else return;
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center'
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
        color:'black',
        padding:15,
        shadowColor: '#000', 
        shadowOffset: {width: 0,height: 2,},
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5,
    }
})