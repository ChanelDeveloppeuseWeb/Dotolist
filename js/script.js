function validateForm() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  if (title == "") {
    alert("veuillez remplir ce champ");
    return false;
  }
  if (description == "") {
    alert("veuillez remplir ce champ");
    return false;
  }

  if (date == "") {
    alert("veuillez remplir ce champ");
    return false;
  }

  return true;
}

// function afficher les elements dans le tableau
function showData() {
  let taskList = JSON.parse(localStorage.getItem("taskList"));
  console.log(typeof taskList);
  if (!taskList) {
    taskList = [];
  }
  showInput(taskList);
  document.getElementById("Update").style.display = "none";
}

document.onload = showData();

// function ajouter les element dans le tableau
function AddData() {
  if (validateForm() == true) {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;

    let taskList;
    if (localStorage.getItem("taskList") == null) {
      taskList = [];
    } else {
      taskList = JSON.parse(localStorage.getItem("taskList"));
    }

    taskList.push({
      title: title,
      description: description,
      date: date,
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
    showData();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
  }
}

// fonction supprimer les elements
function deleteData(index) {
  let taskList;
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  showData();
}
// function modifier les element
function updateData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  let taskList;
  if (localStorage.getItem("taskList") == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
  }

  document.getElementById("title").value = taskList[index].title;
  document.getElementById("description").value = taskList[index].description;
  document.getElementById("date").value = taskList[index].date;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      taskList[index].title = document.getElementById("title").value;
      taskList[index].description =
        document.getElementById("description").value;
      taskList[index].date = document.getElementById("date").value;

      localStorage.setItem("taskList", JSON.stringify(taskList));
      showData();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("date").value = "";

      document.getElementById("submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}

// function search


function fil(){
  let input = document.getElementById("searching").value
  let informations = localStorage.getItem("taskList")
  let infos 
  if(informations === null){
    infos = []
  }
  else {
    infos = JSON.parse(informations)
  }
  let found = infos.filter((item)=>item.date.includes(input))
  if(found === null){
    alert ("aucune tache trouver")
  }
  showInput(found)
  
}

function search() {
  let input = document.getElementById("search").value
  let local = localStorage.getItem("taskList")
  let tasks
  if(local === null){
    tasks = []
  }
  else{
    tasks = JSON.parse(local)
  }
  let recherches = tasks.filter((item)=>item.title.includes(input))
  showInput(recherches)
}

function search() {
  let input = document.getElementById("search").value
  let infos = localStorage.getItem("taskList")
  let task
  if(infos === null){
    task = []
  }
  else{
    task = JSON.parse(infos)
  }
  let recherches = task.filter((item)=>item.description.includes(input))
  showInput(recherches)
}



let btnOk = document.getElementById("btn")
btnOk.addEventListener("click",fil)

function showInput(charnel){
  let html = "";
  console.log(charnel)
  charnel.forEach(function (element, index) {
    html += "<tr id ='tr'>";
    html += "<td id = 'td'>" + element.title + "</td>";
    html += "<td id = 'td'> " + element.description + "</td>";
    html += "<td id = ''>" + element.date + "</td>";
    html +=
      '<td> <button onclick ="deleteData (' +
      index +
      ')" class="btn_delete">Supprimer</button><button onclick="updateData(' +
      index +
      ')"class = "btn_edit">Modifier</button></td>';
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
  
}
