import angular from 'angular'
import ngStorage from 'ngstorage'

import home from './pages/home/home'
import login from './pages/login/login'
import styles from './styles/main.scss'
import SpotifyAuthService from './services/spotify/SpotifyAuthService';
import SpotifyAPIService from './services/spotify/SpotifyAPIService';



angular
    .module('app', [
        'app.components',
        'app.home',
        'app.login',
        'ngStorage'
    ])
    .service('_SpotifyAPIService', SpotifyAPIService)
    .service('_SpotifyAuthService', SpotifyAuthService)
   // .service('AuthHelper', AuthHelper)
    .factory('sessionInjector',  function(_SpotifyAuthService) {
        var sessionInjector ={
            request: function (config) {
                if (_SpotifyAuthService.isAuthorised()) {
                    config.headers['Authorization']= 'Bearer ' + _SpotifyAuthService.getAccessToken();
                }

                return config;
            }
        };

        return sessionInjector;
    })

    .config(($urlRouterProvider,$httpProvider) => {
        $urlRouterProvider.otherwise('/login');

        $httpProvider.interceptors.push('sessionInjector');
    })

    .controller('AppController',function(
        _SpotifyAPIService:SpotifyAPIService
        ,_SpotifyAuthService:SpotifyAuthService
        ,$location
    ){

        this.checkUser = function (redirectToLogin) {
            _SpotifyAPIService.getMe().then(function (userInfo) {
                console.log("app.js(33):");//fordebug: print log
                console.log("checkUser");//fordebug: print log
                _SpotifyAuthService.setUsername(userInfo.data.display_name);
                //Auth.setUserCountry(userInfo.country);
                if (redirectToLogin) {
                    $location.path('/');
                }
                $location.path('/home')
            }, function (err) {
                $location.path('/');
            });
        };

        this.checkUser();

        window.addEventListener("message", function (event) {
            console.log('got postmessage', event);
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                _SpotifyAuthService.setAccessToken(hash.access_token, hash.expires_in || 60);
                this.checkUser(true);
            }
        }.bind(this), false);
    });


