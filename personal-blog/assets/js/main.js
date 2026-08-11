(function () {
  const storageKey = "yebin-blog-theme";
  const siteVersion = "v0.2";
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const button = document.querySelector(".theme-toggle");

  document.querySelectorAll(".site-footer .footer-inner span:last-child").forEach(function (versionLabel) {
    versionLabel.textContent = siteVersion + " · 静态学习项目";
  });

  function systemTheme() { return prefersDark.matches ? "dark" : "light"; }
  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (button) {
      const next = theme === "dark" ? "浅色" : "深色";
      button.textContent = "切换至" + next + "模式";
      button.setAttribute("aria-label", "当前为" + (theme === "dark" ? "深色" : "浅色") + "模式，点击切换至" + next + "模式");
    }
  }

  const savedTheme = localStorage.getItem(storageKey);
  applyTheme(savedTheme || systemTheme());
  button?.addEventListener("click", function () {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
  prefersDark.addEventListener("change", function (event) {
    if (!localStorage.getItem(storageKey)) applyTheme(event.matches ? "dark" : "light");
  });
})();
