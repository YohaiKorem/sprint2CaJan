'use strict'
let gFlex

function onInit(){
  renderFilterByQueryStringParams()
    renderTags()
    renderGallery()
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === "he") document.body.classList.add("rtl");
  else document.body.classList.remove("rtl");
  onInit()
  doTrans();
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search);
    const filterBy = queryStringParams.get("filter");
    if (!filterBy) return;
    setFilter(filterBy);
  }

function renderGallery(){
  gMeme = null
     gFlex = false
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
  const elSearchBar =  document.querySelector('.search-bar')
  const elAboutSection = document.querySelector('.about')
    elAboutSection.style.display = 'grid'
    elGalleryContainer.style.display = 'grid'
    elEditor.style.display = 'none'
    elSearchBar.style.display = 'grid'
  let imgs =  getImgsForDisplay()
  const strHTMLS = imgs.map((img, idx) =>{
  return `<img src="${img.url}"  class="meme-img img${idx + 1}" onclick="onImgClick('${img.id}')">`
    })
    elGalleryContainer.innerHTML = strHTMLS.join('')
    closeMenu()
}

function renderTags(){
    if(gFilterBy) changeTagSize(gFilterBy)
   const tags =  getTagsForDisplay()
   const elSearchList = document.querySelector('.search-tags')
    let strHTMLs =  tags.map(tag =>{
        return `<li class="tag" style="font-size: ${tag.count * 10}px;" onclick="onSetFilter('${tag.txt}')">${tag.txt}</li>`})
        strHTMLs.push(`<span class="more-tags" onclick="onToggleTags()">${gDisplayTags}...</span>`)
let strHTML = strHTMLs.join('')
    elSearchList.innerHTML = strHTML
}

function onClearFilter(){
  gFilterBy = null
  renderGallery()
}

function  onImgClick(imgId){
    renderEditor(imgId)
}

function onSetFilter(filterBy){
    filterBy += ''
       setFilter(filterBy)
       renderGallery()
       renderTags()
       const queryStringParams = `?filter=${gFilterBy}`;
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    queryStringParams;
  window.history.pushState({ path: newUrl }, "", newUrl);
}

function onToggleTags(){
    toggleTags()
renderTags()
}

function openMenu(){
    const elMainNav = document.querySelector('.main-nav')
    const elHiddenLogo = document.querySelector('.hidden-logo')
    const elBackdrop = document.querySelector('.backdrop')
    const elBody = document.querySelector('body')
    elBody.classList.add('backdrop-open')
    elMainNav.classList.add('open')
    elHiddenLogo.classList.add('open')
    elBackdrop.classList.add('open')
}

function closeMenu(){
    const elMainNav = document.querySelector('.main-nav')
    const elHiddenLogo = document.querySelector('.hidden-logo')
    const elBackdrop = document.querySelector('.backdrop')
    const elBody = document.querySelector('body')
    elMainNav.classList.remove('open')
    elHiddenLogo.classList.remove('open')
    elBackdrop.classList.remove('open')
    elBody.classList.remove('backdrop-open')
}


function onFlexible(){
   let img = getRandomImg()
gFlex = true
 renderEditor(img.id)
}