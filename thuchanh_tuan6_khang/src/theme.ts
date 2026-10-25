export const colors = {
  red: "#E53A2F", blue: "#4F63C8", navy: "#0B1F5C", text: "#1F2430",
  muted: "#6B7280", line: "#D8DCE3", bg: "#F4F5F7", grey: "#C4C4C4", star: "#F5C518",
};

// Màu lấy từ Figma (Bài 1 – Select Phone)
export const figma = {
  black: "#000000", oldPrice: "rgba(0,0,0,0.58)", sale: "#FA0000", border: "rgba(0,0,0,0.46)",
  buy: "#EE0A0A", btnBorder: "#CA1536", done: "rgba(25,82,226,0.58)", btnText: "#F9F2F2",
};
export const figmaShadow = {
  shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 4,
};

// 1790000 -> "1.790.000 đ"
export const formatPrice = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
