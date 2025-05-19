import React from "react";
import {XStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import RenderMenu from "./RenderMenu";
import {faBook} from '@fortawesome/free-solid-svg-icons/faBook';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
export default function MenuVisiBility(props : {IsMenu:boolean,Menus:string[]}){
    const {IsMenu,Menus} = props;

    if(!IsMenu){
      return;
    }
    else{
        return(
            <XStack gap={'$3'} marginLeft={15}>
                <FontAwesomeIcon icon={faBook} color="#05123B" size={25} style={{alignSelf:'center'}}/>
                <FlashList
                    data={Menus}
                    renderItem={({item})=><RenderMenu Menu={item}/>}
                    estimatedItemSize={200}
                    horizontal
                    style={{alignSelf:'center'}}
                />
            </XStack>
        );
    }
}