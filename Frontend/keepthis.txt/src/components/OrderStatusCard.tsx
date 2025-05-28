import { View, Text, StyleSheet } from "react-native"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderStatusCardProps {
  orderId: string
  tableId: string
  status: "Order Received" | "Preparing" | "Ready to Serve" | "Completed"
  items: OrderItem[]
  timestamp: string
  total: number
}

export const OrderStatusCard = ({ orderId, tableId, status, items, timestamp, total }: OrderStatusCardProps) => {
  const getStatusVariant = () => {
    switch (status) {
      case "Order Received":
        return "secondary"
      case "Preparing":
        return "default"
      case "Ready to Serve":
        return "outline"
      case "Completed":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <Card style={styles.card}>
      <CardHeader>
        <View style={styles.header}>
          <View>
            <CardTitle>Order #{orderId}</CardTitle>
            <Text style={styles.tableId}>Table: {tableId}</Text>
          </View>
          <Badge variant={getStatusVariant()}>{status}</Badge>
        </View>
      </CardHeader>
      <CardContent>
        <Text style={styles.sectionTitle}>Items:</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </CardContent>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tableId: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#0f172a",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: "#0f172a",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 12,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  timestamp: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 8,
    textAlign: "right",
  },
})
