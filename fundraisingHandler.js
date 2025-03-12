import {
  sendExistingUserWelcome,
  sendNewUserWelcome,
  sendUserBaskets,
  sendPublicBaskets,
  sendBasketSummary,
  requestMoMoNumber,
  requestContributionAmount,
  sendPaymentConfirmation,
//   requestNationalId,
  verifyNationalId,
//   requestBasketName,
//   requestBasketCategory,
//   shareBasketLink,
//   sendBasketMembers
} from './fundraisingMessages.js';

// User context management
const userContexts = new Map();

// Function to check user and send appropriate welcome message
async function handleInitialMessage(phone, phoneNumberId) {
  // Check if user exists in your database
  const userExists = await checkUserExists(phone); // You'll implement this with Firebase
  
  if (userExists) {
    await sendExistingUserWelcome(phone, phoneNumberId, userExists.name);
  } else {
    await sendNewUserWelcome(phone, phoneNumberId);
  }
}

async function handleFundraisingFlow(message, phone, phoneNumberId) {
  let userContext = userContexts.get(phone) || {};
  
  try {
    // Handle initial message if no context exists
    if (!userContext.stage) {
      await handleInitialMessage(phone, phoneNumberId);
      userContext.stage = 'WELCOMED';
      userContexts.set(phone, userContext);
      return;
    }

    // Check if this is an interactive message (button/list response)
    if (message.interactive) {
      const response = message.interactive.button_reply || message.interactive.list_reply;
      
      switch (response.id) {
        case 'view_baskets':
          const userBaskets = await fetchUserBaskets(phone);
          await sendUserBaskets(phone, phoneNumberId, userBaskets);
          userContext.stage = 'VIEWING_BASKETS';
          break;
          
        case 'view_public':
          const publicBaskets = await fetchPublicBaskets();
          await sendPublicBaskets(phone, phoneNumberId, publicBaskets);
          userContext.stage = 'VIEWING_PUBLIC';
          break;
          
        // case 'create_basket':
        //   await requestNationalId(phone, phoneNumberId);
        //   userContext.stage = 'AWAITING_ID';
        //   break;
          
        case 'contribute':
          await requestMoMoNumber(phone, phoneNumberId);
          userContext.stage = 'AWAITING_MOMO';
          break;
          
        // case 'share_basket':
        //   await shareBasketLink(phone, phoneNumberId, userContext.currentBasket);
        //   break;
          
        // case 'view_members':
        //   await sendBasketMembers(phone, phoneNumberId, userContext.currentBasket);
        //   break;
          
        case 'confirm_payment':
          await processPayment(phone, phoneNumberId, userContext);
          userContext.stage = 'PROCESSING_PAYMENT';
          break;
      }
    } else if (message.text) {
      // Handle text responses based on the current stage
      switch (userContext.stage) {
        // case 'AWAITING_ID':
        //   const nationalId = message.text.body;
        //   await verifyNationalId(nationalId);
        //   await requestBasketName(phone, phoneNumberId);
        //   userContext.stage = 'AWAITING_BASKET_NAME';
        //   break;
          
        // case 'AWAITING_BASKET_NAME':
        //   userContext.basketName = message.text.body;
        //   await requestBasketCategory(phone, phoneNumberId);
        //   userContext.stage = 'AWAITING_CATEGORY';
        //   break;
          
        case 'AWAITING_MOMO':
          userContext.momoNumber = message.text.body;
          await requestContributionAmount(phone, phoneNumberId, userContext.basket.suggestedAmount);
          userContext.stage = 'AWAITING_AMOUNT';
          break;
          
        case 'AWAITING_AMOUNT':
          userContext.amount = parseInt(message.text.body);
          await sendPaymentConfirmation(
            phone,
            phoneNumberId,
            userContext.amount,
            userContext.momoNumber,
            userContext.basket.name
          );
          userContext.stage = 'CONFIRMING_PAYMENT';
          break;
      }
    }
    
    // Update user context
    userContexts.set(phone, userContext);
    
  } catch (error) {
    console.error('Error in fundraising flow:', error);
    await sendWhatsAppMessage(phone, {
      type: "text",
      text: {
        body: "Mbabarira, hari ikibazo cyavutse. Nyamuneka ongera ugerageze."
      }
    }, phoneNumberId);
  }
}

export { handleFundraisingFlow }; 