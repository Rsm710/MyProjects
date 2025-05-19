import { Button } from "tamagui";
import { Instagram } from "@tamagui/lucide-icons";
import { Linking } from "react-native";
import { useCallback } from "react";
export default function InstaLogo(props : {isSet:string|null}){
    const {isSet} = props;
    if(isSet!=null){
        const handlePress = useCallback(async () =>{
            const supported = await Linking.canOpenURL(isSet);
            if(supported){
                await Linking.openURL(isSet);
            }else{
            }
        },[isSet]);
        return(
            <Button circular icon={Instagram} onPress={handlePress} size={"$6"} borderColor={"$orange5"} color={"$orange9"} backgroundColor={"$orange5"} scaleIcon={1.4}/>
        );
    }
}