const btn = document.querySelector(".speak");
const txt = document.querySelector("#city");
const submitBtn=document.querySelector(".submitBtn");
//var t=document.querySelector(".t");
//var f=document.querySelector(".f");
//var w=document.querySelector(".w");
//var h=document.querySelector(".h");


try{


  const SpeechRecog=window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition=new SpeechRecog();
  recognition.onstart=function(){
    console.log("Voice activated");
  };

  recognition.onresult=function(event){
    var index=event.resultIndex;
    var input=event.results[index][0].transcript;

    var data=input.slice(23);
    txt.value=data;

    readOutLoud(data);
    submitBtn.click();
    //let narration="The temperature in "+data+" is "+t.innerHTML+" degree celcius real feel is "+r.innerHTML+" degree celcius the weather is "+w.innerHTML+" and humidity is "+h.innerHTML;
    //readOutLoud(data);
  };

  btn.addEventListener("click",()=>{
    btn.classList.add("clicked");
    recognition.start();
  });

  function readOutLoud(message){
    console.log("getting executed");
    var speech= new SpeechSynthesisUtterance();//creating a speech synthesis to let javascript talk back to us;
    speech.text=message;
    speech.volume=1;
    speech.rate=1;
    speech.pitch=1;

    window.speechSynthesis.speak(speech);
  }
}catch(e){
  txt.innerHTML="Switch to a different browser like chrome";
}
