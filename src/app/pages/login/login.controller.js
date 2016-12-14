import SpotifyAuthService from '../../services/spotify/SpotifyAuthService'
/*@ngInject*/
class LoginController {
    constructor($localStorage,$location,_SpotifyAuthService:SpotifyAuthService) {

        this.$location=$location;

        this.$localStorage = $localStorage;
        this.auth=_SpotifyAuthService;
    }

    doSpotifyLogin(){
        this.auth.openLoginWindow();
    }
}

module.exports = LoginController;