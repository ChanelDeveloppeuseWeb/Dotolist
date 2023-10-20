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
  var peopleList = JSON.parse(localStorage.getItem("peopleList"));
  console.log(typeof peopleList);
  if (!peopleList) {
    peopleList = [];
  } 
  var html = "";
  peopleList.forEach(function (element, index) {
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

        let peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
          } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
          }

          peopleList.push({
            title: title,
            description: description,
            date : date,
        });
        
localStorage.setItem("peopleList", JSON.stringify(peopleList));
showData();
document.getElementById("title").value = "";
document.getElementById("description").value = "";
document.getElementById("date").value = "";
}
}

// function delete
function deleteData(index){
  let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
      } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
      }

      peopleList.splice(index,1);
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
}

  function updateData(index){
  document.getElementById("submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("title").value = peopleList[index].title;
  document.getElementById("description").value = peopleList[index].description;
  document.getElementById("date").value = peopleList[index].date;

  document.querySelector("#Update").onclick = function(){
    if (validateForm()==true){
      peopleList[index].title = document.getElementById("title").value;
      peopleList[index].description = document.getElementById("description").value;
      peopleList[index].date = document.getElementById("date").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("date").value = "";

      document.getElementById("submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  }


}
