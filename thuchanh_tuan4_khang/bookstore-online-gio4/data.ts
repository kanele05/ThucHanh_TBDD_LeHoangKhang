// Dữ liệu mẫu dùng chung cho toàn bộ 5 Giờ — đúng tinh thần "cho sẵn trong data.js"
// của tài liệu, để không phải nhập liệu tay, chỉ tập trung vào LAYOUT.

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  discountPercent?: number; // có giá trị -> Giờ 3 vẽ badge "-x%"
  isNew?: boolean; // true -> Giờ 3 vẽ badge "Mới" thay vì badge giảm giá
  description: string; // dùng cho Giờ 4 (màn Chi tiết, đoạn mô tả dài cần cuộn)
}

export const CATEGORIES: string[] = [
  "Văn học",
  "Kinh tế",
  "Thiếu nhi",
  "Kỹ năng sống",
  "Truyện tranh",
  "Ngoại ngữ",
  "Lịch sử",
];

// Cố tình để vài tựa sách DÀI (để test numberOfLines + layout không vỡ khi nội dung dài
// — đúng tiêu chí "Không bị lệch khi đổi nội dung" ở cuối tài liệu).
export const BOOKS: Book[] = [
  {
    id: 1,
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    price: 45000,
    cover: "https://picsum.photos/seed/book1/400/560",
    discountPercent: 20,
    description:
      "Cuốn sách kể về hành trình phiêu lưu của chú Dế Mèn, qua đó gửi gắm bài học về lòng dũng cảm, " +
      "sự trưởng thành và tình bạn. Đây là tác phẩm văn học thiếu nhi kinh điển của Việt Nam, được nhiều " +
      "thế hệ độc giả yêu thích và đưa vào chương trình giảng dạy phổ thông.",
  },
  {
    id: 2,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    cover: "https://picsum.photos/seed/book2/400/560",
    isNew: true,
    description:
      "Câu chuyện ngụ ngôn về chàng chăn cừu Santiago trên hành trình đi tìm kho báu, khám phá ra rằng " +
      "kho báu lớn nhất chính là những bài học có được trên con đường mình đã đi qua.",
  },
  {
    id: 3,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 129000,
    cover: "https://picsum.photos/seed/book3/400/560",
    // Mô tả CỐ TÌNH viết rất dài (nhiều đoạn) để làm ví dụ bắt buộc phải cuộn ở
    // màn Chi tiết (Giờ 4 — Bài tập 2), kiểm chứng ScrollView flex:1 hoạt động
    // đúng và không đẩy thanh "Thêm vào giỏ" cố định trôi khỏi màn hình.
    description:
      "Một góc nhìn tổng quan về lịch sử loài người, từ thời kỳ đồ đá cho đến cuộc cách mạng khoa học " +
      "và công nghệ hiện đại, lý giải vì sao Homo sapiens trở thành loài thống trị hành tinh.\n\n" +
      "Tác giả chia lịch sử nhân loại thành ba cuộc cách mạng lớn: Cách mạng Nhận thức giúp con người " +
      "hình thành ngôn ngữ và khả năng tưởng tượng ra những điều không tồn tại (huyền thoại, tôn giáo, " +
      "quốc gia, tiền tệ...), từ đó hợp tác được với số lượng lớn người xa lạ. Cách mạng Nông nghiệp " +
      "khiến con người từ săn bắt hái lượm chuyển sang định cư trồng trọt, nhưng tác giả lập luận đây " +
      "cũng là một trong những 'cú lừa' lớn nhất lịch sử vì khiến cuộc sống cá nhân vất vả hơn để đổi " +
      "lấy sự bùng nổ dân số. Cách mạng Khoa học trong vài trăm năm gần đây thì thay đổi hoàn toàn cách " +
      "loài người kiểm soát năng lượng, vật chất và thông tin.\n\n" +
      "Cuốn sách cũng đặt ra nhiều câu hỏi gây tranh luận: Tiền bạc, đế chế và tôn giáo có điểm chung gì " +
      "khiến hàng triệu người xa lạ tin tưởng và hợp tác với nhau? Chủ nghĩa tư bản có phải một dạng " +
      "'tôn giáo' mới? Hạnh phúc của con người thời hiện đại có thực sự tăng lên cùng với tiến bộ công " +
      "nghệ hay không? Và cuối cùng, khi công nghệ sinh học và trí tuệ nhân tạo phát triển, liệu Homo " +
      "sapiens có đang đứng trước ngưỡng cửa tự biến đổi chính mình thành một loài khác?\n\n" +
      "Với lối viết vừa khoa học vừa dễ tiếp cận, Sapiens đã trở thành một trong những cuốn sách phi hư " +
      "cấu bán chạy nhất thế giới, được dịch ra hàng chục thứ tiếng và được nhiều nhân vật nổi tiếng " +
      "trong giới công nghệ, chính trị khuyên đọc.",
  },
  {
    id: 4,
    title: "Điều Kỳ Diệu Của Tiệm Tạp Hoá Namiya",
    author: "Higashino Keigo",
    price: 98000,
    cover: "https://picsum.photos/seed/book4/400/560",
    discountPercent: 15,
    description:
      "Những lá thư gửi đến một tiệm tạp hoá cũ kỹ vượt thời gian, kết nối quá khứ và hiện tại, mang đến " +
      "câu chuyện ấm áp về sự sẻ chia và chữa lành.",
  },
  {
    id: 5,
    title: "Muôn Kiếp Nhân Sinh",
    author: "Nguyên Phong",
    price: 150000,
    cover: "https://picsum.photos/seed/book5/400/560",
    description: "Hành trình khám phá luân hồi và nhân quả qua nhiều kiếp sống, dựa trên các nghiên cứu tâm linh.",
  },
  {
    id: 6,
    title: "Cách Nghĩ Để Thành Công",
    author: "Napoleon Hill",
    price: 79000,
    cover: "https://picsum.photos/seed/book6/400/560",
    isNew: true,
    description: "Đúc kết 13 nguyên tắc thành công từ hơn 500 nhân vật thành đạt nhất nước Mỹ đầu thế kỷ 20.",
  },
];

export interface CartItem {
  book: Book;
  quantity: number;
}

// Giỏ hàng mẫu dùng sẵn cho Giờ 5 — Bài tập 2 (Cart Screen)
export const CART_ITEMS: CartItem[] = [
  { book: BOOKS[0], quantity: 2 },
  { book: BOOKS[1], quantity: 1 },
  { book: BOOKS[3], quantity: 1 },
];
