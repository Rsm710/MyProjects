import { View } from "tamagui";
import { SizableText } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import ReviewListItem from "./ReviewListItem";
interface Review {
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }
export default function ReviewRender(props : {Reviews:Review[],wantReview:boolean}){
    const renderItemSeparator = () =>{
        return <View style={{height:48}}/>
    }
    const {Reviews,wantReview} = props;
    if(wantReview){
        return(
            <View>
            <SizableText marginLeft={15} style={{ fontFamily: 'Futura-Bold' }} size={'$9'} color={'black'}>Avis</SizableText>
            <FlashList
            ItemSeparatorComponent={renderItemSeparator}
            drawDistance={150}
            numColumns={1}
            data={Reviews}
            renderItem={({item}) => <ReviewListItem Review={item} loading/>}
            estimatedItemSize={100}
            ListFooterComponent={renderItemSeparator}
            />
            </View>
        );
    }
}