// GIỜ 5 — Tab "Danh mục": danh sách CATEGORIES thật từ data.ts, mỗi dòng là 1
// row flexDirection:'row' + justifyContent:'space-between' (tên bên trái, dấu
// ">" bên phải) -- layout đơn giản, đúng tinh thần "modest" của tài liệu.
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { CATEGORIES } from "../data";
import { TAB_BAR_HEIGHT, USE_ABSOLUTE_TAB_BAR } from "../components/TabBar";

export function CategoryScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Danh mục</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {CATEGORIES.map((name) => (
          <View key={name} style={styles.row}>
            <Text style={styles.rowText}>{name}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    // TabBar absolute KHÔNG chiếm chỗ trong luồng flex -> phải chừa thêm đúng
    // chiều cao TabBar, nếu không phần tử cuối danh sách sẽ bị TabBar che mất.
    paddingBottom: 16 + (USE_ABSOLUTE_TAB_BAR ? TAB_BAR_HEIGHT : 0),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  rowText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  chevron: {
    fontSize: 18,
    color: "#9CA3AF",
  },
});
