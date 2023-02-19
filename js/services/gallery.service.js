'use strict'

const IMGS_STORAGE_KEY = 'imgsDB'
let gFilterBy
let gImgs = []
let gTags
let TAGS_PAGE_SIZE = getTagsPageSize()
let gTagsPageIdx = 0
let gDisplayTags = 'more'



// let gTags = getAllTags()
_createImgs()


function getTagsPageSize(){
    let screenSize 
    (window.innerWidth >= 940) ? screenSize = 5 : screenSize = 3;
    return screenSize
}


function getImgsForDisplay(){
let allTags = getTagsMap()


let filteredTags = allTags.filter(tag =>{
   return tag.txt.includes(gFilterBy)
})
let imgs = filteredTags.map(tag =>{
    return gImgs.filter((img, idx) =>{
        return img.keyWords === tag.txt
        
    })
})

if(!imgs.length) return gImgs
let result =  (arr) =>
{
    return arr
}
imgs = result(...imgs)

return imgs
}


function getTagsForDisplay(){
    let tags =gTags
    if(!tags) tags = getTagsMap()
let startIdx = gTagsPageIdx * TAGS_PAGE_SIZE
return tags.slice(startIdx, startIdx + TAGS_PAGE_SIZE) 
}

function getAllTagsFromGImgs(){
    return  gImgs.map( img=>{
        return img.keyWords
               })
                
}

function getTagsMap(){
       let tags = getAllTagsFromGImgs()

   const tagsMap = tags.reduce((tagObj, tag) =>{
if(!tagObj[tag]) tagObj[tag] = 0
tagObj[tag]++
        return tagObj
    }, {})
  let tagsMaps =  Object.entries(tagsMap)
  let tagsMapObjs = []
  tagsMaps.forEach(tag =>{
    tagsMapObjs.push({txt:tag[0], count:tag[1]}) 
    
  });
  
  gTags = tagsMapObjs
return gTags
}


function _createImgs(){
    let imgs = loadFromStorage(IMGS_STORAGE_KEY)
    if(!imgs || !imgs.length){
        imgs=[]
        for(let i = 0; i < 18; i++){
          const img =  createImg(i)
imgs.push(img)
        }
    }
    gImgs = imgs
}

function createImg(idx, url = `img/${idx+1}.jpg` ){

return {
id:makeId(),
url,
keyWords:makeTags()
}
}


function  setFilter(filterBy){
    gFilterBy = filterBy
}


function changeTagSize(str){
   let tags = getTagsForDisplay()

   gTags = tags.map(tag =>{
        if(tag.txt === str)  tag.count++
        // console.log('tag, tag.count', tag, tag.count);
        // console.log('tag, tag.count', tag, tag.count);
        return tag
    })

}

function toggleTags(){
    let tagsLength = getTagsMap().length
    TAGS_PAGE_SIZE += 3
    gDisplayTags = 'less' 
    if(TAGS_PAGE_SIZE > tagsLength && gDisplayTags === 'less'){
        TAGS_PAGE_SIZE = getTagsPageSize()
        return
    } 
    gDisplayTags = 'more'
}

function getGDisplay(){
    return gDisplayTags
}

function getImgByID(id){
  return  gImgs.find(img=>{
      return  img.id === id
    })
}



function _saveImgsToStorage( val){
    saveToStorage(IMGS_STORAGE_KEY , val)
}

function addImgToData(imgURL){
 let newImg =   _createImg(gImgs.length, imgURL)
//  JSON.stringify(imgURL)
gImgs.push(newImg)
}


function getRandomImg(){
    return gImgs[getRandomIntInclusive(0,gImgs.length-1)]
}



