const toast = document.querySelector("#toast");
const themeToggle = document.querySelector("#theme-toggle");
const menuButton = document.querySelector("#menu-button");
const sidebar = document.querySelector("#sidebar");

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
    showToast(`${title} gallery opened`);
  });
});

document.querySelector(".selection-footer a").addEventListener("click", () => {
  showToast("Selection workspace opened");
});

document.querySelector(".notification-button").addEventListener("click", () => {
  showToast("You have 1 new message from your photographer");
});
