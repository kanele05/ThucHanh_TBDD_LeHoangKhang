import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
import type { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductRow";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  const { has } = useFavorites();
  // TODO 3: bấm 1 dòng → mở ProductDetails, truyền id qua params
  return (
    <FlatList data={PHONES} keyExtractor={(p) => p.id} style={s.root} contentContainerStyle={s.list}
      renderItem={({ item }) => (
        <ProductRow phone={item} favorite={has(item.id)}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )} />
  );
}

const s = StyleSheet.create({
  root: { backgroundColor: colors.bg },
  list: { padding: 16, gap: 10 },
});
