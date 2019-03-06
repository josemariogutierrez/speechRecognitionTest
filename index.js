window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('i.fa.fa-microphone')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');

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
          
          utterThis = new SpeechSynthesisUtterance('Respuesta correcta');
          synth.speak(utterThis);
          window.location.href = "mello.html";
      };
    }
  }
}