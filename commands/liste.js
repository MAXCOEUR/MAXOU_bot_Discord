const musiqueF =require('./musiqueFonction')
const {queue} = require('../queue');

module.exports = {
  name: "liste",
  description: "liste !",
  execute(message, args) {
    const serverQueue = queue.get(message.guild.id);
        if(serverQueue!=undefined && serverQueue.songs.length>0){
            let playlistMessage = "Liste de lecture :\n";
            serverQueue.songs.forEach((song, index) => {
            if (index === 0) {
                // Mettez en évidence la chanson en cours
                playlistMessage += `-> ${song.titre}\n`;
            } else {
                playlistMessage += `${index}. ${song.titre}\n`;
            }
            });

            message.reply(playlistMessage);
        }
        else{
            message.reply("il n'y a pas de musique");
        }
  },
};
