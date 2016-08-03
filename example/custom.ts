export const wasSuccesful = (res) => {
    return (
        res &&
        res.result &&
        res.result.rs
    )?true:false;
}
export const wasError = (res) => {
    return (
        res &&
        res.result &&
        res.result.errCode
    )?true:false;
}

export const loading = () => {
     setContent("<ul>Loading...</ul>");
}

export const render = (res) => {
    if (wasSuccesful(res)) {
        setContent(listingsContent(res.result.rs));
    } else if (wasError(res)) {
        setContent(`<ul>${res.result.errCode}</ul>`);
    } else if (res.message === "Unexpected end of JSON input") {
        setContent(`<ul>Aborted Request</ul>`);
    } else if (res.message) {
        setContent(`<ul>${res.message}</ul>`);
    } else {
        setContent("<ul>UNKNOWN ERROR</ul>");
    }
}

const listingsContent = (listings) => {
    return listings.map(cleanListing)
    .reduce((p, l) => p+`<li>${l.title} - $${l.price}</li>`, "");
}

const cleanListing = (listing) => ({
    title: listing.title.trim(),
    price: listing.price.replace(/\$/g, '')
})

export const setContent = (content: string) => {
    document.getElementById('main').innerHTML = content;
}