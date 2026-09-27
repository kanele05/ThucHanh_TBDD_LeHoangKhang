// GIỜ 5 — Bài tập 2: Màn hình Giỏ hàng (Cart Screen)
//
// Màn hình có đủ 3 vùng, xếp dọc, KHÔNG vùng nào chồng lên vùng nào:
//   View (flex:1)
//   ├── TitleBar          -> cố định trên cùng
//   ├── ScrollView        -> flex:1, danh sách sản phẩm — vùng DUY NHẤT cuộn được
//   └── SummaryBar        -> tổng tiền + nút Thanh toán, cố định, KHÔNG cuộn
//   (Tab Bar do TabLayout vẽ ngay bên dưới màn hình này)
//
// Vì ScrollView lấy flex:1, nó chỉ chiếm phần chiều cao còn lại sau TitleBar và
// SummaryBar -> danh sách dài đến đâu cũng không đẩy SummaryBar/Tab Bar ra khỏi màn hình.
import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { TitleBar } from "../components/TitleBar";
import { CartItemRow } from "../components/CartItemRow";
import { TAB_BAR_SPACE } from "../components/TabLayout";
import { CartItem } from "../data";
import { formatPrice, getFinalPrice } from "../format";

export function CartScreen({ items }: { items: CartItem[] }) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + getFinalPrice(item.book) * item.quantity, 0);

  return (
    <View style={styles.screen}>
      <TitleBar title="Giỏ hàng" right={`${totalQuantity} sản phẩm`} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <CartItemRow key={item.book.id} item={item} />
        ))}
      </ScrollView>

      {/* Thanh tổng tiền: con cuối của View flex:1, nằm ngoài ScrollView -> luôn dính
          ngay trên Tab Bar. Nếu tab bar ở chế độ absolute thì phải nâng lên thêm
          TAB_BAR_SPACE, không thì tab bar sẽ đè lên thanh này. */}
      <View style={[styles.summary, { marginBottom: TAB_BAR_SPACE }]}>
        <View>
          <Text style={styles.summaryLabel}>Tổng tiền</Text>
          <Text style={styles.summaryTotal}>{formatPrice(totalPrice)}</Text>
        </View>
        <Pressable style={styles.checkoutButton} onPress={() => console.log("Thanh toán", totalPrice)}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1, // chiếm phần còn lại giữa TitleBar và SummaryBar
  },
  list: {
    padding: 16,
    gap: 12, // khoảng cách đều giữa các dòng sản phẩm
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between", // tổng tiền bên trái, nút bên phải
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  checkoutButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
