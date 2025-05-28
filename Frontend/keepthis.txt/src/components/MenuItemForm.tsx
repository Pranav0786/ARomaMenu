"use client"

import { useState } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface MenuItemFormProps {
  initialData?: {
    id?: string
    name: string
    description: string
    price: string
    image: string
  }
  onSubmit: (data: {
    id?: string
    name: string
    description: string
    price: string
    image: string
  }) => void
  onCancel: () => void
}

export const MenuItemForm = ({
  initialData = {
    name: "",
    description: "",
    price: "",
    image: "",
  },
  onSubmit,
  onCancel,
}: MenuItemFormProps) => {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number.parseFloat(formData.price)) || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>{initialData.id ? "Edit Menu Item" : "Add Menu Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollView>
          <Input
            label="Name"
            placeholder="Dish name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            error={errors.name}
          />

          <Input
            label="Description"
            placeholder="Dish description"
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            error={errors.description}
          />

          <Input
            label="Price"
            placeholder="0.00"
            value={formData.price}
            onChangeText={(text) => handleChange("price", text)}
            keyboardType="numeric"
            error={errors.price}
          />

          <Input
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChangeText={(text) => handleChange("image", text)}
            error={errors.image}
          />
        </ScrollView>
      </CardContent>
      <CardFooter style={styles.footer}>
        <Button variant="outline" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleSubmit} style={styles.button}>
          {initialData.id ? "Update" : "Add"}
        </Button>
      </CardFooter>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  footer: {
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 8,
  },
})
