// GIỜ 5 — Bài tập 2: 1 dòng sản phẩm trong giỏ hàng
// Kỹ thuật: flexDirection 'row' + alignItems 'center', chia tỉ lệ các cột con:
//   [ảnh: width cố định] [tên: flex:1] [số lượng: width cố định] [giá: width cố định]
// Chỉ cột tên co giãn -> tên dài hay ngắn thì cột số lượng/giá vẫn thẳng hàng giữa các dòng.
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CartItem } from "../data";
import { formatPrice, getFinalPrice } from "../format";

export function CartItemRow({ item }: { item: CartItem }) {
  const { book, quantity } = item;

  return (
    <View style={styles.row}>
      <Image source={{ uri: book.cover }} style={styles.cover} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
      </View>

      <View style={styles.qtyBox}>
        <Text style={styles.qtyText}>x{quantity}</Text>
      </View>

      <Text style={styles.price}>{formatPrice(getFinalPrice(book) * quantity)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // ảnh - tên - SL - giá nằm ngang
    alignItems: "center", // căn giữa các cột theo chiều dọc
    gap: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  cover: {
    width: 56, // cố định
    height: 76,
    borderRadius: 6,
    backgroundColor: "#EEF2F7",
  },
  info: {
    flex: 1, // ăn hết phần rộng còn lại
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  author: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
  qtyBox: {
    width: 40, // cố định
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  price: {
    width: 84, // cố định
    textAlign: "right",
    fontSize: 14,
    fontWeight: "700",
    color: "#15803D",
  },
});
