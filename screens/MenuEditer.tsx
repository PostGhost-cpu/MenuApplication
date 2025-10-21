import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MenuEditer = () => {
  return (
    <View>
      <Text style={styles.header}>Editer</Text>
      <Text style={styles.subheader}>Editer options here.</Text>
    </View>
  )
}

export default MenuEditer
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