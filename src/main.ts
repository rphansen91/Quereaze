import { Quereaze, Editable } from './quereaze.ts';
import { OnSubmit, OnEnter } from './streams.ts';
import { XHRRequest, XHRResponse, Request, Response } from './xhr.ts';
import { CtorQuereaze, QuereazeResponse, QuereazeClass } from './interfaces.ts';
import { BuildSubmitr, BuildEditors } from './builders.ts';
import { validateCtor, validateRoot, validateEditors, validateHandlers } from './validators.ts';

const CreateQ = (ctor: CtorQuereaze) => {
    validateCtor(ctor);
    validateRoot(ctor.root, ctor.template);

    let submitr: HTMLElement = BuildSubmitr(ctor.root); // FIND ELEMENT WITH QUEREAZE-SUBMIT ATTRIBUTE
    let editors: Editable[]  = BuildEditors(ctor.root); // FIND ALL ELEMENTS WITH QUEREAZE ATTRIBUTE

    validateEditors(editors, ctor.defaults); // WILL THROW IF INVALID
    
    let quereaze = new Quereaze(ctor.defaults, editors);
    let begin$ =  OnSubmit(submitr, editors) 
    .map(( ) => quereaze.relegate()) // RETRIEVE CURRENT VALUES
    .map((p) => quereaze.setParameters(p)) // UPDATE STORED PARAMS
    .map(( ) => quereaze.current()) // RETRIEVE STORED PARAMS

    return { quereaze, begin$ }
}

// Public API
export const QuereazeHttp = (ctor: CtorQuereaze) => {
    let { begin$, quereaze } = CreateQ(ctor);
    let subscription;

    return (cbClass: QuereazeClass) => {

        validateHandlers(cbClass);

        if (subscription) { subscription.unsubscribe(); }

        subscription = begin$
        .switchMap((params) => XHRRequest(cbClass.onSubmit(params)))
        .scan((prevXhttp, currXhttp) => {
            // BIG WIN AT THIS STEP
            // CANCEL ANY OUTSTANDING HTTP REQUESTS
            if (prevXhttp) { prevXhttp.abort(); }
            return currXhttp;
        }, null)
        .switchMap((res) => XHRResponse(res))
        .map(res => ({
            data: res.json(),
            quereaze
        }))
        .subscribe(
            (res) => {if (typeof cbClass.onSuccess == "function") { cbClass.onSuccess(res) }},
            err => {if (typeof cbClass.onError == "function") { cbClass.onError(err); }}
        )
    }
}

export const QuereazeIO   = (ctor: CtorQuereaze) => {
    let { begin$, quereaze } = CreateQ(ctor);
    let subscription;

    return (cbClass: QuereazeClass) => {

        validateHandlers(cbClass);

        if (subscription) { subscription.unsubscribe(); }

        subscription = begin$.map(res => ({
            data: res,
            quereaze
        }))
        .subscribe((res) => cbClass.onSubmit(res))
    }
}