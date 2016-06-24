'use strict';

describe('HomeCtrl', function () {
    var ctrl;

    beforeEach(module('myapp'));
    beforeEach(inject(function ($controller) {
        ctrl = $controller('HomeCtrl');
    }));

    it('HomeCtrl should load without errors', function () {
        expect(true).toBe(true);
    });
});