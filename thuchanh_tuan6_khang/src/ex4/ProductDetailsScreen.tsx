import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import type { RootProps } from "./types";
import { useFavorites } from "./FavoritesContext";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4: lấy id từ params rồi tìm sản phẩm
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5: id không tồn tại
  if (!phone) {
    return <View style={s.center}><Text style={s.muted}>Không tìm thấy sản phẩm #{id}</Text></View>;
  }

  const saved = has(phone.id);
  // TODO 6 + 7: thông tin sản phẩm và nút lưu yêu thích
  return (
    <ScrollView style={s.root} contentContainerStyle={s.content}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} contentFit="contain" />
      <Text style={s.name}>{phone.name}</Text>
      <View style={s.row}>
        <Stars value={phone.rating} />
        <Text style={s.muted}>({phone.reviewCount} đánh giá)</Text>
      </View>
      <View style={s.row}>
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
        {phone.oldPrice > phone.price && <Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text>}
      </View>
      <Text style={s.text}>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text>
      <Text style={s.muted}>Mã sản phẩm: #{phone.id}</Text>

      <Pressable style={[s.btn, saved && s.btnOn]} onPress={() => toggle(phone.id)}>
        <Text style={[s.btnText, saved && s.btnTextOn]}>{saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, gap: 10 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  image: { width: "100%", height: 280 },
  name: { fontSize: 18, fontWeight: "700", color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  price: { fontSize: 20, fontWeight: "700", color: colors.red },
  oldPrice: { fontSize: 15, color: colors.muted, textDecorationLine: "line-through" },
  text: { fontSize: 15, color: colors.text },
  bold: { fontWeight: "700" },
  muted: { fontSize: 14, color: colors.muted },
  btn: { marginTop: 12, height: 48, borderRadius: 10, borderWidth: 2, borderColor: colors.red,
    alignItems: "center", justifyContent: "center" },
  btnOn: { backgroundColor: colors.red },
  btnText: { fontSize: 16, fontWeight: "700", color: colors.red },
  btnTextOn: { color: "#fff" },
});
