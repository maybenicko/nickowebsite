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
  animateTitle("projects-text", "PROJECTS"); // 🔥 added for PROJECTS
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
