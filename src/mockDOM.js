const { SUBMIT_ATTR, QUEREAZE_ATTR } = require('./builders.ts');

export const submit = {
    attributes: { [SUBMIT_ATTR]: " " }
}
export const editorString = {
    attributes: { [QUEREAZE_ATTR]: { value: "q" }, type: { value: "text" } },
    value: "cars "
}
export const editorNumber = {
    attributes: { [QUEREAZE_ATTR]: {value:"min"}, type: {value:"number"} },
    value: 100
}
export const editorBoolean = {
    attributes: { [QUEREAZE_ATTR]: {value:"hasPhoto"}, type: {value:"checkbox"} },
    checked: false
}
const mockDiv = {attributes: {}}
export const mockDom = {
    tagName: "DIV",
    innerHTML: "<div></div>",
    children: [
        editorString, 
        mockDiv, 
        mockDiv, 
        { children: [
            {attributes: {}, children: [
                editorBoolean,
                mockDiv
            ]}, 
            mockDiv,
            editorNumber, 
            submit
        ] }
    ]
}