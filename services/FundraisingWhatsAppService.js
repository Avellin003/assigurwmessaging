async function sendWhatsAppMessage(phone, messagePayload, phoneNumberId) {
  try {
    const url = `https://graph.facebook.com/${VERSION}/${phoneNumberId}/messages`;

    const response = await axios({
      method: "POST",
      url: url,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formatPhoneNumber(phone),
        ...messagePayload,
      },
    });

    console.log(
      `Message sent successfully from ${phoneNumberId}:`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      `WhatsApp message sending error from ${phoneNumberId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
}


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
        text: "Eshyoon!!!!!!!!",
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

export default FundraisinghandleIncomingMessage;