import React from "react";
import { StyleSheet, View, TouchableOpacity} from "react-native";
import Coloers from "../constants/Coloers";

const ColorButton = ({onPress,onSelect ,color}) => {
    
    return(
    <TouchableOpacity
    onPress={onPress}
    style={[styles.ColorButton,{borderWidth:onSelect ? 3 : 0, backgroundColor:color}]}/>
    );
}
export default ({selectedColor,colorOptions,onSelect}) => {
    return (
        <View style={styles.container}>
            {colorOptions.map((colorName) => {
                return(
                <ColorButton
                 onPress={()=>onSelect(Coloers[colorName])}
                    color={Coloers[colorName]}
                     isSelected={Coloers[colorName] == selectedColor}
                     />
                     );
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    ColorButton: {
        height: 32,
        width: 32,
        borderColor:Coloers.lightGray,
        borderRadius: 24,
        margin: 10,
    }
  });