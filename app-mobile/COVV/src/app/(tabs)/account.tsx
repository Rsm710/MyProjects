import RemoteImage from "@/src/components/RemoteImage";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/provider/AuthProvider";
import { User } from "@supabase/supabase-js";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Button, SizableText, View, YStack } from "tamagui";



async function deleteAccount(user:User){
    const { data, error } = await supabase.auth.admin.deleteUser(
        user.id
      )

}

async function logout(){
    const { error } = await supabase.auth.signOut()
}

export default function account(){
    const {username,profilePicture} = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    return(
        <View backgroundColor={'white'} width={"100%"} height={"100%"} justifyContent="center" borderBlockStartColor={"black"} borderBlockStartWidth={"$0.5"}>
            <YStack gap="$7" marginBottom="$12">
            <SizableText style={{fontFamily: 'Gotham-Medium'}} color={"#05123B"} alignSelf="center" size={"$9"}>Mon compte</SizableText>
            </YStack>
            <YStack gap="$3" marginBottom="$20">
                <Button  style={{fontFamily: 'Gotham-Black'}} alignSelf="center" backgroundColor={"#05123B"} color={"white"} borderRadius={15} onPress={()=>{router.navigate("/editAccount")}}>
                    <SizableText color={"white"}>Modifier Mon Profil</SizableText>
                </Button>
                <Button style={{ fontFamily: 'Gotham-Black' }}
                    color={"white"}
                    borderRadius={15}
                    backgroundColor={"#05123B"} 
                    alignSelf="center"
                    onPress={() => logout()}>
                    <SizableText color={"white"}>Se Déconnecter</SizableText>
                </Button>
            </YStack>
            <Button style={{ fontFamily: 'Gotham-Black' }}
                    alignSelf="center"
                    marginTop="$15"
                    borderRadius={15}
                    backgroundColor={"white"} 
                    onPress={() => deleteAccount(user)}>
                    <SizableText color={"black"} textDecorationLine="underline">Supprimer Mon Compte</SizableText>
                </Button>
        </View>
    )
}