import { Observable } from 'rxjs/Observable';

export interface Request {
    method: string;
    url: string;
    body: any;
}

export interface Response {
    text: ()=>string;
    json: ()=>any;
}

export const XHRRequest = (params: Request): Observable<XMLHttpRequest> => {
    return new Observable((observer) => {
        var xhttp = new XMLHttpRequest();
		xhttp.open(params.method, params.url, true);
		xhttp.send(JSON.stringify(params.body));
        observer.next(xhttp);
    })
}

export const XHRResponse = (request: XMLHttpRequest): Observable<Response> => {
    return new Observable(observer => {
        request.onreadystatechange = function() {
			if (request.readyState == 4) {
                observer.next(ResponseObject(request.responseText));
			}
		};
    })
}

export const ResponseObject = (text: string):Response => ({
    text: ()=>text,
    json: ()=>{
        try {
            return JSON.parse(text)
        } catch (err) {
            return err;
        }
    }
})