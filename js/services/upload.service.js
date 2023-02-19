'use strict'


function onImgInput(ev) {
    loadImageFromInput(ev, drawCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image() 
        img.src = event.target.result 
        gCurrImg = createImg(gImgs.length, img.src)
        img.onload = () => onImageReady(gCurrImg)
        
    }
    reader.readAsDataURL(ev.target.files[0])
}
