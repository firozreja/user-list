// ###### Element Selector
const newUserForm = document.getElementById("form");
const tbody = document.getElementById("tbody");
const firstSearch = document.getElementById("first_search");
const filterAll = document.getElementById("filter");
const sortTasks = document.getElementById("sort");
const byDate = document.getElementById("by_date");
const bulkAction = document.getElementById("bulk_action");
const allSelect = document.getElementById("allSelect");
const dismissBtn = document.getElementById("dismiss_btn");
const deleteBtn = document.getElementById("delete_btn");
const editSection = document.getElementById("edit_section");
const editBtn = document.getElementById("edit_btn");
const editForm = document.getElementById("edit_form");
const scrollBar = document.querySelector(".scroll_bar");

// ##### utilize
function getUID() {
  return Date.now() + Math.round(Math.random() * 500).toString();
}

// #### Local Storages
// get all tasks from local storage
function getAllTasksFormLocalStorage() {
  let tasks = [];
  const getTasks = localStorage.getItem("tasks");
  if (getTasks) {
    tasks = JSON.parse(getTasks);
  }
  return tasks;
}

// add tasks to local storage
function addTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// add task to local storage
function addTaskToLocalStorage(task) {
  const tasks = getAllTasksFormLocalStorage();
  tasks.push(task);
  addTasksToLocalStorage(tasks);
}

// #### Handler Function
// New User Creation
function newUserCreationHandler(e) {
  e.preventDefault();
  const id = getUID();
  const tasks = {
    id,
  };
  [...newUserForm.elements].forEach((element) => {
    if (element.name) {
      tasks[element.name] = element.value;
    }
  });
  newUserForm.reset();
  addTaskToLocalStorage(tasks);
  updateUI();
}

// #### update ui
// create tr
function createTr(
  {
    firstName,
    countryCode,
    lastName,
    gender,
    address,
    religion,
    relation,
    phone,
    email,
    date,
    id,
  },
  index
) {
  const formattedDate = new Date(date).toDateString();
  return ` <tr id='${id}'>
                    <td><input class="checkbox" data-id='${id}' data-checkId='${id}'  type="checkbox"></td>
                    <td>${index + 1}</td>
                    <td class="firstNameTd">${firstName}</td>
                    <td class="lastNameTd">${lastName}</td>
                    <td class="genderTd">${gender}</td>
                    <td class="addressTd">${address}</td>
                    <td class="religionTd">${religion}</td>
                    <td class="relationTd">${relation}</td>
                    <td class="phoneTd">${countryCode + phone}</td>
                    <td class="emailTd">${email}</td>
                    <td class="dateTd">${formattedDate}</td>
                    <td class="actionTd">
                        <button data-id=${id} id="edit" <i class="fa-solid fa-pen"></i></button>
                        <button data-id=${id}  id="delete" <i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
}

// initial statement
function initialStatement() {
  return getAllTasksFormLocalStorage().reverse();
}

// ui update
function updateUI(tasks = initialStatement()) {
  const noTasksMessages = document.getElementById("noTasksMessages");
  if (tasks.length === 0) {
    noTasksMessages.style.display = "block";
    scrollBar.hidden = true;
  } else {
    noTasksMessages.style.display = "none";
    scrollBar.hidden = false;
  }

  const tasksList = tasks.map((task, index) => {
    return createTr(task, index);
  });
  const taskListItem = tasksList.join("");
  tbody.innerHTML = taskListItem;
}
updateUI();

// ###### delete and edit handler
// delete handler
function deleteHandler(id) {
  const tasks = getAllTasksFormLocalStorage();
  const deleteTask = tasks.filter((task) => task.id !== id);
  addTasksToLocalStorage(deleteTask);
  updateUI();
}

// edit handler
function editHandler(id) {
  const listTr = document.getElementById(id);
  const tasks = getAllTasksFormLocalStorage();
  const taskList = tasks.find((list) => list.id === id) || {};
  const {
    id: taskId,
    firstName,
    lastName,
    gender,
    address,
    religion,
    relation,
    phone,
    email,
    date,
  } = taskList;

  // firstName
  const firstNameTd = listTr.querySelector(".firstNameTd");
  const firstNameInp = document.createElement("input");
  firstNameInp.value = firstName;
  firstNameTd.innerHTML = "";
  firstNameTd.appendChild(firstNameInp);

  // lastName
  const lastNameTd = listTr.querySelector(".lastNameTd");
  const lastNameInp = document.createElement("input");
  lastNameInp.value = lastName;
  lastNameTd.innerHTML = "";
  lastNameTd.appendChild(lastNameInp);

  // gender
  const genderTd = listTr.querySelector(".genderTd");
  const genderInp = document.querySelector("select");
  genderInp.innerHTML = `<option ${
    gender === "male" ? "selected" : ""
  } value="male">Male</option>
                      <option ${
                        gender === "female" ? "selected" : ""
                      } value="female">Female</option>
                      <option ${
                        gender === "others" ? "selected" : ""
                      } value="others">Others</option>`;
  genderTd.innerHTML = "";
  genderTd.appendChild(genderInp);

  // address
  const addressTd = listTr.querySelector(".addressTd");
  const addressInp = document.createElement("input");
  addressInp.value = address;
  addressTd.innerHTML = "";
  addressTd.appendChild(addressInp);

  // religion
  const religionTd = listTr.querySelector(".religionTd");
  const religionInp = document.createElement("select");
  religionInp.innerHTML = `<option ${
    religion === "islam" ? "selected" : ""
  } value="islam" >Islam</option>
                          <option ${
                            religion === "hindu" ? "selected" : ""
                          } value="hindu" >Hindu</option>
                          <option ${
                            religion === "christian" ? "selected" : ""
                          } value="christian" >Christian</option>
                          <option ${
                            religion === "others" ? "selected" : ""
                          } value="others" >Others</option>`;
  religionTd.innerHTML = "";
  religionTd.appendChild(religionInp);

  // relation
  const relationTd = listTr.querySelector(".relationTd");
  const relationInp = document.createElement("select");
  relationInp.innerHTML = `<option ${
    relation === "single" ? "selected" : ""
  } value="single" >Single</option>
                          <option ${
                            relation === "married" ? "selected" : ""
                          } value="married" >Married</option>
                          `;
  relationTd.innerHTML = "";
  relationTd.appendChild(relationInp);

  // phone
  const phoneTd = listTr.querySelector(".phoneTd");
  const phoneInp = document.createElement("input");
  phoneInp.value = phone;
  phoneTd.innerHTML = "";
  phoneTd.appendChild(phoneInp);

  // email
  const emailTd = listTr.querySelector(".emailTd");
  const emailInp = document.createElement("input");
  emailInp.value = email;
  emailTd.innerHTML = "";
  emailTd.appendChild(emailInp);

  // date
  const dateTd = listTr.querySelector(".dateTd");
  const dateInp = document.createElement("input");
  dateInp.type = "date";
  dateInp.value = date;
  dateTd.innerHTML = "";
  dateTd.appendChild(dateInp);

  // actionTd
  const actionTd = listTr.querySelector(".actionTd");
  const saveBtn = document.createElement("button");
  saveBtn.addEventListener("click", () => {
    const firstName = firstNameInp.value;
    const lastName = lastNameInp.value;
    const gender = genderInp.value;
    const address = addressInp.value;
    const religion = religionInp.value;
    const relation = relationInp.value;
    const phone = phoneInp.value;
    const email = emailInp.value;
    const date = dateInp.value;
    if (
      firstName &&
      lastName &&
      gender &&
      address &&
      religion &&
      relation &&
      phone &&
      email &&
      date
    ) {
      const newTaskList = {
        firstName,
        lastName,
        gender,
        address,
        religion,
        relation,
        phone,
        email,
        date,
      };
      const listAfterEditing = { ...taskList, ...newTaskList };
      const taskListAfterEditing = tasks.map((list) => {
        if (list.id === taskId) {
          return listAfterEditing;
        }
        return list;
      });
      addTasksToLocalStorage(taskListAfterEditing);
      updateUI();
    } else {
      alert("please fill up all the input");
    }
  });
  saveBtn.classList.add("saveBTN");
  saveBtn.textContent = "save";
  actionTd.innerHTML = "";
  actionTd.appendChild(saveBtn);
}

// ##### acton handler
function actionHandler(e) {
  const {
    target: { id: actionId, dataset: { id: taskId } = {} },
  } = e;
  if (actionId === "delete") {
    deleteHandler(taskId);
  } else if (actionId === "edit") {
    editHandler(taskId);
  }
}

// search function
function handlingSearchWithTimer(searchText) {
  const tasks = getAllTasksFormLocalStorage();
  const searchedList = tasks.filter(({ firstName, lastName }) => {
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    searchText = searchText.toLowerCase();
    return firstName.includes(searchText) || lastName.includes(searchText);
  });
  updateUI(searchedList);
}

let timer;
function firstSearchHandler(e) {
  const { value: searchText } = e.target;
  clearTimeout(timer);
  timer = setTimeout(() => handlingSearchWithTimer(searchText), 1000);
}

// ###### filter
function filterAndRender(filterText) {
  const tasks = getAllTasksFormLocalStorage();
  let tasksAfterFiltering = tasks;
  switch (filterText) {
    case "all":
      tasksAfterFiltering = tasks;
      break;
    case "male":
      tasksAfterFiltering = tasks.filter((task) => task.gender === "male");
      break;
    case "female":
      tasksAfterFiltering = tasks.filter((task) => task.gender === "female");
      break;
    case "others":
      tasksAfterFiltering = tasks.filter((task) => task.gender === "others");
      break;
    case "islam":
      tasksAfterFiltering = tasks.filter((task) => task.religion === "islam");
      break;
    case "hindu":
      tasksAfterFiltering = tasks.filter((task) => task.religion === "hindu");
      break;
    case "christian":
      tasksAfterFiltering = tasks.filter(
        (task) => task.religion === "christian"
      );
      break;
    case "others":
      tasksAfterFiltering = tasks.filter((task) => task.religion === "others");
      break;
    case "single":
      tasksAfterFiltering = tasks.filter((task) => task.relation === "single");
      break;
    case "married":
      tasksAfterFiltering = tasks.filter((task) => task.relation === "married");
      break;
    default:
      break;
  }
  updateUI(tasksAfterFiltering);
}

function filterHandler(e) {
  const { value: filterText } = e.target;
  filterAndRender(filterText);
}

// #####sort
function sortHandler(e) {
  const { value: sortText } = e.target;
  const tasks = getAllTasksFormLocalStorage();
  let tasksAfterSorting = tasks.sort((taskA, taskB) => {
    const taskADate = new Date(taskA.date);
    const taskBDate = new Date(taskB.date);
    if (taskADate < taskBDate) {
      return sortText === "newest" ? 1 : -1;
    } else if (taskADate > taskBDate) {
      return sortText === "newest" ? -1 : 1;
    } else {
      return 0;
    }
  });
  updateUI(tasksAfterSorting);
}

// ##### date
function byDateHandler(e) {
  const { value: selectedDate } = e.target;
  const tasks = getAllTasksFormLocalStorage();
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);
  updateUI(filteredTasks);
}

// ##### selected tasks
let selectedTasks = [];
function selectedTasksHandler(e) {
  const targetEI = e.target;
  if (targetEI.classList.contains("checkbox")) {
    const { id } = targetEI.dataset;
    if (targetEI.checked) {
      selectedTasks.push(id);
    } else {
      const selectedTasksIndex = selectedTasks.findIndex(
        (taskId) => taskId === id
      );
      selectedTasks.splice(selectedTasksIndex, 1);
    }
  }
  bulkActionToggler();
}

// ## bulkActionToggler
function bulkActionToggler() {
  selectedTasks.length
    ? (bulkAction.style.display = "flex")
    : (bulkAction.style.display = "none");
  const tasks = getAllTasksFormLocalStorage();
  if (tasks.length === selectedTasks.length && tasks.length > 0) {
    allSelect.checked = true;
  } else {
    allSelect.checked = false;
  }
}

// ##### all select handler
function allSelectHandler(e) {
  if (e.target.checked) {
    const tasks = getAllTasksFormLocalStorage();
    selectedTasks = tasks.map((task) => task.id);
    selectedTasks.forEach((taskId) => {
      document.querySelector(`[data-checkId='${taskId}']`).checked = true;
    });
  } else {
    selectedTasks.forEach((taskId) => {
      document.querySelector(`[data-checkId='${taskId}']`).checked = false;
    });
    selectedTasks = [];
  }
  bulkActionToggler();
}

// ##### dismiss & delete & edit handler
// dismiss section
function dismissBtnHandler() {
  selectedTasks.forEach((taskId) => {
    document.querySelector(`[data-checkId='${taskId}']`).checked = false;
  });
  selectedTasks = [];
  bulkActionToggler();
}

// delete section
function deleteBtnHandler() {
  const isConfirm = confirm("Really, you want to delete this❌");
  if (isConfirm) {
    const tasks = getAllTasksFormLocalStorage();
    const tasksAfterDeleting = tasks.filter((task) => {
      if (selectedTasks.includes(task.id)) return false;
      return true;
    });
    addTasksToLocalStorage(tasksAfterDeleting);
    updateUI(tasksAfterDeleting);
    selectedTasks = [];
    bulkActionToggler();
  }
}

// edit section
function bulkActionAreaToggler() {
  editSection.style.display === "block"
    ? (editSection.style.display = "none")
    : (editSection.style.display = "block");
}

function editBtnHandler() {
  bulkActionAreaToggler();
}

// form handler
function editFormHandler(e) {
  e.preventDefault();
  const taskUpdates = {};
  [...editForm.elements].forEach((element) => {
    if (element.name && element.value) {
      taskUpdates[element.name] = element.value;
    }
  });

  editForm.reset();
  console.log(taskUpdates);
  const tasks = getAllTasksFormLocalStorage();
  const updatedTasks = tasks.map((selectedTask) => {
    if (selectedTasks.includes(selectedTask.id)) {
      console.log({
        ...selectedTask,
        ...taskUpdates,
      });
      return {
        ...selectedTask,
        ...taskUpdates,
      };
    }
    return selectedTask;
  });
  console.log(updatedTasks);
  addTasksToLocalStorage(updatedTasks);
  updateUI(updatedTasks);
  bulkActionAreaToggler();
  selectedTasks = [];
  bulkActionToggler();
}

// ##### Event Handler
newUserForm.addEventListener("submit", newUserCreationHandler);
tbody.addEventListener("click", actionHandler);
firstSearch.addEventListener("input", firstSearchHandler);
filterAll.addEventListener("input", filterHandler);
sortTasks.addEventListener("input", sortHandler);
byDate.addEventListener("input", byDateHandler);
tbody.addEventListener("input", selectedTasksHandler);
allSelect.addEventListener("click", allSelectHandler);
dismissBtn.addEventListener("click", dismissBtnHandler);
deleteBtn.addEventListener("click", deleteBtnHandler);
editBtn.addEventListener("click", editBtnHandler);
editForm.addEventListener("submit", editFormHandler);
