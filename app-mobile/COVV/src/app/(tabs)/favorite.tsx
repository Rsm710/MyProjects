import React from "react";
import { useAuth } from "@/src/provider/AuthProvider";
import { useState,useEffect } from "react";
import * as Location from 'expo-location';
import { View,SizableText,ScrollView } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useBarFav, useGetFav } from "@/src/api/bars";
import RechercheVide from "@/src/components/RechercheVide";
import BarListItemuser from "@/src/components/BarListItemUser";
import NoFav from "@/src/components/noFav";
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180; // Latitude of first point converted to radians
    const φ2 = lat2 * Math.PI / 180; // Latitude of second point converted to radians
    const Δφ = (lat2 - lat1) * Math.PI / 180; // Change in latitude converted to radians
    const Δλ = (lon2 - lon1) * Math.PI / 180; // Change in longitude converted to radians

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // Distance in meters
    return d;
}

function sortByDistance(items: Array<{address: string | null; created_at: string; description: string; filters: string[] | null; id: number; image: string; latitude: number; logo: string | null; longitude: number; nom: string; Owner: string | null; }>,lat : number,lon:number){
    items.sort((a, b) => {
        const distanceToA = getDistance(lat, lon, a.latitude, a.longitude);
        const distanceToB = getDistance(lat, lon, b.latitude, b.longitude);
        return distanceToA - distanceToB;
    });
    console.log("sorted");
}

export default function Favorite(){
    let bars
    const {id} = useAuth();
    const [location, setLocation] = useState<Location.LocationObject>();
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
    const renderItemSeparators = () =>{
        return <View height={48}/>
    }
    const {data,error,isLoading,refetch} = useGetFav(id);
    useEffect(() => {
        const interval = setInterval(() => {
          refetch(); // Rafraîchir les données toutes les X secondes
        }, 5000); // Par exemple, toutes les 5 secondes
    
        return () => clearInterval(interval); // Nettoyer l'intervalle à la désactivation du composant
      }, [refetch]);
    console.log("favorites :"+data+" id :"+id + " error :"+ error);
    if(data != null && location?.coords.latitude!=null && location?.coords.longitude!=null){
        sortByDistance(data,location?.coords.latitude,location?.coords.longitude);
        }
        bars = data;
    return(
        <ScrollView backgroundColor={'white'} width={"100%"} height={"100%"}>
            <SizableText padding={15} style={{fontFamily:'Gotham-Medium'}} size={'$6'} color={"#05123B"}>Vos favoris à proximité</SizableText>
            <FlashList
            ItemSeparatorComponent={renderItemSeparators}
            drawDistance={150}
            numColumns={1}
            data={bars}
            renderItem={({item}) => <BarListItemuser Bar={item} loading/>}
            ListEmptyComponent={NoFav}
            estimatedItemSize={100}
            ListFooterComponent={renderItemSeparators}
            />
        </ScrollView>
    );
    
}