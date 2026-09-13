/**
 * Bài 10: Lớp Account - minh họa 3 kiểu khai báo thuộc tính:
 *   public   : ai cũng đọc/ghi được (mặc định nếu không ghi gì).
 *   private  : chỉ dùng được bên trong lớp.
 *   readonly : chỉ gán được 1 lần trong constructor, sau đó không sửa được.
 */
export class Account {
  /** public: bên ngoài đọc và sửa thoải mái. */
  public owner: string

  /** readonly: số tài khoản cố định, gán 1 lần rồi khóa luôn. */
  public readonly accountNumber: string

  /** readonly: ngày mở tài khoản, cũng không được đổi. */
  public readonly createdAt: Date

  /** private: số dư, bên ngoài không truy cập trực tiếp được. */
  private balance: number

  /** protected: lớp con vẫn dùng được, bên ngoài thì không. */
  protected pin: string

  constructor(owner: string, accountNumber: string, balance: number, pin: string) {
    this.owner = owner
    this.accountNumber = accountNumber // gán readonly ngay trong constructor -> hợp lệ
    this.createdAt = new Date()
    this.balance = balance
    this.pin = pin
  }

  /** Đọc số dư - cách duy nhất để bên ngoài biết được `balance`. */
  getBalance(): number {
    return this.balance
  }

  /** Đổi số dư nhưng phải nhập đúng mã PIN. */
  deposit(amount: number, pin: string): boolean {
    if (pin !== this.pin) {
      console.log('Sai mã PIN.')
      return false
    }
    this.balance += amount
    return true
  }

  showInfo(): void {
    console.log(
      `STK: ${this.accountNumber} | Chủ TK: ${this.owner} | Số dư: ${this.balance} | Mở ngày: ${this.createdAt.toLocaleDateString('vi-VN')}`,
    )
  }
}
