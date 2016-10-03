'use strict';

describe('MainCtrl', function () {
    var ctrl;

    beforeEach(module('myapp'));
    beforeEach(inject(function ($controller) {
        ctrl = $controller('MainCtrl');
    }));

    it('MainCtrl should load without errors', function () {
        expect(ctrl).toBeDefined();
    });
});