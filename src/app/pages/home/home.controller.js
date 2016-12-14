import SpotifyAuthService from '../../services/spotify/SpotifyAuthService'

/*@ngInject*/
class HomeController {
  constructor(_SpotifyAuthService:SpotifyAuthService) {
    this.username=_SpotifyAuthService.getUsername();
  }

}

module.exports = HomeController
