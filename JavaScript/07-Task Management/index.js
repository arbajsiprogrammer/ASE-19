// localStorage.setItem("tasks", JSON.stringify([])); // for testing only, to reset the local storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks, "tasks from local storage");
let selectedPriority = "";
let selectedStatus = "";
let draggedTaskId = null;
let editingTaskId = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateId() {
  return Date.now().toString();
}

function getPriorityClasses(priority) {
  const map = {
    high: {
      bg: "bg-danger-subtle",
      text: "text-danger",
      label: "HIGH PRIORITY",
    },
    medium: {
      bg: "bg-warning-subtle",
      text: "text-warning",
      label: "MEDIUM PRIORITY",
    },
    low: {
      bg: "bg-success-subtle",
      text: "text-success",
      label: "LOW PRIORITY",
    },
  };
  return map[priority] || map.low;
}

function formatDate(dateStr) {
  console.log(dateStr);
  if (!dateStr) return "No due date";

  const d = new Date(dateStr);
  console.log(d.toDateString());
  return d.toDateString().split(" ").splice(1).toString().replaceAll(",", " ");
}

// Render tasks
function createCardHTML(task) {
  const assigneeText =
    !task.assignee || task.assignee == "All Team Members" ? "" : task.assignee;
  return `
    <div class="task-card"
         id="task-${task.id}"
         draggable="true"
         data-id="${task.id}"
         data-priority="${task.priority}"
         ondragstart="onDragStart(event)"
         ondragend="onDragEnd(event)">
      <div class="card-top-row">
        <span class="priority-tag ${task.priority}">${task.priority}</span>
        <div class="card-actions">
          <button class="card-action-btn task-edit-btn" data-id="${task.id}" >
            <i class="bi bi-pencil"></i>
          </button>
          <button class="card-action-btn delete task-delete-btn" data-id="${task.id}" >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div class="task-title">${task.title}</div>
      ${task.description ? `<div class="task-desc">${task.description}</div>` : ""}
      <div class="card-footer-row">
        ${assigneeText ? `<span class="assignee-tag">${assigneeText}</span>` : "<span class='assignee-tag' > Team </span>"}
        <span class="due-date">
          <i class="bi bi-calendar3"></i>${formatDate(task.dueDate)}
        </span>
      </div>
    </div>`;
}

function renderTasks(filteredTasks = null) {
  const list = filteredTasks || tasks;

  const todoList = document.getElementById("todo-card-list");
  const inProgressList = document.getElementById("inProgress-card-list");
  const completeList = document.getElementById("complete-card-list");

  // 1st resetting
  todoList.innerHTML = "";
  inProgressList.innerHTML = "";
  completeList.innerHTML = "";

  list.forEach((task) => {
    const html = createCardHTML(task);
    if (task.status == "todo") todoList.innerHTML += html;
    else if (task.status == "inProgress") inProgressList.innerHTML += html;
    else if (task.status == "complete") completeList.innerHTML += html;
  });

  updateCounts(list);
  attachCardEvents();
}

function updateCounts(list = tasks) {
  const counts = {
    todo: 0,
    inProgress: 0,
    complete: 0,
  };

  list.forEach((t) => {
    counts[t.status]++;
  });

  const cntEls = document.querySelectorAll(".cnt");
  cntEls[0].textContent = counts.todo;
  cntEls[1].textContent = counts.inProgress;
  cntEls[2].textContent = counts.complete;
}

// edit delete events
function attachCardEvents() {
  document.querySelectorAll(".task-delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      console.log(id);
      tasks = tasks.filter((t) => t.id != id);
      saveTasks();
      renderTasks();
    });
  });

  document.querySelectorAll(".task-edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      openEditModal(id);
    });
  });
}

// priority and status button selection  i modal
function setupModalButtons() {
  // priority btn in modal
  document.querySelectorAll(".create-modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".create-modal-btn")
        .forEach((b) => b.classList.remove("active-priority"));
      e.currentTarget.classList.add("active-priority");
      selectedPriority = e.currentTarget.name;
    });
  });

  // status buttons in the modal
  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".status-btn").forEach((b) => {
        b.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      selectedStatus = e.currentTarget.name;
    });
  });
}

//  Form Submit (Create Task)
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("form-task-title").value.trim();
  const description = document.getElementById("form-description").value.trim();
  const dueDate = document.getElementById("form-due-date").value;
  const assignee = document.getElementById("form-all-members").value;

  if (!title) {
    alert("Please enter a task title.");
    return;
  }
  if (!selectedPriority) {
    alert("Please select a priority.");
    return;
  }
  if (!selectedStatus) {
    alert("Please select a status.");
    return;
  }

  if (editingTaskId) {
    // Update existing task
    tasks = tasks.map((t) => {
      if (t.id == editingTaskId) {
        return {
          ...t,
          title,
          description,
          dueDate,
          assignee,
          priority: selectedPriority,
          status: selectedStatus,
        };
      } else {
        return t;
      }
    });
    editingTaskId = null;
    document.querySelector("#exampleModal .modal-title").textContent =
      "Create New Task";
    document.querySelector("#exampleModal [type='submit']").textContent =
      "Add Task";
  } else {
    // Create new task
    const newTask = {
      id: generateId(),
      title,
      description,
      priority: selectedPriority,
      status: selectedStatus,
      dueDate,
      assignee,
      createdDate: new Date().toISOString(),
    };
    tasks.push(newTask);
  }

  saveTasks();
  renderTasks();
  resetModal();

  // Close modal
  const modalEl = document.getElementById("exampleModal");
  bootstrap.Modal.getInstance(modalEl)?.hide();
});

// edit modal open
function openEditModal(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  editingTaskId = id;

  document.getElementById("form-task-title").value = task.title;
  document.getElementById("form-description").value = task.description || "";
  document.getElementById("form-due-date").value = task.dueDate || "";
  document.getElementById("form-all-members").value =
    task.assignee || "All Team Members";

  // set priority
  selectedPriority = task.priority;

  document.querySelectorAll(".create-modal-btn").forEach((b) => {
    b.classList.toggle("active-priority", b.name == task.priority);
  });

  // Set status
  selectedStatus = task.status;
  document.querySelectorAll(".status-btn").forEach((b) => {
    b.classList.toggle("active", b.name == task.status);
  });

  document.querySelector("#exampleModal .modal-title").textContent =
    "Edit Task";
  document.querySelector("#exampleModal [type='submit']").textContent =
    "Update Task";

  const modalEl = document.getElementById("exampleModal");
  new bootstrap.Modal(modalEl).show();
}

function resetModal() {
  document.getElementById("form").reset();
  selectedPriority = "";
  selectedStatus = "";
  editingTaskId = null;
  document
    .querySelectorAll(".create-modal-btn")
    .forEach((b) => b.classList.remove("active-priority"));

  document.querySelectorAll(".status-btn").forEach((b) => {
    b.classList.remove("active");
  });

  document.querySelector("#exampleModal .modal-title").textContent =
    "Create New Task";
  document.querySelector("#exampleModal [type='submit']").textContent =
    "Add Task";
}

// Reset modal state when i click on  closed
document
  .getElementById("exampleModal")
  .addEventListener("hidden.bs.modal", () => {
    resetModal();
  });

// Drag and Drop
function onDragStart(e) {
  draggedTaskId = e.currentTarget.dataset.id;
  e.currentTarget.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}

function onDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
}

["todo-card-list", "inProgress-card-list", "complete-card-list"].forEach(
  (listId) => {
    const el = document.getElementById(listId);

    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      el.classList.add("drag-over");
    });

    el.addEventListener("dragleave", () => {
      el.classList.remove("drag-over");
    });

    el.addEventListener("drop", (e) => {
      e.preventDefault();
      el.classList.remove("drag-over");

      const statusMap = {
        "todo-card-list": "todo",
        "inProgress-card-list": "inProgress",
        "complete-card-list": "complete",
      };
      const newStatus = statusMap[listId];

      tasks = tasks.map((t) =>
        t.id == draggedTaskId ? { ...t, status: newStatus } : t,
      );
      saveTasks();
      renderTasks();
      draggedTaskId = null;
    });
  },
);

//  search
document.getElementById("search-btn").addEventListener("click", applySearch);
document.getElementById("search-ip").addEventListener("keyup", (e) => {
  if (e.key === "Enter") applySearch();
  if (e.target.value.trim() == "") renderTasks();
});

function applySearch() {
  const query = document.getElementById("search-ip").value.trim().toLowerCase();
  if (!query) {
    renderTasks();
    return;
  }
  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(query));
  renderTasks(filtered);
}

// filter
const filterCard = document.getElementById("filter-card");
filterCard.style.display = "none";

document.getElementById("filter-button").addEventListener("click", () => {
  filterCard.style.display =
    filterCard.style.display == "none" ? "block" : "none";
});
// apply filter
document
  .getElementById("apply-filter-btn")
  .addEventListener("click", applyFilter);

function applyFilter() {
  const high = document.getElementById("priority-high").checked;
  const medium = document.getElementById("priority-Medium").checked;
  const low = document.getElementById("priority-low").checked;
  const today = document.getElementById("filter-due-today").checked;
  const sevenDays = document.getElementById("filter-due-7d").checked;
  const overdue = document.getElementById("filter-due-overdue").checked;
  const member = document.getElementById("filter-all-members").value;

  const now = new Date();
  console.log(now, "now inside filter apply");
  now.setHours(0, 0, 0, 0);

  console.log(now, "now inside filter apply");
  const in7Days = new Date(now);

  console.log(in7Days, "in7Days inside filter apply");
  in7Days.setDate(now.getDate() + 7);

  let filtered = [...tasks];

  // Priority filter
  const selectedPriorities = [];

  if (high) selectedPriorities.push("high");
  if (medium) selectedPriorities.push("medium");
  if (low) selectedPriorities.push("low");

  if (selectedPriorities.length > 0) {
    filtered = filtered.filter((t) => selectedPriorities.includes(t.priority));
  }

  // Due date filter
  if (today || sevenDays || overdue) {
    filtered = filtered.filter((t) => {
      if (!t.dueDate) return false;

      const due = new Date(t.dueDate);

      due.setHours(0, 0, 0, 0);

      console.log(
        due.getTime(),
        "due.getTime()",
        now.getTime(),
        "now.getTime()",
      );

      if (today && due.getTime() === now.getTime()) return true;
      if (sevenDays && due >= now && due <= in7Days) return true;
      if (overdue && due < now) return true;

      return false;
    });
  }

  // Member filter
  if (member && member != "All Team Members") {
    filtered = filtered.filter((t) => t.assignee == member);
  }

  renderTasks(filtered);
  filterCard.style.display = "none";
}

// clear filter
document
  .getElementById("clear-filter-btn")
  .addEventListener("click", clearFilter);

function clearFilter() {
  document.getElementById("priority-high").checked = false;
  document.getElementById("priority-Medium").checked = false;
  document.getElementById("priority-low").checked = false;
  document.getElementById("filter-due-today").checked = false;
  document.getElementById("filter-due-7d").checked = false;
  document.getElementById("filter-due-overdue").checked = false;
  document.getElementById("filter-all-members").value = "All Team Members";
  renderTasks();
  filterCard.style.display = "none";
}

setupModalButtons();
renderTasks();
