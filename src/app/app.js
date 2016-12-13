import angular from 'angular'
import ngStorage from 'ngstorage'

import home from './pages/home/home'
import login from './pages/login/login'
import styles from './styles/main.scss'
import SpotifyAuthService from './services/spotify/SpotifyAuthService';

angular
  .module('app', [
    'app.components',

    'app.home',
    'app.login',
      'ngStorage'
  ])
    .service('SpotifyAuthService', SpotifyAuthService)
  .config(($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/login')
  });

