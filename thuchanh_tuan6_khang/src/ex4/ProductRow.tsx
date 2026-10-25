import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

export function ProductRow({ phone, favorite, onPress }: { phone: Phone; favorite: boolean; onPress: () => void }) {
  return (
    <Pressable style={({ pressed }) => [s.row, pressed && s.pressed]} onPress={onPress}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.thumb} contentFit="contain" />
      <View style={s.info}>
        <Text style={s.name} numberOfLines={2}>{phone.name.split(" - ")[0]}</Text>
        <View style={s.stars}><Stars value={phone.rating} size={14} /></View>
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
      {favorite && <Ionicons name="heart" size={20} color={colors.red} />}
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Pressable>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", borderRadius: 10,
    padding: 12, borderWidth: 1, borderColor: colors.line },
  pressed: { opacity: 0.6 },
  thumb: { width: 64, height: 76 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  stars: { marginTop: 4 },
  price: { marginTop: 2, fontSize: 15, fontWeight: "700", color: colors.red },
});
