import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth ,firestore,storage} from "firebase/app";
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytes } from "firebase/storage";

const uploadImageToStorage = (path, imageName) => {
  let reference = storage().ref(imageName);         // 2
  let task = reference.putFile(path);               // 3

  task.then(() => {                                 // 4
      console.log('Image uploaded to the bucket!');
  }).catch((e) => console.log('uploading image error => ', e));
}

const metadata = {
  contentType: 'image/jpeg'
};

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(null);



  

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let path = result.uri;
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    if (!result.fileName) result.fileName = path.split("/").pop() + `.JPG`;
  };

 
 


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}