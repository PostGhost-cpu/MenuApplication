import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackParams } from '../App';

const Tab: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Editer')} activeOpacity={0.85}>
        <Text style={styles.text}>Editer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Filter')} activeOpacity={0.85}>
        <Text style={styles.text}>Filter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Receipt')} activeOpacity={0.85}>
        <Text style={styles.text}>Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, width: '100%' },
  item: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFF6DB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
  },
  text: { fontSize: 16, fontWeight: '700', color: '#3C231C', letterSpacing: 0.4 },
});
