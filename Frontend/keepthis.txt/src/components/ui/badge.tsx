import type React from "react"
import { View, Text, StyleSheet, type ViewStyle } from "react-native"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  style?: ViewStyle
}

export const Badge = ({ children, variant = "default", style }: BadgeProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondary
      case "destructive":
        return styles.destructive
      case "outline":
        return styles.outline
      default:
        return styles.default
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryText
      case "destructive":
        return styles.destructiveText
      case "outline":
        return styles.outlineText
      default:
        return styles.defaultText
    }
  }

  return (
    <View style={[styles.badge, getVariantStyle(), style]}>
      <Text style={[styles.text, getTextStyle()]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  default: {
    backgroundColor: "#0f172a",
  },
  secondary: {
    backgroundColor: "#f1f5f9",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
  defaultText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#0f172a",
  },
  destructiveText: {
    color: "#ffffff",
  },
  outlineText: {
    color: "#0f172a",
  },
})
