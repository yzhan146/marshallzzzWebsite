const languageToggle = document.querySelector("[data-language-toggle]");
const emailButton = document.querySelector("[data-email-button]");

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const language = params.get("language") || params.get("lang");
  return language === "en" ? "en" : "zh";
}

function setLanguage(language) {
  document.body.classList.toggle("language-en", language === "en");
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";

  document.querySelectorAll("[data-i18n-zh][data-i18n-en]").forEach((element) => {
    element.textContent = language === "en" ? element.dataset.i18nEn : element.dataset.i18nZh;
  });

  if (languageToggle) {
    languageToggle.textContent = language === "en" ? "中文" : "English";
    languageToggle.dataset.currentLanguage = language;
  }

  const url = new URL(window.location.href);
  if (language === "en") {
    url.searchParams.set("language", "en");
  } else {
    url.searchParams.delete("language");
  }
  window.history.replaceState({}, "", url);
}

languageToggle?.addEventListener("click", () => {
  const nextLanguage = languageToggle.dataset.currentLanguage === "en" ? "zh" : "en";
  setLanguage(nextLanguage);
});

emailButton?.addEventListener("click", () => {
  const user = emailButton.dataset.user;
  const domain = emailButton.dataset.domain;

  if (!user || !domain) {
    return;
  }

  const email = `${user}@${domain}`;
  emailButton.textContent = email;
  emailButton.setAttribute("aria-label", `Email ${email}`);
  emailButton.addEventListener(
    "click",
    () => {
      window.location.href = `mailto:${email}`;
    },
    { once: true },
  );
});

setLanguage(getInitialLanguage());
