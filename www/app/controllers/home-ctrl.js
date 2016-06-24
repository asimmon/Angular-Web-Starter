(function () {
    'use strict';

    angular.module('myapp').controller('HomeCtrl', function (AppSvc) {
        'ngInject';

        var self = this;

        self.input = 'Mike';
        self.output = '';

        self.sayHello = function () {
            self.output = AppSvc.sayHello(self.input);
        };

        self.sayHello();
    });
})();