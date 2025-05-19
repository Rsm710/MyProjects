import React from "react";
import RemoteImage from "./RemoteImage";
import { Card, View } from "tamagui";
import { Modal,Pressable,TouchableOpacity } from "react-native";
import { useState } from "react";
export default function RenderMenu(props : {Menu:string}){
   const {Menu} = props;
   const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginRight:20}}>
        <Card elevate size={"$5"} width={200} height={200} alignSelf="center" overflow="hidden" borderRadius={"$5"} animation={"quickest"} pressStyle={{scale:0.875}}  onPress={()=>{
            console.log("Image pressed"); // Check if this logs when the image is pressed
            setModalVisible(true);
        }}>
            <Card.Header >     
            <RemoteImage
                        style={{width:200,aspectRatio:1}}
                        path={Menu}
                        fallback="http/pvsrdumazwathfmlrl.supabase.co/storage/v1/object/sign/bar-images/ac078bc2-9e55-4c15-803a-a589bce7d630.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXItaW1hZ2VzL2FjMDc4YmMyLTllNTUtNGMxNS04MDNhLWE1ODliY2U3ZDYzMC5wbmciLCJpYXQiOjE3MTMyNzY0NzYsImV4cCI6MTcxMzg4MTI3Nn0.ZU8uXtcPLf3fG6lh6-IGcNtzog5QPiGGwk1tIYXWfpU&t=2024-04-16T14%3A07%3A56.651Z"
                    />
            </Card.Header>
            <Card.Footer paddingLeft={8}>
            </Card.Footer>
            <Card.Background backgroundColor={'white'}>
            </Card.Background>
        </Card>
        <Modal
            visible={modalVisible}
            transparent={false}
            animationType="slide"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
            <RemoteImage
                        style={{aspectRatio:1,height:"100%",with:'100%',resizeMode:"center"}}
                        path={Menu}
                        fallback="http/pvsrdumazwathfmlrl.supabase.co/storage/v1/object/sign/bar-images/ac078bc2-9e55-4c15-803a-a589bce7d630.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYXItaW1hZ2VzL2FjMDc4YmMyLTllNTUtNGMxNS04MDNhLWE1ODliY2U3ZDYzMC5wbmciLCJpYXQiOjE3MTMyNzY0NzYsImV4cCI6MTcxMzg4MTI3Nn0.ZU8uXtcPLf3fG6lh6-IGcNtzog5QPiGGwk1tIYXWfpU&t=2024-04-16T14%3A07%3A56.651Z"
                    />
          </TouchableOpacity>
        </View>
        </Modal>
        </View>
    );
}