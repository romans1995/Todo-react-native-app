import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";
import Login from "./screens/Login";
import MyProfile from "./screens/MyProfile";
import Settings from "./screens/Settings";
import Colors from "./constants/Coloers";
import firebase from "firebase/app";
import "firebase/firestore";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import { projectFirestore } from "./services/config";



const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ColorFull ToDo" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen
        name="Edit"
        component={EditList}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit:${route.params.title} list`
              : "Create new list",
            headerStyle: { backgroundColor: route.params.color || Colors.blue },
            headerTintColor: "white",
          };
        }}
      />
      <Stack.Screen
        name="ToDoList"
        component={ToDoList}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: { backgroundColor: route.params.color },
            headerTintColor: "white",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default function App(props) {
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((User) => {
      console.log("cheking auth state...");
      if (User) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  const [isAuthnticated, setIsAuthenticated] = useState(false);
  return (
    <NavigationContainer>
      {isAuthnticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}
const firebaseConfig = {
  projectFirestore
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
