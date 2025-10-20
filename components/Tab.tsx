import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabParams } from "../App";

const Tab = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParams>>();
    return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('Editer')}>
            <Text>Editer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Text>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Receipt')}>
            <Text>Receipt</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Tab;