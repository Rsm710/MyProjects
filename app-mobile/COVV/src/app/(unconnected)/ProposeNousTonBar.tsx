import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Input,SizableStack, SizableText } from "tamagui";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { useInsertProposition } from "@/src/api/bars";
import { ScrollView } from "tamagui";
export default function ProposeNousTonBar(){
    const [nom,setNom] = useState('');
    const [address,setAddress] = useState('');
    const [loading,setLoading] = useState(false);
    const [contact,setContact] = useState('');
    const {mutate:insertProposition} = useInsertProposition();
    function valideInput(){
        if(nom==('')) return false;
        if(address==('')) return false;
        return true;
    }
    async function SendForm(){
        setLoading(true);
        if(!valideInput()){
            setLoading(false);
            return;
        }
        insertProposition(
            {nom,address,contact},
            {
                onSuccess:()=>{
                    setLoading(false);
                    router.back();
                },
                onError:()=>{
                    setLoading(false);
                }
            }
        );
    };
    return(
        <ScrollView
        style={{padding:20,flex:1,backgroundColor:"white"}}>
            <SizableText size={"$4"} color={'gray'}>Nom de de l'etablissement</SizableText>
            <Input size={'$5'} placeholder="nom" autoCapitalize="none" onChangeText={setNom}/>
            <SizableText size={"$4"} color={'gray'} marginTop={20}>ville</SizableText>
            <Input size={'$5'} placeholder="Ville" onChangeText={setAddress}/>
            <Button size={'$5'} alignSelf="center" marginTop={20} backgroundColor={'#05123B'} color={'white'} onPress={SendForm} disabled={loading}>{loading ? "validation..." : "valider"}</Button>
        </ScrollView>
    );
}