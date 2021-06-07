/**
 * Allows to initialise Deezer
 */
function initDeezer(){
  initDZ();
  loginDZ();
}

var initDZ = function (){
  DZ.init({
    appId : '479942',
    channelUrl : 'http://localhost:4200',
    player: {
      container: 'DeezerSong',
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

var loginDZ = function (){
  DZ.login(function (response){
    if (response.authResponse){
      console.log('Welcome! Fetching your information .... ');
      DZ.api('/user/me', function (response){
        console.log('Good to see you, ' + response.name + '.');
      });
    }else{
      console.log('User cancelled login or did ot fully authorize.');
    }
  }, {perms: 'basic_access,offline_access'});
}

var logoutDeezer = function (){
  DZ.logout();
}

var playTracks = function (){
  console.log("Chargement d'une musique");
  DZ.player.playTracks([3135556]);
}

function playDeezer(){
  DZ.player.play();
}

function  pauseDeezer(){
  DZ.player.pause();
}

function increaseVolumeDeezer(){
  DZ.player.setVolume(DZ.player.getVolume() + 10);
}

function decreaseVolumeDeezer(){
  DZ.player.setVolume(DZ.player.getVolume() - 10);
}
