import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

export const OnSubmit = (submitElement, editors) => {
    return Observable.merge(
        Observable.fromEvent(submitElement, 'click'),
        ...editors.map(editor => OnEnter(editor.element))
    )
}

export const OnEnter = (element) => {
    // ADD ON ENTER EVENTS FOR ALL VALID EDITABLES
    return Observable.fromEvent(element, 'keyup', (ev) => ev.which)
    .filter(key => key === 13)
}