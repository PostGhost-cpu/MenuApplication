import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Menu from '../components/Menu'
import Tab from '../components/Tab'


const MainMenu = () => {
  return (
    <View>
      <Menu />
      <Text style={styles.header}>Menu</Text>

      

      <Tab />
    </View>
  )
}

export default MainMenu
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
});