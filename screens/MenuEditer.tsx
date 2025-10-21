import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Modal, Alert, } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';

import { starterArray, StarterData } from '../components/StarterList';
import { mainArray, MainData } from '../components/MainList';
import { dessertArray, DessertData } from '../components/DessertList';

type Course = 'Starters' | 'Mains' | 'Desserts';

type MenuItem = {
  id?: string;
  img?: string | number;
  name: string;
  price: string;
  description: string;
};

const COURSE_OPTIONS: Course[] = ['Starters', 'Mains', 'Desserts'];

const PLACEHOLDER_IMAGE = require('../assets/place-holder.png');

const MenuEditer: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starters');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [courseModalVisible, setCourseModalVisible] = useState(false);

  async function handlePickImage() {
  // keep options simple to avoid typing mismatch across versions
  const options: any = { mediaType: 'photo', quality: 0.8, selectionLimit: 1 };

  try {
    const result = await launchImageLibrary(options);
    // result may be { didCancel, errorCode, assets } or similar
    if (!result) {
      return;
    }
    // user cancelled
    if ((result as any).didCancel) return;

    if ((result as any).errorCode) {
      console.warn('ImagePicker error:', (result as any).errorMessage || (result as any).errorCode);
      Alert.alert('Image Error', (result as any).errorMessage || 'Failed to pick image.');
      return;
    }

    const assets = (result as any).assets;
    const asset = Array.isArray(assets) && assets.length ? assets[0] : null;
    if (asset && asset.uri) {
      setImageUri(asset.uri);
    } else {
      Alert.alert('Image', 'No image selected.');
    }
  } catch (err) {
    console.error('handlePickImage error', err);
    Alert.alert('Image Error', 'An unexpected error occurred while picking image.');
  }
}


  function saveToArray(newItem: MenuItem) {
  switch (course) {
    case 'Starters':
      starterArray.push(newItem as StarterData);
      break;
    case 'Mains':
      mainArray.push(newItem as MainData);
      break;
    case 'Desserts':
      dessertArray.push(newItem as DessertData);
      break;
  }
}

  function handleSave() {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a dish name.');
      return;
    }

    const newItem: MenuItem = {
    id: Date.now().toString(),
    name: name.trim(),
    price: price.trim(),
    description: description.trim(),
    img: imageUri ?? undefined,
  };

    try {
      saveToArray(newItem);
      Alert.alert('Saved', `${newItem.name} added to ${course}.`);
      setName('');
      setPrice('');
      setDescription('');
      setImageUri(undefined);
      setCourse('Starters');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save item. Check your list exports.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.pillPreviewWrap}>
          <View style={styles.pillPreview}>
            <View style={styles.pillLeft}>
              <TouchableOpacity onPress={handlePickImage}>
                <View style={styles.pillImageWrap}>
                  <Image
                    source={imageUri ? { uri: imageUri } : PLACEHOLDER_IMAGE}
                    style={styles.pillImage}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.pillTextWrap}>
                <Text style={styles.pillTitle} numberOfLines={1}>
                  {name || 'Dish Name - Price'}
                </Text>
                <Text style={styles.pillSubtitle} numberOfLines={1}>
                  {description || 'Dish Description'}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.pillEditBtn} activeOpacity={0.8}>
              <Text style={styles.pillEditIcon}>✎</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
          />

          <Text style={styles.label}>Price</Text>
          <View style={styles.priceRow}>
            <Text style={styles.pricePrefix}>R</Text>
            <TextInput
              style={[styles.input, styles.priceInput]}
              placeholder="00.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>

          <Text style={[styles.label, styles.sectionLabel]}>Dish Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Short description..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Select Course</Text>
          <TouchableOpacity
            style={styles.courseSelector}
            onPress={() => setCourseModalVisible(true)}
            activeOpacity={0.9}
          >
            <Text style={styles.courseSelectorText}>{course} (Courses)</Text>
          </TouchableOpacity>

          <View style={{ height: 18 }} />

          <View style={styles.formButtonsRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setName('');
                setPrice('');
                setDescription('');
                setImageUri(undefined);
                setCourse('Starters');
              }}
            >
              <Text style={styles.secondaryText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
              <Text style={styles.primaryText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIconWrap}>
          <Text style={styles.bottomIcon}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconWrap}>
          <Text style={styles.bottomIcon}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconWrap}>
          <Text style={styles.bottomIcon}>－</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={courseModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCourseModalVisible(false)}
        >
          <View style={styles.modalCard}>
            {COURSE_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={styles.courseOption}
                onPress={() => {
                  setCourse(opt);
                  setCourseModalVisible(false);
                }}
              >
                <Text style={styles.courseOptionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default MenuEditer;

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  container: { 
    paddingBottom: 140, 
    backgroundColor: '#fff' 
  },
  pillPreviewWrap: { 
    paddingHorizontal: 18, 
    paddingTop: 12, 
    paddingBottom: 6, 
    backgroundColor: '#fff' 
  },
  pillPreview: {
    backgroundColor: '#4E6E33',
    borderRadius: 36,
    minHeight: 86,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  pillLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  pillImageWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#D9D56B',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillImage: { 
    width: 64, 
    height: 64, 
    borderRadius: 32 
  },
  pillImagePlaceholder: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  pillImagePlaceholderText: { 
    fontSize: 20, 
    color: '#4B2E2A', 
    fontWeight: '700' 
  },
  pillTextWrap: { 
    flex: 1 
  },
  pillTitle: { 
    color: '#EAF0E7', 
    fontWeight: '700', 
    fontSize: 15, 
    marginBottom: 4 
  },
  pillSubtitle: { 
    color: '#DDE6D8', 
    fontSize: 12 
  },
  pillEditBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  pillEditIcon: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700' 
  },
  form: { 
    paddingHorizontal: 22, 
    paddingTop: 18 
  },
  label: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#222', 
    marginBottom: 8 
  },
  sectionLabel: { 
    marginTop: 12, 
    color: '#6B5A4A' 
  },
  input: { 
    backgroundColor: '#fff', 
    borderColor: '#DDD', 
    borderWidth: 1, 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    fontSize: 15, 
    color: '#222' 
  },
  textArea: { 
    minHeight: 86 
  },
  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  pricePrefix: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginRight: 8, 
    color: '#4B2E2A' 
  },
  priceInput: { 
    flex: 1 
  },
  courseSelector: { 
    backgroundColor: '#fff', 
    borderRadius: 6, 
    borderWidth: 1, 
    borderColor: '#DDD', 
    paddingHorizontal: 12, 
    paddingVertical: 12 
  },
  courseSelectorText: { 
    fontSize: 16, 
    color: '#4B2E2A', 
    fontWeight: '700' 
  },
  formButtonsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 18 
  },
  primaryButton: { 
    backgroundColor: '#3C231C', 
    paddingVertical: 12, 
    paddingHorizontal: 28, 
    borderRadius: 28 
  },
  primaryText: { 
    color: '#FFF6DB', 
    fontWeight: '800', 
    fontSize: 16 
  },
  secondaryButton: { 
    borderColor: '#3C231C', 
    borderWidth: 1, 
    paddingVertical: 12, 
    paddingHorizontal: 28, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  secondaryText: { 
    color: '#3C231C', 
    fontWeight: '700', 
    fontSize: 16 
  },
  bottomBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 18,
    height: 88,
    borderRadius: 22,
    backgroundColor: '#FFF0B8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomIconWrap: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: 'rgba(0,0,0,0.03)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  bottomIcon: { 
    fontSize: 30, 
    color: '#4B2E2A', 
    fontWeight: '700' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.18)', 
    justifyContent: 'flex-end' 
  },
  modalCard: { 
    backgroundColor: '#3C231C', 
    paddingVertical: 8, 
    paddingHorizontal: 6 
  },
  courseOption: { 
    paddingVertical: 18, 
    paddingHorizontal: 20, 
    borderBottomColor: 'rgba(255,255,255,0.06)', 
    borderBottomWidth: 1 
  },
  courseOptionText: { 
    color: '#FFF6DB', 
    fontWeight: '800', 
    fontSize: 18 
  },
});
