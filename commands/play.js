const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const fs = require('fs');

module.exports = {
  name: "play",
  description: "Play !",
  execute(message, args) {
    // Vérifiez si le membre est dans un canal vocal
    const member = message.member;
    if (member && member.voice.channel) {
      // Joignez le canal vocal de l'utilisateur
      const voiceChannel = joinVoiceChannel({
        channelId: member.voice.channel.id,
        guildId: member.voice.channel.guild.id,
        adapterCreator: member.voice.channel.guild.voiceAdapterCreator,
      });

      // Créez un lecteur audio et une ressource audio
      const audioPlayer = createAudioPlayer();

      const youtubeLink = args[0];
      const stream = ytdl(youtubeLink, { filter: "audioonly" })
      const audioResource = createAudioResource(stream);

      // Ajoutez la ressource audio au lecteur audio
      audioPlayer.play(audioResource);

      // Lisez l'audio dans le canal vocal
      voiceChannel.subscribe(audioPlayer);

      message.reply("La musique arrive !");
    } else {
      message.reply("Vous devez être dans un canal vocal pour utiliser cette commande.");
    }
  },
};
