//drawer and overlay logic

const hamburgerBtn = document.getElementById("barContainerId");
const sideDrawer = document.getElementById("sideDrawer");
const closeDrawer = document.getElementById("closeDrawer");
const overlay = document.getElementById("overlay");

hamburgerBtn.addEventListener("click", () => {
  sideDrawer.classList.add("open");
  overlay.classList.add("show");
});

closeDrawer.addEventListener("click", () => {
  sideDrawer.classList.remove("open");
  overlay.classList.remove("show");
});

overlay.addEventListener("click", () => {
  sideDrawer.classList.remove("open");
  overlay.classList.remove("show");
});

//slider logic
// Auto-slide logic
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("sliderDots");
let current = 0;
let interval;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll("button");

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function goToSlide(index) {
  current = index;
  showSlide(current);
  resetAutoSlide();
}

function startAutoSlide() {
  interval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Initialize
showSlide(current);
startAutoSlide();

//emailJs Contact Form Logic

document.addEventListener("DOMContentLoaded", () => {
  //initialize EmailJs
  emailjs.init("CnCt-v0GA8iy55wvt"); //public key will be inserted here

  const form = document.getElementById("contact-form"); //contact-form id
  const formStatus = document.getElementById("form-status"); //paragraph inserted right after the form to show the form status

  //only run if contact form exists on this page
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const serviceId = "service_pftv2rg"; //serviceId
      const templateId = "template_sskugq6"; //emailJs template Id
      const autoReplyTemplateId = "template_gyqb3f9"; //auto reply email template id

      //adding gap time - so as to show sending status to the user
      const sendBtn = this.querySelector('button[type="submit"]');
      const originalText = sendBtn.textContent;
      sendBtn.disabled = true;
      sendBtn.textContent = "Sending...";
      formStatus.textContent = "";

      emailjs
        .sendForm(serviceId, templateId, this)
        .then(() => {
          formStatus.textContent = "✅ Message sent successfully!";
          formStatus.style.color = "green";
          this.reset();
        })
        .catch((err) => {
          formStatus.textContent =
            "❌ Failed to send message. Try again later.";
          formStatus.style.color = "red";
          console.error("EmailJS error:", err);
        })
        .finally(() => {
          sendBtn.disabled = false;
          sendBtn.textContent = originalText;
        });

      //autoreply template
      emailjs.send(serviceId, autoReplyTemplateId, {
        name: form.name.value,
        email: form.email.value,
      });
    });
  }
});

//contact section

//resume section
window.addEventListener("scroll", () => {
  const resumeSection = document.getElementById("resume-section");
  const rect = resumeSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    resumeSection.classList.add("visible");
  }
});

//spin download
// --------------------
// Resume Download Button
// --------------------
const downloadBtn = document.getElementById("downloadBtn");

if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    downloadBtn.classList.add("loading");

    setTimeout(() => {
      downloadBtn.classList.remove("loading");

      // Trigger file download
      const link = document.createElement("a");
      link.href = "assets/files/Moksh_Mehan_resume.pdf"; // replace with your resume path
      link.download = "Moksh_Mehan_resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500); // 2 seconds delay for loader animation
  });
}

//skills section

window.addEventListener("scroll", () => {
  const skillsSection = document.getElementById("skills-section");
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsSection.classList.add("visible");
  }
});

//experience section
// ==== Scroll Reveal Animation for Timeline ====
const timelineItems = document.querySelectorAll(".timeline-item");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  timelineItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ==== Timeline Line Growth Animation ====
const timelineLine = document.querySelector(".timeline-line");

function animateTimelineLine() {
  const timeline = document.querySelector(".timeline");
  const timelineRect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  const timelineTop = timeline.offsetTop;
  const timelineHeight = timeline.offsetHeight;

  // Calculate how far we’ve scrolled into the timeline
  const scrollPosition = scrollTop + windowHeight - timelineTop;
  const visibleHeight = Math.min(scrollPosition, timelineHeight);
  const progress = Math.max(0, visibleHeight);

  timelineLine.style.height = `${progress}px`;
}

window.addEventListener("scroll", animateTimelineLine);
window.addEventListener("load", animateTimelineLine);

//coding profile section numbers shift
// ----------------------
// Animated counter logic
// ----------------------
const counters = document.querySelectorAll(".count");
let hasAnimated = false;

function animateCounters() {
  if (hasAnimated) return; // Prevent re-trigger

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const speed = 30; // smaller = faster

      if (count < target) {
        counter.innerText = Math.ceil(count + (target - count) / speed);
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target;
        counter.classList.add("animated");
      }
    };
    updateCount();
  });

  hasAnimated = true;
}

// Trigger animation when section is visible
const codingSection = document.getElementById("coding-profiles");
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
    }
  },
  { threshold: 0.4 },
);
if (codingSection) observer.observe(codingSection);

//back-to-top-btn

const btn = document.querySelector(".back-to-top-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

//auto experience

// 🔹 Set your career start date (YYYY, MM-1, DD)
const startDate = new Date(2024, 8, 9); // 1 Sept 2024

const today = new Date();
const diffTime = today - startDate;

const totalMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44);
const years = Math.floor(totalMonths / 12);
const months = Math.floor(totalMonths % 12);

let experienceText = "";

if (years > 0) {
  experienceText += `${years}.${months}+ Years`;
} else {
  experienceText += `${months}+ Months`;
}

document.getElementById("experience").innerText = experienceText;
