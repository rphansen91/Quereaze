export interface Editable {
    key: string;
    defaultValue: string|number;
    relegatorCb: ()=>string|number;
    element: any;
}

export class Quereaze {

    public history: any[] = [];

    constructor (private query: any, private editable: Editable[]) {}

    save () {
        if (this.history[this.history.length - 1] !== this.query) {
            this.history = [...this.history, this.query]; // ADD LAST PARAMS TO HISTORY
        }
    }

    current () { return this.query; }

    relegate () {
        return this.editable.reduce((p, c) => {
            p[c.key] = c.relegatorCb()
            return p; 
        }, {})
    }

    setParameters (newParams: any) {
        if (!newParams || !this.validParams(newParams)) {
            throw new Error("Invalid parameters set to query, " + JSON.stringify(newParams));
        }
        this.query = Object.assign({}, this.query, newParams);  // CREATE ENTIRELY NEW OBJECT FOR MEMOIZATION
        return this;
    } 

    validParams (params: any): boolean {
        let values = Object.keys(params);
        let valid = values.filter(key => 
            typeof this.query[key] === typeof params[key]
        )
        return values.length === valid.length
    }

}