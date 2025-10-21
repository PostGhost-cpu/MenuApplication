import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../App';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.header}>Your table is ready.</Text>
      <Text style={styles.subheader}>Explore our dishes and discover the chefs specials</Text>
    </View>
    <View style={styles.splashcontainer}>
        <TouchableOpacity style={styles.touchable} activeOpacity={0.7}
          onPress={() => navigation.navigate("Starter Menu")}>
          <Text>Get Started</Text>
        </TouchableOpacity>
    </View>
    </>
  )
}

export default SplashScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  splashcontainer: {
    alignItems: "center",
    backgroundColor: "#fff3b0",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
  },
  touchable: {
    color: "#000",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});