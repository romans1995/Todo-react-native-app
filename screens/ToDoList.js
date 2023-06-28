import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ToDoItem from "../components/ToDoItem";
import {
  onSnapshot,
  addDoc,
  removeDoc,
} from "../services/collections";
import { firestore, auth } from "firebase";

const addListIcon = (addItemToList, addone) => {
  return (
    <TouchableOpacity
      onPress={() =>
        addItemToList({
          text: "",
          key: addone,
          isChecked: false,
          isNewItem: true,
        })
      }
    >
      <Text style={styles.icon}>➕</Text>
    </TouchableOpacity>
  );
};
export default ({ navigation, route }) => {
  const [counter, setCounter] = useState(0);
  let [toDoItems,setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState();
  const toDoItemRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists")
    .doc(route.params.listId)
    .collection("todoItems");

  useEffect(() => {
    onSnapshot(
      toDoItemRef,
      (newToDoitems) => {
        setToDoItems(newToDoitems);
      },
      {
        sort: (a, b) => {
          if (a.isChecked && !b.isChecked) {
            return 1;
          }
          if (b.isChecked && !a.isChecked) {
            return -1;
          }
          return 0;
        },
      }
    );
  }, []);



  const removeItem = (index) => {
    toDoItems.splice(index, 1);
    setToDoItems([...toDoItems]);
  };
  const addItemToList = () => {
    setNewItem({ text: "", isChecked: false, new: true });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => addListIcon(addItemToList),
    });
  });
  if (newItem) {
    toDoItems = [newItem, ...toDoItems];
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={toDoItems}
        renderItem={({
          item: { text, isChecked, id, ...params },
          index,
          counter,
        }) => {
          return (
            <ToDoItem
            {...params}
            text={text}
            isChecked ={isChecked}   
            onChecked={() => {
              let data ={text, isChecked: !isChecked};
              if(id){
                data.id = id;
              }
              addDoc(toDoItemRef, data);
            }}
              newItem={newItem}
              removeItem={() => {
                params.new ? setNewItem(null) : removeItem(index);
                id && removeDoc(toDoItemRef, id);
              }}
              style={styles.container}
              key={index + counter++}
              onChangeText={(newText) => {
                if (params.new) {
                  setNewItem({
                    text: newText,
                    isChecked,
                    new: params.new,
                  });
                } else {
                  toDoItems[index].text = newText;
                  setToDoItems([...toDoItems]);
                }
              }}
              onBlur={() => {
                if (text.length > 1) {
                  let data = { text, isChecked };
                  if (id) {
                    data.id = id;
                  }
                  addDoc(toDoItemRef, data);
                  params.new && setNewItem(null);
                } else {
                  params.new ? setNewItem(null) : removeItem(index);
                }
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    padding: 5,
    fontSize: 32,
    color: "white",
  },
});