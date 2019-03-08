window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('.speak-button')
let paragraph = document.createElement('p');
let responseContainer = document.querySelector('.response');

responseContainer.appendChild(paragraph);
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
    paragraph.classList.add('incorrect');

    if (event.results[0].isFinal) {

      if (speechToText.includes('melo')
      || speechToText.includes('mello')
      || speechToText.includes('mellow')
      || speechToText.includes('Melo')
      || speechToText.includes('Melon')
      || speechToText.includes('Mellon')
      || speechToText.includes('Melon')) {
          console.log('Well Done Insuasti', paragraph.textContent);
          paragraph.textContent = 'Mellon';
          paragraph.classList.add('correct');
          utterThis = new SpeechSynthesisUtterance('Well Done, Insuasti.');
          synth.speak(utterThis);
          setTimeout(()=>{
            // window.location.href = "mello.html";
            console.log('Mellon');
          }, 3000)
      };
    }
  }
}