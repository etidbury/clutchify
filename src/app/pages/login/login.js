import angular from 'angular';
import uiRouter from 'angular-ui-router'
import LoginController from './login.controller'
import LoginTemplate from './login.template.html'

// Directives
import FooBar from '../../components/foo-bar/foo-bar.component'

angular
  .module('app.login', [
    'ui.router'
  ])
  .config(($stateProvider) => {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          app: {
            template: LoginTemplate,
            controller: LoginController,
            controllerAs: 'login'
          }
        }
      })
  })
