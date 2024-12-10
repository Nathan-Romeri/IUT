const musics = [
    {
    band: "Deep Purple",
    title: "Smoke on the water",
    year: 1972
    },
    {
    band: "Metalica",
    title: "My firend of misery",
    year: 1991
    },
    {
    band: "Nirvana",
    title: "Something in the way",
    year: 1972
    }
]

const body = document.querySelector("body")

//tag : nom du tag (string)
//container : élement DOM
//text : contenu (sting)
function create(tag, container, text=null){
    let element = document.createElement(tag)
    if(text)
        element.innerText = text
    container.appendChild(element)
    return element
}

create("h1",body, "Musique")

for(let music of musics) {
    let article = create("article", body)
    create("h2", article, music.band)
    create("p", article, music.title)
    create("p", article, music.year)
    

}

//const h1 = document.createElement("h1")
//body.appendChild(h1)
//h1.innerText = "Musique"


/*for(let music of musics) {
    let article = document.createElement("article")
    body.appendChild(article)

    let h2 = document.createElement("h2")
    article.appendChild(h2)
    h2.innerText = music.band
    
}*/

