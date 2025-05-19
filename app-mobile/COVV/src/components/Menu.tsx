import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, View,Text,Modal} from 'react-native';
import {YStack,SizableText } from 'tamagui';
import { Link } from 'expo-router';
import { useAuth } from '../provider/AuthProvider';
import { supabase } from '../lib/supabase';
import AdminButton from './adminButton';

export default function CustomMenu(){
    return(
        <YStack gap={10} alignContent="flex-start">
            <Link href='/' asChild>
            <SizableText size="$9">Propose nous ton bar</SizableText>
            </Link>
            <Link href='/' asChild>
            <SizableText size="$9">Nos partenaires</SizableText>
            </Link>
            <Link href='/NotreHistoire' asChild>
            <SizableText size="$9">Notre Histoire</SizableText>
            </Link>
            <Link href='/' asChild>
            <SizableText size="$9" >Aide & mention légales</SizableText>
            </Link>
            <Link href='/' asChild>
            <SizableText size="$9" onPress={()=>supabase.auth.signOut()}>Déconnexion</SizableText>
            </Link>
            <AdminButton/>
        </YStack>
    );
}
