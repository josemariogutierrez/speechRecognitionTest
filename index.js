window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('i.fa.fa-microphone')
const text = document.querySelector('.text')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');

text.innerHTML = 'Cache cleared 2';

container.appendChild(paragraph);
const sound = document.querySelector('.sound');

icon.addEventListener('click', () => {
  const playPromise = sound.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
      console.log('enter')
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }
  dictate();
});

const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    
    paragraph.textContent = speechToText;

    if (event.results[0].isFinal) {

      if (speechToText.includes('mellow') || speechToText.includes('mello') || speechToText.includes('melo')) {
          console.log('Respuesta correcta');
          text.innerHTML = 'Respuesta correcta';
          utterThis = new SpeechSynthesisUtterance('Respuesta correcta');
          synth.speak(utterThis);
          setTimeout(()=>{
            window.location.href = "mello.html";
          }, 3000)
      };
    }
  }
}