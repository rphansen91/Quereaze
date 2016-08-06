/**
 * types
 *      string: "",
 *      number: 0,
 *      boolean: false
 * 
 * DefaultValues: {
 *      Any key value pairs supplied here will be memoized and 
 *      recorded in the local quereaze.history array
 * }
 */

/**
 * Constructor: {
 *      root: HTMLElement,
 *      defaults: DefaultValues,
 *      template: (Optional - can provide HTML directly in root)
 * }
 */

/**
 * QuereazeIO
 * 
 * Events: {
 *      onSubmit: Handler called with updated form data on every submission
 * }
 * 
 * Usage:
 * 
 *      QuereazeIO(Constructor)(Events)
 */ 

QuereazeIO({
    root: document.getElementById('searchControls'),
    defaults: helpers.search.defaults,
})({
    onSubmit: SearchSubmitHandler
})

function SearchSubmitHandler (result) {
    result.quereaze.save();
    console.log(result.quereaze.history);
    let content = JSON.stringify(result.data, null, 4);
    helpers.setSearchContent(content);
}

/**
 * QuereazeHttp
 * 
 * Events: {
 *      onSubmit: Handler called with updated form data, Returns HTTP, 
 *      onSuccess: Called after successful HTTP response,
 *      onError: Called on any error,
 * }
 * 
 * Usage:
 * 
 *      QuereazeHttp(Constructor)(Events)
 */

QuereazeHttp({
    root: document.getElementById('sWarsControls'), // ELEMENT TO RENDER QUERY UI
    defaults: helpers.star.defaults, // THE DEFAULT PARAMS FOR REQUEST
})({
    onSubmit: StarHTTPHandler,
    onSuccess: StarSuccessHandler
})

function StarHTTPHandler (params) {
    let current = helpers.currentType(params)
    helpers.setSWarsContent("<h2>Loading " +current + "...</h2>")
    return { 
        method: "GET", 
        body: null, 
        url: "https://swapi.co/api/" + current + "/?format=json" 
    }
}

function StarSuccessHandler (result) {
    // RESPONSE AFTER HTTP REQUEST FINISHES
    if (result.data.results) { 
        result.quereaze.save();
        console.log(result.quereaze.history);
        
        helpers.setSWarsContent(
            helpers.display(result)
        )
    }
}