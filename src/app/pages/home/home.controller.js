import SpotifyAuthService from '../../services/spotify/SpotifyAuthService'
import SpotifyAPIService from '../../services/spotify/SpotifyAPIService'

/*@ngInject*/
class HomeController {
  constructor($sce,$timeout,_SpotifyAuthService:SpotifyAuthService,_SpotifyAPIService:SpotifyAPIService) {
    this.username=_SpotifyAuthService.getUsername();
    this.api=_SpotifyAPIService;

    this.isLoadingTracks=true;

    this.tracks=[];


    this.factoredTrackIdList=[];


    this.analysis=[];
    this.getSelectionOptionTitle=function(t){

      var loadIndicator=this.analysis[t.track.id]?"/":"?";


      return loadIndicator+" "+t.track.name+" - "+t.track.artists[0].name;

    };

    var updateListTimeout;
    this.updatingList=false;

    this.updateList=function(inputTrackEnergy){
      $timeout.cancel(updateListTimeout);

      this.updatingList=true;
      console.log("home.controller.js(33):");//fordebug: print log
      console.log("update list..");//fordebug: print log

      updateListTimeout=$timeout(function(){
        console.log("home.controller.js(37):");//fordebug: print log
        console.log("updating list");//fordebug: print log
        var m=[];

        this.tracks.forEach(function(t){
          var energyLvl=this.analysis[t.track.id].energy;
          if (energyLvl>=inputTrackEnergy)
              m.push(t.track.id);

        }.bind(this));

        this.factoredTrackIdList=m;
        this.updatingList=false;


      }.bind(this),3000);


    };



    this.getSpotifyPlaylistFrameURI=function(){
      return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:trackset:Results:"+this.factoredTrackIdList.join(','));
    };
    this.analysisPercentageComplete=function(){
      var analysisComplete=0;
      for (var i = 0; i < this.tracks.length; i++) {
        var t = this.tracks[i];
        if (this.analysis[t.track.id])
            analysisComplete++;

      }
      return Math.round((analysisComplete/this.tracks.length)*100);
    };

    this.runAnalysis=function(){
      for (var i = 0; i < this.tracks.length; i++) {
        var t = this.tracks[i];
        _SpotifyAPIService.getAudioFeatures(t.track.id).then(function(r){
          var f=r.data;
          this.analysis[f.id]=f;

        }.bind(this));
      }
    };


    /*-----------*/

    this.api.getMyTracks().then(function(r){

      this.isLoadingTracks=false;

      this.tracks=r.data.items;

      this.runAnalysis();
    }.bind(this));





  }

}

module.exports = HomeController
