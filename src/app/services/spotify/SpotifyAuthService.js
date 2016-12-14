/*@ngInject*/
export default class SpotifyAuthService {

    

    constructor($localStorage) {
        this.CLIENT_ID='4891aeb7078f4b85a2c1c976969bb047';//todo: inject as constant
        this.REDIRECT_URI = 'http://localhost:8080/callback.html';//todo: inject as constant
        this.$localStorage=$localStorage;

        //this.$scope=$scope;
       /* if (location.host == 'localhost:8000') {
            this.CLIENT_ID = '409f070cb44945d9a85e9b4ad8fa3bf1';
            this.REDIRECT_URI = 'http://localhost:8000/callback.html';
        } else {
            this.CLIENT_ID = '9714921402b84783b2a207f1b6e82612';
            this.REDIRECT_URI = 'http://lab.possan.se/thirtify/callback.html';
        }
*/




    }

    getLoginURL(scopes) {
        return 'https://accounts.spotify.com/authorize?client_id=' + this.CLIENT_ID
            + '&redirect_uri=' + encodeURIComponent(this.REDIRECT_URI)
            + '&scope=' + encodeURIComponent(scopes.join(' '))
            + '&response_type=token';
    }

    openLoginWindow(){
        console.log("SpotifyAuthService.js(39):");//fordebug: print log
        console.log("openLoginWIndow");//fordebug: print log
        const url = this.getLoginURL([
            'user-read-private',
            'playlist-read-private',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-library-read',
            'user-library-modify',
            'user-follow-read',
            'user-follow-modify'
        ]);
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        var w = window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
    }
    getAccessToken() {
        const expires = 0 + (this.$localStorage.pa_expires||0);

        if ((new Date()).getTime() > expires) {
            return '';
        }
        return this.$localStorage.pa_token;
    }
    isAuthorised(){
        return this.getAccessToken()||this.getAccessToken().length;
    }

    setAccessToken(token, expires_in) {
        this.$localStorage.pa_token= token;
        this.$localStorage.pa_expires=new Date().getTime() + expires_in;
        // _token = token;
        // _expires = expires_in;
    }
    
    setUsername(username) {
        console.log("SpotifyAuthService.js(73):");//fordebug: print log
        console.log("set username:"+username);//fordebug: print log
        this.$localStorage.username= username;
    }
    getUsername(){
        return this.$localStorage.username;
    }


    /*


     function getLoginURL(scopes) {

     }*/
}
