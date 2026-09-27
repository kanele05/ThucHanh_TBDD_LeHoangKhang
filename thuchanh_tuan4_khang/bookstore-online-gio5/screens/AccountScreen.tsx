// GIỜ 5 — Tab "Tài khoản": layout tĩnh ôn lại row/column.
//   - Khối hồ sơ: row + alignItems center (avatar tròn cố định + cột chữ flex:1).
//   - Menu: mỗi dòng row + space-between (nhãn bên trái, dấu › bên phải).
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TitleBar } from "../components/TitleBar";
import { TAB_BAR_SPACE } from "../components/TabLayout";

const MENU = ["Đơn hàng của tôi", "Sách yêu thích", "Địa chỉ giao hàng", "Cài đặt", "Đăng xuất"];

export function AccountScreen() {
  return (
    <View style={styles.screen}>
      <TitleBar title="Tài khoản" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>BS</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Bạn đọc BookStore</Text>
            <Text style={styles.email}>bandoc@bookstore.vn</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {MENU.map((label, index) => (
            <View key={label} style={[styles.menuRow, index > 0 && styles.menuRowBorder]}>
              <Text style={styles.menuLabel}>{label}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16, paddingBottom: 16 + TAB_BAR_SPACE },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4338CA",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  profileInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: "#111827" },
  email: { marginTop: 2, fontSize: 13, color: "#6B7280" },
  menu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
  },
  menuRowBorder: { borderTopWidth: 1, borderTopColor: "#F1F5F9" },
  menuLabel: { fontSize: 15, color: "#111827" },
  chevron: { fontSize: 20, color: "#9CA3AF" },
});
