const body = document.body;

document.getElementById("modeSwitch").addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});

const words = [
  "Student.", 
  "Learner.", 
  "Web Developer.", 
  "Computer Science Enthusiast.",
  "Tech Explorer.", 
  "Problem Solver.", 
  "Software Engineer.", 
  "Creative Thinker.", 
  "Team Collaborator.", 
  "Tech Innovator.", 
  "Programming Enthusiast.", 
  "Full Stack Developer.", 
  "UI/UX Enthusiast.", 
  "Lifelong Learner.", 
  "Algorithm Designer."
];
const typingSpeed = 200;
const erasingSpeed = 100;
const delayBetweenWords = 1500;

let wordIndex = 0;
let charIndex = 0;
let isErasing = false;

const spanElement = document.querySelector(".me-as");

function type() {
  const currentWord = words[wordIndex];
  if (isErasing) {
    if (charIndex > 0) {
      spanElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingSpeed);
    } else {
      isErasing = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    }
  } else {
    if (charIndex < currentWord.length) {
      spanElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isErasing = true;
      setTimeout(type, delayBetweenWords);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, delayBetweenWords);
});