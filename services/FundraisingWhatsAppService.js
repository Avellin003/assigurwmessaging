// async function handleNewUser() {
//   return {
//     message: "👋 Murakaza neza muri Kominote yo kwizigama no gutanga inkunga!\n\nReka dutangire:",
//     options: [
//       "Kora Agasanduku gashya 🧺",
//       "Reba Amasanduku rusange 🌍"
//     ]
//   };
// }
// async function handleExistingUser() {
  // const userBaskets = await this.firebaseService.getUserBaskets(user.id);
  
//   return {
//     message: `👋 Murakaza neza, Regis!\n\nUrifuza gukora iki uyu munsi?`,
//     options: [

//       "📥 Reba Amasanduku yanjye",
//       "🌍 Reba Amasanduku rusange"
//     ]
//   };
// }
// async function processPayment(userId, basketId, amount, momoNumber) {
//   const paymentRequest = await this.momoService.initiatePayment({
//     amount,
//     momoNumber,
//     description: `Payment for basket ${basketId}`
//   });
//   await this.firebaseService.saveContribution({
//     userId,
//     basketId,
//     amount,
//     momoNumber,
//     transactionId: paymentRequest.id
//   });
//   return paymentRequest;
// }
async function FundraisinghandleIncomingMessage(phone, phoneNumberId) {
  const userContext = userContexts.get(phone) || {};
  userContext.stage = "WELCOME"; // Stage set to "WELCOME"
  userContexts.set(phone, userContext);

  const payload = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Welcome to Ikanisa\nInsurance Services!",
      },
      body: {
        text: "What would you like to do today?",
      },
      footer: {
        text: "Select an action to proceed",
      },
      action: {
        button: "View Options",
        sections: [
          {
            title: "Insurance Services",
            rows: [
              {
                id: "get_insurance",
                title: "Get Insurance",
                description: "Apply for a new insurance policy",
              },
              // {
              //   id: "file_claim",
              //   title: "File Claim",
              //   description: "Submit a new insurance claim",
              // },
            ],
          },
        ],
      },
    },
  };
// Claim Filing Process
  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}