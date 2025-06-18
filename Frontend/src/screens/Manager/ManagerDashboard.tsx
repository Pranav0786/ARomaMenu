import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  status: 'Preparing' | 'Served';
}

interface Table {
  id: string;
  tableNumber: number;
  bookingTime: string;
  status: 'Pending' | 'Served' | 'Paid';
  order: OrderItem[];
}

const initialTables: Table[] = [
  {
    id: '1',
    tableNumber: 3,
    bookingTime: '5:30 PM',
    status: 'Pending',
    order: [
      { id: 'f1', name: 'Paneer Tikka', qty: 1, status: 'Preparing' },
      { id: 'f2', name: 'Butter Naan', qty: 2, status: 'Preparing' },
    ],
  },
  {
    id: '2',
    tableNumber: 7,
    bookingTime: '6:00 PM',
    status: 'Served',
    order: [{ id: 'f3', name: 'Chicken Biryani', qty: 1, status: 'Served' }],
  },
];

const statusStyles: Record<Table['status'], TextStyle> = {
  Pending: { backgroundColor: '#dc2626' },
  Served: { backgroundColor: '#f59e0b' },
  Paid:   { backgroundColor: '#16a34a' },
};

export default function App(): JSX.Element {
  const [tables, setTables] = useState<Table[]>(initialTables);

  const updateTableStatus = (id: string, newStatus: Table['status']): void => {
    setTables(prev =>
      prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const updateOrderItem = (
    tableId: string,
    itemId: string,
    newStatus: OrderItem['status']
  ): void => {
    setTables(prev =>
      prev.map(table => {
        if (table.id === tableId) {
          const updatedOrder = table.order.map(item =>
            item.id === itemId ? { ...item, status: newStatus } : item
          );
          return { ...table, order: updatedOrder };
        }
        return table;
      })
    );
  };

  const renderTable = ({ item }: ListRenderItemInfo<Table>) => (
    <View style={styles.tableCard}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableTitle}>Table #{item.tableNumber}</Text>
        <Text style={[styles.statusBadge, statusStyles[item.status]]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.metaText}>⏰ Booking: {item.bookingTime}</Text>

      <Text style={styles.orderLabel}>🧾 Order Items:</Text>
      {item.order.map(food => (
        <View key={food.id} style={styles.orderItem}>
          <View style={styles.orderRow}>
            <Text style={styles.foodName}>
              {food.name} x{food.qty}
            </Text>
            <Text style={styles.foodStatus}>{food.status}</Text>
          </View>
          {food.status !== 'Served' && (
            <TouchableOpacity
              style={styles.chipButton}
              onPress={() =>
                updateOrderItem(item.id, food.id, 'Served')
              }
            >
              <Text style={styles.chipText}>✅ Mark Served</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {item.status === 'Pending' && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => updateTableStatus(item.id, 'Served')}
        >
          <Text style={styles.actionButtonText}>🍽 Mark as Served</Text>
        </TouchableOpacity>
      )}
      {item.status === 'Served' && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#16a34a' }]}
          onPress={() => updateTableStatus(item.id, 'Paid')}
        >
          <Text style={styles.actionButtonText}>💰 Mark as Paid</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>🍽 AromaMenu Dashboard</Text>

      <ScrollView
        horizontal
        contentContainerStyle={styles.statsRow}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Tables</Text>
          <Text style={styles.statValue}>{tables.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statValue}>
            {tables.filter(t => t.status === 'Pending').length}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Served</Text>
          <Text style={styles.statValue}>
            {tables.filter(t => t.status === 'Served').length}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Paid</Text>
          <Text style={styles.statValue}>
            {tables.filter(t => t.status === 'Paid').length}
          </Text>
        </View>
      </ScrollView>

      <FlatList
        data={tables}
        keyExtractor={item => item.id}
        renderItem={renderTable}
      />
    </View>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  header: TextStyle;
  statsRow: ViewStyle;
  statCard: ViewStyle;
  statLabel: TextStyle;
  statValue: TextStyle;
  tableCard: ViewStyle;
  tableHeader: ViewStyle;
  tableTitle: TextStyle;
  metaText: TextStyle;
  statusBadge: TextStyle;
  orderLabel: TextStyle;
  orderItem: ViewStyle;
  orderRow: ViewStyle;
  foodName: TextStyle;
  foodStatus: TextStyle;
  chipButton: ViewStyle;
  chipText: TextStyle;
  actionButton: ViewStyle;
  actionButtonText: TextStyle;
}>({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsRow: { flexDirection: 'row', paddingBottom: 16 },
  statCard: {
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f97316',
    marginRight: 12,
    alignItems: 'center',
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: { fontSize: 14, color: '#6b7280' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#f97316' },
  tableCard: {
    backgroundColor: '#fff7ed',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderColor: '#f97316',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: { fontSize: 20, fontWeight: '700', color: '#f97316' },
  metaText: { color: '#6b7280', marginTop: 6 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  orderLabel: { marginTop: 14, fontWeight: '600', fontSize: 16, color: '#374151' },
  orderItem: { marginTop: 10 },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  foodName: { fontSize: 15, color: '#1f2937' },
  foodStatus: { fontSize: 13, color: '#9ca3af' },
  chipButton: {
    backgroundColor: '#fde68a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  chipText: { fontSize: 12, color: '#92400e', fontWeight: '600' },
  actionButton: {
    marginTop: 16,
    backgroundColor: '#f97316',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
