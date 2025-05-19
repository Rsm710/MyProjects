import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Spinner } from 'tamagui';
import { View } from 'react-native';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
  isPP :boolean;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback,isPP=false,...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from('bar-images')
        .download(path);1

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
            console.log("hello");
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  if (!image) {
    if (isPP){
      return(
        <Image source={{ uri: image || fallback }} {...imageProps} />
      );
    };
    return (
        <View style={{alignItems:"center",justifyContent:'center',alignSelf:'center'}}>
            <Spinner size='large' color={'$orange10'} alignSelf='center'/>
        </View>
    );
  }

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;