'use strict';

describe('HomeCtrl', function () {
    var ctrl;

    beforeEach(module('myapp'));
    beforeEach(inject(function ($controller) {
        ctrl = $controller('ProfileCtrl');
    }));

    it('controller should load without errors', function () {
        expect(true).toBe(true);
    });
});