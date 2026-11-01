import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { PriceRange, filterBooks } from "../utils/filters";
import { useCart } from "../store/hooks";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors, radius } from "../theme";

const SORT_OPTIONS: { key: "asc" | "desc"; label: string }[] = [
  { key: "asc", label: "Giá tăng dần ↑" },
  { key: "desc", label: "Giá giảm dần ↓" },
];

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hai API độc lập → chạy SONG SONG bằng Promise.all
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);

  // Chỉ lọc sau khi người dùng ngừng gõ 400 ms
  const debouncedKeyword = useDebounce(keyword, 400);
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    if (sort === null) return filtered;
    // Sắp xếp trên bản sao để không làm đổi mảng books gốc
    return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  }, [books, debouncedKeyword, categoryId, priceRange, sort]);

  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null;
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };

  // Nhận categoryId từ tab Danh mục → chọn chip, rồi xoá params để không áp dụng lại
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}
      {loading ? (
        <LoadingView label="Đang tải sách…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <BookGrid
          data={visibleBooks}
          onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
          ListHeaderComponent={
            <View>
              <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
              <PriceFilter value={priceRange} onChange={setPriceRange} />
              <View style={styles.sortRow}>
                {SORT_OPTIONS.map((o) => {
                  const active = sort === o.key;
                  return (
                    <Pressable key={o.key} style={[styles.sortBtn, active && styles.sortBtnActive]} onPress={() => setSort(active ? null : o.key)}>
                      <Text style={[styles.sortText, active && styles.sortTextActive]}>{o.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
              {hasFilter && (
                <Pressable onPress={clearFilters} style={styles.clearBtn}>
                  <Text style={styles.clearText}>✕ Xóa bộ lọc</Text>
                </Pressable>
              )}
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              emoji="🔎"
              title="Không tìm thấy sách phù hợp"
              message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
              actionLabel="Xóa bộ lọc"
              onAction={clearFilters}
            />
          }
        />
      )}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  clearBtn: { alignSelf: "flex-start", marginHorizontal: 10, marginBottom: 6, paddingVertical: 4 },
  sortRow: { flexDirection: "row", gap: 8, paddingHorizontal: 12, paddingBottom: 10 },
  sortBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  sortBtnActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  sortText: { color: colors.text, fontWeight: "600" },
  sortTextActive: { color: "#fff" },
  clearText: { color: colors.indigo, fontWeight: "700" },
});
