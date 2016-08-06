var expect = require('chai').expect;

const { 
    noCtorError, noRootError, noContentError, noOnSubmit,
    validateCtor, validateRoot, validateEditors, buildEditorError, validateHandlers
} = require('./validators.ts');

describe('Constructor validators', () => {
    it ('Should throw error if nothing supplied', () => {
        expect(validateCtor).to.throw(noCtorError)
    })
     it ('Should pass if supplied', () => {
        let pass = validateCtor({})
        expect(pass).to.be.undefined
    })
    it('Should throw error if no root', () => {
        expect(validateRoot).to.throw(noRootError)
    })
    it('Should throw error if no template', () => {
        const fn = validateRoot.bind(this, {tagName: "DIV"})
        expect(fn).to.throw(noContentError)
    })
    it('Should allow user to set temlate', () => {
        var root = {tagName: "DIV", innerHTML: "Hello"}
        validateRoot(root, "Hello Template")
        expect(root.innerHTML).to.equal("Hello Template")
    })
    it('Should allow user to use inline temlate', () => {
        var root = {tagName: "DIV", innerHTML: "Hello"}
        validateRoot(root)
        expect(root.innerHTML).to.equal("Hello")
    })
})

describe('Editor validator', () => {

    describe('valid', () => {
        it ('should pass', () => {
            let editors = [{key: "a", defaultValue: ""}, {key: "b", defaultValue: 0}, {key: "c", defaultValue: true}]
            let defaults = {a: "",b: 0,c: true}
            let pass = validateEditors(editors, defaults);
            expect(pass).to.be.undefined
        })
    })

    describe('invalid', () => {
        it('should throw error', () => {
            let editors = [{key: "a", defaultValue: ""}, {key: "b", defaultValue: 0}, {key: "c", defaultValue: true}]
            let defaults = {a: "",b: 0,c: 0}
            let fn = validateEditors.bind(this, editors, defaults);
            expect(fn).to.throw(buildEditorError([{key: "c"}]))
        })
    })

})

describe('Handler validator', () => {
    it('should pass', () => {
        let pass = validateHandlers({onSubmit: function onSubmitHandler () {}});
        expect(pass).to.be.undefined;
    })
    it('should throw an error if no onSubmit function', () => {
        expect(validateHandlers).to.throw(noOnSubmit)
    })
})