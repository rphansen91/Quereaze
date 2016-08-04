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

> main.js

    import { RenderQuereaze } from 'quereaze'

    var ENDPOINT = "" // Endpoint of requested Data
    var DEFAULT_PARAMS = {
        // ...params used to query API
    }

    function onXhrReqCb (newParams) {
        // newParams: Same structure as DEFAULT_PARAMS 
        // but with updated data provided in template.html
        return {
            method: "POST"|"GET"|"PUT"|"DELETE",
            url: ENDPOINT,
            body: newParams
        }
    }

    // IF onXhrReqCb IS NOT SPECIFIED 
    // PARAMS WILL BE RETURNED INSTEAD
    RenderQuereaze({
        root: document.getElementById("root"),
        template: require("./template.html"),
        defaults: DEFAULT_PARAMS,
        onXhrReqCb: onXhrReqCb
    )(({ data, quereaze }) => {
        // IF SUCCESSFUL SAVE PARAMS
        quereaze.save()
        console.log(quereaze.history) // Memoized history of successful params

        // THE JSON RESPONSE IS ACCESSIBLE THROUGH THE DATA
        console.log(data)
    })


> template.html

    <!-- Specify editable params using attribute quereaze="paramKey" -->
    <!-- Use  type="text" if typeof defaultValue=string -->
    <input type="text" quereaze="paramKey" />
    <!-- Use  type="text" if typeof defaultValue=number -->
    <input type="text" quereaze="paramKey" />
    <!-- Use  type="text" if typeof defaultValue=boolean -->
    <input type="text" quereaze="paramKey" />
    <button>Submit</button>


IMPORTANT
---------

If the defaultValues specified do not match the defaultValues of the types 
found in the template an error will be thrown. This can be resolved by specifying 
the correct input type.

If allowed input types do not specify your needs then custom param relegations can
be made in the onHttpCallback handler