import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageSourcePropType } from 'react-native';
import Menu from '../components/Menu';
import Tab from '../components/Tab';
import { dessertArray, DessertData } from '../components/DessertList';

const PLACEHOLDER = require('../assets/place-holder.png');

const getImageSource = (img?: string | number): ImageSourcePropType => {
  if (!img) return PLACEHOLDER;
  return typeof img === 'number' ? img : { uri: String(img) };
};

const ListItem: React.FC<{ singleBlock: DessertData }> = ({ singleBlock }) => (
  <View style={styles.menuoption}>
    <Image style={styles.menuimg} source={getImageSource(singleBlock.img)} />
    <View style={styles.menuinfo}>
      <View style={[styles.pill, styles.pillDessert]}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>{singleBlock.name}</Text>
          <Text style={styles.price}>{singleBlock.price}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>{singleBlock.description}</Text>
        <View style={styles.plusWrap}><Text style={styles.plusText}>+</Text></View>
      </View>
    </View>
  </View>
);

const DessertMenu: React.FC = () => (
  <View style={styles.container}>
    <Menu />
    <Text style={styles.header}>Menu</Text>

    <FlatList
      data={dessertArray}
      renderItem={({ item }) => <ListItem singleBlock={item} />}
      keyExtractor={(item, idx) => (item.id ? String(item.id) : `${item.name}-${idx}`)}
      contentContainerStyle={{ paddingBottom: 180 }}
    />

    <View style={styles.tabWrap}>
      <Tab />
    </View>
  </View>
);

export default DessertMenu;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6DB' },
  header: { fontSize: 28, fontWeight: '700', color: '#4B2E2A', textAlign: 'center', marginTop: 12, marginBottom: 18, letterSpacing: 6 },
  menuoption: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, marginHorizontal: 14, marginVertical: 8 },
  menuimg: { width: 56, height: 56, borderRadius: 28, overflow: 'hidden', marginRight: 12, borderWidth: 2, borderColor: '#FFF6DB' },
  menuinfo: { flex: 1, justifyContent: 'center' },
  pill: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 28, minHeight: 64, justifyContent: 'center', position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  pillDessert: { backgroundColor: '#D9D56B' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 15, fontWeight: '700', color: '#4B2E2A', flex: 1, marginRight: 8 },
  price: { fontSize: 13, fontWeight: '700', color: '#4B2E2A', marginLeft: 6 },
  description: { fontSize: 12, color: '#6B5A4A', marginTop: 6, lineHeight: 16 },
  plusWrap: { position: 'absolute', right: 8, bottom: 10, width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.06)' },
  plusText: { fontSize: 18, color: '#4B2E2A', fontWeight: '700', lineHeight: 18 },

  tabWrap: { position: 'absolute', left: 12, right: 12, bottom: 120, alignItems: 'center' },

  // leftover styles omitted for brevity (keep the rest from your original file if needed)
});
