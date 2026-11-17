import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = { cod: "Thanh toán khi nhận hàng (COD)", bank: "Chuyển khoản ngân hàng" } as const;

// Bộ lọc trạng thái (câu hỏi bổ sung 5)
type StatusFilter = "all" | OrderStatus;
const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn tất" },
  { value: "cancelled", label: "Đã huỷ" },
];

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng (xem chi tiết ngay tại màn này)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all"); // câu hỏi bổ sung 5

  // BT9.3a
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      // Sắp xếp lại ở client cho chắc: chuỗi ISO so sánh được trực tiếp
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  // BT9.C1 (thử thách "Mua lại"): thêm lại toàn bộ sản phẩm của đơn vào giỏ hiện tại
  const reorder = async (order: Order) => {
    try {
      const books = await getBooks(); // lấy giá và tồn kho MỚI NHẤT (giá trong đơn cũ có thể đã khác)
      let added = 0;
      order.items.forEach((it) => {
        const book = books.find((b) => b.id === it.bookId);
        if (!book || book.stock <= 0) return; // sách không còn / hết hàng → bỏ qua
        const inCart = cartItems.find((c) => c.bookId === it.bookId);
        if (!inCart) {
          add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock });
        }
        setQty(it.bookId, (inCart?.quantity ?? 0) + it.quantity); // cùng sách thì cộng dồn; setQty tự chặn ở tồn kho
        added++;
      });
      if (added === 0) {
        showMessage("Không thể mua lại", "Các sách trong đơn này hiện đã hết hàng.");
        return;
      }
      showMessage("Đã thêm vào giỏ", "Các sản phẩm của đơn hàng đã được thêm lại vào giỏ.", () =>
        navigation.navigate("Tabs", { screen: "Cart" }),
      );
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    }
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  // Câu hỏi bổ sung 5: chỉ sửa DỮ LIỆU truyền cho FlatList, không gọi lại API
  const visibleOrders = orders.filter((o) => statusFilter === "all" || o.status === statusFilter);

  // BT9.3b + BT9.3c
  return (
    <FlatList
      style={styles.container}
      data={visibleOrders}
      keyExtractor={(o) => String(o.id)}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        orders.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {STATUS_FILTERS.map((f) => {
              const active = statusFilter === f.value;
              return (
                <Pressable
                  key={f.value}
                  onPress={() => setStatusFilter(f.value)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null
      }
      ListEmptyComponent={
        orders.length === 0 ? (
          <EmptyState
            emoji="🧾"
            title="Bạn chưa có đơn hàng nào"
            message="Đặt đơn đầu tiên để theo dõi tại đây."
            actionLabel="Mua sắm ngay"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        ) : (
          <EmptyState
            emoji="🔎"
            title="Không có đơn nào ở trạng thái này"
            actionLabel="Xem tất cả"
            onAction={() => setStatusFilter("all")}
          />
        )
      }
      renderItem={({ item: o }) => {
        const open = openId === o.id; // mỗi thẻ tự biết nó đang mở hay đóng
        return (
          <View style={styles.card}>
            <Pressable onPress={() => setOpenId(open ? null : o.id)} style={styles.head}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.code}>Đơn #{o.id}</Text>
                <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                <Text style={styles.total}>{formatPrice(o.total)}</Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 6 }}>
                <StatusBadge status={o.status} />
                <Text style={styles.toggle}>{open ? "Thu gọn ▲" : "Chi tiết ▼"}</Text>
              </View>
            </Pressable>

            {open && (
              <View style={styles.detail}>
                {o.items.map((it) => (
                  <View key={it.bookId} style={styles.itemRow}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {it.title} × {it.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>{formatPrice(it.price * it.quantity)}</Text>
                  </View>
                ))}
                <View style={styles.addr}>
                  <Text style={styles.addrH}>Giao đến</Text>
                  <Text style={styles.addrT}>
                    {o.address.name} · {o.address.phone}
                  </Text>
                  <Text style={styles.addrT}>{o.address.address}</Text>
                  <Text style={styles.addrT}>Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}</Text>
                </View>
                {/* BT9.C1: chỉ đơn đã hoàn tất mới có nút Mua lại */}
                {o.status === "completed" && (
                  <PrimaryButton title="🔁 Mua lại" variant="outline" onPress={() => reorder(o)} />
                )}
              </View>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 12, gap: 10, flexGrow: 1 },
  chips: { gap: 8, paddingBottom: 2 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.pill, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  chipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { color: colors.text, fontWeight: "700", fontSize: 13 },
  chipTextActive: { color: "#fff" },
  card: { backgroundColor: colors.card, borderRadius: radius.md, overflow: "hidden" },
  head: { flexDirection: "row", padding: 12, gap: 8 },
  code: { fontWeight: "800", color: colors.navy, fontSize: 15 },
  date: { color: colors.muted, fontSize: 12 },
  total: { fontWeight: "800", color: colors.indigo, marginTop: 2 },
  toggle: { color: colors.indigo, fontWeight: "700", fontSize: 12 },
  detail: { borderTopWidth: 1, borderTopColor: colors.line, padding: 12, gap: 6 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { fontWeight: "700", color: colors.text },
  addr: { marginTop: 6, backgroundColor: colors.bg, borderRadius: radius.sm, padding: 10, gap: 2 },
  addrH: { fontWeight: "800", color: colors.navy },
  addrT: { color: colors.text, fontSize: 13 },
});
