import SpotifyAuthService from './SpotifyAuthService'
/*@ngInject*/
export default class SpotifyAPIService {
    
    constructor($http) {
        this.BASE_URI = 'https://api.spotify.com/v1';
        this.$http=$http;

    }
    getMyTracks(){
        return this.$http.get(this.BASE_URI + '/me/tracks');
    }
    getMe(){
        return this.$http.get(this.BASE_URI + '/me');
    }

}