(function () {
    'use strict';

    angular.module('myapp').service('AppSvc', function () {
        'ngInject';

        /**
         * Say hello to someone
         * @param text
         * @returns {string}
         */
        var sayHello = function (text) {
            return 'Hello, ' + text;
        };

        return {
            sayHello: sayHello
        };
    });
})();