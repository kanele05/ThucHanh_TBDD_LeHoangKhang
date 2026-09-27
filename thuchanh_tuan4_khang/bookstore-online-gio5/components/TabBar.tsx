// GIỜ 5 — Bài tập 1: Thanh Tab Bar dưới cùng (giao diện tĩnh, không dùng thư viện navigation)
// Kỹ thuật:
//  - Container: flexDirection 'row', mỗi mục flex:1 -> 4 mục chia đều bề ngang.
//  - Mỗi mục : flexDirection 'column' + alignItems/justifyContent 'center' -> icon trên, chữ dưới, căn giữa.
//  - Mục đang chọn: nền icon + màu chữ nổi bật.
import React from "react";
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";

export type TabKey = "home" | "category" | "cart" | "account";

export const TAB_BAR_HEIGHT = 60;

const TABS: { key: TabKey; icon: string; label: string }[] = [
  { key: "home", icon: "🏠", label: "Trang chủ" },
  { key: "category", icon: "📚", label: "Danh mục" },
  { key: "cart", icon: "🛒", label: "Giỏ hàng" },
  { key: "account", icon: "👤", label: "Tài khoản" },
];

export function TabBar({
  activeTab,
  onChangeTab,
  cartCount,
  style,
}: {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  cartCount: number;
  style?: StyleProp<ViewStyle>; // TabLayout truyền vào để đặt tab bar ở chế độ absolute
}) {
  return (
    <View style={[styles.bar, style]}>
      {TABS.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <Pressable key={tab.key} style={styles.item} onPress={() => onChangeTab(tab.key)}>
            {/* View bọc icon là containing block cho badge số lượng (absolute) — kỹ thuật Giờ 3 */}
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <Text style={[styles.icon, !active && styles.iconInactive]}>{tab.icon}</Text>
              {tab.key === "cart" && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row", // 4 mục xếp ngang
    height: TAB_BAR_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  item: {
    flex: 1, // mỗi mục chiếm 1 phần bằng nhau -> chia đều 4 phần
    flexDirection: "column", // icon ở trên, chữ ở dưới
    alignItems: "center", // căn giữa theo chiều ngang
    justifyContent: "center", // căn giữa theo chiều dọc
    gap: 2,
  },
  iconWrap: {
    width: 48,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "#E0E7FF", // nền indigo nhạt cho mục đang chọn
  },
  icon: {
    fontSize: 18,
  },
  iconInactive: {
    opacity: 0.45, // emoji không đổi màu được -> làm mờ các mục không chọn
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
  },
  labelActive: {
    color: "#4338CA",
    fontWeight: "700",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
});
