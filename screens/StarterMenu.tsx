import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import Menu from '../components/Menu'
import Tab from '../components/Tab'
import { starterArray, StarterData } from '../components/StarterList'

const ListItem = ({singleBlock}:{singleBlock:StarterData}) => {
  return (
    <View style={styles.menuoption}>
      <Image source={{ uri: singleBlock.img }} />
      <Text>{singleBlock.name}</Text>
      <Text>{singleBlock.price}</Text>
      <Text>{singleBlock.description}</Text>
    </View>
  )
}

const StarterMenu = () => {
  return (
    <View>
      <Menu />
      <Text style={styles.header}>Menu</Text>
      <FlatList
        data={starterArray}
        renderItem={({ item }) => <ListItem singleBlock={item} />}
      />
      <Tab />
    </View>
  )
}

export default StarterMenu
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
  menuoption: {
    marginBottom: 20,
  },
});