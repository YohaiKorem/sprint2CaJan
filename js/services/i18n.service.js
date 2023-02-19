'use strict'
let gCurrLang = 'en'


let gTrans = {
    'memes-tab':{
        en: 'Memes',
        he:'מימים'
    },
    'gallery-tab':{
        en:'Gallery',
        he: 'גלריה'
    },
    'about-tab':{
        en:'about',
        he:'אודות'
    },
    'flexible':{
        en:'I`m flexible',
        he:'וואלק גמיש'
    },
    'search-placeholder':{
        en:'Enter search keyword',
        he:'הקש מילת חיפוש'
    },
    'share':{
        en:'Share',
        he:'שתף'
    },
    'save':{
        en:'save',
        he:'שמור'
    },
    'custom-picture':{
        en:'Use custom picture',
        he:'השתמש\י משלך בתמונה'
    },
    'my-name':{
        en:'Yohai Korem',
        he:'יוחאי כורם'
    },
    'lorem':{
en:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, harum ducimus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero dolorem deleniti nemo aperiam neque a magni laudantium nihil tempore ea id excepturi inventore ipsum,aspernatur nam maxime sint quibusdam eligendi.'
,he:'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט'    
},
    'all-rights-reserved':{
        en:'all rights reserved 2019',
        he:'כל הזכויות שמורות 2019'
    }
}






function  setLang(lang){
    gCurrLang = lang
}


function getTrans(transKey){
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let translation = transMap[gCurrLang]
    if (!translation) translation = transMap.en
    return translation

}
// getDataTrans()
function doTrans(){
  let els =   document.querySelectorAll('[data-trans]')
  els.forEach(el =>{
    const transKey = el.dataset.trans
    const translation = getTrans(transKey) 
    if (el.placeholder) el.placeholder = translation
    else el.innerText = translation

  })
}