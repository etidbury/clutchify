/*@ngInject*/
class SpotifyAuthService {

    constructor($http,$localStorage) {
        this.$localStorage=$localStorage;
        this.$http = $http;
        if (location.host == 'localhost:8000') {
            this.CLIENT_ID = '409f070cb44945d9a85e9b4ad8fa3bf1';
            this.REDIRECT_URI = 'http://localhost:8000/callback.html';
        } else {
            this.CLIENT_ID = '9714921402b84783b2a207f1b6e82612';
            this.REDIRECT_URI = 'http://lab.possan.se/thirtify/callback.html';
        }


        function checkUser(redirectToLogin) {
            API.getMe().then(function(userInfo) {
                Auth.setUsername(userInfo.id);
                Auth.setUserCountry(userInfo.country);
                if (redirectToLogin) {
                    $scope.$emit('login');
                    $location.replace();
                }
            }, function(err) {
                $scope.showplayer = false;
                $scope.showlogin = true;
                $location.replace();
            });
        }


        window.addEventListener("message", function(event) {
            console.log('got postmessage', event);
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                Auth.setAccessToken(hash.access_token, hash.expires_in || 60);
                checkUser(true);
            }
        }, false);

        $scope.isLoggedIn = (Auth.getAccessToken() != '');



    }

    getLoginURL(scopes) {
        return 'https://accounts.spotify.com/authorize?client_id=' + this.CLIENT_ID
            + '&redirect_uri=' + encodeURIComponent(this.REDIRECT_URI)
            + '&scope=' + encodeURIComponent(scopes.join(' '))
            + '&response_type=token';
    }

    openLoginWindow(){
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
        const expires = 0 + this.$localStorage.getItem('pa_expires', '0');

        if ((new Date()).getTime() > expires) {
            return '';
        }
        return this.$localStorage.getItem('pa_token');
    }

    setAccessToken(token, expires_in) {
        this.$localStorage.setItem('pa_token', token);
        this.$localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
        // _token = token;
        // _expires = expires_in;
    }


    /*


     function getLoginURL(scopes) {

     }*/
}

export default SpotifyAuthService;