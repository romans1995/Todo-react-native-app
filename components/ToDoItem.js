import React, { useState } from "react";
import { Card } from "react-native-elements/dist/card/Card";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../constants/Coloers";
import CheckboxComponent from "./Checkbox";

const EditablText = ({isChecked,onChangeText,text,isNewItem,...props}) => {
  const [isEditMode, setEditMode] = useState(props.new);
  return (
    <TouchableOpacity
      style={styles.text}
      onPress={() => {
        !isChecked && setEditMode(true);
      }}
    >
      {isEditMode ? (
        <TextInput
          selectionColor={"transparent"}
          underlineColorAndroid={"transparent"}
          autoFocus={true}
          value={text}
          onChangeText={onChangeText}
          placeholder={"add new text here"}
          onSubmitEditing={() => {}}
          maxLength={30}
          style={(styles.input, { outline: "none" })}
          onBlur={() => {
            props.onBlur && props.onBlur()
            setEditMode(false)
          }}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: isChecked ? Colors.gray : Colors.black,
              textDecoration: isChecked ? "line-through" : "none",
            },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default ({ text, isChecked, onChecked, removeItem, onChangeText ,...props}) => {
  

  return (
    <Card style={styles.itemContainer}>
      <View style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <CheckboxComponent
         isChecked={isChecked}
          onChecked={onChecked} />
        <EditablText text={text}
         onChangeText={onChangeText}
          isChecked={isChecked}
         
          {...props}
          />
      </View>
      
        <TouchableOpacity style={styles.trash} onPress={removeItem}>
          <Ionicons
            name="close-outline"
            size={24}
            color="red"
            onDelete={() => {
              removeItem(index)
            }}
          />
        </TouchableOpacity>
        </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    padding: 5,
    fontSize: 32,
  },
  text: {
    padding: 3,
    fontSize: 16,
    color: Colors.black,
  },
  input: {
    color: Colors.black,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 25,
    fontSize: 16,
},
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  trash:{
    display:"flex",
    justifyContent:"flex-end",
  }
});
