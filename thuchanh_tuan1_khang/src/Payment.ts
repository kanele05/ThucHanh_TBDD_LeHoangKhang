/**
 * Bài 23: Interface Payment và hai cách thanh toán CashPayment, CardPayment.
 */
export interface Payment {
  pay(amount: number): void
}

/** Thanh toán tiền mặt: cần kiểm tra tiền khách đưa có đủ không. */
export class CashPayment implements Payment {
  private received: number // số tiền khách đưa

  constructor(received: number) {
    this.received = received
  }

  pay(amount: number): void {
    if (this.received < amount) {
      console.log(`Tiền mặt: không đủ, còn thiếu ${amount - this.received}.`)
      return
    }
    console.log(`Tiền mặt: thanh toán ${amount}, trả lại ${this.received - amount}.`)
  }
}

/** Thanh toán thẻ: có phí giao dịch 1% và chỉ hiện 4 số cuối của thẻ. */
export class CardPayment implements Payment {
  private cardNumber: string

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber
  }

  pay(amount: number): void {
    const fee = amount * 0.01
    console.log(
      `Thẻ ****${this.cardNumber.slice(-4)}: thanh toán ${amount} + phí ${fee.toFixed(2)} = ${(amount + fee).toFixed(2)}.`,
    )
  }
}
