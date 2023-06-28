import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collections";
import { auth, firestore } from "firebase";

const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, { backgroundColor: color }]}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onOptions}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const addListIcon = (navigation, addItemToList,usernamestate) => {
  return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => navigation.navigate("MyProfile")}
        >
          <Ionicons name="person" size={26} />
          <Text>{usernamestate.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ justifyContent: "center", marginCenter: 0 }}
          onPress={() =>
            navigation.navigate("Edit", { saveChanges: addItemToList })
          }
        >
          <Text style={styles.icon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: "center", marginRight: 4 }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings" size={26} />
        </TouchableOpacity>
      </View>
  );
};

export default ({ navigation }) => {
  const [usernamestate, setUserNamestate] = useState([]);
  const [lists, setLists] = useState([]);

  const dbuserName = firestore().collection("users").doc(auth().currentUser.uid).get();

  const listsRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists");

    useEffect(async() => {
      setUserNamestate((await dbuserName).data())
    }, []);

  useEffect(() => {
    onSnapshot(listsRef,(newLists) => {setLists(newLists);
      },
      {
        sort: (a, b) => {
          if (a.index < b.index) {
            return -1;
          }
          if (a.index > b.index) {
            return 1;
          }
          return 0;
        },
      }
    );
  }, []);
  const removeItem = (id) => {
    removeDoc(listsRef, id);
  };
  const addItemToList = ({ title, color }) => {
    const index = lists.length > 1 ? lists[lists.length - 1].index + 1 : 0;
    addDoc(listsRef, { title, color, index });
  };
  const updatItemList = (id, item) => {
    lists[id] = item;
    updateDoc(listsRef, id, item);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => addListIcon(navigation, addItemToList,usernamestate),
    });
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item: { title, color, id, index } }) => {
          return (
            <ListButton
              title={title}
              color={color}
              onPress={() => {
                navigation.navigate("ToDoList", { title, color, listId: id });
              }}
              onDelete={() => {
                removeItem(id)
              }}
              onOptions={() => {
                navigation.navigate("Edit", {
                  title,
                  color,
                  saveChanges: (newItem) =>
                    updatItemList(id, { index, ...newItem }),
                });
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
    backgroundColor: "#fff",
  },
  itemTitle: { fontSize: 24, padding: 5, color: "white" },
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
  icon: {
    padding: 5,
    fontSize: 24,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

