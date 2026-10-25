import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { figma, figmaShadow, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} contentFit="cover" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={[styles.row, styles.starsRow]}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={[styles.row, styles.priceRow]}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={[styles.row, styles.badgeRow]}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <Image source={require("../../assets/icons/help.svg")} style={styles.help} />
        </View>
      </View>

      {/* TODO 1: nút chọn màu */}
      <Pressable style={styles.chooseBtn} onPress={() => navigation.navigate("ChooseColor", { color: picked })}>
        <Text style={styles.chooseText}>{phone.colors.length} MÀU-{picked ? "CHỌN LOẠI" : "CHỌN MÀU"}</Text>
        <Image source={require("../../assets/icons/chevron-right.svg")} style={styles.chevron} />
      </Pressable>

      {/* TODO 2: nút CHỌN MUA sát đáy */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// Số đo theo frame Figma 360×640 (Screen 01 / Screen 4)
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  image: { height: "100%", maxHeight: 361, aspectRatio: 301 / 361 },
  info: { paddingHorizontal: 22 },
  name: { fontSize: 15, color: figma.black, marginTop: -4 },
  row: { flexDirection: "row", alignItems: "center" },
  starsRow: { marginTop: 9, gap: 23 },
  review: { fontSize: 15, color: figma.black },
  priceRow: { marginTop: 11, gap: 44 },
  price: { fontSize: 18, fontWeight: "700", color: figma.black },
  oldPrice: { fontSize: 15, fontWeight: "700", color: figma.oldPrice, textDecorationLine: "line-through" },
  badgeRow: { marginTop: 13, gap: 8 },
  badge: { fontSize: 12, fontWeight: "700", color: figma.sale },
  help: { width: 20, height: 20 },
  chooseBtn: { marginTop: 16, marginHorizontal: 14, height: 34, borderRadius: 10, borderWidth: 1,
    borderColor: figma.border, backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 2, elevation: 3 },
  chooseText: { fontSize: 15, color: figma.black },
  chevron: { position: "absolute", right: 19, width: 11.5, height: 14 },
  buyBtn: { marginTop: 59, marginBottom: 13, marginHorizontal: 17, height: 44, borderRadius: 10,
    borderWidth: 1, borderColor: figma.btnBorder, backgroundColor: figma.buy,
    alignItems: "center", justifyContent: "center", ...figmaShadow },
  buyText: { color: figma.btnText, fontSize: 20, fontWeight: "700" },
});
