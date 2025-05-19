import { Marker } from "react-native-maps"
import { supabase } from "../lib/supabase";

export default function CustomMarker(props : {Bar:bar}){
  const {Bar} = props;
    return(
    <Marker
            coordinate={{latitude:Bar.latitude, longitude:Bar.longitude}}
            title={Bar.nom}
          />
    )
}