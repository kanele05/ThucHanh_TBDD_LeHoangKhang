// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách (Book Detail)
//
// Cây layout — cùng tư duy với Bài tập 1: phần CỐ ĐỊNH (đầu/cuối) nằm NGOÀI
// ScrollView, phần nội dung dài nằm TRONG ScrollView ở giữa:
//   SafeAreaView (flex:1)
//   ├── TopBar            -> cố định (nút quay lại)
//   ├── Ảnh bìa lớn       -> cố định, alignSelf:'center' + aspectRatio
//   ├── ScrollView        -> flex:1, chứa tên + tác giả + giá + mô tả dài
//   └── BottomBar         -> cố định dưới cùng, row + space-between
import React from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Book } from "../data";
import { DiscountBadge } from "../components/DiscountBadge";

function formatPrice(value: number) {
  return `${value.toLocaleString()} đ`;
}

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
}: {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
}) {
  const finalPrice = book.discountPercent
    ? Math.round((book.price * (100 - book.discountPercent)) / 100)
    : book.price;

  return (
    <SafeAreaView style={styles.screen}>
      {/* ===== Thanh trên cùng (cố định) ===== */}
      <View style={styles.topBar}>
        <Pressable onPress={onBack} hitSlop={8}>
          <Text style={styles.backText}>‹ Quay lại</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Chi tiết sách</Text>
        {/* View rỗng cùng bề rộng nút "Quay lại" -> tiêu đề nằm chính giữa
            nhờ justifyContent 'space-between' của topBar. */}
        <View style={styles.topBarSpacer} />
      </View>

      {/* ===== Ảnh bìa lớn (cố định, không cuộn) =====
          alignSelf:'center' -> tự căn giữa theo trục ngang, dù cha (SafeAreaView)
          đang để alignItems mặc định là 'stretch'.
          width theo % + aspectRatio -> chiều cao tự tính, ảnh không bị méo. */}
      <View style={styles.coverWrap}>
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <DiscountBadge discountPercent={book.discountPercent} isNew={book.isNew} />
      </View>

      {/* ===== Nội dung dài (cuộn được) =====
          style flex:1 -> ScrollView chỉ chiếm phần chiều cao CÒN LẠI giữa ảnh bìa
          và BottomBar, nên mô tả dài đến đâu cũng không đẩy BottomBar ra khỏi màn hình.
          contentContainerStyle flexGrow:1 -> khi mô tả NGẮN (thử sách id 5, 6),
          vùng nội dung vẫn cao bằng ScrollView, nên dòng ghi chú marginTop:'auto'
          vẫn nằm sát đáy vùng cuộn. */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>

        {/* Hàng giá: row + gap, giá gốc gạch ngang chỉ hiện khi có giảm giá */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(finalPrice)}</Text>
          {book.discountPercent ? (
            <Text style={styles.oldPrice}>{formatPrice(book.price)}</Text>
          ) : null}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Giới thiệu sách</Text>
        <Text style={styles.description}>{book.description}</Text>

        <Text style={styles.note}>Miễn phí đổi trả trong 7 ngày · Giao hàng toàn quốc</Text>
      </ScrollView>

      {/* ===== Thanh "Thêm vào giỏ" (cố định dưới cùng) =====
          Nằm NGOÀI ScrollView, là con cuối cùng của SafeAreaView -> luôn dính đáy.
          flexDirection 'row' + justifyContent 'space-between' -> giá bên trái, nút bên phải. */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Giá bán</Text>
          <Text style={styles.bottomPrice}>{formatPrice(finalPrice)}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>🛒 Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // --- Thanh trên cùng ---
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backText: {
    width: 80,
    fontSize: 15,
    fontWeight: "600",
    color: "#4338CA",
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  topBarSpacer: {
    width: 80,
  },

  // --- Ảnh bìa ---
  coverWrap: {
    alignSelf: "center", // căn giữa riêng phần tử này theo trục ngang
    width: "42%", // rộng theo % màn hình
    aspectRatio: 3 / 4, // chiều cao tự suy ra từ width, giữ tỉ lệ bìa sách
    marginVertical: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#EEF2F7",
  },
  cover: {
    width: "100%",
    height: "100%",
  },

  // --- Vùng cuộn ---
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1, // nội dung ngắn vẫn giãn cao bằng ScrollView
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  author: {
    marginTop: 4,
    fontSize: 14,
    color: "#5B6B7F",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#15803D",
  },
  oldPrice: {
    fontSize: 14,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
  },
  note: {
    marginTop: "auto", // đẩy xuống đáy vùng nội dung (chỉ thấy rõ khi mô tả ngắn)
    paddingTop: 16,
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },

  // --- Thanh dưới cùng ---
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between", // giá 1 đầu, nút 1 đầu
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
