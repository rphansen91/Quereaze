export const noCtorError = "In order to initialize Quereaze a constructor of the type {root: HTMLElement, defaults: DefaultParams} is needed";
export const noRootError = "Must supply a valid DOM element in order to initialize Quereaze";
export const noContentError = "Quereaze was not supplied a template or none was found in the root";
export const noOnSubmit = "In order to be notified of subissions please provide an onSubmit handler";

export const validateCtor = (ctor) => {
    if (!ctor) {
        throw new Error(noCtorError)
    }
}

export const validateRoot = (root, template) => {
    if (!root || !root.tagName) {
        throw new Error(noRootError);
    }
    if (template) {
        root.innerHTML = template; // ADD TEMPLATE
    } else if (!root.innerHTML) {
        throw new Error(noContentError);
    }
}

export const validateEditors = (editors, defaults) => {
    let invalid = editors.filter(editor => defaults[editor.key] !== editor.defaultValue); // VERIFY DEFAULTS
    if (invalid && invalid.length) {
        throw new Error(buildEditorError(invalid));
    }
}

export const buildEditorError = (invalid) => {
    return "The following template editors, '" + invalid.reduce((p,c) => c["key"] + ", " + p, "") + "' do not have the correct default types";
}

export const validateHandlers = (handlers) => {
    if (!handlers || typeof handlers.onSubmit !== "function") {
        throw new Error(noOnSubmit);
    } 
}