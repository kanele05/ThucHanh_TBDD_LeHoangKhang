// Thanh tiêu đề đơn giản cho các tab (Danh mục, Giỏ hàng, Tài khoản):
// cùng khuôn với Header Giờ 1 — row + space-between + alignItems center, chiều cao cố định.
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function TitleBar({ title, right }: { title: string; right?: string }) {
  return (
    <View style={styles.bar}>
      <Text style={styles.title}>{title}</Text>
      {right ? <Text style={styles.right}>{right}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#1E1B4B",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  right: {
    color: "#C7D2FE",
    fontSize: 13,
  },
});
