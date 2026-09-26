const todoList = [];

const addButton = document.querySelector(".js-add-up");
const dailyBtn = document.querySelector(".js-daily");
const nightBtn = document.querySelector(".js-nights-toogle");
const taskE1 = document.querySelector(".js-task");
const input = document.querySelector(".holder");
const dayList = document.querySelector(".wrapper-1");
const nightList = document.querySelector(".combination");

let activeMode = "day";

const checkedCheckboxSVG = `
  <svg class="js-checkbox" width="20" height="24" viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="black" stroke="black" stroke-width="2"/>
    <path d="M6 12l4 4 8-8" stroke="white" stroke-width="2.5" fill="none"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const blankCheckboxIMG = `<img class="js-checkbox" style="width: 20px; cursor:pointer;" src="img/icons8-blank-checkbox-50.png" />`;

function updateProgress(containerSelector, items, fillSelector, labelSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const total = items.length;
  const checked = items.filter((item) => item.done).length;
  const percent = total === 0 ? 0 : (checked / total) * 100;

  const fillEl = container.querySelector(fillSelector);
  const labelEl = container.querySelector(labelSelector);

  if (fillEl) fillEl.style.width = `${percent}%`;
  if (labelEl) labelEl.textContent = `${checked}/${total}`;
}

function updateDayProgress() {
  const dayItems = todoList.filter((item) => item.mode === "day");
  updateProgress(".roll-1", dayItems, ".fill", ".numbers p");
}

function updateNightProgress() {
  const nightItems = todoList.filter((item) => item.mode === "night");
  updateProgress(".calm-1", nightItems, ".up", ".numbers-2 .three");
}

function toggleCheckbox(checkboxEl, todoItem) {
  const parent = checkboxEl.parentElement;
  const textEl = parent.querySelector("h3, h4, p");
  const isChecked =
    checkboxEl.tagName === "svg" || checkboxEl.tagName === "SVG";

  const temp = document.createElement("div");
  temp.innerHTML = isChecked ? blankCheckboxIMG : checkedCheckboxSVG;
  const newCheckbox = temp.firstElementChild;

  checkboxEl.replaceWith(newCheckbox);
  newCheckbox.addEventListener("click", () =>
    toggleCheckbox(newCheckbox, todoItem),
  );

  if (textEl) {
    textEl.style.textDecoration = isChecked ? "none" : "line-through";
  }

  todoItem.done = !isChecked;

  if (todoItem.mode === "day") {
    updateDayProgress();
  } else {
    updateNightProgress();
  }
}

addButton.addEventListener("click", addTodo);

function addTodo() {
  const name = input.value.trim();
  if (!name) return;

  const modeAtCreation = activeMode;
  const todoItem = { name, mode: modeAtCreation, done: false };
  todoList.push(todoItem);

  const newTask = document.createElement("div");

  if (modeAtCreation === "day") {
    newTask.className = "meditation";
    newTask.innerHTML = `
      <svg style="width: 20px; color: oklch(0.666 0.179 58.318); display: block"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
      <img class="js-checkbox" style="width: 20px; cursor:pointer;" src="img/icons8-blank-checkbox-50.png" />
      <h3 class="gratitude">${name}</h3>
      <svg class="delete-1 js-delete" style="width: 18px" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    `;
    dayList.appendChild(newTask);
  } else {
    newTask.className = "good";
    newTask.innerHTML = `
      <svg style="width: 20px; color: blue; display: block"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
      <img class="js-checkbox" style="width: 20px; cursor:pointer;" src="img/icons8-blank-checkbox-50.png" />
      <h4 class="book">${name}</h4>
      <svg class="delete-4 js-delete" style="width: 18px; margin-right: 10px; margin-top: 5px"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    `;
    nightList.appendChild(newTask);
  }

  attachTaskEvents(newTask, todoItem);
  input.value = "";

  if (modeAtCreation === "day") {
    updateDayProgress();
  } else {
    updateNightProgress();
  }
}

function attachTaskEvents(taskEl, todoItem) {
  const checkbox = taskEl.querySelector(".js-checkbox");
  const deleteBtn = taskEl.querySelector(".js-delete");

  checkbox.addEventListener("click", () => toggleCheckbox(checkbox, todoItem));

  deleteBtn.addEventListener("click", () => {
    const idx = todoList.indexOf(todoItem);
    if (idx > -1) todoList.splice(idx, 1);
    taskEl.remove();

    if (todoItem.mode === "day") {
      updateDayProgress();
    } else {
      updateNightProgress();
    }
  });
}

function initExistingTasks() {
  const dayTaskEls = dayList.querySelectorAll(":scope > div:not(.roll-1)");
  dayTaskEls.forEach((el) => {
    const textEl = el.querySelector("h3, h4, p");
    const todoItem = {
      name: textEl ? textEl.textContent.trim() : "",
      mode: "day",
      done: false,
    };
    todoList.push(todoItem);
    attachTaskEvents(el, todoItem);
  });

  const nightTaskEls = nightList.querySelectorAll(":scope > div");
  nightTaskEls.forEach((el) => {
    const textEl = el.querySelector("h3, h4, p");
    const todoItem = {
      name: textEl ? textEl.textContent.trim() : "",
      mode: "night",
      done: false,
    };
    todoList.push(todoItem);
    attachTaskEvents(el, todoItem);
  });

  updateDayProgress();
  updateNightProgress();
}

initExistingTasks();

dailyBtn.classList.add("active");

dailyBtn.addEventListener("click", () => {
  activeMode = "day";
  dailyBtn.classList.add("active");
  nightBtn.classList.remove("active");
  taskE1.style.backgroundColor = "oklch(.987 .022 95.277)";
  input.placeholder = "What energizes your day?";
});

nightBtn.addEventListener("click", () => {
  activeMode = "night";
  nightBtn.classList.add("active");
  dailyBtn.classList.remove("active");
  taskE1.style.backgroundColor = "oklch(.962 .018 272.314)";
  input.placeholder = "What brings peace to your evening?";
});

export function sectionOne() {
  console.log("Hello from SectionOne!");
}
