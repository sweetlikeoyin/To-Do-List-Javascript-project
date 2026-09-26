import { sectionOne } from "./todo.js";

const previewBtn = document.querySelector(".preview-3");

if (previewBtn) {
  previewBtn.addEventListener("click", () => {
    const section = document.querySelector(".scroll-bar");
    if (!section) return;

    const clone = section.cloneNode(true);
    clone.classList.remove("scroll-bar");
    const innerWrapper = clone.querySelector(".scroll-bar-inner");
    if (innerWrapper) innerWrapper.classList.remove("scroll-bar-inner");

    const previewInClone = clone.querySelector(".preview-3");
    if (previewInClone) previewInClone.remove();

    const reloadInClone = clone.querySelector(".reloading");
    if (reloadInClone) reloadInClone.remove();

    const headHTML = document.head.innerHTML;
    const bodyHTML = clone.outerHTML;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      `<!DOCTYPE html><html><head><base href="${window.location.href}">${headHTML}</head><body>${bodyHTML}</body></html>`,
    );
    newWindow.document.close();

    const scriptSrcs = [
      "scripts/todo.js",
      "scripts/comment.js",
      "scripts/SectionOne.js",
    ];

    scriptSrcs.forEach((src) => {
      const scriptEl = newWindow.document.createElement("script");
      scriptEl.type = "module";
      scriptEl.src = src;
      newWindow.document.body.appendChild(scriptEl);
    });
  });
}

const reloadBtn = document.querySelector(".reloading");

if (reloadBtn) {
  reloadBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

export function commentTwo() {}
sectionOne();
