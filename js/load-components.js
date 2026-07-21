/**
 * Carga componentes HTML externos en contenedores del DOM.
 * Requiere servidor local (Live Server o python -m http.server).
 * Ejemplo: data-include="footer.html"
 */
async function loadComponents() {
  if (window.location.protocol === "file:") {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class="alert alert-warning text-center m-0 rounded-0" role="alert">
        No abras el archivo directo. Usa <strong>Live Server</strong>
        (clic derecho en index.html → Open with Live Server)
        o ejecuta en la terminal: <code>python -m http.server 5500</code>
      </div>`
    );
    return;
  }

  const placeholders = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...placeholders].map(async (el) => {
      const file = el.getAttribute("data-include");
      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`No se pudo cargar ${file}`);
        }
        el.outerHTML = await response.text();
      } catch (error) {
        console.error(error);
        el.innerHTML = `<p class="text-danger text-center p-3">Error al cargar: ${file}</p>`;
      }
    })
  );
}

document.addEventListener("DOMContentLoaded", loadComponents);
