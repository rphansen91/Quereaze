import { Quereaze } from './quereaze';
import { Request } from './xhr';

export interface CtorQuereaze {
    root: HTMLElement;
    defaults: any;
    template?: string;
}

export interface QuereazeResponse {
    data: any,
    quereaze: Quereaze;
}

export interface QuereazeClass {
    onSubmit: (params: any)=>Request;
    onSuccess: (response: QuereazeResponse)=>void;
    onError: (err)=>void;
}