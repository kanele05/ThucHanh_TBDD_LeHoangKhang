// GIỜ 5 — Tab "Tài khoản": layout hồ sơ đơn giản (avatar + tên + danh sách mục
// menu). Avatar minh hoạ alignSelf: 'center' để tự canh giữa dù card cha là cột.
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { TAB_BAR_HEIGHT, USE_ABSOLUTE_TAB_BAR } from "../components/TabBar";

const MENU_ITEMS = ["Đơn hàng của tôi", "Địa chỉ giao hàng", "Sổ địa chỉ thanh toán", "Cài đặt", "Trợ giúp"];

export function AccountScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Tài khoản</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          {/* alignSelf: 'center' -> avatar tự canh giữa, không phụ thuộc alignItems
              của profileCard (đang để mặc định 'stretch' cho các dòng text bên dưới). */}
          <Image source={{ uri: "https://picsum.photos/seed/avatar/200/200" }} style={styles.avatar} />
          <Text style={styles.name}>Nguyễn Văn A</Text>
          <Text style={styles.email}>nguyenvana@gmail.com</Text>
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <View key={item} style={styles.menuRow}>
              <Text style={styles.menuText}>{item}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          ))}
        </View>
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
  profileCard: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    marginBottom: 8,
  },
  avatar: {
    alignSelf: "center", // canh giữa avatar dù cha có alignItems khác
    width: 84,
    height: 84,
    borderRadius: 42, // = width/2 -> hình tròn
    backgroundColor: "#EEF2F7",
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  email: {
    fontSize: 12,
    color: "#5B6B7F",
    marginTop: 2,
  },
  menu: { marginTop: 8 },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  chevron: {
    fontSize: 18,
    color: "#9CA3AF",
  },
});
