import { changeLanguage } from "./translations.js";

function initTheme() {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  document.documentElement.setAttribute("data-theme", savedTheme); // 
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    });

  changeLanguage(localStorage.getItem("preferredLanguage") || "en");

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active"); 
    });
  });

  document.querySelectorAll(".menu-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".menu-tab").forEach((t) => {
        t.classList.remove("active");
      });

      tab.classList.add("active");

      const category = tab.dataset.category;

      document.querySelectorAll(".menu-grid").forEach((grid) => {
        grid.classList.remove("active");
      });

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
