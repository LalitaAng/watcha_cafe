import { en } from "./languages/en.js";
import { de } from "./languages/de.js";

const translations = { en, de };
let currentLanguage = "en";

const savedLanguage = localStorage.getItem("preferredLanguage");
if (savedLanguage && translations[savedLanguage]) {
  currentLanguage = savedLanguage;
}

export function changeLanguage(lang) {
  if (!translations[lang]) {
    console.error(`Language ${lang} not supported`);
    return;
  }

  try {
    // Update current language
    currentLanguage = lang;

    // Save language preference
    localStorage.setItem("preferredLanguage", lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all translated elements
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      } else {
        console.warn(
          `Missing translation for key: ${key} in language: ${lang}`
        );
      }
    });

    // Update active state of language buttons
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("onclick").includes(lang)
      );
    });
  } catch (error) {
    console.error("Error chaning language:", error);
  }
}
