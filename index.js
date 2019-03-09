// DOM Selectors
const title = document.querySelector('.title');
const icon = document.querySelector('.speak-button')
const paragraph = document.querySelector('.response-word');
const responseContainer = document.querySelector('.response');
const responseFeedback = document.querySelector('.response-feedback');
const buttonHelper = document.querySelector('.button-helper');
const buttons = document.querySelector('.buttons');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

// Get the Browser type and version
function getChromeVersion() {
  const browserVersion = parseInt(bowser.version)

  if(bowser.chrome && browserVersion > 71){
    console.log(`Is Chrome! version: ${bowser.version}`);
  } else {
    console.log('Oh no! Is not chrome!');
    icon.classList.add('hide')
    title.innerHTML = 'This adventure is for those who use the latest version of chrome';
    responseFeedback.innerHTML = `You are using ${bowser.name} version: ${bowser.version} on: ${bowser.osname}`
  }
}

getChromeVersion();

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

icon.addEventListener('click', () => {
  icon.classList.toggle('animated');
  dictate(synth, recognition);
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

  setTimeout(() => {
    title.innerHTML = 'Congrats! find the treasure inside the coffee table';
    title.classList.add('fade-in')
    button.classList.add('hide')
    console.log('Congrats');
  }, 1500)
}

const dictate = (synth, recognition) => {
  recognition.start();

  buttonHelper.textContent = 'Speak';

  recognition.onend = () => {
    console.log('Ended');
    buttonHelper.textContent = 'Press Button';
    icon.classList.toggle('animated');
  }
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;

    paragraph.textContent = speechToText;
    responseFeedback.classList.remove('correct');
    responseFeedback.classList.add('incorrect');
    responseFeedback.innerHTML = 'Incorrect. Try Again'

    if (event.results[0].isFinal) {

      if (speechToText.includes('melo') ||
        speechToText.includes('mello') ||
        speechToText.includes('mellow') ||
        speechToText.includes('Melo') ||
        speechToText.includes('Melon') ||
        speechToText.includes('Mellon') ||
        speechToText.includes('Melon')) {
        paragraph.textContent = 'Mellon';
        responseFeedback.classList.remove('incorrect');
        responseFeedback.classList.add('correct');
        responseFeedback.innerHTML = 'Correct'
        console.log('Well Done Insuasti', paragraph.textContent);
        utterThis = new SpeechSynthesisUtterance('Well Done, Insuasti.');
        synth.speak(utterThis);

        setTimeout(() => {
          title.classList.add('fade-out')
          icon.classList.add('fade-out')
        }, 1500)

        setTimeout(() => {
          title.innerHTML = 'Choose left or right, whatever your heart says, make the opposite';
          title.classList.add('fade-in')
          buttons.classList.add('fade-in')
          icon.classList.add('hide')
          console.log('Mellon');
        }, 3000)
      };
    }
  }
}