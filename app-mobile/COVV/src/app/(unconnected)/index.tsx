import React, {useState,useEffect,useRef} from 'react';
import {YStack,SizableText,Paragraph,Input,XStack,Text, Button,YGroup,ListItem,Separator,Select ,Label,Accordion,Square,Dialog,Adapt,Sheet,Unspaced } from 'tamagui';
import { View,ScrollView, ActivityIndicator,Pressable } from 'react-native';
import { Image } from 'expo-image';
import { StyleSheet,FlatList } from 'react-native';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widths } from '@tamagui/config';
import { useBarFav, useBarFilter, useBarList, useBarSearch,useBarType, useFilters,useFindFilters,useGetOpenBars } from '@/src/api/bars';
import BarListItemuser from '@/src/components/BarListItemUser';
import SearchBarItem from '@/src/components/SearchBarItem';
import { FlashList } from '@shopify/flash-list';
import { Switch, RadioGroup } from 'tamagui';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMartiniGlassCitrus} from '@fortawesome/free-solid-svg-icons/faMartiniGlassCitrus';
import {faCompactDisc} from '@fortawesome/free-solid-svg-icons/faCompactDisc';
import {faUtensils} from '@fortawesome/free-solid-svg-icons/faUtensils';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import * as Location from 'expo-location';
import {Skeleton} from 'moti/skeleton';
import RechercheVide from '@/src/components/RechercheVide';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/src/provider/AuthProvider';
import FiltersList from '@/src/components/FilterList';
import { supabase } from '@/src/lib/supabase';
import BarListItemUnconected from '@/src/components/BarListItemUnconected';

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
function RadioGroupFilter({ id, value, onValueChange, options }) {
    return (
      <RadioGroup value={value} onValueChange={onValueChange} >
        <YStack gap="$2" width="100%">
          {options.map((option, index) => (
            <XStack key={index} ai="center" gap="$2" justifyContent="flex-start" width="100%">
              <RadioGroup.Item value={option.value} id={`${id}-${option.value}`} >
                <RadioGroup.Indicator />
              </RadioGroup.Item>
              <Label htmlFor={`${id}-${option.value}`}>
                {option.label}
              </Label>
            </XStack>
          ))}
        </YStack>
      </RadioGroup>
    );
  }
function sortByDistance(items: Array<{address: string | null; created_at: string; description: string; filters: string[] | null; id: number; image: string; latitude: number; logo: string | null; longitude: number; nom: string; Owner: string | null; }>,lat : number,lon:number){
    items.sort((a, b) => {
        const distanceToA = getDistance(lat, lon, a.latitude, a.longitude);
        const distanceToB = getDistance(lat, lon, b.latitude, b.longitude);
        return distanceToA - distanceToB;
    });
    console.log("sorted");
}
async function disconnect(){
    const { error } = await supabase.auth.signOut();
}
export default function Index(){
    const {fav} = useAuth();
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
    const ClickBar =() =>{
        setBar(!bar);
        setRestau(false);
        setBdn(false);
        setFav(false);
        setBdnColor('#05123B');
        setRestauColor('#05123B');
        setFavColor('#05123B');
        if(barColor=='#DFF5FF'){
            setBarColor('#05123B');
        }
        else{
            setBarColor('#DFF5FF');
        }
    }
    const ClickRestau =() =>{
        setBar(false);
        setRestau(!restau);
        setBdn(false);
        setFav(false);
        setBarColor('#05123B');
        setBdnColor('#05123B');
        setFavColor('#05123B');
        if(restauColor=='#DFF5FF'){
            setRestauColor('#05123B');
        }
        else{
            setRestauColor('#DFF5FF');
        }
    }
    const ClickBdn =() =>{
        setBar(false);
        setRestau(false);
        setFav(false);
        setBdn(!bdn);
        setBarColor('#05123B');
        setRestauColor('#05123B');
        setFavColor('#05123B');
        if(bdnColor=='#DFF5FF'){
            setBdnColor('#05123B');
        }
        else{
            setBdnColor('#DFF5FF');
        }
    }
    const Clickfav =() =>{
        
        setBar(false);
        setRestau(false);
        setBdn(false);
        setFav(!favo);
        setBarColor('#05123B');
        setRestauColor('#05123B');
        setBdnColor('#05123B');
        if(favColor=='#DFF5FF'){
            setFavColor('#05123B');
        }
        else{
            setFavColor('#DFF5FF');
        }
    }
    const renderItemSeparator = () =>{
        return <View style={{height:48}}/>
    }
    const handleReset = () => {
        setAmbianceMusicale('');
        setEspaceExt('');
        setNouriture('');
        setBoisson('');
      };
    const [ambianceMusicale,setAmbianceMusicale] = useState("")
    const [espaceExt,setEspaceExt] = useState("")
    const [nouriture,setNouriture] = useState("")
    const [boisson,setBoisson] = useState("")
    const [recherche,setRecherche] = useState('');
    const [barColor,setBarColor] = useState('#05123B');
    const [restauColor,setRestauColor] = useState('#05123B');
    const [bdnColor,setBdnColor] = useState('#05123B');
    const [favColor,setFavColor] = useState('#05123B');
    const [favo,setFav] = useState(false);
    const [bar,setBar] = useState(false);
    const [restau,setRestau] = useState(false);
    const [bdn,setBdn] = useState(false);
    const {data:filtres,error} = useFilters();
    const filtresActive = useLocalSearchParams<{filtre?:string[]}>();
    let loading = false;
    let bars;
    let datas;
    if(recherche == ('')){
        if(bar || restau || bdn){
            const {data,error,isLoading} = useBarFilter(bar,restau,bdn);
            if(!error){
                datas=data;
            }
            if(!isLoading){
                loading = true;
            }        
        }
        else if(ambianceMusicale!="" || espaceExt!="" || nouriture!="" || boisson!=""){
            const {data,error} = useFindFilters(ambianceMusicale,espaceExt,nouriture,boisson);
            if(!error){
                datas=data;
            }
        }
        else{
            const {data,error,isLoading} = useGetOpenBars();
            if(!error){
                console.log(data);
                datas=data;
            }
            else{
                console.log(error);
            }
            if(!isLoading){
                loading = true;
            }
        }
    if(datas != null && location?.coords.latitude!=null && location?.coords.longitude!=null){
    sortByDistance(datas,location?.coords.latitude,location?.coords.longitude);
    }
    bars = datas;
    }
    else{
        const {data,error} = useBarSearch(recherche);
        if(data != null && location?.coords.latitude!=null && location?.coords.longitude!=null){
            sortByDistance(data,location?.coords.latitude,location?.coords.longitude);
            }
            bars = data;
    }
    
    
    return(
            <ScrollView style={{backgroundColor:'white', height:200,flex:1}}>
            <View style={{backgroundColor:'white'}}>
                <Input borderWidth={2} borderColor={"black"} margin={15} size={'$4'} placeholder={'Chercher'} style={{fontFamily:'Futura-Medium'}} borderRadius={30} autoCapitalize="none" backgroundColor={"white"} onChangeText={setRecherche} returnKeyType='search'/>
                <XStack padding={5} justifyContent='center' marginBottom={15} gap='$11'>
                    <Pressable onPress={ClickBar}>
                        <FontAwesomeIcon icon={faMartiniGlassCitrus} size={30} color={barColor}/>
                    </Pressable>
                    <Pressable onPress={ClickBdn}>
                    <FontAwesomeIcon icon={faCompactDisc} size={30} color={bdnColor}/>
                    </Pressable>
                    <Pressable onPress={ClickRestau}>
                    <FontAwesomeIcon icon={faUtensils} size={30} color={restauColor}/>
                    </Pressable>
                    
                    <Dialog modal disableRemoveScroll>
                    <Dialog.Trigger>
                        <FontAwesomeIcon icon={faFilter} size={30} color={"#05123B"}/>
                    </Dialog.Trigger>
        <Adapt when="sm" platform="touch">
            <Sheet animation="medium" zIndex={200000} modal >
            <Sheet.Frame padding="$4" gap="$4">
                <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />
            </Sheet>
        </Adapt>

        <Dialog.Portal>
            <Dialog.Overlay
            key="overlay"
            animation="slow"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            />

            <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
                'quicker',
                {
                opacity: {
                    overshootClamping: true,
                },
                },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
            >
                <ScrollView>
                <YStack gap="$4" p="$4" >
                    {/* Ambiance Musicale Radio Group */}
                    <XStack ai="center" gap="$1">
                        <Label htmlFor="ambiance-musicale" f={1} miw={80} style={{fontFamily:'Gotham-Black'}}>
                        Ambiance Musicale
                        </Label>
                        <RadioGroupFilter
                        id="ambiance-musicale"
                        value={ambianceMusicale}
                        onValueChange={setAmbianceMusicale}
                        options={[
                            { label: 'Jazz', value: 'jazz' },
                            { label: 'Lounge', value: 'lounge' },
                            { label: 'Electro', value: 'électro' },
                            { label: 'Live Music', value: 'live music' },
                            { label: 'Pas de musique  ', value: 'pas de musique' }
                        ]}
                        />
                    </XStack>

                    {/* Espace Extérieur Radio Group */}
                    <XStack ai="center" gap="$1">
                        <Label htmlFor="espace-ext" f={1} miw={80} style={{fontFamily:'Gotham-Black'}}>
                        Espace Extérieur
                        </Label>
                        <RadioGroupFilter
                        id="espace-ext"
                        value={espaceExt}
                        onValueChange={setEspaceExt}
                        options={[
                            { label: 'Terrasse', value: 'terrasse' },
                            { label: 'Rooftop', value: 'rooftop' },
                            { label: 'Jardin', value: 'jardin' },
                            { label: 'Que intérieur       ', value: 'pas dexterieur' }
                        ]}
                        />
                    </XStack>

                    {/* Type de Cuisine Radio Group */}
                    <XStack ai="center" gap="$1">
                        <Label htmlFor="nouriture" f={1} miw={80} style={{fontFamily:'Gotham-Black'}}>
                        Type de Cuisine
                        </Label>
                        <RadioGroupFilter
                        id="nouriture"
                        value={nouriture}
                        onValueChange={setNouriture}
                        options={[
                            { label: 'Tapas', value: 'tapas' },
                            { label: 'Pizza', value: 'pizza' },
                            { label: 'Gastronomique    ', value: 'gastronomique' },
                            { label: 'Végétarien', value: 'vegetarien' }
                        ]}
                        />
                    </XStack>

                    {/* Type de Boisson Radio Group */}
                    <XStack ai="center" gap="$1">
                        <Label htmlFor="boisson" f={1} miw={80} style={{fontFamily:'Gotham-Black'}}>
                        Type de Boisson
                        </Label>
                        <RadioGroupFilter
                        
                        id="boisson"
                        value={boisson}
                        onValueChange={setBoisson}
                        options={[
                            { label: 'Cocktail', value: 'cocktail' },
                            { label: 'Bière Locale         ', value: 'biere locale' },
                            { label: 'Vins', value: 'vins' },
                            { label: 'sans alcool', value: 'sans alcool' }
                        ]}
                        />
                    </XStack>
                    {/* Reset Button */}
                </YStack>
                </ScrollView>
                <XStack gap={"$5"} alignContent='center' justifyContent='center'>
                <Button style={{fontFamily:'Gotham-Black'}} alignSelf="center"color={'white'} borderRadius={15} backgroundColor={"#05123B"} onPress={handleReset}>
                <SizableText color={"white"}>Reset</SizableText>
                </Button>
                <Dialog.Close displayWhenAdapted asChild>
                <Button style={{fontFamily:'Gotham-Black'}} alignSelf="center" color={"white"} borderRadius={15} backgroundColor={"#05123B"}>
                <SizableText color={"white"}>Sauvegarder</SizableText>
                </Button>
                </Dialog.Close>
                </XStack>

            <Unspaced>
                <Dialog.Close asChild>
                <Button
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$2"
                    circular
                />
                </Dialog.Close>
            </Unspaced>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog>
            </XStack>
            </View>
            <Button style={{fontFamily:'Gotham-Black'}} alignSelf="center" color={"white"} borderRadius={15} backgroundColor={"#05123B"} onPress={()=>{
                router.navigate("/(auth)/sign-in");
            }}>
                <SizableText color={"white"}>Se connecter</SizableText>
            </Button>
            <SizableText padding={15} style={{fontFamily:'Gotham-Medium'}} size={'$6'} color={"#05123B"}>Nos Partenaires à proximité</SizableText>
            <FlashList
                ItemSeparatorComponent={renderItemSeparator}
                drawDistance={150}
                numColumns={1}
                data={bars}
                renderItem={({item}) => <BarListItemUnconected Bar={item} loading/>}
                ListEmptyComponent={RechercheVide}
                estimatedItemSize={100}
                ListFooterComponent={renderItemSeparator}
            />
        </ScrollView>
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