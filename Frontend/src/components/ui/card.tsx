import type React from "react"
import { View, Text, StyleSheet, type ViewStyle } from "react-native"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>
}

interface CardHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const CardHeader = ({ children, style }: CardHeaderProps) => {
  return <View style={[styles.cardHeader, style]}>{children}</View>
}

interface CardTitleProps {
  children: React.ReactNode
}

export const CardTitle = ({ children }: CardTitleProps) => {
  return <Text style={styles.cardTitle}>{children}</Text>
}

interface CardDescriptionProps {
  children: React.ReactNode
}

export const CardDescription = ({ children }: CardDescriptionProps) => {
  return <Text style={styles.cardDescription}>{children}</Text>
}

interface CardContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const CardContent = ({ children, style }: CardContentProps) => {
  return <View style={[styles.cardContent, style]}>{children}</View>
}

interface CardFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const CardFooter = ({ children, style }: CardFooterProps) => {
  return <View style={[styles.cardFooter, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  cardDescription: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  cardContent: {
    padding: 16,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
})
