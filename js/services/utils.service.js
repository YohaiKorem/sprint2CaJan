'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getEmojiUnicodeArray(){
    let emojis = []
    for(let i =128512; i <128580; i++){
let emoji = `&#${i}`
emojis.push(emoji)
    }
return emojis
}


function makeRandomMemeLines(){
    const lines = ['i hate it when', 'people ask me', 'what\'s cooking good looking', 'are you just happy to see me?', 
    'is that a canvas in your pocket', 'code, code everywhere', 'skidadle skidoodle',
     'eat some bagels', 'tal mooseri the traitor',
      'never in my life', 'would you rather', 
      'have a lovely day', 'howdy partner', 'enough is enough', 'so thirsty']
     
    return lines[getRandomIntInclusive(0,lines.length-1)]
}


function makeTags(wordCount = 1) {
    const words = ['funny', 'politics', 'baby', 'sad', 
    'happy', 'dog', 'animal',
     'awkward', 'anime', 'street', 'money', 'coding', 'cooking']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] 
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function getRandomColor(){
    return Math.floor(Math.random()*16777215).toString(16)
}

function getRandomFont(){
  const elFontPicker =  document.querySelector('.choose-font')
return elFontPicker.options[getRandomIntInclusive(0,elFontPicker.options.length-1)].value
}