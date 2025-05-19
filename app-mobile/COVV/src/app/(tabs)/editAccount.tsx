import { useState } from "react";
import { Button, Input, SizableStack, SizableText, View, YStack } from "tamagui";
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "@/src/provider/AuthProvider";
import { useUpdateProfile } from "@/src/api/bars";
import * as FileSystem from 'expo-file-system';
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
export default function EditAccount(){
    const{id} = useAuth();
    const{mutate:updateProfile,error} = useUpdateProfile();
    const[username,setUsername] = useState("");
    const[profilePicture,setProfilePicture] = useState("");
    const pickImageAsync= async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            quality:1,
            aspect:[380,180],
        });
        if(!result.canceled){
            setProfilePicture(result.assets[0].uri);
        }else{
            alert('you did not select any image')
        }
    };
    const onPress = async ()=>{
        const profilePicturePath = await uploadImage();
        updateProfile({id,username});
        if(error){

        }
        else{
            router.back();
        }
    }
    const uploadImage = async () => {
        if (!profilePicture?.startsWith('file://')) {
          return;
        }
        const base64 = await FileSystem.readAsStringAsync(profilePicture, {
          encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
          .from('bar-images')
          .upload(filePath, decode(base64), { contentType });
      
        if (data) {
          return data.path;
        }
      };
    return(
        <View backgroundColor={"white"} height={"100%"}>
            <SizableText style={{ fontFamily: 'Gotham-Black' }} marginBottom={"$5"} alignSelf="center" size={"$7"} color={'#05123B'}>Modifier le profil</SizableText>
            <YStack gap={"$6"}>
            <YStack gap={"$2"}>
            <SizableText  style={{ fontFamily: 'Gotham-Medium' }} size={"$5"} marginStart="$4" color={'#05123B'} marginTop={20}>Nom d'utilisateur</SizableText>
            <Input size={'$5'} placeholder="Nom d'utilisateur"   onChangeText={setUsername}/>
            </YStack>
                <Button style={{ fontFamily: 'Gotham-Black' }}
                    alignSelf="center"
                    color={"white"}
                    borderRadius={40}
                    backgroundColor={"#05123B"} 
                    onPress={onPress}
                    >
                    <SizableText color={"white"} size={"$6"}>appliquer</SizableText>
                </Button>
            </YStack>
        </View>
    )
}