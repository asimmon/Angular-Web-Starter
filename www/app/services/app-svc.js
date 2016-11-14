(function () {
    'use strict';

    angular.module('myapp').service('AppSvc', function () {
        'ngInject';

        /**
         * Say hello to someone
         * @param name
         * @returns {string}
         */
        var sayHello = function (name) {
            return 'Hello, ' + name;
        };

        return {
            sayHello: sayHello
        };
    });
})();