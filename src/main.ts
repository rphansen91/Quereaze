import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

import { Quereaze, Editable } from './quereaze.ts';
import { XHRRequest, XHRResponse, Request, Response } from './xhr.ts';
import { BuildSubmitr, BuildEditors } from './builders.ts';

interface CtorQuereaze {
    root: HTMLElement;
    defaults: any;
    template?: string;
    onXhrReqCb?: (params: any)=>Request
}

interface QuereazeResponse {
    data: any,
    quereaze: Quereaze;
}

export const RenderQuereaze = (ctor: CtorQuereaze) => {
    
    if (ctor.template) {
        ctor.root.innerHTML = ctor.template; // ADD TEMPLATE
    }

    let subscription;
    let submitr: HTMLElement = BuildSubmitr(ctor.root); // FIND ELEMENT WITH QUEREAZE-SUBMIT ATTRIBUTE
    let editors: Editable[] = BuildEditors(ctor.root); // FIND ALL ELEMENTS WITH QUEREAZE ATTRIBUTE
    let invalid = editors.filter(editor => ctor.defaults[editor.key] !== editor.defaultValue); // VERIFY DEFAULTS
    let quereaze = new Quereaze(ctor.defaults, editors); 

    if (invalid && invalid.length) {
        ctor.root.innerHTML = "The following template editors, '" + invalid.reduce((p,c) => c["key"] + ", " + p, "") + "' do not have the correct default types";
        throw new Error(ctor.root.innerHTML);
    }

    let begin$ = Observable.merge(
        Observable.fromEvent(submitr, 'click'),
        ...editors.map(editor => OnEnter(editor.element))
    )
    .map(( ) => quereaze.relegate()) // RETRIEVE CURRENT VALUES
    .map((p) => quereaze.setParameters(p)) // UPDATE STORED PARAMS
    .map(( ) => quereaze.current()) // RETRIEVE STORED PARAMS


    return (onResultCb: (res: QuereazeResponse)=>void) => {

        if (subscription) { subscription.unsubscribe(); }

        if (ctor.onXhrReqCb) {
            subscription = begin$
            .switchMap((params) => XHRRequest(ctor.onXhrReqCb(params)))
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
            .subscribe((res) => onResultCb(res))
        } else {
            subscription = begin$.map(res => ({
                data: res,
                quereaze
            }))
            .subscribe((res) => onResultCb(res))
        }
    }
}

const OnEnter = (element) => {
    // ADD ON ENTER EVENTS FOR ALL VALID EDITABLES
    return Observable.fromEvent(element, 'keyup', (ev) => ev.which)
    .filter(key => key === 13)
}