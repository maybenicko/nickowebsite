/* ---------------------- SCREEN WARNING ---------------------- */

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

/* ---------------------- HEADER MENU ---------------------- */
document.querySelectorAll('.nav-word').forEach(word => {
  let letters = word.textContent.split('');
  word.innerHTML = '';

  letters.forEach((letter, i) => {
    let span = document.createElement('span');
    span.classList.add('letter');
    span.style.setProperty('--delay', `${i * 0.05}s`);

    // uso NBSP per mantenere gli spazi visibili
    let top = document.createElement('span');
    top.textContent = letter === ' ' ? '\u00A0' : letter;

    let bottom = document.createElement('span');
    bottom.textContent = letter === ' ' ? '\u00A0' : letter;

    span.appendChild(top);
    span.appendChild(bottom);

    word.appendChild(span);
  });

  // gestione hover via classi (in/out animazioni)
  const link = word.closest('a');
  link.addEventListener('mouseenter', () => {
    word.classList.remove('unhover');
    word.classList.add('active');
  });
  link.addEventListener('mouseleave', () => {
    word.classList.remove('active');
    word.classList.add('unhover');
  });
});



/* ---------------------- SCROLL BEHAVIOR ---------------------- */
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


/* ---------------------- TITLES ANIMATION ---------------------- */
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
  animateTitle("journey-text", "JOURNEY");
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


document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll("#terminal-options div");

  const popupContent = {
    0: "For me, Fintech is not just about banking faster, it is a state of mind. It's about resolvig inefficiencies at the root cause and leveraging technology to increase performance.",
    1: "My Philosophy: Always learn, iterate fast, and embrace failure as feedback.",
    2: "My Values: Curiosity, integrity, resilience.",
    3: "My Hobbies: Tennis, snowboarding, sneaker culture, music.",
    4: "What Drives Me: Building efficient systems and exploring fintech innovation.",
    5: "Curriculum Vitae",
    6: "IMAGE",
    7: "CLEAR"
  };

  const list_images = [
    "images/profile.jpg",
    "images/jumpman.jpg",
    "images/nicko.jpg"
  ];

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      const id = opt.getAttribute("data-option");

      // Echo the user's choice in the terminal output
      const terminal = document.getElementById("terminal");
      const echo = document.createElement("div");
      echo.classList.add("echo-line");
      echo.innerHTML = `<span class="prompt">niccolo@cli ~ % </span>${id}`;
      terminal.appendChild(echo);

      if (id === "5") {
        // PDF preview inside popup without default toolbar
        createPopup("Download CV", `
          <embed src="cv.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
            type="application/pdf"
            class="pdf-embed">
          </embed>
          <div class="pdf-download">
            <a href="cv.pdf" download>⬇ Download PDF</a>
          </div>
        `);
        return;
      }


      if (id === "6") {
        // IMAGE: pick random image
        const randomImg = list_images[Math.floor(Math.random() * list_images.length)];
        createPopup("Random Image", `<img src="${randomImg}" style="max-width:100%; border-radius:4px;">`);
        return;
      }

      if (id === "7") {
        // CLEAR: remove all echo lines
        document.querySelectorAll(".echo-line").forEach(line => line.remove());
        return;
      }

      // Then open popup
      const cleanTitle = opt.textContent.replace(/^.*\)\s*/, "");

  // Add the prompt prefix to the body
      const bodyText = `<span class="prompt">niccolo@cli ~ % </span>${popupContent[id]}`;

      // Then open popup
      createPopup(cleanTitle, bodyText);
    });
  });

  function createPopup(title, text) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const header = document.createElement("div");
    header.classList.add("popup-header");

    // traffic-light buttons
    const red = document.createElement("span");
    red.classList.add("popup-btn", "red");
    const yellow = document.createElement("span");
    yellow.classList.add("popup-btn", "yellow");
    const green = document.createElement("span");
    green.classList.add("popup-btn", "green");

    // close on red click
    red.addEventListener("click", () => popup.remove());

    // title text
    const titleSpan = document.createElement("span");
    titleSpan.classList.add("title");
    titleSpan.textContent = title;

    header.appendChild(red);
    header.appendChild(yellow);
    header.appendChild(green);
    header.appendChild(titleSpan);

    const body = document.createElement("div");
    body.classList.add("popup-body");
    body.innerHTML = text;

    popup.appendChild(header);
    popup.appendChild(body);
    document.body.appendChild(popup);

    // draggable
    let isDragging = false, offsetX, offsetY;
    header.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup-btn")) return;
      isDragging = true;
      offsetX = e.clientX - popup.offsetLeft;
      offsetY = e.clientY - popup.offsetTop;
      document.body.style.userSelect = "none";
    });
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
      }
    });
    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });
  }

});


function updateTime() {
  const now = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/Rome",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  document.getElementById("local-time").textContent = now;
}

updateTime();
setInterval(updateTime, 1000);
