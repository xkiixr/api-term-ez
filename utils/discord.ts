export interface DiscordWebhookPayload {
  playload?: any;
  game?: { pack?: string; name?: string; price?: number };
  txnRefId?: string;
  billNumber?: string;
  status?: "success" | "error";
  message?: string;
  timeStamp?: string;
}
export const sendDiscordWebhook = async ({
  game,
  playload,
  billNumber,
  status,
  message,
  timeStamp,
}: DiscordWebhookPayload) => {
  try {
    const response = await fetch(
      "https://discord.com/api/webhooks/1386632162408665088/y87DuGLbN2B5tXIr51cvwF3rdDuayaDs89FUSFf1GNhca_Ol-jHJgThIH_UsDQlt4Qqd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "🔔 **New Payment Received!**",
          embeds: [
            {
              color: 0xffcc00,
              title: "🧾 Transaction Details",
              description: [
                `• **Bill Number:** \`${billNumber}\``,
                `• **Amount:** \`${game?.price} LAK\``,
                `• **Time:** ${timeStamp}`,
                `• **Game:** ${game?.name}`,
                `• **Package:** \`${game?.pack}\``,
              ].join("\n"),
            },
            {
              color: 0x3498db,
              title: "📨 Status",
              description: `\`${status}\``,
            },
            {
              color: 0x2c3e50,
              title: "🧩 Payload",
              description:
                "```json\n" + JSON.stringify(playload || [], null, 2) + "\n```",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to send Discord webhook:", await response.text());
    } else {
      console.log("✅ Webhook sent successfully");
    }
  } catch (error) {
    console.error("❌ Error sending Discord webhook:", error);
  }
};

export const formatWebhookMessage = ({
  code,
  game,
  userId,
  serverId,
  txnRefId,
  billNumber,
  status,
  message,
}: {
  code?: string;
  game?: { pack?: string; name?: string; price?: number };
  userId?: string;
  serverId?: string;
  txnRefId?: string;
  billNumber?: string;
  status: "success" | "error";
  message: string;
}) => {
  return `>>>>>>>>ເຕີມເກມ<<<<<<<< 
Code: ${code}
Game: ${game?.name}
Package: ${game?.pack} :gem
Price: ${game?.price}
User ID: ${userId}
Server ID: ${serverId}
txtnRefId: ${txnRefId}
billNumber: ${billNumber}
Status: ${status}
Message: ${message}`;
};
