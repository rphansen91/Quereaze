var helpers = {

    setSWarsContent: setContent('sWarsResults'),
    setSearchContent: setContent('searchResults'),

    display: displayContent,
    currentType: currentType,

    star: {        
        defaults: starDefaults(),
    },

    search: {
        defaults: searchDefaults(),
    }

}

function starDefaults () {
    return {
        people: false,
        films: false,
        planets: false,
        species: false,
        starships: false,
        vehicles: false
    }
}

function searchDefaults () {
    return {
        q: "",
        minPrice: 0,
        maxPrice: 0,
        categoryGroupId: 0,
    }
}

function currentType (params) {
    return Object.keys(params).reduce(function (p, c) {
        if (p) return p;
        if (params[c]) return c;
        return p; 
    }, "") || "people";
}

function displayContent (result) {
    var params = result.quereaze.history[result.quereaze.history.length - 1];

    function results () {
        return result.data.results.map(function (t) { return (t.name)?t.name:t.title; })
        .map(function (t) { return "<p>" +  t + "</p>"; })
        .reduce(function (p,c) { return p+c; },"") 
    }

    return "<h2>" + currentType(params) + "</h2>" +
        "<div>" + results() + "</div>"
}

function setContent (elementId) {
    let element = document.getElementById(elementId);
    return (content) => {
        element.innerHTML = content;
    }
}