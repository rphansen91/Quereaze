QUEREAZE
========

Easily build UI's that query endpoints with *memoized* parameters.
This makes it trivial to create complex search *IO's* with out of the box
advanced features such as `Undo, History, and Abort Http Request Logic`

USAGE
-----

`npm install quereaze -S`

> main.js

    import { RenderQuereaze } from 'quereaze'

    var ENDPOINT = "" // Endpoint of requested Data
    var DEFAULT_PARAMS = {
        // ...params used to query API
    }

    function onHttpCallback (newParams) {
        // newParams: Same structure as DEFAULT_PARAMS 
        // but with updated data provided in template.html
        return {
            method: "POST"|"GET"|"PUT"|"DELETE",
            url: ENDPOINT,
            body: newParams
        }
    }

    var renderedQuereaze = RenderQuereaze(
        document.getElementById("root"),
        require("./template.html"),
        DEFAULT_PARAMS,
        onHttpCallback
    )
    
    // REQUESTS WONT FIRE UNTIL CALLBACK SUPPLIED
    renderedQuereaze(function (response) {
        // IF SUCCESSFUL SAVE PARAMS
        response.quereaze.save()
        console.log(response.quereaze.history)

        // THE JSON RESPONSE IS ACCESSIBLE 
        // THROUGH THE DATA KEY
        console.log(response.data)
    })

> template.html

    <!-- Specify editable params using attribute quereaze="{{paramKey}}" -->
    <!-- Use  type="text" if typeof defaultValue=string -->
    <input type="text" quereaze="{{paramKey}}" />
    <!-- Use  type="text" if typeof defaultValue=number -->
    <input type="text" quereaze="{{paramKey}}" />
    <!-- Use  type="text" if typeof defaultValue=boolean -->
    <input type="text" quereaze="{{paramKey}}" />
    <button>Submit</button>

IMPORTANT
---------

If the defaultValues specified do not match the defaultValues of the types 
found in the template an error will be thrown. This can be resolved by specifying 
the correct input type.

If allowed input types do not specify your needs then custom param relegations can
be made in the onHttpCallback handler