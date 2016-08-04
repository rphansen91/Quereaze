Quereaze

> Easily build **IO UI's** that utilize `Undo, History, and Abort Http Request Logic`.
> Simple html syntax combined with declaritive typing allow the library to keep a
> **memoized** history of parameters.

[DEMO: https://rphansen91.github.io/Quereaze/](https://rphansen91.github.io/Quereaze/)
-----------------------------------------------
[GITHUB: https://github.com/rphansen91/Quereaze](https://rphansen91.github.io/Quereaze/)
-----------------------------------------------

USAGE
-----

`npm install quereaze -S`


> Template type syntax

1. String: (defaultValue = "")
    `<input type="text" quereaze="paramKey" />`

2. Number: (defaultValue = 0)
    `<input type="number" quereaze="paramKey" />`

3. Boolean: (defaultValue = false)
    `<input type="checkbox" quereaze="paramKey" />`

4. Submit On Click (Optional)
    `<button quereaze-submit>Submit</button>`

The `quereaze-submit` element is optional.
This is because all the `quereaze` elements
are wired with [rxjs.Observable](https://github.com/ReactiveX/rxjs) sequences.
These sequences emit the new query params 
whenever the `enter` key is pressed.

> main.js

    import { RenderQuereaze } from 'quereaze'

    var ENDPOINT = "" // Endpoint of requested Data
    var DEFAULT_PARAMS = {
        // ...params used to query API
    }

    function onXhrReqCb (newParams) {
        // newParams: Same structure as DEFAULT_PARAMS 
        // but with updated data provided in template.html
        newParams["custom1"] = "value1";
        newParams["custom2"] = "value2";

        return {
            method: "POST"|"GET"|"PUT"|"DELETE",
            url: ENDPOINT,
            body: newParams
        }
    }

    // IF onXhrReqCb IS NOT SPECIFIED 
    // PARAMS WILL BE RETURNED INSTEAD
    var QuereazeComponent = RenderQuereaze({
        root: document.getElementById("root"),
        defaults: DEFAULT_PARAMS,
        template: require("./template.html"), // TEMPLATE
        onXhrReqCb: onXhrReqCb // OPTIONAL
    })

    // COMPONENT CALLBACK FUNCTION
    // WILL NOT FIRE REQUESTS UNTIL CB SUPPLIED
    // CALLED WHEN:
        // 1. NEW PARAMS SUBMITED
        // 2. XHR REQUEST HAS FINISHED (if supplied)
        
    QuereazeComponent(({ data, quereaze }) => {
        // IF SUCCESSFUL SAVE PARAMS
        quereaze.save()
        console.log(quereaze.history) // Memoized history of successful params

        // THE JSON RESPONSE IS ACCESSIBLE THROUGH THE DATA
        console.log(data)
    })

If the `defaults` specified do not match the defaultValues of the types 
found in the template an error will be thrown.

It is also possible to make custom type additions
to build valid requests in the `onXhrReqCb` handler.

These custom additions will also be `memoized` and
stored when `quereaze.save()` is called in the
`QuereazeComponent` callback handler.