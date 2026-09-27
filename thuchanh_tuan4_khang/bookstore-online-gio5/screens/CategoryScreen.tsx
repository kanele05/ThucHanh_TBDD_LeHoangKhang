// GIỜ 5 — Tab "Danh mục": tái sử dụng CategoryChips của Giờ 2 dưới thanh tiêu đề cố định.
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TitleBar } from "../components/TitleBar";
import { CategoryChips } from "../components/CategoryChips";
import { TAB_BAR_SPACE } from "../components/TabLayout";

export function CategoryScreen() {
  return (
    <View style={styles.screen}>
      <TitleBar title="Danh mục" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <CategoryChips />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 16 + TAB_BAR_SPACE },
});
