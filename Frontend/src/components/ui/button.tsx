import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"

interface ButtonProps {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Button = ({
  children,
  variant = "default",
  size = "default",
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "destructive":
        return styles.destructive
      case "outline":
        return styles.outline
      case "secondary":
        return styles.secondary
      case "ghost":
        return styles.ghost
      case "link":
        return styles.link
      default:
        return styles.default
    }
  }

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case "destructive":
        return styles.destructiveText
      case "outline":
        return styles.outlineText
      case "secondary":
        return styles.secondaryText
      case "ghost":
        return styles.ghostText
      case "link":
        return styles.linkText
      default:
        return styles.defaultText
    }
  }

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "sm":
        return styles.sm
      case "lg":
        return styles.lg
      case "icon":
        return styles.icon
      default:
        return styles.defaultSize
    }
  }

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case "sm":
        return styles.smText
      case "lg":
        return styles.lgText
      default:
        return styles.defaultSizeText
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, getVariantStyle(), getSizeStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "default" ? "#fff" : "#000"} />
      ) : (
        <Text style={[getTextStyle(), getTextSizeStyle(), textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: "#0f172a",
  },
  defaultText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
  destructiveText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  outlineText: {
    color: "#0f172a",
  },
  secondary: {
    backgroundColor: "#f1f5f9",
  },
  secondaryText: {
    color: "#0f172a",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  ghostText: {
    color: "#0f172a",
  },
  link: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  linkText: {
    color: "#0f172a",
    textDecorationLine: "underline",
  },
  defaultSize: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  defaultSizeText: {
    fontSize: 14,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  smText: {
    fontSize: 12,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  lgText: {
    fontSize: 16,
  },
  icon: {
    width: 40,
    height: 40,
    padding: 0,
  },
  disabled: {
    opacity: 0.5,
  },
})
