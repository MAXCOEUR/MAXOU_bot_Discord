const musiqueF =require('./musiqueFonction')
const {queue} = require('../queue');

module.exports = {
  name: "next",
  description: "next !",
  execute(message, args) {
    // Vérifiez si le membre est dans un canal vocal
    const member = message.member;
    if (member && member.voice.channel) {
        const serverQueue = queue.get(message.guild.id);
        if(serverQueue!=undefined && serverQueue.songs.length>1){
            musiqueF.next(message.guild);
            message.reply("musique suivante !");
        }
        else{
            message.reply("il n'y a pas de musique suivante !");
        }
        
    } else {
      message.reply("Vous devez être dans un canal vocal pour utiliser cette commande.");
    }
  },
};
