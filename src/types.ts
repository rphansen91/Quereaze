export const numberType = (element) => ({
    defaultValue: 0,
    relegatorCb: () => { return Number(element["value"]) || 0; }
})

export const stringType = (element) => ({
    defaultValue: "",
    relegatorCb: () => { return element["value"].trim() || ""; }
})

export const booleanType = (element) => ({
    defaultValue: element["checked"],
    relegatorCb: () => { return element["checked"]; }
})