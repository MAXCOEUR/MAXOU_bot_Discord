// commands/ping.js
module.exports = {
  name: "ping",
  description: "Ping-Pong !",
  execute(message, args) {
    message.reply(
      "Pong ! \nhttps://tenor.com/view/table-tennis-quinton-quinted-tennis-gif-26485788"
    );
  },
};
