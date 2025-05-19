import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Input,SizableStack, SizableText } from "tamagui";
import { Redirect, router, Stack } from "expo-router";
import { Link } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export default function SignUp(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    async function signUpWithEmail() {
        const {error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    group : 'USER',
                    fav : new Array<number>,
                    mail : email
                }
            }
        });
        if (error) Alert.alert(error.message);
        else{
            Alert.alert("Un mail vous a été envoyé afin de valider votre compte");
            router.navigate("/sign-up");
        }
        }
        
    
    return(
        <View
        style={{padding:20,justifyContent:'center',flex:1,backgroundColor:'white'}}>
            <SizableText size={"$4"} color={'#05123B'} style={{ fontFamily: 'Gotham-Medium' }}>Adresse e-mail</SizableText>
            <Input size={'$5'} placeholder="Adresse e-mail" autoCapitalize="none" onChangeText={setEmail}/>
            <SizableText size={"$4"} color={'#05123B'} style={{ fontFamily: 'Gotham-Medium' }} marginTop={20}>Mot de passe</SizableText>
            <Input size={'$5'} secureTextEntry onChangeText={setPassword}/>
            <Button size={'$5'} alignSelf="center" marginTop={20} backgroundColor={'#05123B'} color={'white'} onPress={signUpWithEmail} disabled={loading}>{loading ? "Creation du compte..." : "Creer un compte"}</Button>
            <Link href={'/sign-in'} style={{alignSelf:'center',marginTop:20}}>
                <SizableText color={'$blue10Light'}>Se connecter</SizableText>
            </Link>
        </View>
    );
}