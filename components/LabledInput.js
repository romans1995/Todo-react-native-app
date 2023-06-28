import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Coloers from "../constants/Coloers";

export default ({
    labelStyle,
    label,
    errorMessage,
    inputStyle,
    text,
    onChangeText,
    ...inputProps
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={labelStyle}>{label}</Text>
                <Text style={styles.error}>
                    {errorMessage && `*${errorMessage}`}
                </Text>
            </View>
            <TextInput
                underlineColorAndroid="transparent"
                selectionColor="transparent"
                style={[styles.input, inputStyle]}
                value={text}
                onChangeText={onChangeText}
                {...inputProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        
        paddingHorizontal: 18,
        margin: 14,
    },
    labelContainer: { flexDirection: "row", marginBottom: 40 },
    error: {
        color: Coloers.red,
        fontSize: 12,
        marginLeft: 4,
    },
    input: {
        borderBottomColor: Coloers.lightGray,
        borderBottomWidth: 1,
        paddingLeft: 4,
        height: 32,
        fontSize: 24,
        color:Coloers.black,
    },
});
