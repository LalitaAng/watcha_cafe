document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Menu tabs
document.querySelectorAll(".menu-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".menu-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const drinks = document.querySelector(".drinks-section");
    const desserts = document.querySelector(".desserts-section");
    if (tab.textContent === "Drinks") {
      drinks.style.display = "block";
      desserts.style.display = "none";
    } else {
      drinks.style.display = "none";
      desserts.style.display = "block";
    }
  });
});
