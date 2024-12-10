console.log("HOP");

const h1 = document.querySelector("h1")
console.log(h1);

h1.style.color = "Yellow"
h1.innerHTML = "Objectif = rendu immonde"

//Erreur modification tableau = //spans.style.color = "magenta"

const spans = document.querySelectorAll("span.orange")
for (let span of spans) {
    span.style.color = "magenta"
    span.style.weight = "bold"
}

console.log(spans);


const main = document.querySelector("main")
const header = document.querySelector("header")
const body = document.querySelector("body")

// Changer la couleur de fond toutes les 2 secondes
setInterval(function(){

    let r =Math.floor(Math.random() * 255)
    let g =Math.floor(Math.random() * 255)
    let b =Math.floor(Math.random() * 255)

    let color = "rgb("+r+", "+g+", "+b+")"
    let color2 = "rgb("+r+", "+g+", "+b+")"

    main.style.backgroundColor = color
    header.style.backgroundColor = color

}, 100);

setInterval(function(){

    let r =Math.floor(Math.random() * 255)
    let g =Math.floor(Math.random() * 255)
    let b =Math.floor(Math.random() * 255)

    let color = "rgb("+r+", "+g+", "+b+")"

    h1.style.backgroundColor = color

}, 50);


setInterval(function(){

    let r =Math.floor(Math.random() * 255)
    let g =Math.floor(Math.random() * 255)
    let b =Math.floor(Math.random() * 255)

    let color = "rgb("+r+", "+g+", "+b+")"

    body.style.backgroundColor = color

}, 1);

const trs = document.querySelectorAll("#examples tr")
for(let tr of trs){

    let color = tr.querySelector(".hexa").innerText
    tr.querySelector(".visu").style.backgroundColor = color

}

//Supprimer la case 8
trs[8].remove()


//Image qui change
const images = ["abstract.jpg", "beer.jpg","chair.jpg","fruit.jpg","pen.jpg","redhead.jpg","stairs.jpg","van.jpg",]

const image = document.querySelector("#img img")

let i = 0
setInterval(function() {
    image.src = "./images/" + images[i]
    i++
    if(i >= images.length)
    i = 0
}, 10)


//Ajouter le "s" a images car il y en a plusieurs
document.querySelector("#img h2").innerText += "s"

const menu = document.querySelector("header nav")
menu.addEventListener("click", function() {
    menu.classList.toggle("visible")
})
