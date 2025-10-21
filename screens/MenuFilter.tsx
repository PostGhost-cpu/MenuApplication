import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MenuFilter = () => {
  return (
    <View>
      <Text style={styles.header}>Filter</Text>
      <Text style={styles.subheader}>Filter options will go here.</Text>
    </View>
  )
}

export default MenuFilter
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