function validateForm() {
  let  title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let  date = document.getElementById("date").value;
  if (title == "") {
    alert("veuillez remplir ce champ");
    return false;
  } 
  if (description == ""){
    alert("veuillez remplir ce champ");
    return false;
  }

  if (date == "" ) {
    alert("veuillez remplir ce champ");
    return false;
  }
  
  return true;
}

function showData() {
  var taskList = JSON.parse(localStorage.getItem("taskList"));
  console.log(typeof taskList);
  if (!taskList) {
    taskList = [];
  } 
  var html = "";
  taskList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.title + "</td>";
    html += "<td>" + element.description + "</td>";
    html += "<td>" + element.date + "</td>";
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

document.onload = showData();

function AddData(){
    if (validateForm()== true){
        let  title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let  date = document.getElementById("date").value;

        let taskList;
        if (localStorage.getItem("taskList") == null) {
            taskList = [];
          } else {
            taskList = JSON.parse(localStorage.getItem("taskList"));
          }

          taskList.push({
            title: title,
            description: description,
            date : date,
        });
        
localStorage.setItem("taskList", JSON.stringify(taskList));
showData();
document.getElementById("title").value = "";
document.getElementById("description").value = "";
document.getElementById("date").value = "";
}
}


function deleteData(index){
  let taskList;
    if (localStorage.getItem("taskList") == null) {
        taskList = [];
      } else {
        taskList = JSON.parse(localStorage.getItem("taskList"));
      }

      taskList.splice(index,1);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      showData();
}

  function updateData(index){
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

  document.querySelector("#Update").onclick = function(){
    if (validateForm()==true){
      taskList[index].title = document.getElementById("title").value;
      taskList[index].description = document.getElementById("description").value;
      taskList[index].date = document.getElementById("date").value;

      localStorage.setItem("taskList", JSON.stringify(taskList));
      showData();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("date").value = "";

      document.getElementById("submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  }


}

function search(){
const search = document.getElementById("search")
search.addEventListener("keyup", () => {
  const input = search.value;
  console.log(input);
  const result = taskList.filter((element) =>
    element.title.toLowerCase().includes(input.toLowerCase())
  );
  valuesearch = result;
  console.log(valuesearch);
    tasksList.innerHTML = "";
})
}
