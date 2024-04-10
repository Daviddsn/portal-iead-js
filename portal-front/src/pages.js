async function pageHome(req, res) {
    return res.render("index.html")   

}



async function pageDonate(req, res) {
    return res.render("donate.html")   

}


export {
    pageHome,
    pageDonate
}