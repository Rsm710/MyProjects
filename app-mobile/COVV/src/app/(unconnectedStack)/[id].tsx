import React, { useState, useEffect } from "react";
import { Platform, Linking, ActivityIndicator } from "react-native";
import { Dimensions, View, Text } from 'react-native';
import { Button as reactButton} from "react-native";
import { Button, SizableText, XStack, YStack, Paragraph, ScrollView } from "tamagui";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faFilter, faPenToSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import MapView, { Marker } from "react-native-maps";
import { FlashList } from "@shopify/flash-list";
import RemoteImage from "@/src/components/RemoteImage";
import MenuVisibility from "@/src/components/MenuVisibility";
import { addToFavorites, isfavorited, removeFromFavorites, UseBar, useUpdateFav } from "@/src/api/bars";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "@/src/provider/AuthProvider";
import { Pressable } from "react-native";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useFindFav } from "@/src/api/bars";
import { getFavorites } from "@/src/api/bars";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/src/lib/supabase";
import ReviewListItem from "@/src/components/ReviewListItem";
import axios from 'axios';
import ReviewRender from "@/src/components/ReviewRenderer";
export default function DetailBar() {
  
  const renderItemSeparator = () =>{
    return <View style={{height:48}}/>
}
  const mapKey=process.env.EXPO_PUBLIC_API_KEY;
  const route = useRoute();
  const id = route.params?.id;
  const { id: idUser } = useAuth();
  const { data: bar, error, isLoading } = UseBar(id);
  const [favColor, setFavColor] = useState('black');
  const [reviews, setReviews] = useState([]);
  const query = bar?.address;
  useEffect(() => {
    const fetchReviews = async () => {
      if(bar?.googleMapId == null){
        setReviews([]);
      }
      try {
        const placeId = bar?.googleMapId;
        console.log("placeId: "+ placeId) // Remplace par l'ID de ton bar
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${mapKey}`
        );
        console.log("reponse :" + response.data.result)
        const allReviews = response.data.result.reviews ;

        const sortedReviews = allReviews.sort((a, b) => b.rating - a.rating);

    // Limiter le nombre d'avis (par exemple, 5)
        const limitedReviews = sortedReviews.slice(0, 5);

        setReviews(limitedReviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [bar?.googleMapId]);

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(`http://maps.apple.com/?daddr=${bar?.address}`);
    if (supported) {
      try {
        await Linking.openURL(`http://maps.apple.com/?daddr=${bar?.address}`);
      } catch (err) {
        console.error("Failed to open URL:", err);
      }
    }
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !bar) {
    console.error("Error fetching bar data:", error);
    return <Text>Pas de bar trouvé</Text>;
  }

  const RenderFilter = (filter) => (
    <SizableText size="$6" paddingLeft={20} style={{ fontFamily: 'Futura-Medium' }} color={"#05123B"}>
      {filter}
    </SizableText>
  );

  return (
    <ScrollView flex={1} alwaysBounceVertical={true}>
      <RemoteImage
        style={{ alignSelf: 'center', width: Dimensions.get('screen').width, height: 200 }}
        path={bar.image}
        fallback="https://pvsrdumanbzwathfmlrl.supabase.co/storage/v1/object/sign/bar-images/ac078bc2-9e55-4c15-803a-a589bce7d630.png?token=YOUR_TOKEN"
      />
      <YStack marginTop={15} gap={25}>
        <SizableText marginLeft={15} style={{ fontFamily: 'Gotham-Bold' }} size={'$8'} color={'black'}>
          {bar.nom}
        </SizableText>
        <XStack gap={'$3'} marginLeft={15}>
          <FontAwesomeIcon icon={faLocationDot} color="#05123B" size={25} />
          <SizableText style={{ fontFamily: 'Gotham-Medium' }} color={"black"} size={'$5'} flexShrink={1}>
            {bar.address}
          </SizableText>
        </XStack>
        <XStack gap={'$3'} marginLeft={15}>
          <FontAwesomeIcon icon={faFilter} color="#05123B" size={25} />
          <ScrollView horizontal>
          <SizableText size="$5" paddingLeft={20} style={{ fontFamily: 'Gotham-Medium' }} color={"black"}>
            {bar.ambiance_Musicale}
          </SizableText>
          <SizableText size="$5" paddingLeft={20} style={{ fontFamily: 'Gotham-Medium' }} color={"black"}>
            {bar.nouriture}
          </SizableText>
          <SizableText size="$5" paddingLeft={20} style={{ fontFamily: 'Gotham-Medium' }} color={"black"}>
            {bar.boisson}
          </SizableText>
          <SizableText size="$5" paddingLeft={20} style={{ fontFamily: 'Gotham-Medium' }} color={"black"}>
            {bar.espaceExterieur}
          </SizableText>
          </ScrollView>
        </XStack>
        <XStack gap={'$3'} marginLeft={15}>
          <FontAwesomeIcon icon={faPenToSquare} color="#05123B" size={25} />
          <Paragraph size="$4" fontWeight="800" style={{ fontFamily: 'Gotham-Medium' }} flexShrink={1} color={"black"}>
            {bar.description}
          </Paragraph>
        </XStack>
        <XStack gap={'$3'} marginLeft={15}>
          <FontAwesomeIcon icon={faClock} color="#05123B" size={25} />
          <SizableText style={{ fontFamily: 'Gotham-Medium' }} color={"black"} size={'$5'} flexShrink={1}>
            {bar.horaire_ouverture} - {bar.horaire_fermeture}
          </SizableText>
        </XStack>
        <MenuVisibility IsMenu={bar.IsMenu} Menus={bar.Menu} />
        <ReviewRender Reviews={reviews} wantReview={bar.wantReview}/>
      </YStack>
      <YStack marginTop={15} gap={25}>
        <SizableText marginLeft={15} style={{ fontFamily: 'Gotham-Bold' }} size={'$8'} color={'black'}>
          Où nous trouver ?
        </SizableText>
        <MapView style={{ width: Dimensions.get('screen').width, height: 300 }} scrollEnabled={false} rotateEnabled={false}
          initialRegion={{
            latitude: bar.latitude,
            longitude: bar.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}>
          <Marker coordinate={{ latitude: bar.latitude, longitude: bar.longitude }} />
        </MapView>
        <Button
          style={{ fontFamily: 'Gotham-Black' }}
          alignSelf="center"
          color={"white"}
          borderRadius={15}
          backgroundColor={"#05123B"}
          onPress={handlePress}
        >
          <SizableText color={"white"}>Je m'y rends</SizableText>
        </Button>
      </YStack>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
