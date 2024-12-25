import { changeLanguage } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get the elements we'll be working with
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Handle hamburger menu click
  hamburger.addEventListener('click', () => {
      // Toggle both the hamburger animation and the menu visibility
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close menu when a navigation link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active'); // Also reset hamburger icon
      });
  });

  // Handle menu tab switching
  document.querySelectorAll('.menu-tab').forEach(tab => {
      tab.addEventListener('click', () => {
          // Remove active class from all tabs
          document.querySelectorAll('.menu-tab').forEach(t => {
              t.classList.remove('active');
          });
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Get the category from data-category attribute
          const category = tab.dataset.category;
          
          // Hide all menu grids
          document.querySelectorAll('.menu-grid').forEach(grid => {
              grid.classList.remove('active');
          });
          
          // Show the selected category's menu grid
          document.getElementById(`${category}-menu`).classList.add('active');
      });
  });

  // Initialize the language setting
  changeLanguage(localStorage.getItem('preferredLanguage') || 'en');
});

window.changeLanguage = changeLanguage;

// lazy loading
// document.addEventListener("DOMContentLoaded", function() {
//   let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

//   if ("IntersectionObserver" in window) {
//       let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
//           entries.forEach(function(entry) {
//               if (entry.isIntersecting) {
//                   let lazyImage = entry.target;
//                   lazyImage.src = lazyImage.dataset.src;
//                   lazyImage.classList.remove("lazy");
//                   lazyImageObserver.unobserve(lazyImage);
//               }
//           });
//       });

//       lazyImages.forEach(function(lazyImage) {
//           lazyImageObserver.observe(lazyImage);
//       });
//   }
// });
