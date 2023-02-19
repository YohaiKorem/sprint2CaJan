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
        gCtx.fillText(txt, x , y, gCanvas.width)
        gCtx.strokeText(txt, x, y, gCanvas.width) 
}

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
    gCtx.strokeRect(x/2, y-size, x+txtWidth, y+size)
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

  function onSave(){
save()
  }

  function onLoadSavedMeme(){
    closeMenu()
    loadSavedMeme()
    const imgId = gMeme.selectedImgId
    renderEditor(imgId)
  }

  function onNewMeme(){
   newMeme()
  }

function  onAddImgToData(imgURL){
  addImgToData(imgURL)
}