import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import Colors from "../constants/Coloers";
import Coloers from "../constants/Coloers";
import LabledInput from "../components/LabledInput";
import validator from "validator";
import { auth ,firestore} from "firebase/app";
import 'firebase/firestore';

const validateFields = (email, password,name) => {
  const isValid = {
    name:!validator.isEmpty(name),
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  }
  return isValid;
}
const login = (email, password) => {
    auth()
    .signInWithEmailAndPassword(email,password)
    .then((user) => {
        console.log("Logged in");
    })
}
const createAccount = (email, password,name) => {
  auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
          console.log("Creating user...");
            firestore()
            .collection("users")
            .doc(user.uid)
            .set({name});
      });
}
export default () => {
  const [isCreateMode, setCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });
  const [firstName, setFirstName] = useState({
    text: "",
    errorMessage: "",
  });
  return (
    <View>
      <Text style={styles.header}>🌈ColorFull ToDo</Text>
      <View style={{ flex: 1 }}>
      {isCreateMode && (
          <LabledInput
            label="First name"
            text={firstName.text}
            onChangeText={(text) => {
              setFirstName({ text })
            }}
            errorMessage={firstName.errorMessage}
            labelStyle={styles.label}
            autoCompleteType={"name"}
          />
        )}

        <LabledInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType={"email"}
        />

        <LabledInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({ text })
          }}
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="password"
        />
        {isCreateMode && (
          <LabledInput
            label="Re-Enter Password"
            text={passwordReentryField.text}
            onChangeText={(text) => {
              setPasswordReentryField({ text })
            }}
            secureTextEntry={true}
            errorMessage={passwordReentryField.errorMessage}
            labelStyle={styles.label}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setCreateMode(!isCreateMode)
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Coloers.blue,
              fontSize: 16,
              margin: 4,
            }}
          >
            
            {isCreateMode ? "Alerdy have an account? " : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => {
          const isValid = validateFields(emailField.text, passwordField.text,firstName.text);
          let isAllValid = true;
          if(isCreateMode ? !isValid.name : null ){
            firstName.errorMessage = "Please enter your name";
            setFirstName({...firstName})
            isAllValid = false
          }
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valied email";
            setEmailField({ ...emailField })
            isAllValid = false
          }
          if (!isValid.password) {
            passwordField.errorMessage =
              "Password must be at least 8 long with numbers with uppercase and lowercase characters ";
            setPasswordField({ ...passwordField })
            isAllValid = false
          }
          if (
            isCreateMode ?
            passwordReentryField.text !== passwordField.text : null
          ) {
            passwordReentryField.errorMessage =
              "Password Re-enter field must to match with the password field";
            setPasswordReentryField({ ...passwordReentryField })
            isAllValid = false
          }
          if (isAllValid) {
            isCreateMode
              ? createAccount(emailField.text, passwordField.text,firstName.text)
              : login(emailField.text, passwordField.text)
          }
        }}
        style={{ backgroundColor: "linear-gradient(#e66465, #9198e5)" }}
        text={isCreateMode ? "Create Acount" : "Login"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    label: { fontSize: 16, fontWeight: "bold", color: Colors.black, },
    header: { fontSize: 72, color: Colors.red, alignSelf: "center" },
  duble: { backgroundColor: 'hsla(360, 100%, 100%, 1.0)' },
});
