import { useEffect, useState } from "react";

// Trả về giá trị "đã trễ": chỉ cập nhật sau khi người dùng ngừng gõ `delay` ms
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    // Mỗi lần value đổi: đặt hẹn giờ mới; hàm dọn dẹp huỷ hẹn giờ cũ → chỉ lần gõ cuối được áp dụng
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
