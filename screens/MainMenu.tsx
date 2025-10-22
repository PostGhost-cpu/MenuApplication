import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageSourcePropType } from 'react-native';
import Menu from '../components/Menu';
import Tab from '../components/Tab';
import { mainArray, MainData } from '../components/MainList';

const PLACEHOLDER = require('../assets/place-holder.png');

const getImageSource = (img?: string | number): ImageSourcePropType => {
  if (!img) return PLACEHOLDER;
  return typeof img === 'number' ? img : { uri: String(img) };
};

const ListItem = ({ singleBlock }: { singleBlock: MainData }) => (
  <View style={styles.menuoption}>
    <Image style={styles.menuimg} source={getImageSource(singleBlock.img)} />
    <View style={styles.menuinfo}>
      <View style={[styles.pill, styles.pillMain]}>
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

const MainMenu = () => (
  <View style={styles.container}>
    <Menu />
    <Text style={styles.header}>Menu</Text>

    <FlatList
      data={mainArray}
      renderItem={({ item }) => <ListItem singleBlock={item} />}
      keyExtractor={(item, idx) => (item.id ? String(item.id) : `${item.name}-${idx}`)}
      contentContainerStyle={{ paddingBottom: 180 }} 
    />

    <View style={styles.tabWrap}>
      <Tab />
    </View>
  </View>
);

export default MainMenu;
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF6DB' 
  },
  header: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#4B2E2A', 
    textAlign: 'center', 
    marginTop: 12, 
    marginBottom: 18, 
    letterSpacing: 6 
  },
  menuoption: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    marginHorizontal: 14, 
    marginVertical: 8 
  },
  menuimg: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    overflow: 'hidden', 
    marginRight: 12, 
    borderWidth: 1,
    borderColor: '#000' 
  },
  menuinfo: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  pill: { 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderRadius: 28, 
    minHeight: 64, 
    justifyContent: 'center', 
    position: 'relative', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.06, 
    shadowRadius: 6, 
    elevation: 3 
  },
  pillMain: { 
    backgroundColor: '#4E6E33' 
  },
  titleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  title: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#4B2E2A', 
    flex: 1, 
    marginRight: 8 
  },
  price: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#4B2E2A', 
    marginLeft: 6 
  },
  description: { 
    fontSize: 12, 
    color: '#000', 
    marginTop: 6, 
    lineHeight: 16 
  },
  plusWrap: { 
    position: 'absolute', 
    right: 8, 
    bottom: 10, 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.06)' 
  },
  plusText: { 
    fontSize: 18, 
    color: '#4B2E2A', 
    fontWeight: '700', 
    lineHeight: 18 
  },
  tabWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 120,
    alignItems: 'center',
  },
  bottomFilterBar: { 
    position: 'absolute', 
    left: 12, 
    right: 12, 
    bottom: 18, 
    height: 62, 
    borderRadius: 28, 
    backgroundColor: '#F7B2A0', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 18, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 8, 
    elevation: 6 
  },
  filterLabel: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#4B2E2A' 
  },
  filterSheet: { 
    backgroundColor: '#FFF6DB', 
    padding: 18, 
    borderTopLeftRadius: 18, 
    borderTopRightRadius: 18, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.06, 
    shadowRadius: 6, 
    elevation: 8 
  },
  filterTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  filterTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#4B2E2A' 
  },
  applyButton: { 
    marginTop: 18, 
    alignSelf: 'center', 
    backgroundColor: '#3C231C', 
    paddingHorizontal: 40, 
    paddingVertical: 12, 
    borderRadius: 28 
  },
  applyButtonText: { 
    color: '#FFF6DB', 
    fontWeight: '800', 
    fontSize: 16 
  },
  mutedNote: { 
    fontSize: 11, 
    color: '#8A7B6F' 
  },
});
