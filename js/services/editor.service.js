'use strict'
let gCurrImg
let gMeme
const MEMES_STORAGE_KEY = 'memesDB'
let gEmojis = getEmojiUnicodeArray()
const EMOJI_PAGE_SIZE = 8
let gEMojisPageIdx = 0
let gNextLineY 

// fetch('https://emoji-api.com/emojis?access_key=38fb8f8378ed75a2a00afee212f440bd1d4d4a3e')
// .then(res => res.json())
// .then(data => loadEmoji(data))

function getNextLineY(){
   (!gCanvas) ? gNextLineY = 300 : gNextLineY = gCanvas.height/2
}


function changeEmojiPageIdx(changeIdxBy){
gEMojisPageIdx += changeIdxBy
console.log(gEMojisPageIdx);
if(gEMojisPageIdx < 0) gEMojisPageIdx = gEmojis.length/EMOJI_PAGE_SIZE-1
else if(gEMojisPageIdx > 8) gEMojisPageIdx = 0
}

function getEmojisForDisplay(){
   let emojis = gEmojis
   let startIdx = gEMojisPageIdx * EMOJI_PAGE_SIZE
   return emojis.slice(startIdx, startIdx + EMOJI_PAGE_SIZE) 
 }
 
// function loadEmoji(data){
//    gEmojis = data.map(emoji =>{
//   return emoji.character
//  })
//  }




function setCurrImg(imgId){
   const img = getImgById(imgId)
   gCurrImg = img
   if(gMeme)  return
   setMeme(imgId)
}

function setMeme(imgId){
   if(gMeme)  return
   (gFlex) ? gMeme = getRandomMeme(imgId) : gMeme = _createMeme(imgId)
}
function newMeme(){
   gMeme = null
   gCurrImg = null
}

function getRandomMeme(id){
let numOfLines = getRandomIntInclusive(1,2)
   return {
      selectedImgId:id,
      selectedLineIdx: 0,
      lines: (numOfLines === 1) ? [getRandomLine(150)] : [getRandomLine(150), getRandomLine(300)]
   }
}

function getRandomLine(y){
   return {
      txt:makeRandomMemeLines(),
      size: getRandomIntInclusive(20,50),
      align: 'left',
      strokeColor: getRandomColor(),
      fillColor: getRandomColor(),
      font:getRandomFont(),
      x: 200,
      y,
      isDrag: false
   }
}

function _createMeme(id){
  return {
      selectedImgId:id,
      selectedLineIdx: 0,
      lines:[
         {
            txt:'coding academy be like',
            size: 40,
            align: 'center',
            strokeColor: 'black',
            fillColor: 'white',
            font:'impact',
            x: gCanvas.width/2 ,
            y: 50,
            isDrag: false
         },
        { txt:'code a meme generator dude',
         size: 40,
         align: 'center',
         strokeColor: 'black',
         fillColor: 'white',
         font:'impact',
         x: gCanvas.width/2,
         y: gCanvas.height-100,
         isDrag: false}
      ]
   }
}

function _createLine(){
   return {
       txt:'',
       size: 20,
       align: 'center',
       strokeColor: 'black',
       fillColor: 'white',
       font:'impact',
       x: gCanvas.width/2,
       y: gNextLineY,
       isDrag: false
    }
 }


function  setTxt(txt){
   const selectedLineIdx = gMeme.selectedLineIdx 
   gMeme.lines[selectedLineIdx].txt = txt
   
}

function getImgById(imgId){
   return gImgs.find(img => img.id === imgId)
}

function selectLine(line, idx){
   if(!line){

      gMeme.selectedLineIdx++
      if( gMeme.selectedLineIdx >= gMeme.lines.length ) gMeme.selectedLineIdx = 0
      return
   }
   gMeme.selectedLineIdx = idx
}

function addLine(){
   getNextLineY()
   const newLine =_createLine()
   gNextLineY += 50
   gMeme.lines.push(newLine)
   gMeme.selectedLineIdx = gMeme.lines.indexOf(newLine)
}

function fontGrow(){
   gMeme.lines[gMeme.selectedLineIdx].size++
}

function fontShrink(){
   gMeme.lines[gMeme.selectedLineIdx].size--
}

function setTxtAlign(align){
   gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setFont(font){
   gMeme.lines[gMeme.selectedLineIdx].font = font
}

function changeStrokeColor(strokeColor){
   gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor
}

function  changeFillColor(fillColor){
   gMeme.lines[gMeme.selectedLineIdx].fillColor = fillColor
}

function removeLine(){
   const lineIdx =  gMeme.selectedLineIdx
   gMeme.lines.splice(lineIdx, 1)
   if(!gMeme.lines.length) addLine()
}

function isOnTxt(x,y){
   gMeme.lines.forEach((line, idx) =>{
      let txtWidth =  measureTxt(line.txt)
    if  (line.x + txtWidth > x - txtWidth && x  > line.x && y > line.y - line.size - 10 && line.y +10 > y)  {
         selectLine(line,idx)
       line.isDrag = true
      }
})
}

function moveTxt(x,y, action){
   gMeme.lines.forEach(line =>{
      if(!line.isDrag)return
      line.x = x;
      line.y = y;
      (action === 'stop') ? line.isDrag = false : line.isDrag = true
   })
}

function save(){
   _saveMemeToStorage(gMeme)
}

function _saveMemeToStorage(val){
   saveToStorage(MEMES_STORAGE_KEY , val)
}

function loadSavedMeme(){
   gMeme = loadFromStorage(MEMES_STORAGE_KEY)
}


