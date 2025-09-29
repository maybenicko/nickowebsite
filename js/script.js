document.addEventListener("DOMContentLoaded", () => {
  const warning = document.getElementById("screen-warning");
  const content = document.querySelector(".scroll-container");

  function checkRatio() {
    const ratio = window.innerWidth / window.innerHeight;
    if (ratio < 1.45) {
      warning.classList.remove("hidden");
      content.style.display = "none";
    } else {
      warning.classList.add("hidden");
      content.style.display = "";
    }
  }

  checkRatio();
  window.addEventListener("resize", checkRatio);
});

const content = document.getElementById("scroll-content");

let current = 0;   // current position (animated)
let target = 0;    // target position (real scroll substitute)
let ease = 0.08;   // smaller = slower, larger = faster

// scale factor: <1 = less movement, >1 = more movement
const scrollFactor = 0.3;

// prevent browser’s native scrolling
document.body.style.overflow = "hidden";

// listen to wheel events and adjust target
window.addEventListener("wheel", (e) => {
  target += e.deltaY * scrollFactor;
  // clamp so you don’t scroll past content
  const maxScroll = content.getBoundingClientRect().height - window.innerHeight;
  target = Math.max(0, Math.min(target, maxScroll));
}, { passive: false });

// Smooth scrolling animation
function smoothScroll() {
  current += (target - current) * ease;
  content.style.transform = `translateY(-${current}px)`;
  requestAnimationFrame(smoothScroll);
}
smoothScroll();

// NAVIGATION: smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    const section = document.querySelector(id);

    if (section) {
      const sectionTop = section.offsetTop;
      target = sectionTop; // set target scroll position
    }
  });
});

// --- Animate Title Function ---
function animateTitle(elementId, word) {
  const element = document.getElementById(elementId);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const cyclesPerLetter = 10;   // how many random letters before correct one
  const cycleDelay = 50;        // ms delay between random letters
  const letterDelay = 80;       // ms pause before moving to next letter

  function animateText(element, word) {
    let currentLetterIndex = 0;

    function animateLetter() {
      if (currentLetterIndex >= word.length) return;

      let cycleCount = 0;
      const correctLetter = word[currentLetterIndex];
      let displayedText = element.textContent;

      const interval = setInterval(() => {
        cycleCount++;

        const randomChar = chars[Math.floor(Math.random() * chars.length)];

        if (cycleCount < cyclesPerLetter && correctLetter !== " ") {
          element.textContent = displayedText + randomChar;
        } else {
          element.textContent = displayedText + correctLetter;
          clearInterval(interval);

          setTimeout(() => {
            currentLetterIndex++;
            animateLetter();
          }, letterDelay);
        }
      }, cycleDelay);
    }

    animateLetter();
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.textContent = ""; // reset
        animateText(element, word);
        observer.unobserve(element); // run once only
      }
    });
  }, { threshold: 0.5 });

  observer.observe(element);
}

// --- Animate ABOUT ME ---
document.addEventListener('DOMContentLoaded', () => {
  animateTitle("about-text", "ABOUT ME");
  animateTitle("projects-text", "PROJECTS");
  animateTitle("journey-text", "ABOUT ME");
  animateTitle("connect-text", "CONNECT");
});

// Animate About Me paragraphs on scroll
const aboutParas = document.querySelectorAll(".about-block p");

const paraObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

aboutParas.forEach(p => paraObserver.observe(p));


document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

/* adding bigtext effect */
document.addEventListener("DOMContentLoaded", () => {
  const journeyText = document.querySelector(".journey-bigtext");

  function wrapLetters(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const frag = document.createDocumentFragment();

      text.split("").forEach(char => {
        if (char === " ") {
          frag.appendChild(document.createTextNode(" "));
        } else {
          const span = document.createElement("span");
          span.classList.add("letter");
          span.textContent = char;
          frag.appendChild(span);
        }
      });

      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR") {
      [...node.childNodes].forEach(wrapLetters);
    }
  }

  wrapLetters(journeyText);
});


document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".journey-bigtext .letter");

  letters.forEach((letter, i) => {
    letter.addEventListener("mouseenter", () => {
      letters.forEach((l, j) => {
        const dist = Math.abs(i - j);
        if (dist === 0) {
          l.style.transform = "scale(1.3)";
        } else if (dist < 6) { // up to 5 letters away
          const shift = (0.1 / dist).toFixed(2); // smaller shift for farther letters
          l.style.transform = `translateX(${j < i ? -shift + "em" : shift + "em"})`;
        }
      });
    });

    letter.addEventListener("mouseleave", () => {
      letters.forEach(l => (l.style.transform = ""));
    });
  });
});

