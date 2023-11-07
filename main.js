// main.js
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config");
const client = new Client({ intents: 3276799 });
client.commands = new Map();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Prêt ! Connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!")) {
    const args = message.content.slice(1).split(" ");
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    command.execute(message, args);
  }
  else if (message.content.toLocaleLowerCase().endsWith("quoi")) {
    const command = client.commands.get("quoi");

    if (!command) return;

    command.execute(message);
  }
});

client.login(config.token);
