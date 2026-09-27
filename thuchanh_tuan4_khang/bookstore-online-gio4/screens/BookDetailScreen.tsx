// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách
// Cấu trúc 3 vùng giống HỆT Bài 1 (Header / ScrollView / FloatingButton):
//  - Vùng CỐ ĐỊNH TRÊN: nút quay lại + ảnh bìa lớn -> KHÔNG nằm trong ScrollView,
//    luôn đứng yên, đóng vai trò như "Header" của màn Chi tiết.
//  - Vùng GIỮA: 1 ScrollView flex:1 chứa toàn bộ nội dung DÀI (tên, tác giả, giá,
//    mô tả) -> mô tả dù dài bao nhiêu cũng chỉ cuộn bên trong vùng này.
//  - Vùng CỐ ĐỊNH DƯỚI: thanh "Thêm vào giỏ" -> KHÔNG nằm trong ScrollView, nhờ đó
//    dù mô tả dài cỡ nào cũng không bao giờ bị đẩy trôi mất khỏi màn hình.
import React from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
}: {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
}) {
  return (
    <View style={styles.screen}>
      {/* ===== CỐ ĐỊNH TRÊN (không cuộn) ===== */}
      <View style={styles.topFixed}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>← Quay lại</Text>
        </Pressable>

        <Image
          source={{ uri: book.cover }}
          // alignSelf:'center' căn giữa riêng ảnh theo chiều ngang; width theo %
          // + aspectRatio giữ đúng tỉ lệ ảnh dù màn hình rộng/hẹp khác nhau.
          style={styles.cover}
        />
      </View>

      {/* ===== GIỮA: ScrollView flex:1 chứa nội dung DÀI ===== */}
      <ScrollView
        style={styles.scroll} // flex:1 bắt buộc để ScrollView lấp đầy khoảng còn lại
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* ===== CỐ ĐỊNH DƯỚI (không cuộn) ===== */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
        <Pressable style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topFixed: {
    // Không có flex -> chiều cao "auto" theo nội dung (nút quay lại + ảnh bìa),
    // phần còn lại của màn hình sẽ dành hết cho ScrollView ở giữa (flex:1).
    paddingHorizontal: 20,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    paddingVertical: 8,
    alignSelf: "flex-start", // chỉ rộng vừa đủ chữ, không kéo dài cả hàng
  },
  backText: {
    color: "#4338CA",
    fontWeight: "600",
  },
  cover: {
    alignSelf: "center", // căn giữa riêng ảnh, không phụ thuộc alignItems của cha
    width: "70%",
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh dù width theo %
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
  },
  scroll: {
    flex: 1, // bắt buộc: ScrollView phải flex:1 mới cuộn được đúng trong không gian còn lại
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    // flexGrow:1 để phần nội dung ngắn (không cần cuộn) vẫn lấp đầy chiều cao
    // ScrollView, tránh Text/Description bị dồn lên sát mép trên.
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  author: {
    marginTop: 4,
    fontSize: 14,
    color: "#5B6B7F",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
  bottomBar: {
    flexDirection: "row", // giá bên trái, nút bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomPrice: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
