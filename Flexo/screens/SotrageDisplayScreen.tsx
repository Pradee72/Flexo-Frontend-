import { StyleSheet, View } from "react-native";
import Colors from "../constant/Colors";

export const StorageDisplayScreen = () => {
    return (
        <View style={style.container}></View>
    )
};

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.secondaryWhite,
    },
});