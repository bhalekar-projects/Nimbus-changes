
// JS to Load Navbar and Footer
async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (res.ok) {
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    } else {
      document.getElementById(id).innerHTML = "<!-- Failed to load " + file + " -->";
    }
  } catch (err) {
    document.getElementById(id).innerHTML = "<!-- Error loading " + file + " -->";
    console.error(err);
  }
}

loadComponent("navbar-placeholder", "/Dashboard/Navbar/Navbar.html");
loadComponent("footer-placeholder", "/Dashboard/Footer/Footer.html");

// Count-Up Animation
function animateCount(el, to, duration = 1600) {
  let start = 0;
  let startTime = null;
  const isK = to > 999 && to % 1000 === 0; // "2K" style for 2000, etc.

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    let value = Math.floor(progress * (to - start) + start);
    if (isK) value = (value / 1000).toFixed(0) + 'K';
    el.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = isK ? (to / 1000) + 'K' : to;
    }
  }
  requestAnimationFrame(step);
}

// Only trigger animation when section is visible
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

let animated = false;
function triggerCountAnimation() {
  if (animated) return;
  const section = document.querySelector('.numbers-section');
  if (section && isInViewport(section)) {
    document.querySelectorAll('.count-up').forEach(el => {
      animateCount(el, parseInt(el.dataset.count));
    });
    animated = true;
  }
}

// Wait for DOM content before adding scroll listener
document.addEventListener('DOMContentLoaded', function () {

// 1) Resume-upload filename display
    const uploadInput     = document.getElementById("resumeUpload");
    const fileNameDisplay = document.getElementById("fileNameDisplay");
    if (uploadInput && fileNameDisplay) {
      uploadInput.addEventListener("change", function () {
        const file = this.files[0];
        fileNameDisplay.textContent = file ? file.name : "";
      });
    }
  // Initial check in case section is already visible
  triggerCountAnimation();
  window.addEventListener('scroll', triggerCountAnimation);
});
  document.querySelectorAll("img").forEach((img, index) => {
    img.setAttribute("data-aos", "zoom-in");
    img.setAttribute("data-aos-delay", (index % 4) * 100); // 0, 100, 200, 300...
  });
  
  AOS.init({
    duration: 1000, // animation duration
    once: true,     // animation only once
  });

