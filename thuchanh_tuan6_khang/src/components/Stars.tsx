import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

const STAR = require("../../assets/icons/star.svg");

// Ngôi sao SVG từ Figma (22×23, cách nhau ~3.5px); sao chưa đạt thì làm mờ.
export function Stars({ value, size = 22 }: { value: number; size?: number }) {
  return (
    <View style={{ flexDirection: "row", gap: size * 0.16 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Image key={i} source={STAR} style={{ width: size, height: size * 23 / 22, opacity: i < value ? 1 : 0.25 }} />
      ))}
    </View>
  );
}
