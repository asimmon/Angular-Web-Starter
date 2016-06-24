'use strict';

describe('TermAppWS', function () {
    var ws;

    beforeEach(module('myapp'));
    beforeEach(inject(function (TermAppWS) {
        ws = TermAppWS;
    }));

    it('factory should load without errors', function () {
        expect(true).toBe(true);
    });
});