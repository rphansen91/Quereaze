var helpers = {

    setSWarsContent: setContent('sWarsResults'),
    setSearchContent: setContent('searchResults'),

    display: displayContent,
    currentType: currentType,

    star: {        
        template: starTemplate(),
        defaults: starDefaults(),
    },

    search: {
        template: searchTemplate(),
        defaults: searchDefaults(),
    }

}

function starTemplate () {
    return '<h1>Star Wars Quereaze</h1>' +
            '<div class="sWarsControls">' +
                '<div class="check">' +
                    '<input type="checkbox" quereaze="people">' +
                    '<label>People</label>' +
                '</div>' +
                '<div class="check">' +
                    '<input type="checkbox" quereaze="films">' +
                    '<label>Films</label>' +
                '</div>' +
                '<div class="check">' +
                    '<input type="checkbox" quereaze="planets">' +
                    '<label>Planets</label>' +
                '</div>' +
                '<div class="check">' +
                    '<input type="checkbox" quereaze="species">' +
                    '<label>Species</label>' +
                '</div>' +
                '<div class="check">' +
                    '<input type="checkbox" quereaze="starships">' +
                    '<label>Starships</label>' +
                '</div>' +
                '<div class="check">' +
                    '<input type="checkbox" quereaze="vehicles">' +
                    '<label>Vehicles</label>' +
                '</div>' +
                '<button quereaze-submit>Submit</button>' +
            '</div>'
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
function searchTemplate () {
    return '<h1>Searching Quereaze</h1>' +
            '<div class="searchControls">' +
                '<input type="text"   quereaze="q" placeholder="What are you looking for?">' +
                '<input type="number" quereaze="minPrice" placeholder="Minimum Price">' +
                '<input type="number" quereaze="maxPrice" placeholder="Maximum Price">' +
                '<input type="number" quereaze="categoryGroupId" placeholder="Category Id">' +
                '<button quereaze-submit>Submit</button>' +
            '</div>'
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