var expect = require('chai').expect;
const { numberType, stringType, booleanType } = require('./types.ts');

describe('Quereaze default parameter types', () => {
    it('numberType should exist', () => {
        expect(numberType).to.be.defined
    })
    it('stringType should exist', () => {
        expect(stringType).to.be.defined
    })
    it('booleanType should exist', () => {
        expect(booleanType).to.be.defined
    })
})