'use strict'
let gCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onNextEmojiPage(ev){
  ev.stopPropagation()
  changeEmojiPageIdx(1)
  renderEmojiPicker()
}

function onPrevEmojiPage(ev){
  ev.stopPropagation()

  changeEmojiPageIdx(-1)
  renderEmojiPicker()
}

function renderEmojiPicker(){
  let emojis = getEmojisForDisplay()
 let strHTMLs = emojis.map(emoji =>{
    return `<li class="emoji" onclick="onSetTxt('${emoji}')">${emoji}</li>`
  });
  strHTMLs.unshift('<span class="left-arrow" onclick="onPrevEmojiPage(event)">&#8592</span>');
  strHTMLs.push('<span class="right-arrow" onclick="onNextEmojiPage(event)">&#8594</span>')
const elEmojiContainer = document.querySelector('.emoji-container')
elEmojiContainer.innerHTML = strHTMLs.join('')
}

function onSetCurrImg(imgId){
    setCurrImg(imgId)
}

function renderEditor(imgId){
    const elEditor = document.querySelector('.editor-container')
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elSearchBar =  document.querySelector('.search-bar')
    const elAboutSection = document.querySelector('.about')
    elAboutSection.style.display = 'none'
    elSearchBar.style.display = 'none'
    elEditor.style.display = 'grid'
    elGalleryContainer.style.display = 'none'
    renderEmojiPicker()
    init(imgId)
}

function init(imgId){
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    const elCanvasContainer = document.querySelector('.canvas-container')
    if(window.innerWidth >= 940) gCanvas.width = elCanvasContainer.clientWidth
   else gCanvas.width = elCanvasContainer.offsetWidth 
    gCanvas.height = gCanvas.width 
    onSetCurrImg(imgId)
    drawCanvas()
    console.log('gCanvas.width', gCanvas.width);
    console.log('elCanvasContainer.offsetWidth', elCanvasContainer.offsetWidth);
    console.log('elCanvasContainer.clientWidth', elCanvasContainer.clientWidth);
    addListeners()
}

function drawCanvas(userImg) {
if(!userImg) userImg = gCurrImg
let url = ''
url += userImg.url
  const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        gMeme.lines.forEach((line, idx) => drawText(line, idx))
    }
}

function drawText(line, idx) {
    let {txt, size, align,strokeColor, fillColor,font, x, y} = line
        if(gMeme.selectedLineIdx === idx){
            let txtWidth = measureTxt(txt)
            drawRect(x, y, txtWidth, size)
        }
        gCtx.lineWidth = 2
        gCtx.strokeStyle = strokeColor
        gCtx.fillStyle = fillColor
        gCtx.font = `${size}px ${font}`
        gCtx.textAlign = align
        gCtx.textBaseline = 'middle'
        // y= translatedY(y)
        gCtx.fillText(txt, x , y, gCanvas.width) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(txt, x, y, gCanvas.width) // Draws (strokes) a given text at the given (x, y) position.
}

// / gCanvas.width + 10

function onAddLine(){
    addLine()
    drawCanvas() 
}


  function onSetTxt(txt){
      setTxt(txt)
drawCanvas()   
 }

function onSelectLine(){
    selectLine()
    drawCanvas()   
}

function onFontGrow(){
    fontGrow()
    drawCanvas()
}

function onFontShrink(){
    fontShrink()
    drawCanvas()
}

function onSetTxtAlign(align){
setTxtAlign(align)
drawCanvas()
}

function onSetFont(font){
setFont(font)
drawCanvas()
}

function onChangeStrokeColor(strokeColor){
    changeStrokeColor(strokeColor)
    drawCanvas()
}
function onChangeFillColor(fillColor){
    changeFillColor(fillColor)
    drawCanvas()
}

function measureTxt(txt){
    return gCtx.measureText(txt).width
}

function drawRect(x, y, txtWidth, size) {
  gCtx.beginPath()

    gCtx.strokeStyle = 'red'
    if(!txtWidth) txtWidth = 100
    gCtx.strokeRect(x/2, y-size, txtWidth+x, size*2)
  }

  function onRemoveLine(){
    removeLine()
    drawCanvas()
  }

  function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
      init()
    })}

    function addMouseListeners() {
        gCanvas.addEventListener('mousedown', onDown)
        gCanvas.addEventListener('mousemove', onMove)
        gCanvas.addEventListener('mouseup', onUp)
      }
      
      function addTouchListeners() {
        gCanvas.addEventListener('touchstart', onDown)
        gCanvas.addEventListener('touchmove', onMove)
        gCanvas.addEventListener('touchend', onUp)
      }

       function getEvPos(ev) {
        // Gets the offset pos , the default pos
        let pos = {
          x: ev.offsetX,
          y: ev.offsetY,
        }
        // Check if its a touch ev
        if (TOUCH_EVS.includes(ev.type)) {
          //soo we will not trigger the mouse ev
          ev.preventDefault()
          //Gets the first touch point
          ev = ev.changedTouches[0]
          //Calc the right pos according to the touch screen
          pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
          }
        }
        return pos
      }

      function onDown(ev){
        const pos = getEvPos(ev)
const{x,y} = pos
 isOnTxt(x,y)
drawCanvas()
    }
      function onMove(ev){
        if(!gMeme.lines[gMeme.selectedLineIdx].isDrag) return
        const pos = getEvPos(ev)
        const{x,y} = pos
         moveTxt(x,y)
         drawCanvas()
      }
      function onUp(ev){
        const pos = getEvPos(ev)
        const{x,y} = pos
        moveTxt(x,y, 'stop')

      }

  function    onShare(){
      const imgDataUrl = gCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
  
      // A function to be called if request succeeds
      function onSuccess(uploadedImgUrl) {
          // Encode the instance of certain characters in the url
          const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
      }
      // Send the image to the server
      doShareImg(imgDataUrl, onSuccess)
  }
  
  function doShareImg(imgDataUrl, onSuccess) {
      // Pack the image for delivery
      const formData = new FormData()
      formData.append('img', imgDataUrl)
  
      // Send a post req with the image to the server
      const XHR = new XMLHttpRequest()
      XHR.onreadystatechange = () => {
          // If the request is not done, we have no business here yet, so return
          if (XHR.readyState !== XMLHttpRequest.DONE) return
          // if the response is not ok, show an error
          if (XHR.status !== 200) return console.error('Error uploading image')
          const { responseText: url } = XHR
          // Same as
          // const url = XHR.responseText
  
          // If the response is ok, call the onSuccess callback function, 
          // that will create the link to facebook using the url we got
          console.log('Got back live url:', url)
          onSuccess(url)
      }
      XHR.onerror = (req, ev) => {
          console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
      }
      XHR.open('POST', '//ca-upload.com/here/upload.php')
      XHR.send(formData)
  }

  function onSave(){
save()
  }

  // function onSetCustomImg(){
  //   setCustomImg()
  //   console.log('download');
  // }

  function onLoadSavedMeme(){
    closeMenu()
    loadSavedMeme()
    const imgId = gMeme.selectedImgId
    renderEditor(imgId)

  }

  function onNewMeme(){
   newMeme()
  }


  function onImgInput(ev) {
    loadImageFromInput(ev, drawCanvas)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        gCurrImg = createImg(gImgs.length, img.src)
        img.onload = () => onImageReady(gCurrImg)
        // onAddImgToData(img)
        // setCurrImg(gImgs[gImgs.length-1].id)
        // setMeme(gImgs[gImgs.length-1].id)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function renderImg(img) {
    // Draw the img on the canvas
    // 
    // console.log(gCurrImg);
    // // 
    // console.log(gCurrImg);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function  onAddImgToData(imgURL){
  addImgToData(imgURL)
}