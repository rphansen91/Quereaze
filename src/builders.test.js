var expect = require('chai').expect;
const { BuildSubmitr, BuildEditors } = require('./builders.ts');

describe('UI Builder', () => {
    it('BuildSubmitr should exist', () => {
        expect(BuildSubmitr).to.be.defined
    })
    it('BuildEditors should exist', () => {
        expect(BuildEditors).to.be.defined
    })
})