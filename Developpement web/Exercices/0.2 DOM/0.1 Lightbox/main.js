function create(tag, container, text=null){
    let element = document.createElement(tag)
    if(text)
        element.innerText = text
    container.appendChild(element)
    return element
}

const body = document.querySelector("body")

document.querySelectorAll(".lightbox").forEach(function(image) {
    
    image.addEventListener("click", function() {
    let anes = create("div", body)
    anes.id = "anes"

    let box = create("div", anes)
    box.id = "box"

    let newImage = create("img", box)
    newImage.src = image.src

    let closeButton = create("div", box, "❌")
    closeButton.id = "close"
    box.addEventListener("click", function(event){
        event.stopPropagation()
    })

    function remove() {
        box.classList.add("out")
        setTimeout(function() {
            anes.remove()
        }, 800)
    }

    closeButton.addEventListener("click", function(){
        anes.remove()
    })
    anes.addEventListener("click", function(event){
        anes.remove()
    })
    body.addEventListener("keyup", function(event){
        if(event.key == "Escape")
            remove()
    })

    /*box.addEventListener("click", function(){
        event.remove()
    })*/


    })

})