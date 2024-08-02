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
    lineWrapping: true, // Assure que le texte va à la ligne
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
    lineWrapping: true, // Assure que le texte va à la ligne
  }
);

const jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
  mode: "javascript",
  theme: "material",
  lineNumbers: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  tabSize: 2,
  lineWrapping: true, // Assure que le texte va à la ligne
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
  const js = jsEditor.getValue();

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
        <script>
          // Redefine console.log to output to the iframe
          (function() {
            const logContainer = document.createElement('div');
            document.body.appendChild(logContainer);

            const originalConsoleLog = console.log;
            console.log = function(message) {
              originalConsoleLog.apply(console, arguments);

              const logEntry = document.createElement('div');
              logEntry.textContent = message;
              logContainer.appendChild(logEntry);
            };
          })();
        <\/script>
        <script>
          ${js}
        <\/script>
      </body>
    </html>
  `;

  // Écrire le contenu dans l'iframe
  iframe.srcdoc = documentContent;
});
