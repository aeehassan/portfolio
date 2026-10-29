/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".portfolio__container .swiper-pagination",
    clickable: true,
  },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  cssMode: true,
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".testimonial__pagination",
    clickable: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-up class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactSubmit = contactForm?.querySelector(".contact__submit");

if (window.emailjs) {
  window.emailjs.init({ publicKey: "wl1X-bkofX0YmYWhJ" });
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!window.emailjs) {
    contactStatus.textContent =
      "The message service is unavailable right now. Please try again later.";
    return;
  }

  if (!window.grecaptcha || !window.grecaptcha.getResponse()) {
    contactStatus.textContent = "Please complete the CAPTCHA before sending.";
    return;
  }

  contactSubmit.disabled = true;
  contactStatus.textContent = "Sending your message...";

  try {
    await window.emailjs.sendForm(
      "service_d9n0v0n",
      "template_iyqtphe",
      contactForm,
    );
    contactForm.reset();
    contactStatus.textContent = "Your message has been sent. Thank you!";
  } catch (error) {
    console.error("EmailJS send failed:", error);
    contactStatus.textContent =
      "Your message could not be sent. Please try again in a moment.";
  } finally {
    contactSubmit.disabled = false;
    window.grecaptcha?.reset();
  }
});

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";

const selectedTheme = localStorage.getItem("selected-theme");

document.body.classList.toggle(darkTheme, selectedTheme === "dark");
themeButton.setAttribute(
  "aria-pressed",
  String(document.body.classList.contains(darkTheme)),
);

themeButton.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains(darkTheme)
    ? "light"
    : "dark";
  const applyTheme = () => {
    document.body.classList.toggle(darkTheme, nextTheme === "dark");
    themeButton.setAttribute("aria-pressed", String(nextTheme === "dark"));
    localStorage.setItem("selected-theme", nextTheme);
  };

  if (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    applyTheme();
    return;
  }

  document.documentElement.style.setProperty(
    "--theme-transition-origin",
    nextTheme === "dark" ? "0 0" : "100% 100%",
  );
  document.startViewTransition(applyTheme);
});
