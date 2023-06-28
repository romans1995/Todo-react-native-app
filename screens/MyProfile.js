 import React, {  useState, useEffect } from "react";
 import {
   StyleSheet,
   Text,
   View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { auth, firestore } from "firebase/app";
import Coloers from "../constants/Coloers";
import CurryImagePicker from "../components/CurryImagePicker";

export default(props) => {

 const setUserImage = (image) =>{
    props.setFieldValue('imageUri', image.uri);
  }

    const [usernamestate, setUserNamestate] = useState([]);
  const dbuserName = firestore().collection("users").doc(auth().currentUser.uid).get();
useEffect(async() => {
  setUserNamestate((await dbuserName).data())
}, []);
  
  return (
    <View style={{margin:"auto"}}>
      <CurryImagePicker image={props.image} onImagePicked={setUserImage}/>
      <View>
      <Ionicons name="person" size={26}  style={{margin:"auto"}}/>
        <Text style={styles.label}>Name: {usernamestate.name}</Text>
      </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  label: { fontSize: 16, fontWeight: "bold", color: Coloers.black },
  header: { fontSize: 72, color: Coloers.red, alignSelf: "center" },
  
});
