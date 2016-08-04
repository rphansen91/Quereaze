var StarXHRCallback = function (params) {
    let current = helpers.currentType(params)
    helpers.setSWarsContent("<h2>Loading " +current + "...</h2>")
    return { 
        method: "GET", 
        body: null, 
        url: "https://swapi.co/api/" + current + "/?format=json" 
    }
}

RenderQuereaze({
    root: document.getElementById('sWarsControls'), // ELEMENT TO RENDER QUERY UI
    template: helpers.star.template, // TEMPLATE OF THE QUERY UI
    defaults: helpers.star.defaults, // THE DEFAULT PARAMS FOR REQUEST
    onXhrReqCb: StarXHRCallback // CALLBACK RECIEVES CURRENT PARAMS AND RETURNS THE REQUEST BODY
})
(function (result) {
    // RESPONSE AFTER HTTP REQUEST FINISHES
    if (result.data.results) { 
        result.quereaze.save();
        console.log(result.quereaze.history);
        helpers.setSWarsContent(
            helpers.display(result)
        )
    }
})

RenderQuereaze({
    root: document.getElementById('searchControls'),
    template: helpers.search.template,
    defaults: helpers.search.defaults,
})
(function (result) {
    result.quereaze.save();
    console.log(result.quereaze.history);
    let content = JSON.stringify(result.data, null, 4);
    helpers.setSearchContent(content);
})