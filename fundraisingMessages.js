import { sendWhatsAppMessage } from './app.js'; // Import the sendWhatsAppMessage function

// User context management (you can move this to a separate file later)
const userContexts = new Map();

// Welcome message for existing users
async function sendExistingUserWelcome(phone, phoneNumberId, userName) {
  const payload = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "👋 Murakaza neza"
      },
      body: {
        text: `Murakaza neza, ${userName}!\n\nUrifuza gukora iki uyu munsi?`
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "view_baskets",
              title: "📥 Reba Amasanduku yanjye"
            }
          },
          {
            type: "reply",
            reply: {
              id: "view_public",
              title: "🌍 Reba Amasanduku rusange"
            }
          }
        ]
      }
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

// Welcome message for new users
async function sendNewUserWelcome(phone, phoneNumberId) {
  const payload = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "Ikaze 👋"
      },
      body: {
        text: "Murakaza neza muri Kominote yo kwizigama no gutanga inkunga!"
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "create_basket",
              title: "🧺 Kora Agasanduku"
            }
          },
          {
            type: "reply",
            reply: {
              id: "view_public",
              title: "🌍 Reba Rusange"
            }
          }
        ]
      }
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

// Show user's active baskets
async function sendUserBaskets(phone, phoneNumberId, baskets) {
  const payload = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Amasanduku Yawe"
      },
      body: {
        text: "📥 **Amasanduku yawe akora:**"
      },
      action: {
        button: "Hitamo Agasanduku",
        sections: [
          {
            title: "Amasanduku",
            rows: baskets.map((basket, index) => ({
              id: `basket_${basket.id}`,
              title: `${index + 1}. ${basket.name}`,
              description: `${basket.category} - ${basket.frequency}`
            }))
          }
        ]
      }
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

// Show public baskets
async function sendPublicBaskets(phone, phoneNumberId, publicBaskets) {
  const payload = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Amasanduku Rusange"
      },
      body: {
        text: "🌐 **Amasanduku rusange y'inkunga:**"
      },
      action: {
        button: "Hitamo Agasanduku",
        sections: [
          {
            title: "Amasanduku",
            rows: publicBaskets.map((basket, index) => ({
              id: `public_${basket.id}`,
              title: `${index + 1}. ${basket.name}`,
              description: `${basket.frequency} - ${basket.description}`
            }))
          }
        ]
      }
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

// Show basket details and actions
async function sendBasketSummary(phone, phoneNumberId, basket) {
  const payload = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: `${basket.name} 🧺`
      },
      body: {
        text: `**${basket.name}**\n\n` +
          `- Inshuro: ${basket.frequency}\n` +
          `- Umusanzu usabwa: ${basket.suggestedAmount} RWF\n` +
          `- Yose hamwe: ${basket.totalRaised} RWF\n` +
          `- Abatanze: ${basket.memberCount}\n\n` +
          "Hitamo icyo ushaka gukora:"
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "contribute",
              title: "💳 Tanga Umusanzu"
            }
          },
          {
            type: "reply",
            reply: {
              id: "share",
              title: "🔗 Sangiza Inshuti"
            }
          },
          {
            type: "reply",
            reply: {
              id: "view_members",
              title: "👥 Reba Abagize Ikimina"
            }
          }
        ]
      }
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

// Request MoMo number for payment
async function requestMoMoNumber(phone, phoneNumberId) {
  const payload = {
    type: "text",
    text: {
      body: "📲 Andika nimero ya MoMo uzishyuraho:"
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

// Request contribution amount
async function requestContributionAmount(phone, phoneNumberId, suggestedAmount) {
  const payload = {
    type: "text",
    text: {
      body: `💰 Andika amafaranga ushaka gutanga (urugero: ${suggestedAmount} RWF):`
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

// Confirm payment details
async function sendPaymentConfirmation(phone, phoneNumberId, amount, momoNumber, basketName) {
  const payload = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "Kwemeza Ubwishyu"
      },
      body: {
        text: `📝 Emeza Umusanzu:\n\n` +
          `Agasanduku: ${basketName}\n` +
          `Amafaranga: ${amount} RWF\n` +
          `Nimero ya MoMo: ${momoNumber}`
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "confirm_payment",
              title: "✅ Emeza"
            }
          },
          {
            type: "reply",
            reply: {
              id: "edit_amount",
              title: "✏️ Hindura"
            }
          }
        ]
      }
    }
  };

  await sendWhatsAppMessage(phone, payload, phoneNumberId);
}

export {
  sendExistingUserWelcome,
  sendNewUserWelcome,
  sendUserBaskets,
  sendPublicBaskets,
  sendBasketSummary,
  requestMoMoNumber,
  requestContributionAmount,
  sendPaymentConfirmation
}; 