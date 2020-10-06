let emailTB = document.getElementById("nameTextBox");
let coffeeNameTB = document.getElementById("coffeeNameTextBox");
let placeOrderButton = document.getElementById("placeOrderButton");
let ordersTable = document.getElementById("currentOrders");
let searchButton = document.getElementById("searchButton")
let emailSearchTB = document.getElementById("emailSearch")
let deleteButton = document.getElementById("deleteButton")

function displayDetail(ordersObject) {
  let fullOrders = [];
  for (let order of ordersObject) {
    let detail = `<li class="list-group-item list-group-item-light">
            <label> Email: ${order.emailAddress}</labe>
            <p>Coffee:  ${order.coffee}</p>
            </li>`;
    fullOrders.push(detail);
  }
  return fullOrders;
}

function displaySearchOrder(orderObject){
  let detail =`<li class="list-group-item list-group-item-light">
  <label> Email: ${orderObject.emailAddress}</labe>
  <p>Coffee:  ${orderObject.coffee}</p>
  </li>`
  return detail
}

function displayOrders() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://dc-coffeerun.herokuapp.com/api/coffeeorders/");

  request.onload = function () {
    let orders = JSON.parse(this.responseText);
    let ordersDetail = Object.values(orders);
    let table = displayDetail(ordersDetail);
    ordersTable.insertAdjacentHTML("beforeend", table.join(" "));
  };

  request.send();
}

placeOrderButton.addEventListener("click", () => {
  let emailAddress = emailTB.value;
  let coffee = coffeeNameTB.value;

  let requestObject = {
    emailAddress: emailAddress,
    coffee: coffee,
  };

  let request = new XMLHttpRequest();

  request.open("POST", "https://dc-coffeerun.herokuapp.com/api/coffeeorders/");
  request.setRequestHeader("Content-Type", "application/json");

  request.send(JSON.stringify(requestObject));
  displayOrders()
});

placeOrderButton.addEventListener("click",()=>{
  displayOrders()
})

displayOrders();

searchButton.addEventListener("click", () => {
  let searchEmail = emailSearchTB.value;
  let urlLink = `https://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchEmail}`
  console.log(urlLink)

  let request = new XMLHttpRequest();
  request.open("GET", urlLink);

  request.onload=function (){
    let order = JSON.parse(this.responseText)
    ordersTable.innerHTML = ""
    let searchOrderDetail = displaySearchOrder(order)
    ordersTable.insertAdjacentHTML("beforeend",searchOrderDetail)
  }
 
  request.send();
});

deleteButton.addEventListener("click", () => {
  let searchEmail = emailSearchTB.value;
  let urlLink = `https://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchEmail}`
  console.log(urlLink)

  let request = new XMLHttpRequest();
  request.open("DELETE",urlLink);

 
  request.send();
});
