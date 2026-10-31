/* Category-first achievement gallery.
   Photos appear only after a visitor opens a category.
   Clicking a photo opens it in the larger lightbox.
*/
(() => {
  "use strict";

  const galleryRoot = document.querySelector("#editorial-gallery");
  if (!galleryRoot) return;

  const photos = [
    { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-01.jpg", caption: "Awards and academic recognition." },
    { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-02.jpg", caption: "Awards and academic recognition." },
    { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-03.jpg", caption: "Awards and academic recognition." },
    { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-04.jpg", caption: "Awards and academic recognition." },
    { category: "Leadership", icon: "♙", description: "Leadership roles and responsibilities.", file: "achievement-leadership-01.jpg", caption: "Leadership experiences and responsibilities." },
    { category: "Clubs & Organizations", icon: "♧", description: "Clubs, organizations, and school involvement.", file: "achievement-clubs-01.jpg", caption: "School clubs and organization memories." },
    { category: "Clubs & Organizations", icon: "♧", description: "Clubs, organizations, and school involvement.", file: "achievement-clubs-02.jpg", caption: "School clubs and organization memories." },
    { category: "School Events", icon: "✧", description: "School activities, events, and memories.", file: "achievement-school-events-01.jpg", caption: "Memories from school activities and events." },
    { category: "School Events", icon: "✧", description: "School activities, events, and memories.", file: "achievement-school-events-02.jpg", caption: "Memories from school activities and events." },
    { category: "Scouting & Community Service", icon: "❀", description: "Scouting, community participation, and service.", file: "achievement-scouting-community-01.jpg", caption: "Scouting, service, and community involvement." },
    { category: "Research & Projects", icon: "⌘", description: "Research work and product innovation.", file: "achievement-research-projects-01.jpg", caption: "Research and project documentation." }
  ];

  const categories = [];
  const groupedPhotos = new Map();
  photos.forEach((photo) => {
    if (!groupedPhotos.has(photo.category)) {
      groupedPhotos.set(photo.category, []);
      categories.push(photo.category);
    }
    groupedPhotos.get(photo.category).push(photo);
  });

  galleryRoot.replaceChildren();

  const categoryGrid = document.createElement("div");
  categoryGrid.className = "achievement-category-grid";

  const modal = document.createElement("div");
  modal.className = "achievement-modal";
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="achievement-modal-backdrop" data-close-gallery="true"></div>
    <section class="achievement-modal-panel" role="dialog" aria-modal="true" aria-labelledby="achievement-modal-title" tabindex="-1">
      <div class="achievement-modal-heading">
        <div>
          <p class="eyebrow">PHOTO COLLECTION</p>
          <h2 id="achievement-modal-title"></h2>
          <p class="achievement-modal-description"></p>
        </div>
        <button class="achievement-modal-close" type="button" aria-label="Close gallery">×</button>
      </div>
      <div class="achievement-modal-grid"></div>
    </section>`;
  document.body.appendChild(modal);

  const lightbox = document.createElement("div");
  lightbox.className = "achievement-lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `
    <button class="achievement-lightbox-close" type="button" aria-label="Close enlarged photo">×</button>
    <img alt="">
    <p class="achievement-lightbox-caption"></p>`;
  document.body.appendChild(lightbox);

  const modalTitle = modal.querySelector("#achievement-modal-title");
  const modalDescription = modal.querySelector(".achievement-modal-description");
  const modalGrid = modal.querySelector(".achievement-modal-grid");
  const modalPanel = modal.querySelector(".achievement-modal-panel");
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".achievement-lightbox-caption");
  let previousFocus = null;

  function openLightbox(photo) {
    lightboxImage.src = `images/${photo.file}`;
    lightboxImage.alt = `${photo.category}: ${photo.caption}`;
    lightboxCaption.textContent = photo.caption;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.querySelector(".achievement-lightbox-close").focus();
  }

  function closeLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
  }

  function closeGallery() {
    closeLightbox();
    if (modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-modal-open");
    if (previousFocus) previousFocus.focus();
  }

  function openGallery(category, trigger) {
    previousFocus = trigger;
    const categoryPhotos = groupedPhotos.get(category) || [];
    const firstPhoto = categoryPhotos[0];

    modalTitle.textContent = category;
    modalDescription.textContent = firstPhoto ? firstPhoto.description : "Explore photographs from this category.";
    modalGrid.replaceChildren();

    categoryPhotos.forEach((photo, index) => {
      const figure = document.createElement("figure");
      figure.className = "achievement-modal-photo";

      const imageButton = document.createElement("button");
      imageButton.type = "button";
      imageButton.className = "achievement-image-button";
      imageButton.setAttribute("aria-label", `View ${category} photo ${index + 1} larger`);

      const image = document.createElement("img");
      image.src = `images/${photo.file}`;
      image.alt = `${category} photo ${index + 1}`;
      image.loading = "lazy";
      image.decoding = "async";

      imageButton.appendChild(image);
      imageButton.addEventListener("click", () => openLightbox(photo));

      const caption = document.createElement("figcaption");
      caption.textContent = photo.caption;

      figure.append(imageButton, caption);
      modalGrid.appendChild(figure);
    });

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-modal-open");
    modal.querySelector(".achievement-modal-close").focus();
  }

  categories.forEach((category) => {
    const categoryPhotos = groupedPhotos.get(category);
    const firstPhoto = categoryPhotos[0];

    const card = document.createElement("button");
    card.type = "button";
    card.className = "achievement-category-card searchable-item";
    card.setAttribute("aria-label", `Open ${category} photo gallery`);
    card.innerHTML = `
      <span class="category-icon" aria-hidden="true"></span>
      <span class="category-card-title"></span>
      <span class="category-card-description"></span>
      <span class="category-card-action">View photos <span aria-hidden="true">↗</span></span>`;
    card.querySelector(".category-icon").textContent = firstPhoto.icon;
    card.querySelector(".category-card-title").textContent = category;
    card.querySelector(".category-card-description").textContent = firstPhoto.description;
    card.addEventListener("click", () => openGallery(category, card));
    categoryGrid.appendChild(card);
  });

  galleryRoot.appendChild(categoryGrid);

  modal.querySelector(".achievement-modal-close").addEventListener("click", closeGallery);
  modal.addEventListener("click", (event) => {
    if (event.target.dataset.closeGallery === "true") closeGallery();
  });

  lightbox.querySelector(".achievement-lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!lightbox.hidden) closeLightbox();
    else if (!modal.hidden) closeGallery();
  });
})();
