const voice = require("@discordjs/voice");

module.exports = {
  name: "mp3",
  description: "mp3 !",
  execute(message, args) {
    const member = message.member;
    if (member && member.voice.channel) {
      // Joignez le canal vocal de l'utilisateur
      const voiceChannel = voice.joinVoiceChannel({
        channelId: member.voice.channel.id,
        guildId: member.voice.channel.guild.id,
        adapterCreator: member.voice.channel.guild.voiceAdapterCreator,
      });

      // Créez un lecteur audio et une ressource audio
      const audioPlayer = voice.createAudioPlayer();
      const audioResource = voice.createAudioResource("m1.mp3");

      // Ajoutez la ressource audio au lecteur audio
      audioPlayer.play(audioResource);

      // Lisez l'audio dans le canal vocal
      voiceChannel.subscribe(audioPlayer);

      message.reply("la musique arrive");
    } else {
      message.reply(
        "Vous devez être dans un canal vocal pour utiliser cette commande."
      );
    }
  },
};