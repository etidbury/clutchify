import SpotifyAuthService from '../../services/spotify/SpotifyAuthService'
/*@ngInject*/
class LoginController {
    constructor($localStorage,$location,SpotifyAuthService:SpotifyAuthService) {

        this.$location=$location;

        this.$localStorage = $localStorage;
        this.auth=SpotifyAuthService;

        this.auth.setTestLogin('hello');

        console.log(this.auth.getTestLogin());

        this.message = 'Hello'
    }
    doLogin(value:string){
        this.auth.setTestLogin(value);
        this.$location.path('/home');

    }
    foo() {
        this.$localStorage.foo='world';
        return 'worlds'
    }
}

module.exports = LoginController;