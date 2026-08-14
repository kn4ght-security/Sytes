const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_TOKEN;

if (!token) {
    console.error("❌ DISCORD_TOKEN is missing.");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`📡 Bot is online in ${client.guilds.cache.size} server(s).`);
});

client.on("error", (error) => {
    console.error("Discord client error:", error);
});

process.on("SIGTERM", () => {
    console.log("Stopping bot...");
    client.destroy();
    process.exit(0);
});

client.login(token).catch((error) => {
    console.error("❌ Login failed:", error.message);
    process.exit(1);
});
