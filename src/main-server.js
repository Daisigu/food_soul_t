import { basename } from "node:path";

import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { createPinia } from "pinia";
import App from "./App.vue";

export async function render(url, manifest = null) {
  const pinia = createPinia();
  const app = createSSRApp(App);
  app.use(pinia);

  const ctx = {
    modules: [],
  };
  const html = await renderToString(app);
  let preloadLinks = "";
  if (manifest) {
    renderPreloadLinks(ctx.modules, manifest);
  }

  return [html, preloadLinks];
}

function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file) {
  switch (true) {
    case file.endsWith(".js"):
      return `<link rel="modulepreload" crossorigin href="${file}">`;
    case file.endsWith(".css"):
      return `<link rel="stylesheet" href="${file}">`;
    case file.endsWith(".woff"):
      return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
    case file.endsWith(".woff2"):
      return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
    case file.endsWith(".gif"):
      return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
    case file.endsWith(".jpg"):
    case file.endsWith(".jpeg"):
      return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`;
    case file.endsWith(".png"):
      return `<link rel="preload" href="${file}" as="image" type="image/png">`;
    default:
      return "";
  }
}
