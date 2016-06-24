(function () {
    'use strict';

    angular.module('myapp', ['ui.bootstrap', 'ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            'ngInject';

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('main', {
                    url: '',
                    abstract: true,
                    templateUrl: 'app/views/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'main'
                })
                .state('main.home', {
                    url: '/home',
                    templateUrl: 'app/views/home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'vm'
                });
        });
})();