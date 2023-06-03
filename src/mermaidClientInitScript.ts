/**
 * It appears that mermaid needs to happen on the client but dang-it, I want
 * to keep this as cheap as possible. This function will run on the client, and
 * we'll try to avoid pulling all of mermaid in if we can.
 *
 * To achieve this, we can take advantage of dynamic imports, only importing
 * mermaid if it looks like there is a reason to do so.
 *
 * Clearly, many markdown pages won't use mermaid. Pages that do use mermaid
 * will have elements of class `.mermaid`. So, if there are no `.mermaid`
 * classes, we'll just skip the import all-together, meaning that the only
 * client-side JavaScript is this tiny init function.
 */
export function lightweightMermaidInit() {
  window.addEventListener("DOMContentLoaded", () => {
    innerInit();
  });
}

function innerInit() {
  const elements = document.querySelector(".mermaid");
  if (elements !== null) {
    loadMermaid();
  }
}

function loadMermaid() {
  import("mermaid")
    .then((mermaid) => {
      mermaid.default.initialize({
        startOnLoad: true,
      });
      mermaid.default.run();
    })
    .catch(handleMermaidCannotLoad);
}

function handleMermaidCannotLoad() {
  // no-op for now... I wonder what we want to do here? This could happen for
  // users with old browsers (although I have no idea what transpiling Astro
  // performs or how compatibility the mermaid library is).
  alert(
    "Mermaid failed to initailize; you may see some strange unrendered mermaid " +
      "source code on the page. This issue may be resolved if you update your " +
      "web browser."
  );
}
