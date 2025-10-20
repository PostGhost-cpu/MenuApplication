import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CartIcon from '../assets/icon-cart.svg'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParams } from '../App';

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext: string) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <>
    <View>
      <Text>Your table is ready.</Text>
      <Text>Explore our dishes and discover the chefs specials</Text>
    </View>
    <View>
        <Text>Tap the cart to start your order</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Starter Menu")}>
          <CartIcon width={100} height={100} />
        </TouchableOpacity>
    </View>
    </>
  )
}

export default SplashScreen