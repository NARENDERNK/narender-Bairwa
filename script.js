const toast = document.querySelector("#toast");
const themeToggle = document.querySelector("#theme-toggle");
const menuButton = document.querySelector("#menu-button");
const sidebar = document.querySelector("#sidebar");
const galleryModal = document.querySelector("#gallery-modal");
const galleryGrid = document.querySelector("#gallery-grid");
const galleryTitle = document.querySelector("#gallery-title");
const favoriteCount = document.querySelector("#favorite-count");
const photos = [
  "photo-1519741497674-611481863552", "photo-1511285560929-80b456fea0bc",
  "photo-1597157639073-69284dc551a1", "photo-1544078751-58fee2d8a03b",
  "photo-1464366400600-7168b8af9bc3", "photo-1519225421980-715cb0215aed",
  "photo-1523438885200-e635ba2c371e", "photo-1518621736915-f3b1c41bfd00",
];
const mediaState = photos.map((photo, index) => ({ photo, favorite: index < 2, selected: index < 3 }));

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
  showToast(document.body.classList.contains("dark") ? "Dark mode enabled" : "Light mode enabled");
});

menuButton.addEventListener("click", () => sidebar.classList.toggle("open"));

document.querySelectorAll(".nav-item, .primary-button, .section-heading a").forEach((link) => {
  link.addEventListener("click", () => {
    if (link.classList.contains("nav-item")) {
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
    sidebar.classList.remove("open");
  });
});

document.querySelectorAll(".memory-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    openGallery(title);
  });
});

document.querySelector(".selection-footer a").addEventListener("click", () => {
  showToast("Selection workspace opened");
});

document.querySelector(".notification-button").addEventListener("click", () => {
  showToast("You have 1 new message from your photographer");
});

function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";
  mediaState.forEach((item, index) => {
    const visible = filter === "all" || (filter === "favorites" && item.favorite) || (filter === "selected" && item.selected);
    const photo = document.createElement("div");
    photo.className = `gallery-item ${item.selected ? "selected" : ""} ${visible ? "" : "hidden"}`;
    photo.style.backgroundImage = `url("https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=500&q=80")`;
    photo.innerHTML = `<button class="${item.favorite ? "active" : ""}" aria-label="${item.favorite ? "Remove from favorites" : "Add to favorites"}">${item.favorite ? "♥" : "♡"}</button>`;
    photo.addEventListener("click", (event) => {
      if (!event.target.matches("button")) {
        item.selected = !item.selected;
        renderGallery(filter);
        showToast(item.selected ? "Photo added to your album selection" : "Photo removed from selection");
      }
    });
    photo.querySelector("button").addEventListener("click", () => {
      item.favorite = !item.favorite;
      favoriteCount.textContent = mediaState.filter((entry) => entry.favorite).length;
      renderGallery(filter);
      showToast(item.favorite ? "Added to favorites" : "Removed from favorites");
    });
    galleryGrid.append(photo);
  });
}

function openGallery(title) {
  galleryTitle.textContent = title;
  renderGallery();
  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  galleryModal.classList.remove("open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector("#close-gallery").addEventListener("click", closeGallery);
galleryModal.addEventListener("click", (event) => {
  if (event.target === galleryModal) closeGallery();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeGallery();
});
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderGallery(button.dataset.filter);
  });
});
document.querySelector("#download-button").addEventListener("click", () => {
  const count = mediaState.filter((item) => item.selected).length;
  showToast(count ? `Preparing ${count} selected photos for download` : "Select photos before downloading");
});
