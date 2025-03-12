export class WhatsAppService {
  constructor(firebaseService, momoService) {
    this.firebaseService = firebaseService;
    this.momoService = momoService;
  }

  async handleIncomingMessage(from, message) {
    const user = await this.firebaseService.getUserByPhone(from);
    
    if (!user) {
      return this.handleNewUser(from);
    }
    
    return this.handleExistingUser(user, message);
  }

  async handleNewUser(phoneNumber) {
    return {
      message: "👋 Murakaza neza muri Kominote yo kwizigama no gutanga inkunga!\n\nReka dutangire:",
      options: [
        "Kora Agasanduku gashya 🧺",
        "Reba Amasanduku rusange 🌍"
      ]
    };
  }

  async handleExistingUser(user, message) {
    const userBaskets = await this.firebaseService.getUserBaskets(user.id);
    
    return {
      message: `👋 Murakaza neza, ${user.name}!\n\nUrifuza gukora iki uyu munsi?`,
      options: [
        "📥 Reba Amasanduku yanjye",
        "🌍 Reba Amasanduku rusange"
      ]
    };
  }

  async processPayment(userId, basketId, amount, momoNumber) {
    const paymentRequest = await this.momoService.initiatePayment({
      amount,
      momoNumber,
      description: `Payment for basket ${basketId}`
    });

    await this.firebaseService.saveContribution({
      userId,
      basketId,
      amount,
      momoNumber,
      transactionId: paymentRequest.id
    });

    return paymentRequest;
  }
} 

export default WhatsAppService;