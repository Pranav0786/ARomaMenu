"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"

interface DishCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  onAddToCart: (id: string, quantity: number) => void
}

export const DishCard = ({ id, name, description, price, image, onAddToCart }: DishCardProps) => {
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(id, quantity)
      setQuantity(0)
    }
  }

  return (
    <Card style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <CardContent>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </CardContent>
      <CardFooter style={styles.footer}>
        <View style={styles.quantityContainer}>
          <Button variant="outline" size="sm" onPress={decrementQuantity}>
            -
          </Button>
          <Text style={styles.quantity}>{quantity}</Text>
          <Button variant="outline" size="sm" onPress={incrementQuantity}>
            +
          </Button>
        </View>
        <Button onPress={handleAddToCart} disabled={quantity === 0} style={styles.addButton}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  footer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
  addButton: {
    marginLeft: 16,
  },
})
