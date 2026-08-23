/**
 * Bài 17: Lớp Logger theo mẫu Singleton - toàn chương trình chỉ có DUY NHẤT
 * một đối tượng Logger, dùng chung ở mọi nơi.
 */
export class Logger {
  /** Biến static giữ đối tượng duy nhất, dùng chung cho cả lớp. */
  private static instance: Logger | null = null

  private logs: string[] = [] // lưu lại lịch sử log

  /** private constructor -> bên ngoài KHÔNG thể gọi `new Logger()`. */
  private constructor() {}

  /** Cách duy nhất để lấy Logger: lần đầu thì tạo mới, các lần sau trả về cái cũ. */
  static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  log(message: string): void {
    this.write('INFO', message)
  }

  warn(message: string): void {
    this.write('WARN', message)
  }

  error(message: string): void {
    this.write('ERROR', message)
  }

  /** Hàm dùng chung: gắn nhãn + giờ rồi in ra Console. */
  private write(level: string, message: string): void {
    const line = `[${level}] ${new Date().toLocaleTimeString('vi-VN')} - ${message}`
    this.logs.push(line)
    console.log(line)
  }

  getLogs(): string[] {
    return this.logs
  }
}
