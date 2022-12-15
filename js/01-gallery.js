import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup();

function createGalleryMarkup() {
  return galleryItems
    .map(({ preview, description, original }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a>
      </div>`;
    })
    .join("");
}

galleryEl.insertAdjacentHTML("afterbegin", galleryMarkup);

galleryEl.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">`);

  instance.show();

  window.addEventListener("keydown", onEscPress);

  function onEscPress(event) {
    if (event.code === "Escape") {
      instance.close();

      window.removeEventListener("keydown", onEscPress);
    }
  }
}
