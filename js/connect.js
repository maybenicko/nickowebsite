const phrases = [
  "Let's <span>Connect</span> Together",
  "Build Your <span>Future</span> Today",
  "Unlock Your <span>Potential</span>",
  "Share Your <span>Ideas</span> With Us",
  "Grow Your <span>Career</span> Path",
  "Shape Your <span>Journey</span> Here",
  "Discover New <span>Opportunities</span>",
  "Showcase Your <span>Talent</span>",
  "Create Meaningful <span>Impact</span>",
  "Empower Your <span>Success</span>"
];

let currentIndex = 0;
const connectText = document.getElementById("connect-text");

// Function to update phrase
function updatePhrase() {
  connectText.innerHTML = phrases[currentIndex];
  currentIndex = (currentIndex + 1) % phrases.length; // loop back to start
}

// Initial load
updatePhrase();

// Rotate every 3 seconds
setInterval(updatePhrase, 300000);
