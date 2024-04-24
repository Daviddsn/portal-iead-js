async function pageHome(req, res) {
    return res.render("index.html")   

}

// url: contribuir
async function pageDonate(req, res) {
    return res.render("donate.html")  

}

// url: nossa-historia
async function pageAbout(req, res) {
    return res.render("about.html")  

}

// url: ver-evento
async function pageEventDetails(req, res) {
    return res.render("events-details.html")  
}
// url: eventos
async function pageEvent(req, res) {
    return res.render("events.html")  
}


export {
    pageHome,
    pageDonate,
    pageAbout,
    pageEventDetails,
    pageEvent
}