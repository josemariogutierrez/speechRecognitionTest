window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const firstPuzzle = document.querySelector('.first-puzzle')
const icon = document.querySelector('.speak-button')
let title = document.querySelector('.title');
let paragraph = document.querySelector('.response-word');
let responseContainer = document.querySelector('.response');
let responseFeedback = document.querySelector('.response-feedback');
let buttons = document.querySelector('.buttons');
let leftButton = document.querySelector('.left-button');
let rightButton = document.querySelector('.right-button');

const sound = document.querySelector('.sound');

icon.addEventListener('click', () => {
  icon.classList.toggle('animated');
  dictate();
});

leftButton.addEventListener('click', () => {
  endPuzzle(rightButton);
});

rightButton.addEventListener('click', () => {
  endPuzzle(leftButton);
});

const endPuzzle = (button) => {
  title.classList.remove('fade-out')
  title.classList.remove('fade-in')
  title.classList.add('fade-out')
  responseContainer.classList.add('fade-out')
  button.classList.add('fade-out')

  setTimeout(()=>{
    title.innerHTML = 'Congrats! find the treasure inside the coffee table';
    title.classList.add('fade-in')
    console.log('Congrats');
  }, 1500)
}

const dictate = () => {
  recognition.start();

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    
    paragraph.textContent = speechToText;
    responseFeedback.classList.remove('correct');
    responseFeedback.classList.add('incorrect');
    responseFeedback.innerHTML = 'Incorrect. Try Again'

    if (event.results[0].isFinal) {
      icon.classList.toggle('animated');
      
      if (speechToText.includes('melo')
      || speechToText.includes('mello')
      || speechToText.includes('mellow')
      || speechToText.includes('Melo')
      || speechToText.includes('Melon')
      || speechToText.includes('Mellon')
      || speechToText.includes('Melon')) {
          paragraph.textContent = 'Mellon';
          responseFeedback.classList.remove('incorrect');
          responseFeedback.classList.add('correct');
          responseFeedback.innerHTML = 'Correct'
          console.log('Well Done Insuasti', paragraph.textContent);
          utterThis = new SpeechSynthesisUtterance('Well Done, Insuasti.');
          synth.speak(utterThis);

          setTimeout(()=>{
            title.classList.add('fade-out')
            icon.classList.add('fade-out')
          }, 1500)

          setTimeout(()=>{
            title.innerHTML = 'Choose left or right, whatever your heart says, make the opposite';
            title.classList.add('fade-in')
            buttons.classList.add('fade-in')
            console.log('Mellon');
          }, 3000)
      };
    }
  }
}