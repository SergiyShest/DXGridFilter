//const FilterHelper = require('../dist/FilterHelper.js');
//import { FilterHelper }  from '../dist/FilterHelper.js';

describe("RemoveFromExpession Tests", function () {

    it("test simple not", function () {

        var exp = "([U] = 10.0m And [i] = 20s)";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('[U] = 10.0m And [i] = 20s');
    });

    it("test simple", function () {

        var exp = "[U] = 10.0m And [id] = 20s";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('[U] = 10.0m');
    });

    it("test simple 2", function () {
        var exp = " [id] = 20s";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('');
    });

    it("test simple 3", function () {
        var exp = " [id] = 20s or [id] = 10s";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('');
    });

    it("test <> 3", function () {
        var exp = " [id] < 20s or [id] > 10s";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('');
    });

    it("test <= >= ", function () {
        var exp = " [id] <= 20s or [id] >= 10s";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('');
    });

    it("test () ", function () {
        var exp = "([id] <= 20s or [id] >= 10s)";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('');
    });

    it("test remove group", function () {
        var exp = "([id] > 20s or [id] < 10s ) and [x]=5";
        var resFilter = FilterHelper.RemoveFromExpession(exp, 'id').trim();
        expect(resFilter).to.equal('[x]=5');
    });

});

describe("ApplyInCon Tests", function () {

    it("test  not", function () {

        var exp = "([U] = 10.0m And [i] = 20s)";
        var resFilter = FilterHelper.ApplyInCon(exp, 'id',[]).trim();
        expect(resFilter).to.equal('[U] = 10.0m And [i] = 20s');
    });

    it("test remove", function () {

        var exp = "([U] = 10.0m And [i] = 20s)";
        var resFilter = FilterHelper.ApplyInCon(exp, 'i',[]).trim();
        expect(resFilter).to.equal('[U] = 10.0m');
    });

    it("test one value", function () {

        var exp = "[i] = 20s";
        var resFilter = FilterHelper.ApplyInCon(exp, 'i',[1],'s').trim();
        expect(resFilter).to.equal('[i] = 1s');
    });

    it("test two value", function () {

        var exp = "[i] = 20s";
        var resFilter = FilterHelper.ApplyInCon(exp, 'i',[1,2],'').trim();
        expect(resFilter).to.equal('[i] = 1 or [i] = 2');
    });
    it("test not empty filter and two value", function () {

        var exp = "[U] = 10.0m And[i] = 20s";
        var resFilter = FilterHelper.ApplyInCon(exp, 'i',[1,2],'').trim();
        expect(resFilter).to.equal('[U] = 10.0m and ([i] = 1 or [i] = 2)');
    });
});