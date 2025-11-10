import React, { useMemo, useState, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as OrderStore from '../components/OrderStore';

type ReceiptItem = {
  id?: string;
  img?: string | number;
  name: string;
  price: string | number;
  qty?: number;
};

type Props = {
  taxRate?: number;
  onConfirm?: (order: ReceiptItem[], totals: { subtotal: number; tax: number; tip: number; total: number }) => void;
  onClose?: () => void;
};

const parsePrice = (p?: string | number) => {
  if (p == null) return 0;
  if (typeof p === 'number') return p;
  const cleaned = String(p).replace(/\s/g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

const formatPrice = (n: number) => {
  const fixed = n.toFixed(2).replace('.', ',');
  return `R${fixed}`;
};

const MenuReceipt: React.FC<Props> = ({ taxRate = 0.15, onConfirm, onClose }) => {
  const [tipRaw, setTipRaw] = useState('0');
  const [orderItems, setOrderItems] = useState<ReceiptItem[]>(() => {
    try {
      const store = (OrderStore.getOrder && OrderStore.getOrder()) ?? [];
      return Array.isArray(store) ? store : [];
    } catch {
      return [];
    }
  });

  useFocusEffect(
    useCallback(() => {
      try {
        const current = (OrderStore.getOrder && OrderStore.getOrder()) ?? [];
        setOrderItems(Array.isArray(current) ? current : []);
      } catch (err) {
        console.warn('MenuReceipt: failed to read order store on focus', err);
      }

      let unsub: (() => void) | void;
      try {
        if (typeof OrderStore.subscribe === 'function') {
          unsub = OrderStore.subscribe((items: ReceiptItem[]) => {
            setOrderItems(Array.isArray(items) ? items : []);
          });
        }
      } catch (err) {
        console.warn('MenuReceipt: subscribe failed', err);
      }

      return () => {
        try {
          if (typeof unsub === 'function') unsub();
        } catch {}
      };
    }, [])
  );

  const items = orderItems.map(it => ({ qty: it.qty ?? 1, ...it }));

  const subtotal = useMemo(() => {
    return items.reduce((acc, it) => acc + parsePrice(it.price) * (it.qty ?? 1), 0);
  }, [items]);

  const tip = useMemo(() => {
    const t = parsePrice(tipRaw);
    return t >= 0 ? t : 0;
  }, [tipRaw]);

  const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + tax + tip, [subtotal, tax, tip]);

  const handleAddOne = (item: ReceiptItem) => {
    if (typeof OrderStore.addToOrder === 'function') {
      OrderStore.addToOrder({ ...item, qty: 1 });
      return;
    }
    setOrderItems(prev =>
      prev.map(p => (p.id === item.id ? { ...p, qty: (p.qty ?? 1) + 1 } : p))
    );
  };

  const handleRemoveOne = (item: ReceiptItem) => {
    if (typeof OrderStore.decrementFromOrder === 'function') {
      OrderStore.decrementFromOrder(item.id);
      return;
    }
    if (typeof OrderStore.removeFromOrder === 'function') {
      OrderStore.removeFromOrder(item.id);
      return;
    }
    setOrderItems(prev =>
      prev
        .map(p => (p.id === item.id ? { ...p, qty: Math.max((p.qty ?? 1) - 1, 0) } : p))
        .filter(p => (p.qty ?? 0) > 0)
    );
  };

  const handleClear = () => {
    if (typeof OrderStore.clearOrder === 'function') {
      OrderStore.clearOrder();
      setOrderItems([]);
      return;
    }
    setOrderItems([]);
  };

  function handleConfirm() {
    onConfirm?.(items, { subtotal, tax, tip, total });
    Alert.alert('Order confirmed', `Total ${formatPrice(total)}`);
  }

  function renderItem({ item }: { item: ReceiptItem & { qty?: number } }) {
    return (
      <View style={styles.row}>
        {item.img ? (
          <Image source={typeof item.img === 'string' ? { uri: item.img } : item.img} style={styles.thumb} />
        ) : (
          <View style={[styles.thumb, styles.thumbPlaceholder]} />
        )}

        <View style={styles.rowInfo}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.itemMeta}>
            {item.qty} x {formatPrice(parsePrice(item.price))}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.itemPrice}>{formatPrice(parsePrice(item.price) * (item.qty ?? 1))}</Text>

          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <TouchableOpacity onPress={() => handleRemoveOne(item)} style={styles.qtyBtn}>
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleAddOne(item)} style={[styles.qtyBtn, { marginLeft: 8 }]}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Receipt</Text>
          <Text style={styles.orderMeta}>Order #{Date.now().toString().slice(-6)}</Text>
        </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(i, idx) => (i.id ? String(i.id) : `${i.name}-${idx}`)}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          style={styles.list}
        />

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax ({Math.round(taxRate * 100)}%)</Text>
            <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
          </View>

          <View style={styles.tipRow}>
            <Text style={styles.summaryLabel}>Tip</Text>
            <View style={styles.tipInputRow}>
              <TextInput
                style={styles.tipInput}
                keyboardType="numeric"
                value={tipRaw}
                onChangeText={setTipRaw}
                placeholder="0,00"
                returnKeyType="done"
              />
              <Text style={styles.tipHint}>R</Text>
            </View>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[styles.summaryLabel, styles.totalLabel]}>Total</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>{formatPrice(total)}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={onClose}>
            <Text style={styles.btnTextSecondary}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleConfirm}>
            <Text style={styles.btnTextPrimary}>Confirm & Pay</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <TouchableOpacity onPress={handleClear}>
            <Text style={{ color: '#A33', fontWeight: '700' }}>Clear order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuReceipt;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF6DB',
  },
  container: {
    padding: 18,
    paddingBottom: 140,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3C231C',
  },
  orderMeta: {
    fontSize: 12,
    color: '#6B5A4A',
  },
  list: {
    maxHeight: 360,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  thumbPlaceholder: {
    backgroundColor: '#D9D56B',
  },
  rowInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3C231C',
  },
  itemMeta: {
    fontSize: 12,
    color: '#6B5A4A',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3C231C',
  },
  sep: {
    height: 1,
    backgroundColor: 'rgba(60,35,28,0.06)',
    marginVertical: 6,
  },
  summary: {
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(60,35,28,0.04)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B5A4A',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3C231C',
  },
  tipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipInput: {
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#222',
    backgroundColor: '#fff',
  },
  tipHint: {
    marginLeft: 8,
    color: '#6B5A4A',
    fontWeight: '700',
  },
  totalRow: {
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  btnPrimary: {
    backgroundColor: '#3C231C',
  },
  btnTextPrimary: {
    color: '#FFF6DB',
    fontWeight: '800',
  },
  btnSecondary: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#3C231C',
  },
  btnTextSecondary: {
    color: '#3C231C',
    fontWeight: '700',
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3C231C',
  },
});
