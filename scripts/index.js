const cardHeader = document.querySelectorAll("card-header");
const cardContent = document.querySelectorAll("card-content");
const expand = document.getElementsByClassName("expand");
const collapse = document.getElementsByClassName("collapse");
const readTime = document.querySelectorAll("read-time");
const textToSpeech = document.querySelectorAll(".text-to-speech");

var utterance = new SpeechSynthesisUtterance();

cardHeader.forEach((header, index) => {
  header.addEventListener("click", () => {
    if (cardContent[index].style.display == "block") {
      header.style.borderRadius = "30px 30px 30px 30px";
      cardContent[index].style.display = "none";
      expand[index].style.display = "block";
      collapse[index].style.display = "none";
      readTime[index].innerText = "";
    } else {
      cardContent[index].style.display = "block";
      header.style.borderRadius = "30px 30px 0px 0px";
      expand[index].style.display = "none";
      collapse[index].style.display = "block";
      readTime[index].innerText = getReadTime(cardContent[index].innerText);
    }
    if (cardContent[index].style.maxHeight) {
      cardContent[index].style.maxHeight = null;
    } else {
      cardContent[index].style.maxHeight =
        cardContent[index].scrollHeight + "px";
    }
  });
});

const menuLogo = document.querySelector(".menu-logo");
const navPanel = document.querySelector("nav");
menuLogo.addEventListener("click", () => {
  navPanel.style.display = navPanel.style.display == "none" ? "flex" : "none";
})

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((navLink, index) => {
  navLink.addEventListener("click", () => {
    cardContent[index].style.display = "block";
    cardHeader[index].style.borderRadius = "30px 30px 0px 0px";
    expand[index].style.display = "none";
    collapse[index].style.display = "block";
    cardContent[index].style.maxHeight = cardContent[index].scrollHeight + "px";
    navPanel.style.display = "none";
    readTime[index].innerText = getReadTime(cardContent[index].innerText);
  });
});

document.addEventListener("click", (event) => {
  if (!navPanel.contains(event.target) && !menuLogo.contains(event.target)) {
    navPanel.style.display = "none";
  }
})

const getReadTime = (text) => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  const readTime = numberOfWords / wordsPerMinute;
  const minutes = Math.floor(readTime);
  const secondsDecimal = readTime - minutes;
  const seconds = Math.round(secondsDecimal * 60);
  return `Number of Words: ${numberOfWords} words \n Reading Time: ${minutes} min ${seconds} sec`;
}

const textToSpeechButtons = document.querySelectorAll(".tts-button");
const speechControls = document.querySelectorAll(".speech-control");
const volumeSliders = document.querySelectorAll(".volume-slider");
const speedSliders = document.querySelectorAll(".speed-slider");
const pauseButtons = document.querySelectorAll(".pause-button");
const stopButtons = document.querySelectorAll(".stop-button");
const playButtons = document.querySelectorAll(".play-button");
const resumeButtons = document.querySelectorAll(".resume-button");

textToSpeechButtons.forEach((textToSpeechButton, index) => {
  textToSpeechButton.addEventListener("click", () => {
    const text = cardContent[index].innerText.slice(10);
    utterance = new SpeechSynthesisUtterance(text);
    speechControls[index].style.display = "flex";
    volumeSliders[index].value = utterance.volume;
    speedSliders[index].value = utterance.rate;
  });
});

pauseButtons.forEach((pauseButton, index) => {
  pauseButton.addEventListener("click", () => {
    speechSynthesis.pause();
  });
});

resumeButtons.forEach((resumeButton, index) => {
  resumeButton.addEventListener("click", () => {
    speechSynthesis.resume();
  });
});

stopButtons.forEach((stopButton, index) => {
  stopButton.addEventListener("click", () => {
    speechSynthesis.cancel();
    playButtons[index].style.display = "flex";
    pauseButtons[index].style.display = "none";
    volumeSliders[index].disabled = false;
    speedSliders[index].disabled = false;
  });
});

volumeSliders.forEach((volumeSlider, index) => {
  volumeSlider.addEventListener("change", () => {
    utterance.volume = volumeSlider.value;
    console.log(utterance.volume);
  });
});

speedSliders.forEach((speedSlider, index) => {
  speedSlider.addEventListener("change", () => {
    utterance.rate = speedSlider.value;
    console.log(utterance.rate);
  });
});

playButtons.forEach((playButton, index) => {
  playButton.addEventListener("click", () => {
    console.log(index);
    speechSynthesis.cancel();
    utterance.volume = volumeSliders[index].value;
    utterance.rate = speedSliders[index].value;
    speechSynthesis.speak(utterance);
    playButtons[index].style.display = "none";
    pauseButtons[index].style.display = "flex";
    volumeSliders[index].disabled = true;
    speedSliders[index].disabled = true;
  });
});

speechSynthesis.addEventListener("end", () => {
  playButtons.forEach((playButton, index) => {
    playButton.style.display = "flex";
    pauseButtons[index].style.display = "none";
    resumeButtons[index].style.display = "none";
    volumeSliders[index].disabled = false;
    speedSliders[index].disabled = false;
  });
});