var expect = require('chai').expect;

const { BuildSubmitr, BuildEditors } = require('./builders.ts');
const { submit, editorString, editorNumber, editorBoolean, mockDom } = require('./mockDOM.js');

describe('UI Builder Module', () => {
    it('BuildSubmitr should exist', () => {
        expect(BuildSubmitr).to.be.defined
    })
    it('BuildEditors should exist', () => {
        expect(BuildEditors).to.be.defined
    })
})
describe('UI Builder', () => {
    var sub = BuildSubmitr(mockDom);
    var editors = BuildEditors(mockDom);
    
    it('should find the quereaze submit element', () => {
        expect(sub).to.equal(submit)
    })
    it('should find all editors', () => {
        expect(editors.length).to.equal(3)
    })
    it('should find the quereaze text input element', () => {
        expect(editors[0].element).to.equal(editorString)
    })
    it('should find the quereaze boolean input element', () => {
        expect(editors[1].element).to.equal(editorBoolean)
    })
    it('should find the quereaze number input element', () => {
        expect(editors[2].element).to.equal(editorNumber)
    })
})