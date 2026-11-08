import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

// BT8.6: nút −/+ với STATE CỤC BỘ + debounce 300ms
//   1) const [qty, setQty] = useState(item.quantity); const debouncedQty = useDebounce(qty, 300);
//   2) useEffect: khi debouncedQty khác item.quantity → onChangeQty(item.bookId, debouncedQty)
//   3) useEffect: khi item.quantity đổi từ nơi khác → setQty(item.quantity)
//   4) canDec = qty > 1; canInc = qty < item.stock (không vượt tồn kho); nút bị mờ khi không bấm được
//   5) hiển thị "Còn {item.stock}"
export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty, item.bookId, item.quantity, onChangeQty]);

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.controlRow}>
          <View style={styles.stepper}>
            <Pressable
              disabled={!canDec}
              onPress={() => setQty((q) => q - 1)}
              style={[styles.btn, !canDec && styles.btnDisabled]}
              hitSlop={4}
              accessibilityLabel="Giảm"
            >
              <Text style={[styles.btnText, !canDec && styles.btnTextDisabled]}>−</Text>
            </Pressable>
            <Text style={styles.qtyText}>{qty}</Text>
            <Pressable
              disabled={!canInc}
              onPress={() => setQty((q) => q + 1)}
              style={[styles.btn, !canInc && styles.btnDisabled]}
              hitSlop={4}
              accessibilityLabel="Tăng"
            >
              <Text style={[styles.btnText, !canInc && styles.btnTextDisabled]}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 4 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  controlRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4 },
  stepper: { flexDirection: "row", alignItems: "center", backgroundColor: "#F1F5F9", borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line },
  btn: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  btnDisabled: { opacity: 0.35 },
  btnText: { fontSize: 16, fontWeight: "800", color: colors.navy },
  btnTextDisabled: { color: colors.muted },
  qtyText: { minWidth: 24, textAlign: "center", fontWeight: "700", color: colors.text, fontSize: 14 },
  stock: { fontSize: 12, color: colors.muted },
  trash: { fontSize: 22 },
});
