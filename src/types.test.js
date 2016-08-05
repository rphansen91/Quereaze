var expect = require('chai').expect;
const { numberType, stringType, booleanType } = require('./types.ts');

describe('Quereaze default parameter types', () => {
    describe('numberType', () => {
        it('should exist', () => {
            expect(numberType).to.be.defined
        })
        it('should have a default value', () => {
            let type = numberType({ value: "12-12" })
            expect(type.defaultValue).to.equal(0)
        })
        it('should return default if bad value', () => {
            let type = numberType({ value: "12-12" })
            expect(type.relegatorCb()).to.equal(0)
        })
        it('should return a value when relegated', () => {
            let type = numberType({ value: "12" })
            expect(type.relegatorCb()).to.equal(12)
        })
    })
    describe('stringType', () => {
        it('should exist', () => {
            expect(stringType).to.be.defined
        })
        it('should have a default value', () => {
            let type = stringType({ value: "car" })
            expect(type.defaultValue).to.equal("")
        })
        it('should return default if bad value', () => {
            let type = stringType({ value: " " })
            expect(type.relegatorCb()).to.equal("")
        })
        it('should return a value when relegated', () => {
            let type = stringType({ value: "car" })
            expect(type.relegatorCb()).to.equal("car")
        })
    })
    describe('booleanType', () => {
        it('should exist', () => {
            expect(booleanType).to.be.defined
        })  
        it('should have a default value', () => {
            let type = booleanType({ checked: false })
            expect(type.defaultValue).to.equal(false)
        })
        it('should return default if bad value', () => {
            let type = booleanType({ checked: false })
            expect(type.relegatorCb()).to.equal(false)
        })
        it('should return a value when relegated', () => {
            let type = booleanType({ checked: true })
            expect(type.relegatorCb()).to.equal(true)
        })
    })
})