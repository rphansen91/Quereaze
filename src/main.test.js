var expect = require('chai').expect;
const { QuereazeIO, QuereazeHttp } = require('./main.ts');
const { mockDom } = require('./mockDOM.js'); 
const { noOnSubmit } = require('./validators.ts');

let constructor = {
    root: mockDom,
    defaults: {q: "", min: 0, hasPhoto: false}
}

describe('Main Quereaze Render Function', () => {
    describe('QuereazeIO', () => {
        it('should exist', () => {
            expect(QuereazeIO).to.be.a("function")
        })
        it('should return a component function', () => {
            expect(QuereazeIO(constructor)).to.be.a("function")
        }) 
        it('should require a callback handler', () => {
            var fn = QuereazeIO(constructor).bind(this, {})
            expect(fn).to.throw(noOnSubmit);
        })
    })
    describe('QuereazeHttp', () => {
        it('should exist', () => {
            expect(QuereazeHttp).to.be.a("function")
        })
        it('should return a component function', () => {
            expect(QuereazeHttp(constructor)).to.be.a("function")
        })
        it('should require a callback handler map', () => {
            var fn = QuereazeHttp(constructor).bind(this, {});
            expect(fn).to.throw(noOnSubmit);
        })
    })
})