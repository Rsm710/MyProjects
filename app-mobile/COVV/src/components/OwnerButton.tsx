import React from "react";
import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect } from "expo-router";
import { Button } from "tamagui";
import { Link } from "expo-router";
import { SizableText } from "tamagui";
import type { GestureResponderEvent } from "react-native";

export default function OwnerButton(props : {onPress?: ((event: GestureResponderEvent) => void) | null | undefined}){
    const {onPress} = props;
    const {isOwner,isAdmin} = useAuth();

    if(!isOwner && !isAdmin){
      return;
    }
    else{
        return(
            <Link href={'/(owner)/myBar'} asChild>
                 <SizableText size="$9" onPress={onPress}>My Bars</SizableText>
            </Link>
        );
    }
}