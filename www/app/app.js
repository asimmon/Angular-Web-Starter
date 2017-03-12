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
        })
        .run(function ($rootScope, $uibModalStack, $log) {
            'ngInject';
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                $uibModalStack.dismissAll();
                $log.log('Navigating to state ' + toState.name);
            });
        });
})();