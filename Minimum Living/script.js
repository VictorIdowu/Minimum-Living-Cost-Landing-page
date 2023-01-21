"use strict";

const uploadImg = document.querySelector(".input-img");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".nav-item");
const allSections = document.querySelectorAll(".section");

///////////////////////////////////////////////

////// Sticky nav ///////
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  !entry.isIntersecting
    ? nav.classList.add("sticky")
    : nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(hero);

////// active nav /////
nav.addEventListener("click", function (e) {
  e.preventDefault();
  const activeNav = e.target;

  navLinks.forEach((link) => {
    if (link.classList.contains("active") && link !== activeNav)
      link.classList.remove("active");
  });

  activeNav.classList.add("active");
});

////////////// Reveal Sections /////////////
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
