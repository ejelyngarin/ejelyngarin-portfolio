# Ejelyn C. Garin — Personal Academic Portfolio

## Project structure
- `index.html` — homepage
- `personal.html` — personal profile, full education history, interests, and career direction
- `parents.html` — interactive family tribute
- `achievements.html` — academic awards, school involvement, and gallery
- `css/style.css` — shared styles
- `js/script.js` — navigation and page search
- `js/interest-modal.js` — interest cards and resources
- `js/family-letters.js` — family tribute pop-ups
- `js/gallery.js` — gallery entries
- `images/` — profile, family photos, school logos, and gallery photos

## Add multiple gallery photos
1. Copy each image into `images/`.
2. Open `js/gallery.js`.
3. Add a new object to `galleryPhotos` for each image, using its exact filename and a meaningful title/caption.
4. Use unique names such as `achievement-awards-01.jpg`, `achievement-awards-02.jpg`.
5. Keep the real file extension (`.jpg`, `.jpeg`, or `.png`) in the entry.

GitHub Pages does not automatically detect every image in a folder; each gallery photo must be listed in `js/gallery.js`.

Achievement photos: The photos supplied in `achievements.zip` have been copied into `images/` and registered in `js/gallery.js`. To add more photos, place them in `images/` and add entries to the gallery list.
