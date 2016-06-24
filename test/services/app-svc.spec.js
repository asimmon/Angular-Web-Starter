'use strict';

describe('AppSvc', function () {
    var svc;

    beforeEach(module('myapp'));
    beforeEach(inject(function (AppSvc) {
        svc = AppSvc;
    }));

    it('AppSvc say hello to Mike', function () {
        var actual = svc.sayHello('Mike');
        var expected = 'Hello, Mike';
        expect(actual).toBe(expected);
    });
});