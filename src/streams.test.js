var expect = require('chai').expect;
const { OnSubmit, OnEnter } = require('./streams.ts');

describe('Observable streams', () => {

    describe('On Submit', () => {
        it('should be subscribable with no submit element', () => {
            expect(OnSubmit(null, [{element: {}}]).subscribe).to.be.a("function");
        })
        it('should be subscribable with a submit element', () => {
            expect(OnSubmit({}, [{element: {}}]).subscribe).to.be.a("function");
        })
    })

    describe('On enter', () => {
        it('should be subscribable', () => {
            expect(OnEnter({}).subscribe).to.be.a("function");
        })
    })
})