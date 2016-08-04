export const SUBMIT_ATTR = "quereaze-submit";
export const QUEREAZE_ATTR = "quereaze";

import { Editable } from './quereaze.ts';
import { numberType, stringType, booleanType } from './types.ts';

export const BuildSubmitr = (root: HTMLElement): HTMLElement => {
    return FlattenChildren(root)
    .filter(child => child["attributes"][SUBMIT_ATTR])
    .reduce((p, c) => c, null);
}

export const BuildEditors = (root: HTMLElement) => {
    return FlattenChildren(root)
    .filter(child => child["attributes"])
    .filter(child => child["attributes"]["type"])
    .filter(child => child["attributes"][QUEREAZE_ATTR])
    .map((child) => createEditor(child))
    .filter(editor => !!editor)
}

const createEditor = (element: HTMLElement): Editable => {
    const editable = {
        element,
        key: element["attributes"][QUEREAZE_ATTR]["value"]
    }
    switch (element["attributes"]["type"]["value"]) {
        case "text": return Object.assign(editable, stringType(element));
        case "number": return Object.assign(editable, numberType(element))
        case "checkbox": return Object.assign(editable, booleanType(element))
    }
}

const FlattenChildren = (root) => {
    return ChildArray(root)
    .map(child => {
        if (child.children.length) { return FlattenChildren(child); }
        return child;
    })
    .reduce((p,c) => [...p, ...c], [])
}

const ChildArray = (root) => {
    return [].slice.call(root.children);
}