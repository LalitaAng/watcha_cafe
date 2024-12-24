document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("active");
  });
});

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
