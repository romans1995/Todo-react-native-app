import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import Colors from "../constants/Coloers";
import { CommonActions } from "@react-navigation/routers";
import ColorSelector from "../components/ColorSelector";

const colorList = [
  "blue",
  "teal",
  "green",
  "olive",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blueGray",
];
export default ({ route, navigation }) => {
  const [title, setTitle] = useState(route.params.title || null);
  const [valid, setValid] = useState(false);
  const [color, setColor] = useState(route.params.color || Colors.blue);

  return (
    <View style={styles.container}>
      <View>
        {valid && (
          <Text style={{ color: "red" }}>List Name can't be empty :/</Text>
        )}
        <Text style={styles.label}>List Name</Text>
        <TextInput
          selectionColor={"transparent"}
          underlineColorAndroid={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={setTitle}
          placeholder={"add new List name here"}
          maxLength={30}
          style={((styles.input, { outline: "none" }), { fontSize: 30 })}
        />

        <Text style={styles.label}>Choose color </Text>
        <ColorSelector
          onSelect={(color) => {
            setColor(color)
            navigation.dispatch(CommonActions.setParams({ color }))
          }}
          selectionColor={color}
          colorOptions={colorList}
        />
      </View>

      <Button
        text="Save"
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title, color })
            navigation.dispatch(CommonActions.goBack())
          } else {
            setValid(true)
          }
        }}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    color: Colors.darkGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  label: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
