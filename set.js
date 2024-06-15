const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0pNUkhlMHU3RENWZUdzTFNmQ0VGeUxXSklSdXFmOHJkR08wYW9KeTBuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVFRSVzYzU3NWSnN2MjQ4by9RQ0VzSlg0bU05eFZFell6NmY3VndRTlhBND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQmZyREF4bTAzeE5pWnJ1QUJQeXdlbU9CMEZhKzRIZXFHUFlpNkFYQVdjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyaHo5RTlmNHhHRFVNelQ5dElheG9Qb2R4STRObXEwNE94Q3ZPT1pHMGxZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNLSmNOT2EwRWxnZldVL1NRU1dZSmx0OXJzdjhCSGptM0JpOVU2K3NnMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhOekg4c2NZSVAwdWlIM3E5WVp4bTNjMnI3eUJnN1VFTDdGK3JsS2l5eGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUczVnRsNEFVZWs4OWZNajg4QWZweTA1RUNMQzJuMU0xdVhVcVF4SkJVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMHRCTVlsUXY1QXQyRjlCSXV5MUJoM3I0Y3kwV2NyN2RvM3BtcHZJSmUyRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlqN00zOHBXdkhsUHRwU3NHODFCcEN6QU1mekNtUUQ0MzZDc3JVaUJBeDNCTU91VEJRczFmZkxYNjBPNjdnMG5aQTIyOUNWSVdidTRHc25raTVIZ2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6ImVQa3JLSFV2bFNpdUFKR0RqaUZ1Ti8wdGRkckZGT2c0a0NWOWlsVDBIZ3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlpBVGozZ3JOU3hLc1JPSDN4UWtLcGciLCJwaG9uZUlkIjoiZmNiYTZkOWUtZDVlZi00YTNhLTgxYWYtNTFkYjM3NGNlZmMxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhGNDd6SjRNNzY5WFhBczEvSnVZOXppdVhWQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOUFdITUZkNzJTRzA3YmtJdko2eUprWWd4bUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQkFBQjM1WjEiLCJtZSI6eyJpZCI6IjI1NDExNDA5OTE3OTozQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPUHg1WnNDRUpiVXRiTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJRd241TEJDNkRIS3FCVTEvYjZOV0JSUGpDa2JXMlRyOVpEYWkvZHRCdFY4PSIsImFjY291bnRTaWduYXR1cmUiOiI3UmVrZnBxbk1WMVlwS0FOQ2Ribkw4bFJCTzdvbjlrTTBiaEswU2EveFZDTEl2VFVTZjY3N2dqWi9oVVZ6S1hQeFk1WWpXRCt2TXpoN1cxV3hiTklBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoibyt0cU0zSTUvanBZSHpqekEvR05rWm5LZm5JZXQwVXc1S0ZoSFA2SmxJN2RycWtmNDZrMlN0elRjMGk2cVJOdHc2a1FZTjZKR3p2Vjh6bU9nem9IaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQxMTQwOTkxNzk6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVTUorU3dRdWd4eXFnVk5mMitqVmdVVDR3cEcxdGs2L1dRMm92M2JRYlZmIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE4NDQ2NjI4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUl4USJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Gifted Tech",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254762016957,254728782591", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ɢɪғᴛᴇᴅ-ᴍᴅ',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

