// GIỜ 4 — Bài tập 1: Màn hình Trang chủ BookStore hoàn chỉnh
// Ghép Header (Giờ 1) + Category Chips (Giờ 2) + Book Grid (Giờ 2/3) + Floating Cart Button (Giờ 3).
//
// Cây layout (đúng yêu cầu kỹ thuật của bài):
//   SafeAreaView (flex:1)
//   ├── Header            -> CỐ ĐỊNH, không nằm trong ScrollView
//   ├── ScrollView        -> flex:1, chứa Chips + Grid, chỉ phần này cuộn
//   └── FloatingCartButton-> position:'absolute', CÙNG CẤP với ScrollView (không nằm bên trong)
import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { BOOKS } from "../data";

// Nút giỏ cao 56 + cách đáy 24 = 80 -> chừa dư thêm để thẻ sách cuối cùng
// cuộn lên được hẳn phía trên nút, không bị nút che mất.
const FAB_SPACE = 100;

export function HomeScreen({
  cartCount,
  onOpenBook,
  onPressCart,
}: {
  cartCount: number;
  onOpenBook: (id: number) => void;
  onPressCart: () => void;
}) {
  return (
    // SafeAreaView chỉ lo tránh tai thỏ/thanh trạng thái/thanh home indicator,
    // bên trong vẫn là flexbox bình thường (mặc định flexDirection 'column').
    // Nó cũng là containing block cho nút giỏ absolute bên dưới.
    <SafeAreaView style={styles.screen}>
      <Header />

      {/* style flex:1 -> ScrollView chiếm hết phần chiều cao còn lại dưới Header.
          contentContainerStyle mới là nơi đặt padding cho NỘI DUNG bên trong. */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />

        <Text style={[styles.sectionTitle, styles.gridTitle]}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={onOpenBook} />
      </ScrollView>

      {/* Nằm NGOÀI ScrollView, song song với nó -> đứng yên khi nội dung cuộn.
          Nếu đặt vào trong ScrollView, nút sẽ neo theo nội dung và trôi đi theo. */}
      <FloatingCartButton count={cartCount} onPress={onPressCart} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: FAB_SPACE, // chừa chỗ cho nút giỏ hàng nổi
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  gridTitle: {
    marginTop: 20,
  },
});
