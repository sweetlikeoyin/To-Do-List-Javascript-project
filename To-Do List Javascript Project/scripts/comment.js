import { commentTwo } from "./SectionOne.js";

const formAvatar = document.getElementById("form-avatar");
const avatarPopover = document.getElementById("avatar-popover");

// Click the avatar to toggle the profile popover
formAvatar.addEventListener("click", (e) => {
  e.stopPropagation();
  avatarPopover.classList.toggle("open");
});

// Click anywhere else closes it
document.addEventListener("click", (e) => {
  if (!e.target.closest(".avatar-popover") && e.target !== formAvatar) {
    avatarPopover.classList.remove("open");
  }
});

// comment javascript
const currentUser = {
  name: "Falowo Oyindamola",
  email: "@falowooyindamola2018@gmail.com",
};

let comments = JSON.parse(localStorage.getItem("comments")) || [];

const textInput = document.getElementById("text-input");
const postBtn = document.querySelector(".post-2");
const list = document.getElementById("comment-list");
const countEl = document.getElementById("comment-count");
const lastTimeEl = document.getElementById("last-comment-time");
const countTopEl = document.getElementById("comment-count-top");

const filterBtn = document.getElementById("filter-btn");
const filterDropdown = document.getElementById("filter-dropdown");
const filterLabel = filterBtn.querySelector(".filter-label");
const chevron = filterBtn.querySelector(".chevron");
let viewFilter = "all";

// Click "All ▾" to open/close the dropdown
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = filterDropdown.classList.toggle("open");
  chevron.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
});

// Click anywhere outside the dropdown closes it
document.addEventListener("click", (e) => {
  if (!e.target.closest(".filter-wrapper")) {
    filterDropdown.classList.remove("open");
    chevron.style.transform = "rotate(0deg)";
  }
});

// Click "All" inside the dropdown: show everyone's comments
filterDropdown
  .querySelector(".filter-all-btn")
  .addEventListener("click", () => {
    viewFilter = "all";
    filterLabel.textContent = "All";
    filterDropdown.classList.remove("open");
    chevron.style.transform = "rotate(0deg)";
    render();
  });

// Click "Your comments" inside the dropdown: show only your own
filterDropdown
  .querySelector(".filter-mine-btn")
  .addEventListener("click", () => {
    viewFilter = "mine";
    filterLabel.textContent = "Your comments";
    filterDropdown.classList.remove("open");
    chevron.style.transform = "rotate(0deg)";
    render();
  });

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

postBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = textInput.value.trim();
  if (!text) return;

  comments.push({
    id: Date.now(),
    name: currentUser.name,
    email: currentUser.email,
    text,
    time: Date.now(),
  });

  saveComments();
  textInput.value = "";
  render();
});

textInput.addEventListener("input", () => {
  if (textInput.value.trim().length > 0) {
    postBtn.classList.add("active");
  } else {
    postBtn.classList.remove("active");
  }
});

textInput.addEventListener("focus", () => {
  document.querySelector(".input-wrapper").classList.add("active");
});

textInput.addEventListener("blur", () => {
  document.querySelector(".input-wrapper").classList.remove("active");
});

function render() {
  countEl.textContent = `${comments.length} comment${comments.length !== 1 ? "s" : ""}`;
  countTopEl.textContent = comments.length;
  list.innerHTML = "";

  const toRender =
    viewFilter === "mine"
      ? comments.filter((c) => c.name === currentUser.name)
      : comments;

  toRender.forEach((comment) => {
    const li = document.createElement("li");
    li.className = "comment";
    li.dataset.id = comment.id;

    li.innerHTML = `
      <div class="comment-header">
      <span class="comment-avatar">${escapeHtml(comment.name.charAt(0).toUpperCase())}</span>
        <span class="comment-author">${escapeHtml(comment.name)}</span>
        <span class="comment-email">${escapeHtml(comment.email)}</span>
        <span class="comment-time">${timeAgo(comment.time)}</span>
      </div>
      <p class="comment-text">${escapeHtml(comment.text)}</p>
      <div class="menu-wrapper">
        <button class="menu-btn">⋯</button>
        <div class="menu-dropdown">
          <button class="edit-btn">Edit</button>
          <button class="copy-btn">Copy link</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
    list.appendChild(li);
  });
}

// One listener handles every comment's icon + dropdown buttons
list.addEventListener("click", (e) => {
  const li = e.target.closest(".comment");
  if (!li) return;
  const id = Number(li.dataset.id);
  const dropdown = li.querySelector(".menu-dropdown");

  if (e.target.classList.contains("menu-btn")) {
    const wasOpen = dropdown.classList.contains("open");
    closeAllMenus();
    if (!wasOpen) dropdown.classList.add("open");
    return;
  }

  if (e.target.classList.contains("delete-btn")) {
    comments = comments.filter((c) => c.id !== id);
    saveComments();
    render();
  }

  if (e.target.classList.contains("copy-btn")) {
    const url = `${location.href.split("#")[0]}#comment-${id}`;
    navigator.clipboard.writeText(url);
    e.target.textContent = "Copied!";
    setTimeout(() => dropdown.classList.remove("open"), 700);
  }

  if (e.target.classList.contains("edit-btn")) {
    const newText = prompt(
      "Edit comment:",
      comments.find((c) => c.id === id).text,
    );
    if (newText !== null && newText.trim()) {
      comments.find((c) => c.id === id).text = newText.trim();
      saveComments();
      render();
    }
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-wrapper")) closeAllMenus();
});

function closeAllMenus() {
  document
    .querySelectorAll(".menu-dropdown.open")
    .forEach((d) => d.classList.remove("open"));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}
render();
