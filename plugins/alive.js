const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
╭───〔 *🤖 ${config.BOT_NAME} STATUS* 〕───◉
│
│𝐃𝐀𝐅𝐅𝐀 𝐌𝐃 𝐈𝐒 𝐀𝐋𝐈𝐕𝐄 𝐍𝐎𝐖 👋"
│
│ 𝐇𝐎𝐖 𝐂𝐀𝐍 𝐈 𝐇𝐄𝐋𝐏 𝐘𝐎𝐔 𝐓𝐎𝐃𝐀𝐘 ⚔
│
│ *හායි, මම ඔන්ලයින් ඔබට උදව් කරන්නෙ කෙසේද මම ⚔*
│
│🧠 *Owner:* ${config.OWNER_NAME}
│⚡ *Version:* 4.0.0
│📝 *Prefix:* [${config.PREFIX}]
│📳 *Mode:* [${config.MODE}]
│💾 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│🖥️ *Host:* ${os.hostname()}
│⌛ *Uptime:* ${runtime(process.uptime())}
╰────────────────────◉
> support : https://whatsapp.com/channel/0029VbB1RlO3rZZUwO0jB02Y 

> ${config.DESCRIPTION}`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '12036106228@newsletter',
                    newsletterName: 'ＤＡＦＦＡ 囧',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
