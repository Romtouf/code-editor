// script.js

// Initialisation de CodeMirror pour chaque éditeur
const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById("html-editor"),
  {
    mode: "xml",
    theme: "material", // Thème par défaut
    lineNumbers: true,
    autoCloseTags: true,
    tabSize: 2,
  }
);

const cssEditor = CodeMirror.fromTextArea(
  document.getElementById("css-editor"),
  {
    mode: "css",
    theme: "material",
    lineNumbers: true,
    autoCloseBrackets: true,
    tabSize: 2,
  }
);

const jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
  mode: "javascript",
  theme: "material",
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  tabSize: 2,
});

// Changer de thème
document.getElementById("theme-selector").addEventListener("change", (e) => {
  const theme = e.target.value;
  htmlEditor.setOption("theme", theme);
  cssEditor.setOption("theme", theme);
  jsEditor.setOption("theme", theme);
});

// Activer le mode sombre
document.getElementById("dark-mode-toggle").addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

// Exécution du code HTML/CSS/JS
document.getElementById("run-btn").addEventListener("click", () => {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;

  const iframe = document.getElementById("output-frame");
  const documentContent = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${css}
      </head>
      <body>
        ${html}
        ${js}
      </body>
    </html>
  `;

  // Écrire le contenu dans l'iframe
  iframe.srcdoc = documentContent;
});
