/* Achievement gallery: category cards open a photo modal; photos open a larger lightbox. */
const galleryPhotos = [
  { category: "Awards & Recognition", title: "Awards & Recognition", caption: "Awards and recognition memories.", file: "achievement-awards-01.jpg" },
  { category: "Awards & Recognition", title: "Awards & Recognition", caption: "Awards and recognition memories.", file: "achievement-awards-02.jpg" },
  { category: "Awards & Recognition", title: "Awards & Recognition", caption: "Awards and recognition memories.", file: "achievement-awards-03.jpg" },
  { category: "Awards & Recognition", title: "Awards & Recognition", caption: "Awards and recognition memories.", file: "achievement-awards-04.jpg" },
  { category: "Clubs & Organizations", title: "Clubs & Organizations", caption: "School clubs and organization memories.", file: "achievement-clubs-01.jpg" },
  { category: "Clubs & Organizations", title: "Clubs & Organizations", caption: "School clubs and organization memories.", file: "achievement-clubs-02.jpg" },
  { category: "Leadership", title: "Leadership", caption: "Leadership experiences and responsibilities.", file: "achievement-leadership-01.jpg" },
  { category: "Research & Projects", title: "Research & Projects", caption: "Research and project documentation.", file: "achievement-research-projects-01.jpg" },
  { category: "School Events", title: "School Events", caption: "Memories from school activities and events.", file: "achievement-school-events-01.jpg" },
  { category: "School Events", title: "School Events", caption: "Memories from school activities and events.", file: "achievement-school-events-02.jpg" },
  { category: "Scouting & Community Service", title: "Scouting & Community Service", caption: "Scouting, service, and community involvement.", file: "achievement-scouting-community-01.jpg" }
];

const categoryDetails = {
  "Awards & Recognition": { icon: "✧", description: "Certificates, honors, and moments of recognition." },
  "Leadership": { icon: "♧", description: "Roles, responsibilities, and opportunities to lead." },
  "Clubs & Organizations": { icon: "◎", description: "The clubs and school organizations I took part in." },
  "School Events": { icon: "◇", description: "Activities, performances, and memories from school." },
  "Scouting & Community Service": { icon: "❋", description: "Scouting experiences, preparedness, and community service." },
  "Research & Projects": { icon: "⌘", description: "Research work, projects, and creative exploration." }
};

(function renderEditorialGallery() {
  const gallery = document.querySelector("#editorial-gallery");
  if (!gallery) return;
  gallery.replaceChildren();

  const grouped = new Map();
  galleryPhotos.forEach(photo => {
    if (!grouped.has(photo.category)) grouped.set(photo.category, []);
    grouped.get(photo.category).push(photo);
  });

  const categoryGrid = document.createElement("div");
  categoryGrid.className = "achievement-category-grid";

  const modal = document.createElement("div");
  modal.className = "achievement-gallery-modal";
  modal.id = "achievement-gallery-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="achievement-gallery-panel" role="dialog" aria-modal="true" aria-labelledby="achievement-modal-title" tabindex="-1">
      <button class="achievement-modal-close" type="button" aria-label="Close gallery">×</button>
      <p class="eyebrow">PHOTO COLLECTION</p>
      <h2 id="achievement-modal-title"></h2>
      <p class="achievement-modal-intro"></p>
      <div class="achievement-modal-grid"></div>
    </div>`;
  document.body.appendChild(modal);

  const lightbox = document.createElement("div");
  lightbox.className = "achievement-lightbox";
  lightbox.id = "achievement-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button class="achievement-lightbox-close" type="button" aria-label="Close enlarged photo">×</button>
    <img alt="" src="">
    <p></p>`;
  document.body.appendChild(lightbox);

  const modalPanel = modal.querySelector(".achievement-gallery-panel");
  const modalTitle = modal.querySelector("#achievement-modal-title");
  const modalIntro = modal.querySelector(".achievement-modal-intro");
  const modalGrid = modal.querySelector(".achievement-modal-grid");
  let previousFocus = null;

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.querySelector("img").src = "";
  }
  function closeModal() {
    closeLightbox();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-modal-open");
    if (previousFocus) previousFocus.focus();
  }
  function openLightbox(photo) {
    const img = lightbox.querySelector("img");
    img.src = "images/" + photo.file;
    img.alt = photo.title;
    lightbox.querySelector("p").textContent = photo.caption;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.querySelector(".achievement-lightbox-close").focus();
  }
  function openCategory(category, trigger) {
    previousFocus = trigger;
    const details = categoryDetails[category] || {};
    modalTitle.textContent = category;
    modalIntro.textContent = details.description || "Explore photographs from this category.";
    modalGrid.replaceChildren();
    grouped.get(category).forEach(photo => {
      const item = document.createElement("figure");
      item.className = "achievement-modal-photo";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "achievement-photo-open";
      button.setAttribute("aria-label", "View larger: " + photo.title);
      const img = document.createElement("img");
      img.src = "images/" + photo.file;
      img.alt = photo.title;
      img.loading = "lazy";
      img.decoding = "async";
      button.appendChild(img);
      button.addEventListener("click", () => openLightbox(photo));
      const caption = document.createElement("figcaption");
      caption.textContent = photo.caption;
      item.append(button, caption);
      modalGrid.appendChild(item);
    });
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-modal-open");
    modal.querySelector(".achievement-modal-close").focus();
  }

  grouped.forEach((photos, category) => {
    const details = categoryDetails[category] || { icon: "✧", description: "Explore this collection." };
    const card = document.createElement("button");
    card.type = "button";
    card.className = "achievement-category-card searchable-item";
    card.innerHTML = `<span class="achievement-category-icon" aria-hidden="true">${details.icon}</span><span class="achievement-category-name"></span><span class="achievement-category-description"></span><span class="achievement-category-action">Explore photos <span aria-hidden="true">↗</span></span>`;
    card.querySelector(".achievement-category-name").textContent = category;
    card.querySelector(".achievement-category-description").textContent = details.description;
    card.addEventListener("click", () => openCategory(category, card));
    categoryGrid.appendChild(card);
  });
  gallery.appendChild(categoryGrid);

  modal.querySelector(".achievement-modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  lightbox.querySelector(".achievement-lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (lightbox.classList.contains("open")) closeLightbox();
      else if (modal.classList.contains("open")) closeModal();
    }
  });
})();
