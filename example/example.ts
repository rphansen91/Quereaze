import { RenderQuereaze } from '../src/Main.ts';

import { DefaultSearchParams, SearchParams, API_URL } from './searching.ts';
import { DefaultSWarsParams, SWarsParams, STAR_WARS_URL } from './starwars.ts';

import { wasSuccesful, render, setContent } from './custom.ts';

const StarXHRCallback = (params) => {
    let current = Object.keys(params).reduce((p, c) => {
        if (p) return p;
        if (params[c]) return c;
        return p; 
    }, "") || "people";
    setContent(`<ul>Loading ${current}...</ul>`)
    return {
        method: "GET",
        body: null,
        url: STAR_WARS_URL + current + "/?format=json"
    }
}

const AntXHRCallback = (params) => {
    setContent(`<ul>Loading Listings...</ul>`);  // Render UI Loading state
    
    // Return necessary Post Params
    return {
        method: "POST",
        url: API_URL,
        body: {
            id: "0",
            method: "search",
            params
        } 
    }
}

// CREATE THE QUERY UI
const starWarsQuerier = RenderQuereaze(
    document.getElementById('sWarsControls'), // ELEMENT TO RENDER QUERY UI
    require('./starwars.html'), // TEMPLATE OF THE QUERY UI
    DefaultSWarsParams, // THE DEFAULT PARAMS FOR REQUEST
    StarXHRCallback // CALLBACK RECIEVES CURRENT PARAMS AND RETURNS THE REQUEST BODY
)
const antengoQuerier = RenderQuereaze(
    document.getElementById('antengoControls'),
    require('./example.html'),
    DefaultSearchParams,
    AntXHRCallback
)

// REQUESTS AND RESONSES WONT FIRE 
// UNTIL WE CALL THE RESULT of 'RenderQuerier'
// WITH OUR CALLBACK
starWarsQuerier(res => {
    if (res.data.results) {
        // SECOND BIG WIN
        res.quereaze.save();
        console.log(res.quereaze.history); // OUR QUERIER SAVES PARAMS OF SPECIFIED REQUESTS 
        
        let results = res.data.results
        .map((t) => `<li>${(t.name)?t.name:t.title}</li>`)
        .reduce((p,c)=>p+c,"")

        document.getElementById("main") // THE JSON RESPONSE IS ACCESSIBLE THROUGH THE DATA KEY
        .innerHTML = "<ul>" + results + "</ul>"
    }
})

antengoQuerier(res => {
    if (wasSuccesful(res.data)) {
        res.quereaze.save();
        console.log(res.quereaze.history);
    }
    render(res.data);
})