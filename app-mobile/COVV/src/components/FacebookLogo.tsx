import { Button } from "tamagui";
import { Facebook } from "@tamagui/lucide-icons";
import { Linking } from "react-native";
import { useCallback } from "react";
export default function FacebookLogo(props : {isSet:string|null}){
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
            <Button circular icon={Facebook} onPress={handlePress} size={"$6"} borderColor={"$blue5"} color={"$blue9"} backgroundColor={"$blue5"} scaleIcon={1.4}/>
        );
    }
}