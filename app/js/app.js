(function() {
  'use strict';

  angular.module('inventory', [])
  .controller('AppController', ['$scope', AppController]);

  function AppController ($scope) {
    console.log('Angular working!');
  }
}());
