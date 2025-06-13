const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "🧾",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Count total commands
        const totalCommands = Object.keys(commands).length;
        
        const menuCaption = `╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
        
╭──────────●●►
│ 💎DAFFA NUMBER MENU💎
│   ───────
│ _1️⃣_   *OWNER🧚‍♂️*
│ _2️⃣_   *MAIN🧚‍♂️*
│ _3️⃣_   *DOWNLOAD*
│ _4️⃣_   *SEARCH🧚‍♂️*
│ _5️⃣_   *AI🧚‍♂️*
│ _6️⃣_   *CONVERT🧚‍♂️*
│ _7️⃣_   *MATHTOOL🧚‍♂️*
│ _8️⃣_   *GROUP🧚🏼‍♀️*
│ _9️⃣_   *STICKER🧚🏼‍♀️*
│ _🔟_   *GAME 🧚🏼‍♀️*
╰───────────●●►

*"REPLY THE YOU NUMBER YOU WANT TO MENU 😇💗"*

> support : https://whatsapp.com/channel/0029VbB1RlO3rZZUwO0jB02Y 💎`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '1206228@newsletter',
                newsletterName: config.OWNER_NAME,
                serverMessageId: 143
            }
        };

        // Function to send menu image with timeout
        const sendMenuImage = async () => {
            try {
                return await conn.sendMessage(
                    from,
                    {
                        image: { url: config.MENU_IMAGE_URL || 'https://i.ibb.co/d4C83TX7/5f21bc7dc911cb76.jpg' },
                        caption: menuCaption,
                        contextInfo: contextInfo
                    },
                    { quoted: mek }
                );
            } catch (e) {
                console.log('Image send failed, falling back to text');
                return await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        };

        // Send image with timeout
        let sentMsg;
        try {
            sentMsg = await Promise.race([
                sendMenuImage(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Image send timeout')), 10000))
            ]);
        } catch (e) {
            console.log('Menu send error:', e);
            sentMsg = await conn.sendMessage(
                from,
                { text: menuCaption, contextInfo: contextInfo },
                { quoted: mek }
            );
        }
        
        const messageID = sentMsg.key.id;

        // Menu data (complete version)
        const menuData = {
            '1': {
                title: "OWNER MENU",
                content: `╭──────────●●►
│⛵ OWNER MENU
│   ───────
│► .getpp
│► .cgpt
│► .removesticker
│► .resetsticker
│► .getsticker
│► .addsticker
│► .addbad
│► .resetbad
│► .getbad
│► .resetvoice
│► .removevoice
│► .getvoice
│► .addvoice
│► .replacereply
│► .removereply
│► .getreply
│► .resetreply
│► .addreply
│► .eval
│► .repostatus
│► .report
│► .quote
│► .alljid
│► .about
│► .name
│► .dp
│► .sendaudio
│► .sendtag
│► .sendmsg
│► .remove
│► .enc
│► .dec
│► .boom
│► .vv
│► .tovv
│► .send
│► .deljid
│► .update
╰───────────●●►
> ${config.DESCRIPTION}`,
                image: true
            },
            '2': {
                title: "⛵ MAIN MENU",
                content: `╭──────────●●►
│⛵ MAIN MENU
│   ───────
│► .logo
│► .edit
│► .device
│► .tempmail
│► .newgroup
│► .delgroup
│► .save
│► .block
│► .unblock
│► .help
│► .id
│► .settings
│► .apply
│► .defaultimg
│► .defaultsudo
│► .news
│► .script
│► .alive
│► .jid
│► .system
│► .restart
│► .join
│► .ping
│► .list
│► .menu
│► .bingen
│► .dictionary
│► .readmore
│► .tempmail2
│► .requestpair
╰───────────●●►`,
                image: true
            },
            '3': {
                title: "⛵ DOWNLOAD MENU",
                content: `╭──────────●●►
│⛵ DOWNLOAD MENU
│   ───────
│► .tgvideo
│► .downurl
│► .gitclone
│► .tiktok
│► .fb
│► .ig
│► .apk
│► .fmmod
│► .gdrive
│► .mediafire
│► .ss
│► .video
│► .song
│► .spotify
│► .img
│► .movie
│► .mp4video
│► .soundcloud
│► .download
│► .threads
│► .twitter
│► .pinterest
│► .sisub
│► .fb2
│► .capcut
│► .xvdl
╰───────────●●►`,
                image: true
            },
            '4': {
                title: "⛵ SEARCH MENU",
                content: `╭──────────●●►
│⛵ SEARCH MENU
│   ───────
│► .tiktoksearch
│► .findtiktok
│► .findapk
│► .ip
│► .cric
│► .find
│► .yts
│► .npm
│► .wabeta
│► .movieinfo
│► .weather
│► .lyrics
│► .cmd
│► .git
│► .pixabay
│► .unsplash
│► .sporty
│► .mobilenews
╰───────────●●►`,
                image: true
            },
            '5': {
                title: "🤖 *AI Menu* 🤖",
                content: `╭──────────●●►
│⛵ AI MENU
│   ───────
│► .imagine
│► .gemini
│► .gpt
╰───────────●●►`,
                image: true
            },
            '6': {
                title: "⛵ CONVERT MENU",
                content: `╭──────────●●►
│⛵ CONVERT MENU
│   ───────
│► .mp3tourl
│► .surl
│► .tts
│► .wame
│► .img2url
│► .fancy
│► .trt
│► .toimg
│► .pdf
│► .dark
│► .emoji
│► .blur
│► .toaudio
│► .toptt
│► .remini
│► .img2qr
│► .removebg
│► .toqr
│► .emomix
╰───────────●●►`,
                image: true
            },
            '7': {
                title: "⛵ MATHTOOL MENU",
                content: `╭──────────●●►
│⛵ MATHTOOL MENU
│   ───────
│► .mathstep
│► .math
│► .cal
╰───────────●●►`,
                image: true
            },
            '8': {
                title: "📌GROUP MENU📌",
                content: `╭──────────●●►
│⛵ GROUP MENU
│   ───────
│► .ban
│► .unban
│► .invite
│► .mute
│► .unmute
│► .promote
│► .demote
│► .kick
│► .hidetag
│► .add
│► .gdesc
│► .gname
│► .left
│► .antispam
│► .del
│► .gdp
│► .automute
│► .autounmute
╰───────────●●►`,
                image: true
            },
            '9': {
                title: "💞 *STICKER MENU* 💞",
                content: `╭──────────●●►
│⛵ STICKER MENU
│   ───────
│► .attp
│► .ttp
│► .searchsticker
│► .sticker
│► .steal
╰───────────●●►`,
                image: true
            },
            '10': {
                title: "🏠 *GAME MENU* 🏠",
                content: `╭──────────●●►
│⛵ GAME MENU
│   ───────
│► .delxo
│► .xo
│► .slot
│► .trivia
╰───────────●●►`,
                image: true
            }
        };

        // Message handler with improved error handling
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                
                if (isReplyToMenu) {
                    const receivedText = receivedMsg.message.conversation || 
                                      receivedMsg.message.extendedTextMessage?.text;
                    const senderID = receivedMsg.key.remoteJid;

                    if (menuData[receivedText]) {
                        const selectedMenu = menuData[receivedText];
                        
                        try {
                            if (selectedMenu.image) {
                                await conn.sendMessage(
                                    senderID,
                                    {
                                        image: { url: config.MENU_IMAGE_URL || 'https://i.ibb.co/d4C83TX7/5f21bc7dc911cb76.jpg' },
                                        caption: selectedMenu.content,
                                        contextInfo: contextInfo
                                    },
                                    { quoted: receivedMsg }
                                );
                            } else {
                                await conn.sendMessage(
                                    senderID,
                                    { text: selectedMenu.content, contextInfo: contextInfo },
                                    { quoted: receivedMsg }
                                );
                            }

                            await conn.sendMessage(senderID, {
                                react: { text: '✅', key: receivedMsg.key }
                            });

                        } catch (e) {
                            console.log('Menu reply error:', e);
                            await conn.sendMessage(
                                senderID,
                                { text: selectedMenu.content, contextInfo: contextInfo },
                                { quoted: receivedMsg }
                            );
                        }

                    } else {
                        await conn.sendMessage(
                            senderID,
                            {
                                text: `❌ *Invalid Option!* ❌\n\nPlease reply with a number between 1-10 to select a menu.\n\n*Example:* Reply with "1" for Download Menu\n\n> ${config.DESCRIPTION}`,
                                contextInfo: contextInfo
                            },
                            { quoted: receivedMsg }
                        );
                    }
                }
            } catch (e) {
                console.log('Handler error:', e);
            }
        };

        // Add listener
        conn.ev.on("messages.upsert", handler);

        // Remove listener after 5 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error('Menu Error:', e);
        try {
            await conn.sendMessage(
                from,
                { text: `❌ Menu system is currently busy. Please try again later.\n\n> ${config.DESCRIPTION}` },
                { quoted: mek }
            );
        } catch (finalError) {
            console.log('Final error handling failed:', finalError);
        }
    }
});
