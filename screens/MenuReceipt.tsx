import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MenuReceipt = () => {
  return (
    <View>
      <Text style={styles.header}>Receipt</Text>
      <Text style={styles.subheader}>View your order here!</Text>
    </View>
  )
}

export default MenuReceipt
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: 'underline',
    paddingTop: 10,
    paddingBottom: 10,
  },
  subheader: {
    fontSize: 16,
  },
});