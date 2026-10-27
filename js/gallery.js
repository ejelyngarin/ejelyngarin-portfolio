/* Achievement gallery: displays only the 11 photographs supplied in the latest achievements ZIP.
   Category-based filenames determine each photo's section. No photo counters or empty placeholders. */
const galleryPhotos = [
  {
    "category": "Awards & Recognition",
    "title": "Awards & Recognition",
    "caption": "Awards & Recognition photograph.",
    "file": "achievement-awards-01.jpg"
  },
  {
    "category": "Awards & Recognition",
    "title": "Awards & Recognition",
    "caption": "Awards & Recognition photograph.",
    "file": "achievement-awards-02.jpg"
  },
  {
    "category": "Awards & Recognition",
    "title": "Awards & Recognition",
    "caption": "Awards & Recognition photograph.",
    "file": "achievement-awards-03.jpg"
  },
  {
    "category": "Awards & Recognition",
    "title": "Awards & Recognition",
    "caption": "Awards & Recognition photograph.",
    "file": "achievement-awards-04.jpg"
  },
  {
    "category": "Clubs & Organizations",
    "title": "Clubs & Organizations",
    "caption": "Clubs & Organizations photograph.",
    "file": "achievement-clubs-01.jpg"
  },
  {
    "category": "Clubs & Organizations",
    "title": "Clubs & Organizations",
    "caption": "Clubs & Organizations photograph.",
    "file": "achievement-clubs-02.jpg"
  },
  {
    "category": "Leadership",
    "title": "Leadership",
    "caption": "Leadership photograph.",
    "file": "achievement-leadership-01.jpg"
  },
  {
    "category": "Research & Projects",
    "title": "Research & Projects",
    "caption": "Research & Projects photograph.",
    "file": "achievement-research-projects-01.jpg"
  },
  {
    "category": "School Events",
    "title": "School Events",
    "caption": "School Events photograph.",
    "file": "achievement-school-events-01.jpg"
  },
  {
    "category": "School Events",
    "title": "School Events",
    "caption": "School Events photograph.",
    "file": "achievement-school-events-02.jpg"
  },
  {
    "category": "Scouting & Community Service",
    "title": "Scouting & Community Service",
    "caption": "Scouting & Community Service photograph.",
    "file": "achievement-scouting-community-01.jpg"
  }
];

(function renderEditorialGallery() {
  const gallery = document.querySelector("#editorial-gallery");
  if (!gallery) return;
  gallery.replaceChildren();

  const grouped = new Map();
  galleryPhotos.forEach(photo => {
    if (!grouped.has(photo.category)) grouped.set(photo.category, []);
    grouped.get(photo.category).push(photo);
  });

  grouped.forEach((photos, category) => {
    const section = document.createElement("section");
    section.className = "gallery-category-group searchable-item" + (photos.length === 1 ? " single-photo-category" : "");

    const heading = document.createElement("h3");
    heading.className = "gallery-category-title";
    heading.textContent = category;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "gallery-category-grid";

    photos.forEach(photo => {
      const card = document.createElement("article");
      card.className = "gallery-card searchable-item";
      const photoWrap = document.createElement("div");
      photoWrap.className = "gallery-photo";
      const img = document.createElement("img");
      img.className = "gallery-image";
      img.src = "images/" + photo.file;
      img.alt = category;
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => card.remove());
      photoWrap.appendChild(img);
      card.appendChild(photoWrap);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    gallery.appendChild(section);
  });
})();
