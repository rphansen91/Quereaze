export const SUBMIT_ATTR = "quereaze-submit";
export const QUEREAZE_ATTR = "quereaze";

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
    .map((child) => {
        let defaultValue;
        let relegatorCb;
        if (child["attributes"]["type"]["value"] === "number") {
            defaultValue = 0;
            relegatorCb = () => { return Number(child.value) || defaultValue; }
        } else if (child["attributes"]["type"]["value"] === "checkbox") {
            defaultValue = child["checked"];
            relegatorCb = () => { return child["checked"]; }
        } else {
            defaultValue = "";
            relegatorCb = () => { return child.value.trim() || defaultValue; }
        }
        return {
            element: child,
            key: child["attributes"][QUEREAZE_ATTR]["value"],
            defaultValue, relegatorCb
        }
    })
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