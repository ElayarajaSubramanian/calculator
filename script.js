//1. Get all the elements
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const address = document.getElementById("address");
const pincode = document.getElementById("pincode");
const gender = document.getElementById("gender");
const food = document.getElementById("food");
const state = document.getElementById("state");
const country = document.getElementById("country");
const btn = document.getElementById("btn");
const table = document.querySelector("table");
const rows = document.querySelectorAll("tr");

//2. Add elements value into table row

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const row = document.createElement("tr");
  var selectedFood = [];
  for (let food of document.getElementById("food").options) {
    if (food.selected) {
      selectedFood.push(food.value);
    }
  }
  row.innerHTML = `<td>${rows.length}</td>
  <td>${fname.value}</td>
  <td>${lname.value}</td>
  <td>${address.value}</td>
  <td>${pincode.value}</td>
  <td>${gender.value}</td>
  <td>${selectedFood}</td>
  <td>${state.value}</td>
  <td>${country.value}</td>`;
  table.append(row);
  fname.value = "";
  lname.value = "";
  address.value = "";
  pincode.value = "";
  gender.value = "";
  food.value = "";
  state.value = "";
  country.value = "";

  localStorage.setItem("firstName", `${fname.value}`);
});
