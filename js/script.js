/* ------------------------------------------------ */
/* ---------------- SCREEN WARNING ---------------- */
/* ------------------------------------------------ */


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


/* ------------------------------------------------ */
/* ------------------ HEADER ROLL ----------------- */
/* ------------------------------------------------ */


document.querySelectorAll('.nav-word').forEach(word => {
  let letters = word.textContent.split('');
  word.innerHTML = '';

  letters.forEach((letter, i) => {
    let span = document.createElement('span');
    span.classList.add('letter');
    span.style.setProperty('--delay', `${i * 0.05}s`);

    let top = document.createElement('span');
    top.textContent = letter === ' ' ? '\u00A0' : letter;

    let bottom = document.createElement('span');
    bottom.textContent = letter === ' ' ? '\u00A0' : letter;

    span.appendChild(top);
    span.appendChild(bottom);
    word.appendChild(span);
  });

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


/* ------------------------------------------------ */
/* --------------- SCROLL BEHAVIOR ---------------- */
/* ------------------------------------------------ */


const content = document.getElementById("scroll-content");

let current = 0; 
let target = 0;  
let ease = 0.08; 

const scrollFactor = 0.3;
document.body.style.overflow = "hidden";

window.addEventListener("wheel", (e) => {
  target += e.deltaY * scrollFactor;

  const maxScroll = content.getBoundingClientRect().height - window.innerHeight;
  target = Math.max(0, Math.min(target, maxScroll));
}, { passive: false });

function smoothScroll() {
  current += (target - current) * ease;
  content.style.transform = `translateY(-${current}px)`;
  requestAnimationFrame(smoothScroll);
}
smoothScroll();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    const section = document.querySelector(id);

    if (section) {
      const sectionTop = section.offsetTop;
      target = sectionTop; 
    }
  });
});


/* ------------------------------------------------ */
/* --------------- TITLE ANIMATION ---------------- */
/* ------------------------------------------------ */


document.addEventListener('DOMContentLoaded', () => {
  initStackedTitles();
  observeTitles();
});

function initStackedTitles() {
  const selectors = ['.about-title', '.projects-title', '.connect-title'];
  document.querySelectorAll(selectors.join(',')).forEach(title => {
    if (title.querySelector('.stacked')) return;

    const text = title.textContent; 
    const frag = document.createDocumentFragment();

    for (const ch of text) {
      if (ch === ' ') {
        const space = document.createElement('span');
        space.className = 'stack-space';
        space.innerHTML = '&nbsp;';
        frag.appendChild(space);
        continue;
      }
      const letter = document.createElement('span');
      letter.className = 'stacked';
      const a = document.createElement('span'); a.textContent = ch; 
      const b = document.createElement('span'); b.textContent = ch;
      const c = document.createElement('span'); c.textContent = ch;
      letter.append(a, b, c);
      frag.appendChild(letter);
    }

    title.textContent = '';
    title.appendChild(frag);
  });
}

function observeTitles() {
  const titles = document.querySelectorAll('.about-title, .projects-title, .connect-title');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const letters = entry.target.querySelectorAll('.stacked');
      letters.forEach((letter, i) => {
        const top = letter.children[0];
        const bottom = letter.children[2];
        const d = i * 99; 

        top.style.animationDelay = `${d}ms`;
        bottom.style.animationDelay = `${d}ms`;
        letter.classList.add('active');
      });

      io.unobserve(entry.target);
    });
  }, { threshold: 0.55 });

  titles.forEach(t => io.observe(t));
}


/* ------------------------------------------------ */
/* ------------ TERMINAL INTERACTIONS ------------- */
/* ------------------------------------------------ */


document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll("#terminal-options div");

  const popupContent = {
    0: "For me, Fintech is not just about banking faster, it is a state of mind. It's about resolvig inefficiencies at the root cause and leveraging technology to increase performance.",
    1: "To me, philosophy is not something abstract, but something you live every day. Mine comes down to three principles: persistence, openness and curiosity. Persistence means showing up, even when things get hard, something I learned through competitive sports. Openness means being willing to learn from every experience, whether it’s a failed project or a new skill. Curiosity means constantly looking for ways to improve, explore and innovate.",
    2: "My values? Keep it real, keep it moving and keep it fun. I don’t believe in pretending to be perfect. I’d rather stay authentic and keep learning along the way. Curiosity is a value for me because asking “why not?” has led to some of my best projects. Consistency is another: small daily steps matter way more than big speeches.",
    3: "I used to play tennis competitively, which basically trained me to be stubborn, disciplined and okay with losing. Now I spend winters on a snowboard, summers chasing golf balls and whenever possible I’m out windsurfing. Somewhere in between, I fell into sneaker culture, what started as collecting turned into reselling and eventually into building sneaker bots. So yes, my hobbies range from crashing on slopes to crashing servers, but at least they keep me balanced.",
    4: "I’m driven by curiosity and the thrill of building something special. I like to understand how things work, break them down and then put them back together in a smarter way. Curiosity has also pushed me outside of my comfort zone, from studying in different countries to taking on projects in areas I’d never explored before. Each time, I’ve learned to adapt, grow and see challenges not as obstacles but as opportunities to expand my skills and perspective.",
    5: "Curriculum Vitae",
    6: "IMAGE",
    7: "CLEAR"
  };

  const list_images = [
  "images/0.jpg",
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpeg",
  "images/6.jpeg",
  "images/7.jpeg",
  "images/8.jpeg",
  "images/9.jpeg",
  "images/10.jpeg",
  "images/11.jpeg",
  "images/12.jpeg",
  "images/13.jpg",
  "images/14.jpeg",
  "images/15.jpeg",
  "images/17.jpeg",
  "images/18.jpeg",
  "images/19.jpeg",
  "images/20.jpeg",
  "images/21.jpeg",
  "images/22.jpeg"
  ];

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      const id = opt.getAttribute("data-option");

      const terminal = document.getElementById("terminal");
      const echo = document.createElement("div");
      echo.classList.add("echo-line");
      echo.innerHTML = `<span class="prompt">niccolo@cli ~ % </span>${id}`;
      terminal.appendChild(echo);

      if (id === "5") {
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
        const randomImg = list_images[Math.floor(Math.random() * list_images.length)];
        createPopup("Memories", `<img src="${randomImg}" alt="${randomImg}" style="max-width:100%; border-radius:4px;">`);
        return;
      }

      if (id === "7") {
        document.querySelectorAll(".echo-line").forEach(line => line.remove());
        return;
      }

      const cleanTitle = opt.textContent.replace(/^.*\)\s*/, "");
      const bodyText = `<span class="prompt">niccolo@cli ~ % </span>${popupContent[id]}`;
      createPopup(cleanTitle, bodyText);
    });
  });

  function createPopup(title, text) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const header = document.createElement("div");
    header.classList.add("popup-header");

    const red = document.createElement("span");
    red.classList.add("popup-btn", "red");
    const yellow = document.createElement("span");
    yellow.classList.add("popup-btn", "yellow");
    const green = document.createElement("span");
    green.classList.add("popup-btn", "green");

    red.addEventListener("click", () => popup.remove());

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


/* ------------------------------------------------ */
/* ----------------- TIME TRACKER ----------------- */
/* ------------------------------------------------ */


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
