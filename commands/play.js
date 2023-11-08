const { joinVoiceChannel } = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const { queue } = require("../queue");
const musiqueF = require("./musiqueFonction");

module.exports = {
  name: "play",
  description: "Play !",
  execute(message, args) {
    const serverQueue = queue.get(message.guild.id);
    // Vérifiez si le membre est dans un canal vocal
    const member = message.member;
    if (member && member.voice.channel) {
      // Joignez le canal vocal de l'utilisateur
      const voiceChannel = joinVoiceChannel({
        channelId: member.voice.channel.id,
        guildId: member.voice.channel.guild.id,
        adapterCreator: member.voice.channel.guild.voiceAdapterCreator,
      });

      const ytLink=args[0]
      ytdl.getBasicInfo(ytLink).then((info) => {
        const titre = info.videoDetails.title;
        if (serverQueue) {
          serverQueue.songs.push({ titre, link: ytLink });
          message.reply("La chanson a été ajoutée à la liste de lecture !");
        } else {
          // Si la file d'attente n'existe pas, créez-la et ajoutez la chanson
          const queueContruct = {
            voiceChannel,
            songs: [{ titre, link: ytLink }],
          };
          queue.set(message.guild.id, queueContruct);
          // Jouez la chanson
          musiqueF.play(message.guild);
          message.reply("La musique arrive !");
        }
      });
    } else {
      message.reply(
        "Vous devez être dans un canal vocal pour utiliser cette commande."
      );
    }
  },
};
