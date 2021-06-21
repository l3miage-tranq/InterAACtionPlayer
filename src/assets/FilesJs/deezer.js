/**
 * Allows to initialise Deezer
 */
function initDeezer(){
  initDZ();
}

var track = [];

/**
 * Allows to initialize Deezer audio player
 */
var initDZ = function (){
  DZ.init({
    appId : '479942',
    channelUrl : 'http://localhost:4200',
    player: {
      container: 'deezerSong',
      width: 500,
      height: 90,
      layout: 'dark',
      onload: function (response){
        console.log('DZ.player is ready', response);
        playTracks();
      }
    }
  });
}

/**
 * Allows to load the music we want to listen into the deezer audio player
 */
var playTracks = function (){
  console.log("Chargement d'une musique");
  DZ.player.playTracks(track);
}

/**
 * Allows to start Deezer audio player
 */
function playDeezer(){
  DZ.player.play();
}

/**
 * Allows to pause Deezer audio player
 */
function pauseDeezer(){
  DZ.player.pause();
}

/**
 * Allows to increase the volume of Deezer audio player
 */
function increaseVolumeDeezer(){
  DZ.player.setVolume(DZ.player.getVolume() + 10);
}

/**
 * Allows to decrease the volume of Deezer audio player
 */
function decreaseVolumeDeezer(){
  DZ.player.setVolume(DZ.player.getVolume() - 10);
}

/**
 * Allows to put the song we want to listen into the playlist
 */
function setTrack(trackId){
  track.push(trackId);
}
