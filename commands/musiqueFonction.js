const { createAudioPlayer, createAudioResource,getVoiceConnection  } = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const {queue} = require('../queue');




var audioPlayer;

function play(guild) {
    const serverQueue = queue.get(guild.id);
  
    if (!serverQueue.songs[0]) {
      queue.delete(guild.id);
      return;
    }
  
    // Créez un lecteur audio et une ressource audio
    audioPlayer = createAudioPlayer();
  
    const stream = ytdl(serverQueue.songs[0].link, { filter: "audioonly" })
    const audioResource = createAudioResource(stream);
  
    // Ajoutez la ressource audio au lecteur audio
    audioPlayer.play(audioResource);
  
    // Lisez l'audio dans le canal vocal
    serverQueue.voiceChannel.subscribe(audioPlayer);
  
    audioPlayer.addListener("stateChange", (oldOne, newOne) => {
        if (newOne.status == "idle") {
            // La piste actuelle est terminée, supprimez-la de la liste de lecture
            next(guild)
        }
    });
    
  }
  
  function next(guild){
    const serverQueue = queue.get(guild.id);
    if(serverQueue.songs.length>1){
        serverQueue.songs.shift(); // Supprimez la première chanson
        // Jouez la chanson suivante si elle existe
        audioPlayer.stop();
        if (serverQueue.songs.length > 0) {
          play(guild);
        } else {
          // Plus de chansons dans la liste de lecture, vous pouvez nettoyer la file d'attente si nécessaire
          queue.delete(guild.id);
        }
    }
        
  }
  function stop(guild){
    const serverQueue = queue.get(guild.id);
    if(serverQueue.songs.length>0){
        queue.delete(guild.id);
        audioPlayer.stop();
        serverQueue.songs.shift();

        const voiceConnection = getVoiceConnection(guild.id);
        if (voiceConnection) {
            // Déconnectez la connexion vocale
            voiceConnection.destroy();
        }
    }
        
  }

  module.exports={play,next,stop}