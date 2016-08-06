var expect = require('chai').expect;
const { XHRRequest, XHRResponse, ResponseObject } = require('./xhr.ts');

// Mock XMKHttp Object
const XMLHttpRequest = () => {
    var opened = false;
    var sent = false;
    return {
        opened: opened,
        sent: sent,
        open: () => { opened = true; },
        send: () => { sent = true; }
    }
}

const spy = (fn) => {
    var returnValue;
    var returnFn = () => {
        if (!returnFn.called) {
            returnFn.called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    }
    returnFn.called = false;
    return returnFn;
}

describe('XHR Implementation', () => {
    describe('XHRRequest', () => {
        let request = { method: "GET", url: "URL", body: {text: "Hello"} }
        let obs = XHRRequest(request)
        it('should exist', () => {
            expect(XHRRequest).to.be.defined
        })
        it('should return an observable', () => {
            expect(typeof obs.subscribe).to.equal("function")
        }) 
        it('should open a network request', () => {
            var sub = () => {  }
            var callback = spy(sub);
            obs.subscribe(callback);
            expect(callback.called).to.be.true;
        })
    })
    describe('XHRResponse', () => {
        let request = {responseText: "complete", readyState: 3}
        let obs = XHRResponse(request)
        it('should exist', () => {
            expect(XHRResponse).to.be.defined
        })
        it('should return an observable', () => {
            expect(typeof obs.subscribe).to.equal("function")
        })  
        it('should not fire subscription until ready', () => {
            var sub = () => {  }
            var callback = spy(sub);
            obs.subscribe(callback)
            request.onreadystatechange();
            expect(callback.called).to.be.false;
        })
        it('should fire subscription when resolved', () => {
            var sub = () => {  }
            var callback = spy(sub);
            obs.subscribe(callback)
            request.readyState = 4;
            request.onreadystatechange();
            expect(callback.called).to.be.true;
        })
    })
    describe("Response", () => {
        var resObj = ResponseObject('{"hello":"world"}');
        var errObj = ResponseObject('[hello]: 0');
        it('should format text', () => {
            expect(typeof resObj.text).to.equal("function")
        })
        it('should return text', () => {
            expect(resObj.text()).to.equal('{"hello":"world"}')
        })
        it('should format json', () => {
            expect(typeof resObj.json).to.equal("function")
        })
        it('should return json', () => {
            expect(resObj.json().hello).to.equal("world")
        })
        it ('should return error if invalid', () => {
            expect(errObj.json()).to.be.an.instanceof(Error)
        })
    })
})