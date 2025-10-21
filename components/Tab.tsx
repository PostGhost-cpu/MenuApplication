import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackParams } from '../App';

const Tab: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 12 }}>
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
  );
};

export default Tab;
