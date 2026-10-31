/* Category-first achievement gallery. Photos stay hidden until a visitor opens a category. */
const galleryPhotos = [
  { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-01.jpg" },
  { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-02.jpg" },
  { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-03.jpg" },
  { category: "Awards & Recognition", icon: "✦", description: "Certificates, honors, and academic recognition.", file: "achievement-awards-04.jpg" },
  { category: "Clubs & Organizations", icon: "♧", description: "Clubs, organizations, and school involvement.", file: "achievement-clubs-01.jpg" },
  { category: "Clubs & Organizations", icon: "♧", description: "Clubs, organizations, and school involvement.", file: "achievement-clubs-02.jpg" },
  { category: "Leadership", icon: "♙", description: "Leadership roles and responsibilities.", file: "achievement-leadership-01.jpg" },
  { category: "Research & Projects", icon: "⌘", description: "Research work and product innovation.", file: "achievement-research-projects-01.jpg" },
  { category: "School Events", icon: "✧", description: "School activities, events, and memories.", file: "achievement-school-events-01.jpg" },
  { category: "School Events", icon: "✧", description: "School activities, events, and memories.", file: "achievement-school-events-02.jpg" },
  { category: "Scouting & Community Service", icon: "❀", description: "Scouting, community participation, and service.", file: "achievement-scouting-community-01.jpg" }
];

(() => {
  const root = document.querySelector('#editorial-gallery');
  if (!root) return;
  const groups = new Map();
  galleryPhotos.forEach(photo => {
    if (!groups.has(photo.category)) groups.set(photo.category, []);
    groups.get(photo.category).push(photo);
  });

  const cards = document.createElement('div');
  cards.className = 'achievement-category-grid';
  groups.forEach((photos, category) => {
    const first = photos[0];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'achievement-category-card';
    button.setAttribute('aria-label', `Open ${category} photo gallery`);
    button.innerHTML = `<span class="category-icon" aria-hidden="true">${first.icon}</span><span class="category-card-title"></span><span class="category-card-description"></span><span class="category-card-action">View photos <span aria-hidden="true">↗</span></span>`;
    button.querySelector('.category-card-title').textContent = category;
    button.querySelector('.category-card-description').textContent = first.description;
    button.addEventListener('click', () => openCategory(category, photos));
    cards.appendChild(button);
  });
  root.replaceChildren(cards);

  const modal = document.createElement('div');
  modal.className = 'achievement-modal';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'achievement-modal-title');
  modal.innerHTML = `<div class="achievement-modal-backdrop" data-close="true"></div><section class="achievement-modal-panel"><div class="achievement-modal-heading"><div><p class="eyebrow">PHOTO COLLECTION</p><h2 id="achievement-modal-title"></h2><p class="achievement-modal-description">A collection of moments and milestones.</p></div><button class="achievement-modal-close" type="button" aria-label="Close gallery">×</button></div><div class="achievement-modal-grid"></div></section>`;
  document.body.appendChild(modal);
  const closeButton = modal.querySelector('.achievement-modal-close');
  const modalGrid = modal.querySelector('.achievement-modal-grid');
  let previousFocus = null;

  function closeCategory() {
    modal.hidden = true;
    document.body.classList.remove('gallery-modal-open');
    if (previousFocus) previousFocus.focus();
  }
  function openCategory(category, photos) {
    previousFocus = document.activeElement;
    modal.querySelector('#achievement-modal-title').textContent = category;
    modalGrid.replaceChildren();
    photos.forEach((photo, index) => {
      const figure = document.createElement('figure');
      figure.className = 'achievement-modal-photo';
      const imageButton = document.createElement('button');
      imageButton.type = 'button';
      imageButton.className = 'achievement-image-button';
      imageButton.setAttribute('aria-label', `View photo ${index + 1} larger`);
      const img = document.createElement('img');
      img.src = `images/${photo.file}`;
      img.alt = `${category} photo ${index + 1}`;
      img.loading = 'lazy';
      imageButton.appendChild(img);
      imageButton.addEventListener('click', () => openLightbox(img.src, img.alt));
      figure.appendChild(imageButton);
      modalGrid.appendChild(figure);
    });
    modal.hidden = false;
    document.body.classList.add('gallery-modal-open');
    closeButton.focus();
  }
  closeButton.addEventListener('click', closeCategory);
  modal.addEventListener('click', event => { if (event.target.dataset.close === 'true') closeCategory(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (lightbox && !lightbox.hidden) closeLightbox();
      else if (!modal.hidden) closeCategory();
    }
  });

  const lightbox = document.createElement('div');
  lightbox.className = 'achievement-lightbox';
  lightbox.hidden = true;
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = `<button type="button" class="achievement-lightbox-close" aria-label="Close enlarged photo">×</button><img alt="">`;
  document.body.appendChild(lightbox);
  function openLightbox(src, alt) {
    const image = lightbox.querySelector('img');
    image.src = src; image.alt = alt;
    lightbox.hidden = false;
    lightbox.querySelector('button').focus();
  }
  function closeLightbox() { lightbox.hidden = true; }
  lightbox.querySelector('button').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
})();
