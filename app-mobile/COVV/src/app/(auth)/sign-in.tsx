import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Input,SizableStack, SizableText } from "tamagui";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import { supabase } from "@/src/lib/supabase";

export default function SignIn(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    async function singInWithEmail(){
        const {error} = await supabase.auth.signInWithPassword({
            email:email,
            password: password,
        });
        if (error) Alert.alert("erreur lors de la connexion");
    }
    return(
        <View
        style={{padding:20,justifyContent:'center',flex:1,backgroundColor:'white'}}>
            <SizableText size={"$5"} color={'#05123B'} style={{ fontFamily: 'Gotham-Medium' }}>Adresse e-mail</SizableText>
            <Input size={'$5'} placeholder="Adresse e-mail" autoCapitalize="none" onChangeText={setEmail}/>
            <SizableText size={"$5"} color={'#05123B'} marginTop={20} style={{ fontFamily: 'Gotham-Medium' }}>Mot de passe</SizableText>
            <Input size={'$5'} secureTextEntry onChangeText={setPassword}/>
            <Button size={'$5'} alignSelf="center" marginTop={20} backgroundColor={'#05123B'} color={'white'} onPress={singInWithEmail} disabled={loading}>{loading ? "Connexion" : "Se connecter"}</Button>
            <Link href={'/sign-up'} style={{alignSelf:'center',marginTop:20}}>
                <SizableText color={'$blue10Light'}>Créer un compte</SizableText>
            </Link>
            <Link href={'/(unconnected)'} style={{alignSelf:'center',marginTop:20}}>
                <SizableText color={'$blue10Light'}>Continuer sans se connecter</SizableText>
            </Link>
        </View>
    );
}