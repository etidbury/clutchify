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
    .factory('sessionInjector',  function(_SpotifyAuthService) {
        return {
            request: function (config) {
                if (_SpotifyAuthService.isAuthorised()) {
                    config.headers['Authorization']= 'Bearer ' + _SpotifyAuthService.getAccessToken();
                }

                return config;
            }
        };
    })

    .config(($urlRouterProvider,$httpProvider:$httpProvider) => {
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
                _SpotifyAuthService.setUsername(userInfo.data.display_name);
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
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                _SpotifyAuthService.setAccessToken(hash.access_token, hash.expires_in || 60);
                this.checkUser(true);
            }
        }.bind(this), false);
    });


