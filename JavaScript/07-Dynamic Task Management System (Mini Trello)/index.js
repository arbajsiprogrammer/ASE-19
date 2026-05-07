const ele_filter_card = document.getElementById("filter-card");
const ele_filter_button = document.getElementById("filter-button");
// const ele_due_date = document.getElementById("form-due-date");
const ele_form = document.getElementById("form");
const ele_form_task_title = document.getElementById("form-task-title");
const ele_form_description = document.getElementById("form-description");
const ele_form_due_date = document.getElementById("form-due-date");
const ele_priority_btns = document.querySelectorAll(".create-modal-btn");
const ele_status_btns = document.querySelectorAll(".status-btn");
const ele_todo_card_list = document.getElementById("todo-card-list");
const ele_inProgress_card_list = document.getElementById(
  "inProgress-card-list",
);
const ele_complete_card_list = document.getElementById("complete-card-list");

const ele_cnt = document.querySelectorAll(".cnt");
const ele_search_ip = document.getElementById("search-ip");
const ele_search_btn = document.getElementById("search-btn");
const taskList = localStorage.getItem("taskList")
  ? JSON.parse(localStorage.getItem("taskList"))
  : [];

if (taskList.length > 0) {
  renderTaskList(taskList);
}
const ele_card = document.querySelectorAll(".card");
const ele_edit_btn = document.querySelectorAll(".edit-btn");
const ele_delete_btn = document.querySelectorAll(".delete-btn");

// console.log("ele_create_model_btn...", ele_create_model_btn);

// filter toggle logic
toggleDisplayFilter();
ele_filter_button.addEventListener("click", toggleDisplayFilter);
function toggleDisplayFilter() {
  console.log("btn clicked");
  if (ele_filter_card.style.display == "none") {
    ele_filter_card.style.display = "block";
  } else {
    ele_filter_card.style.display = "none";
  }
}
// create model form logic
// ele_create_model_btn.forEach((btn) => {
//   console.log("inside forEach");
//   btn.addEventListener("click", changeCreateBtnStyle);
// });

// function changeCreateBtnStyle(event) {
//   console.log("btn event ", event.target);
//   const element = event.target;

//   element.classList.toggle("active");
// }

const todays_date = new Date().toISOString(); // creating min due date dynamically
console.log(todays_date);
// getting in 2026-04-30T05:44:15.053Z this format

ele_form_due_date.min = todays_date.split("T")[0];

// handling priority buttons
ele_priority_btns.forEach((btn) => {
  btn.addEventListener("click", checkPriority);
});
let priority = "";
function checkPriority(e) {
  e.target.classList.toggle("active");
  console.log(e.target);

  if (priority == e.target.name) {
    priority = "";
  } else {
    priority = e.target.name;
  }
  console.log("Priority...", priority);
}

// handling status buttons
ele_status_btns.forEach((btn) => {
  btn.addEventListener("click", checkStatus);
});
let completeStatus = "";
function checkStatus(e) {
  console.log(e.target);
  if (completeStatus == e.target.name) {
    completeStatus = "";
  } else {
    completeStatus = e.target.name;
  }
  console.log("status...", completeStatus);
}

// handling form add
ele_form.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(e) {
  e.preventDefault();
  const task = {};
  const title = ele_form_task_title.value;
  const description = ele_form_description.value;
  const due_date = ele_form_due_date.value;
  console.log("due_date...", due_date);

  task.title = title;
  task.description = description;
  task.due_date = due_date;
  task.priority = priority;
  task.status = completeStatus;
  task._id = Date.now().toString();
  taskList.push(task);
  console.log(taskList);
  localStorage.setItem("taskList", JSON.stringify(taskList));

  handleResetForm();
  renderTaskList(taskList);
}

// style = "display: block; height: auto;";
function renderTaskList(list) {
  let todoHtml = "";
  let inProgressHtml = "";
  let completeHtml = "";
  let todoCnt = 0;
  let inProgressCnt = 0;
  let completeCnt = 0;

  ele_todo_card_list.innerHTML = "";
  ele_inProgress_card_list.innerHTML = "";
  ele_complete_card_list.innerHTML = "";

  list.forEach((task) => {
    let priority_bg = "";

    switch (task.priority) {
      case "low":
        priority_bg = "success";
        break;
      case "medium":
        priority_bg = "warning";
        break;
      case "high":
        priority_bg = "danger";
        break;
      default:
        priority_bg = "";
    }

    if (task.status == "todo") {
      todoCnt += 1;
      todoHtml += `<div class="card shadow-lg justify-content-evenly p-3 mb-2" draggable="true" >
                  <div class="d-flex justify-content-between px-2">
                    <div
                      class="remark bg-${priority_bg}-subtle text-${priority_bg} fw-bold px-3 py-1 rounded-5"
                    >
                      ${task.priority.toUpperCase()} PRIORITY
                    </div>
                    <div>
                     <button class="btn btn-outline-primary me-1"> 
                      <i class="bi bi-pencil edit-btn" 
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal" id="edit-${task._id}" ></i>
                    </button>  
                    <button class="btn btn-outline-danger ">
                      <i class="bi bi-trash delete-btn" id ="delete-${task._id}"></i>
                    </button>
                    </div>
                  </div>
                  <h1 class="my-3">${task.title}</h1>
                  <p class="text-secondary fs-5">
                    ${task.description}
                  </p>

                  <div class="d-flex justify-content-end">
                    <img src="./Image/student0${Math.floor(Math.random() * 6) + 1}.png" class="card-img" alt="img" />
                    <p class="my-auto text-secondary">
                      <i class="bi bi-calendar"></i> ${task.due_date}
                    </p>
                  </div>
                </div>`;
    } else if (task.status == "inProgress") {
      inProgressCnt += 1;
      inProgressHtml += `<div class="card shadow-lg justify-content-evenly p-3">
                  <div class="d-flex justify-content-between px-2">
                    <div
                      class="remark bg-${priority_bg}-subtle text-${priority_bg} fw-bold px-3 py-1 rounded-5"
                    >
                      ${task.priority.toUpperCase()} PRIORITY
                    </div>
                    <div>
                     <button class="btn btn-outline-primary me-1"> 
                      <i class="bi bi-pencil edit-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal" id="edit-${task._id}" >
                      </i>
                    </button> 
                    <button class="btn btn-outline-danger ">
                      <i class="bi bi-trash delete-btn" id="delete-${task._id}"></i>
                    </button>
                    </div>
                  </div>
                  <h1 class="my-3">${task.title}</h1>
                  <p class="text-secondary fs-5">
                    ${task.description}
                  </p>

                  <div class="d-flex justify-content-end">
                    <img src="./Image/student0${Math.floor(Math.random() * 6) + 1}.png" class="card-img" alt="img" />
                    <p class="my-auto text-secondary">
                      <i class="bi bi-calendar"></i> ${task.due_date}
                    </p>
                  </div>
                </div>`;
    } else if (task.status == "complete") {
      completeCnt += 1;
      completeHtml += `<div class="card shadow-lg justify-content-evenly p-3">
                  <div class="d-flex justify-content-between px-2">
                    <div
                      class="remark bg-${priority_bg}-subtle text-${priority_bg} fw-bold px-3 py-1 rounded-5"
                    >
                      ${task.priority.toUpperCase()} PRIORITY
                    </div>
                    <div>
                     <button class="btn btn-outline-primary me-1"> 
                      <i class="bi bi-pencil edit-btn" 
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal" id="edit-${task._id}" >
                      </i>
                    </button> 
                    <button class="btn btn-outline-danger ">
                      <i class="bi bi-trash delete-btn" id="delete-${task._id}" ></i>
                    </button>
                    </div>
                  </div>
                  <h1 class="my-3">${task.title}</h1>
                  <p class="text-secondary fs-5">
                    ${task.description}
                  </p>

                  <div class="d-flex justify-content-end">
                    <img src="./Image/student0${Math.floor(Math.random() * 6) + 1}.png" class="card-img" alt="img" />
                    <p class="my-auto text-secondary">
                      <i class="bi bi-calendar"></i> ${task.due_date}
                    </p>
                  </div>
                </div>`;
    }
  });

  // update the cnt
  ele_cnt[0].innerHTML = todoCnt;
  ele_cnt[1].innerHTML = inProgressCnt;
  ele_cnt[2].innerHTML = completeCnt;

  ele_todo_card_list.innerHTML = todoHtml;
  ele_inProgress_card_list.innerHTML = inProgressHtml;
  ele_complete_card_list.innerHTML = completeHtml;
}

function handleResetForm() {
  ele_form_task_title.value = "";
  ele_form_description.value = "";
  ele_form_due_date.value = "";
  completeStatus = "";
  priority = "";
}

// search functionality
ele_search_btn.addEventListener("click", search);
ele_search_ip.addEventListener("keyup", search);
function search(event) {
  console.log(event.target);

  const searchPara = ele_search_ip.value;
  const filteredList = taskList.filter((task) =>
    task.title.startsWith(searchPara),
  );
  renderTaskList(filteredList);
}

// delete functionality
ele_delete_btn.forEach((btn) => {
  console.log("inside forEach");

  btn.addEventListener("click", deleteTask);
});

function deleteTask(e) {
  const id = e.target.getAttribute("id").split("-")[1];
  console.log(id); // our id was delete-12323388 in this format so i used split to split with respect to - and got ["delete", 12323388] as a result
  const flag = confirm("do you want to delete this task");

  if (flag) {
    const filteredList = taskList.filter((task) => task._id != id);
    renderTaskList(filteredList);
  }
}

// Edit Functionality
ele_edit_btn.forEach((btn) => {
  btn.addEventListener("click", editTask);
});

function editTask(e) {
  const id = e.target.getAttribute("id").split("-")[1];
  const task = taskList.filter((t) => t._id == id)[0];
  console.log("Task for edit...", task);

  ele_form_task_title.setAttribute("value", task.title);
  ele_form_description.value = task.description;
  console.log(ele_form_description.innerHTML, ele_form_task_title.value);
  ele_form_due_date.value = task.due_date;

  task.priority = priority;
  task.status = completeStatus;
  console.log(taskList);
  // localStorage.setItem("taskList", JSON.stringify(taskList));

  handleResetForm();
}

ele_card.forEach((card) => {
  card.addEventListener("dragstart", handleDragDrop);
});
function handleDragDrop(e) {
  e.dataTransfer.setData("dragId");
}
