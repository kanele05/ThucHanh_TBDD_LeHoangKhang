// GIỜ 5 — Tab "Trang chủ": placeholder ở mức "modest" nhưng vẫn là layout thật,
// không chỉ là dòng chữ trỏ sang project khác. Hiển thị lưới sách từ data.ts,
// minh hoạ thêm flexWrap + aspectRatio (2 khái niệm ôn lại ở lý thuyết Giờ 5).
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { BOOKS } from "../data";
import { TAB_BAR_HEIGHT, USE_ABSOLUTE_TAB_BAR } from "../components/TabBar";

export function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Trang chủ</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Sách nổi bật</Text>

        {/* flexWrap: 'wrap' -> tự xuống dòng khi hết chỗ ngang, mỗi thẻ chiếm ~48%
            bề rộng -> lưới 2 cột không cần tính toán width bằng tay. */}
        <View style={styles.grid}>
          {BOOKS.map((book) => (
            <View key={book.id} style={styles.card}>
              {/* aspectRatio thay cho height cố định -> ảnh luôn giữ đúng tỉ lệ
                  dù bề rộng thẻ co giãn theo màn hình. */}
              <Image source={{ uri: book.cover }} style={styles.cover} />
              <Text style={styles.title} numberOfLines={1}>
                {book.title}
              </Text>
              <Text style={styles.author} numberOfLines={1}>
                {book.author}
              </Text>
              <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5B6B7F",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%", // 2 cột: 48% + 48% + khoảng gap ~ vừa đủ 100%
    marginBottom: 16,
  },
  cover: {
    width: "100%",
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh bìa sách, không cần height cố định
    borderRadius: 8,
    backgroundColor: "#EEF2F7",
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  author: {
    fontSize: 11,
    color: "#5B6B7F",
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1B4B",
    marginTop: 4,
  },
});
