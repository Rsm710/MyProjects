import { SizableText } from "tamagui";
import MapView,{LatLng,Region,Marker} from "react-native-maps";
import { useState } from "react";
import { useEffect } from "react";
import * as Location from 'expo-location'
import { useBarList } from "@/src/api/bars";
import { Text } from "tamagui";
import { Spinner } from "tamagui";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "@/src/components/Themed";
import Home from "@/src/components/home";
export default function Map(){
    const [location, setLocation] = useState<Location.LocationObject>();
    const {data:bars,error,isLoading} = useBarList();
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
   return(
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={getRegion()} showsUserLocation showsMyLocationButton showsPointsOfInterest={false}>
      {bars?.map((bar) =>(
                    <Marker coordinate={{latitude:bar.latitude,longitude:bar.longitude}}
                    title={bar.nom}>
                         </Marker>
                ))}
      </MapView>
    </View>
   )
    

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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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