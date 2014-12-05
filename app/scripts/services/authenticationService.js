/**
 * Created by nataliamiller on 22/11/2014.
 */


'use strict';

angular.module('csaClientAngularjsApp')
  .factory('AuthenticationService',
  ['Base64', '$http', '$cookieStore', '$rootScope',
    function (Base64, $http, $cookieStore, $rootScope) {

      var service = {};

          service.setCredentials = function (username, password) {
            var authData = Base64.encode(username + ':' + password);
            //keep logged in user info in scope
            $rootScope.globals = {
              currentUser: {
                username: username,
                authdata: authData
              }
            };
            //set authorization header for every request
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authData; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
            $rootScope.loggedInToBeTruthy(); //show the relevant menu buttons
            $rootScope.setCurrentUsername($rootScope.globals.currentUser.username); //for the welcome page
          };

          service.clearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $rootScope.resetCurrentUsername();
            $rootScope.loggedInToBeFalsey();
            $http.defaults.headers.common.Authorization = 'Basic ';
          };

      return service;

    }]);
