import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
import type { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductRow";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  // TODO 8: chỉ hiện các sản phẩm có id nằm trong danh sách yêu thích
  const { ids } = useFavorites();
  const saved = PHONES.filter((p) => ids.includes(p.id));
  return (
    <FlatList data={saved} keyExtractor={(p) => p.id} style={s.root} contentContainerStyle={s.list}
      renderItem={({ item }) => (
        <ProductRow phone={item} favorite onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )}
      ListEmptyComponent={<Text style={s.empty}>Chưa có sản phẩm nào được lưu.</Text>} />
  );
}

const s = StyleSheet.create({
  root: { backgroundColor: colors.bg },
  list: { padding: 16, gap: 10 },
  empty: { textAlign: "center", marginTop: 24, color: colors.muted, fontSize: 15 },
});
