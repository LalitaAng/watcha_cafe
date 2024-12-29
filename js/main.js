import { changeLanguage } from "./translations.js";

function initTheme() {
  // Check for saved user preference, first in localStorage, then in system
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  document.documentElement.setAttribute("data-theme", savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize core functionality
  // Theme initialization should come first as it affects the visual appearance
  initTheme();

  // 2. Set up theme-related listeners
  document
    .querySelector(".theme-toggle")
    .addEventListener("click", toggleTheme);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light"
        );
      }
    });

  // 3. Initialize language (affects content display)
  changeLanguage(localStorage.getItem("preferredLanguage") || "en");

  // 4. Set up navigation and UI interactions
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Handle hamburger menu click
  hamburger.addEventListener("click", () => {
    // Toggle both the hamburger animation and the menu visibility
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when a navigation link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active"); // Also reset hamburger icon
    });
  });

  // Handle menu tab switching
  document.querySelectorAll(".menu-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      document.querySelectorAll(".menu-tab").forEach((t) => {
        t.classList.remove("active");
      });

      // Add active class to clicked tab
      tab.classList.add("active");

      // Get the category from data-category attribute
      const category = tab.dataset.category;

      // Hide all menu grids
      document.querySelectorAll(".menu-grid").forEach((grid) => {
        grid.classList.remove("active");
      });

      // Show the selected category's menu grid
      document.getElementById(`${category}-menu`).classList.add("active");
    });
  });

  const fadeElements = document.querySelectorAll(".fade-in");
  console.log("Found fade-in elements:", fadeElements.length);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log("Element intersecting:", entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("fade-out");
        } else {
          entry.target.classList.remove("visible");
          entry.target.classList.add("fade-out");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "-20px",
    }
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
    console.log("Observing element:", element);
  });
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
