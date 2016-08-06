var expect = require('chai').expect;
const { Quereaze } = require('./quereaze.ts');

describe('Quereaze', () => {

    const defaults = {
        q: "", min: 0, max: 0, cat: 0, hasPhoto: false
    }
    const editables = [
        { key: "q", relegatorCb: () => "set string" },
        { key: "min", relegatorCb: () => 100 },
        { key: "hasPhoto", relegatorCb: () => true },
    ]
    var querier = new Quereaze(defaults, editables)

    it('should be present', () => {
        expect(querier).to.be.defined;
    })
    it('should be able to retrieve current query', () => {
        const params = querier.current();
        expect(params).to.equal(defaults);
    })
    describe('Param Validation', () => {
        describe("string type", () => {
            it('should be able to set data', () => {
                querier.setParameters({ q: "car" })
                const params = querier.current();
                expect(params.q).to.equal("car");
            })
            it('should not allow invalid sets', () => {
                let fn = querier.setParameters.bind(querier, {q: 100})
                expect(fn).to.throw(Error)
            })
        })
        describe("number type", () => {
            it('should be able to set data', () => {
                querier.setParameters({ min: 100 })
                const params = querier.current();
                expect(params.min).to.equal(100);
            })
            it('should not allow invalid sets', () => {
                let fn = querier.setParameters.bind(querier, {min: true})
                expect(fn).to.throw(Error)
            })
        })
        describe("boolean type", () => {
            it('should be able to set data', () => {
                querier.setParameters({ hasPhoto: true })
                const params = querier.current();
                expect(params.hasPhoto).to.be.true
            })
            it('should not allow invalid sets', () => {
                let fn = querier.setParameters.bind(querier, {hasPhoto: 0})
                expect(fn).to.throw(Error)
            })
        })
    })
    describe('Param relegation', () => {
        var obj = querier.relegate();
        it('should relegate all values from editables', () => {
            expect(obj).to.have.all.keys('q', 'min', 'hasPhoto');
        })
        it('should relegate string values', () => {
            expect(obj.q).to.equal("set string")
        })
        it('should relegate number values', () => {
            expect(obj.min).to.equal(100)
        })
        it('should relegate boolean values', () => {
            expect(obj.hasPhoto).to.be.true;
        })
    })
    describe('Historical Params', () => {
        it('should be able to save and retrieve params', () => {
            querier.save()
            expect(querier.history.length).to.equal(1) 
        })
        it('should not save duplicate params', () => {
            querier.save()
            expect(querier.history.length).to.equal(1)
        })
    })
})