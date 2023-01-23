'use strict';

const uploadImg = document.querySelector('.input-img');
const hero = document.querySelector('.hero');
const header = document.querySelector('.header');
const nav = document.querySelector('.main-nav');
const navMobile = document.querySelector('.btn-mobile-nav');
const menuBtn = document.querySelector('.icon-mobile-nav-1');
const closeBtn = document.querySelector('.icon-mobile-nav-2');
const navLinks = document.querySelectorAll('.nav-item');
const allSections = document.querySelectorAll('.section');
const yearEl = document.querySelector('.year');
const main = document.querySelector('.main');
const inputs = document.querySelectorAll('input');

///////////////////////////////////////////////

////// Sticky nav ///////
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    navMobile.classList.add('sticky');
    closeNav();
  } else {
    nav.classList.remove('sticky');
    navMobile.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(hero);

////// active nav /////
nav.addEventListener('click', function (e) {
  e.preventDefault();
  const activeNav = e.target;

  if (!activeNav.classList.contains('nav-item')) return;

  navLinks.forEach(link => {
    if (link.classList.contains('active') && link !== activeNav)
      link.classList.remove('active');
  });

  activeNav.classList.add('active');
});

////////////// Reveal Sections /////////////
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////
// Set current Year
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

////////////// Mobile Nav///////////////////////////
menuBtn.addEventListener('click', function () {
  // const target = e.target;
  nav.classList.add('nav-open');
  menuBtn.classList.add('hidden');
  closeBtn.classList.remove('hidden');
  closeBtn.style.color = '#18191f';
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

const closeNav = function () {
  nav.classList.remove('nav-open');
  menuBtn.classList.remove('hidden');
  closeBtn.classList.add('hidden');
};

closeBtn.addEventListener('click', closeNav);

inputs.forEach(input => {
  input.onfocus = function (e) {
    const form = e.target.closest('.form-item');
    form.classList.add('active');
  };

  input.onblur = function (e) {
    const form = e.target.closest('.form-item');
    form.classList.remove('active');
  };
});
