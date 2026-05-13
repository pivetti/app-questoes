export function ThemeScript() {
  const script = `
    (function () {
      try {
        var storedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
          document.documentElement.classList.add("dark");
        }
      } catch (_) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
