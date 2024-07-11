selectTag = document.querySelectorAll("select");

translateButton = document.querySelector(".translate-btn")
fromText  = document.getElementById("from");
toText  = document.getElementById("to");
copyButton1 = document.querySelector(".copy-btn1");
copyButton2 = document.querySelector(".copy-btn2");
speakButton1 = document.querySelector(".speak-btn1");
speakButton2 = document.querySelector(".speak-btn2");
exchangeButton = document.querySelector(".exchange-btn");



selectTag.forEach((tag,id)=>{
    for (let language in languages){
        let selected ="";
        if(id == 0 && language === "en-GB"){
            selected = "selected";
        }
        if(id==1 && language==="hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${language}" ${selected} >${languages[language]}</option>`
        tag.insertAdjacentHTML("beforeend",option);
    }
});

translateButton.addEventListener("click",()=>{
    fromLanguage = selectTag[0].value;
    toLanguage = selectTag[1].value;
    // console.log(fromLanguage, toLanguage);

    let fromText = document.getElementById("from").value;
    // console.log(fromText);
    let url =`https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
    fetch(url).then(res =>res.json()).then(data => {
        console.log(data.responseData.translatedText)
        toText.value = data.responseData.translatedText;
    });  
});

const copyContent = (content) =>{
    navigator.clipboard.writeText(content).catch((err)=>{
        alert("Copy failed")
    })
};
copyButton1.addEventListener("click", ()=>{
    let fromData = fromText.value;
    copyContent(fromData);
});
copyButton2.addEventListener("click", ()=>{
    let toData = toText.value;
    copyContent(toData);
});


let voices =[];
function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
}
const readAloud = (text,language)=> {
    if (!text) {
        alert('Please enter some text to read aloud.');
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'language'; // You can change the language as needed


    const voice = voices.find(voice => voice.lang === language);
    if (voice) {
        speech.voice = voice;
    } else {
        alert('Selected language is not supported by your browser.');
        return;
    }

    window.speechSynthesis.speak(speech);
}
// get voices not avialable in the browser
window.onload = () => {
    // populateLanguageSelect();
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
};
speakButton1.addEventListener("click", ()=>{
    let text = fromText.value;
    fromLanguage = selectTag[0].value;
    console.log(text, fromLanguage);
    readAloud(text, fromLanguage);
});
speakButton2.addEventListener("click", ()=>{
    let text = toText.value;
    toLanguage = selectTag[1].value;
    console.log(text, toLanguage);
    readAloud(text,toLanguage);
});

const exchange =  (tag, lang)=>{
    
    tag.innerHTML = '';
    for (let language in languages){
        let selected ="";
        if( language === lang){
            selected = "selected";
        }
        let option = `<option value="${language}" ${selected} >${languages[language]}</option>`
        tag.insertAdjacentHTML("beforeend",option);
    };
};

exchangeButton.addEventListener("click",()=>{
    let fromData = fromText.value;
    fromText.value = toText.value;
    toText.value  = fromData;
    let fromLanguage = selectTag[0].value;
    let toLanguage = selectTag[1].value;
    exchange(selectTag[0],toLanguage);
    exchange(selectTag[1],fromLanguage);
});
