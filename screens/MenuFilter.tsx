// MenuFilter.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

type ItemShape = { id?: string; img?: string | number; name: string; price: string; description: string };
type Course = 'All' | 'Starters' | 'Mains' | 'Desserts';
type Filters = { course: Course; query?: string; minPrice?: number | null; maxPrice?: number | null; };

type Props = {
  onApply?: (filters: Filters) => void;
  onCancel?: () => void;
  starters?: ItemShape[];
  mains?: ItemShape[];
  desserts?: ItemShape[];
};

const parsePrice = (raw?: string) => {
  if (!raw) return null;
  const cleaned = raw.replace(/\s/g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
};

const MenuFilter: React.FC<Props> = ({ onApply, onCancel, starters = [], mains = [], desserts = [] }) => {
  const [course, setCourse] = useState<Course>('All');
  const [query, setQuery] = useState('');
  const [minRaw, setMinRaw] = useState('');
  const [maxRaw, setMaxRaw] = useState('');

  const minPrice = useMemo(() => parsePrice(minRaw), [minRaw]);
  const maxPrice = useMemo(() => parsePrice(maxRaw), [maxRaw]);

  const starterCount = starters.length;
  const mainCount = mains.length;
  const dessertCount = desserts.length;
  const totalCount = starterCount + mainCount + dessertCount;

  function handleApply() {
    if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
      Alert.alert('Validation', 'Minimum price cannot be greater than maximum price.');
      return;
    }
    const filters: Filters = { course, query: query.trim() || undefined, minPrice, maxPrice };
    onApply?.(filters);
  }

  function handleReset() {
    setCourse('All');
    setQuery('');
    setMinRaw('');
    setMaxRaw('');
    onCancel?.();
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Filter Menu</Text>

        <Text style={styles.label}>Course</Text>
        <View style={styles.courseRow}>
          {(['All', 'Starters', 'Mains', 'Desserts'] as Course[]).map(c => {
            const isActive = course === c;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.coursePill, isActive && styles.coursePillActive]}
                onPress={() => setCourse(c)}
                activeOpacity={0.85}
              >
                <Text style={[styles.coursePillText, isActive && styles.coursePillTextActive]}>
                  {c}
                  {c === 'All' ? ` (${totalCount})` : c === 'Starters' ? ` (${starterCount})` : c === 'Mains' ? ` (${mainCount})` : ` (${dessertCount})`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Search</Text>
        <TextInput style={styles.input} placeholder="Search name or description" value={query} onChangeText={setQuery} />

        <Text style={[styles.label, { marginTop: 12 }]}>Price range (R)</Text>
        <View style={styles.priceRow}>
          <View style={styles.priceWrap}>
            <Text style={styles.smallLabel}>Min</Text>
            <TextInput style={styles.inputSmall} placeholder="0" value={minRaw} onChangeText={setMinRaw} keyboardType="numeric" />
          </View>
          <View style={styles.priceWrap}>
            <Text style={styles.smallLabel}>Max</Text>
            <TextInput style={styles.inputSmall} placeholder="999" value={maxRaw} onChangeText={setMaxRaw} keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.noteRow}>
          <Text style={styles.noteText}>Tip: use comma or dot for decimals. Example: 120,00 or 120.00</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
            <Text style={styles.secondaryText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleApply}>
            <Text style={styles.primaryText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomLabel}>Filters ready</Text>
        <TouchableOpacity style={styles.bottomApply} onPress={handleApply}>
          <Text style={styles.bottomApplyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MenuFilter;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  container: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 140 },
  header: { fontSize: 22, fontWeight: '800', color: '#3C231C', marginBottom: 14 },
  label: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 8 },
  // courseRow no longer uses gap - spacing handled by pill margins
  courseRow: { flexDirection: 'row', flexWrap: 'wrap' },

  coursePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#FFF6DB',
    borderWidth: 1,
    borderColor: 'rgba(60,35,28,0.08)',
  },
  coursePillActive: { backgroundColor: '#4E6E33' },
  coursePillText: { fontSize: 14, fontWeight: '700', color: '#4B2E2A' },
  coursePillTextActive: { color: '#EAF0E7' },

  input: { backgroundColor: '#fff', borderColor: '#DDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#222' },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  priceWrap: { width: '48%' },
  smallLabel: { fontSize: 12, color: '#6B5A4A', marginBottom: 6 },
  inputSmall: { backgroundColor: '#fff', borderColor: '#DDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#222' },

  noteRow: { marginTop: 10, marginBottom: 6 },
  noteText: { fontSize: 12, color: '#8A7B6F' },

  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  primaryButton: { backgroundColor: '#3C231C', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 28, flex: 1, marginLeft: 12, alignItems: 'center' },
  primaryText: { color: '#FFF6DB', fontWeight: '800', fontSize: 16 },
  secondaryButton: { borderColor: '#3C231C', borderWidth: 1, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 28, justifyContent: 'center', alignItems: 'center', flex: 1, marginRight: 12 },
  secondaryText: { color: '#3C231C', fontWeight: '700', fontSize: 16 },

  bottomBar: {
    position: 'absolute', left: 12, right: 12, bottom: 18, height: 72, borderRadius: 18, backgroundColor: '#FFF0B8',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18,
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 6,
  },
  bottomLabel: { color: '#4B2E2A', fontWeight: '700' },
  bottomApply: { backgroundColor: '#3C231C', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 14 },
  bottomApplyText: { color: '#FFF6DB', fontWeight: '800' },
});
