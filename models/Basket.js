export class BasketModel {
  constructor(
    id,
    name,
    category,
    frequency,
    suggestedAmount,
    totalRaised,
    memberCount,
    creatorId,
    isPublic,
    createdAt
  ) {
    this.id = id;
    this.name = name;
    this.category = category; // One-off or Recurring
    this.frequency = frequency; // Daily, Weekly, Monthly
    this.suggestedAmount = suggestedAmount;
    this.totalRaised = totalRaised;
    this.memberCount = memberCount;
    this.creatorId = creatorId;
    this.isPublic = isPublic;
    this.createdAt = createdAt;
  }

  static fromJSON(json) {
    return new BasketModel(
      json.id || "",
      json.name || "",
      json.category || "One-off",
      json.frequency || "Monthly",
      json.suggestedAmount || 0,
      json.totalRaised || 0,
      json.memberCount || 0,
      json.creatorId || "",
      json.isPublic || false,
      json.createdAt || new Date()
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      frequency: this.frequency,
      suggestedAmount: this.suggestedAmount,
      totalRaised: this.totalRaised,
      memberCount: this.memberCount,
      creatorId: this.creatorId,
      isPublic: this.isPublic,
      createdAt: this.createdAt
    };
  }
} 