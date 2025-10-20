import React from 'react'
import { View, Text } from 'react-native'
import Menu from '../components/Menu'
import Tab from '../components/Tab'


const MainMenu = () => {
  return (
    <View>
      <Menu />
      <Text>Menu</Text>
      <Tab />
    </View>
  )
}

export default MainMenu