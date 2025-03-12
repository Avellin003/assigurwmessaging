export class ContributionModel {
  constructor(
    id,
    basketId,
    userId,
    amount,
    momoNumber,
    status,
    transactionId,
    createdAt
  ) {
    this.id = id;
    this.basketId = basketId;
    this.userId = userId;
    this.amount = amount;
    this.momoNumber = momoNumber;
    this.status = status; // 'pending', 'completed', 'failed'
    this.transactionId = transactionId;
    this.createdAt = createdAt;
  }

  static fromJSON(json) {
    return new ContributionModel(
      json.id || "",
      json.basketId || "",
      json.userId || "",
      json.amount || 0,
      json.momoNumber || "",
      json.status || "pending",
      json.transactionId || "",
      json.createdAt || new Date()
    );
  }

  toJSON() {
    return {
      id: this.id,
      basketId: this.basketId,
      userId: this.userId,
      amount: this.amount,
      momoNumber: this.momoNumber,
      status: this.status,
      transactionId: this.transactionId,
      createdAt: this.createdAt
    };
  }
} 