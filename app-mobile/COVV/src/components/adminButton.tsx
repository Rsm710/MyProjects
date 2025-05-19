import React from "react";
import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect } from "expo-router";
import { Button } from "tamagui";
import { Link } from "expo-router";
import { SizableText } from "tamagui";
import type { GestureResponderEvent } from "react-native";

export default function AdminButton(props : {onPress?: ((event: GestureResponderEvent) => void) | null | undefined}){
    const {onPress} = props;
    const {isAdmin} = useAuth();

    if(!isAdmin){
      return;
    }
    else{
        return(
            <Link href={'/(admin)'} asChild>
                 <SizableText size="$9" onPress={onPress}>Admin pannel</SizableText>
            </Link>
        );
    }
}