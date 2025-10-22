import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackParams } from '../App';

const LOGO = require('../assets/icon.png');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Image source={LOGO} style={styles.heroImage} resizeMode="cover" />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.header}>Your table is ready.</Text>
          <Text style={styles.subheader}>Explore our dishes and discover the chef's specials</Text>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('Starter Menu')}
          activeOpacity={0.85}
        >
          <Text style={styles.startText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    paddingTop: 24, 
    paddingHorizontal: 18 
  },
  imageWrap: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroImage: { 
    width: '100%', 
    height: 280, 
    backgroundColor: '#D9D56B' 
  },
  textWrap: { 
    marginTop: 20, 
    alignItems: 'center', 
    paddingHorizontal: 8 
  },
  header: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#3C231C', 
    textAlign: 'center' 
  },
  subheader: { 
    fontSize: 15, 
    color: '#6B5A4A', 
    marginTop: 8, 
    textAlign: 'center' 
  },
  bottomBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 60,
    height: 72,
    borderRadius: 18,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  
  },
  startBtn: {
    width: 200,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#3C231C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: { 
    color: '#FFF6DB', 
    fontWeight: '800', 
    fontSize: 16 
  },
});
