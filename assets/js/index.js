//  Orders Array
var orders = [];
var result = 0;

//To Calculate SubTotal
function extractValue(arr, prop) {
  // extract value from property
  let extractedValue = arr.map((item) => item[prop]);
  return extractedValue;
}

//onclick fucntion to get data from menu array
function clicked(id) {
  //filter the menu array to get the dish that  user clicked on menu
  const item = menus.filter((x) => x.id === id);
  let a = item[0].price;
  var o = orders.find((x) => x.name == item[0].name);

  //sort the value's from array to push (show) them in orderDetail's array
  if (o == null || o == undefined) {
    o = {
      name: item[0].name,
      quantity: 1,
      amount: item[0].price,
    };

    orders.push(o);
  } else {
    o.quantity++;
    o.amount = item[0].price * o.quantity;
  }

  // after getting the sorted result - place it in orderdetail table

  let rowHtml = "";
  let order;
  for (order of orders) {
    rowHtml += `
      <tr>
        <td>${order.name}</td>
        <td>${order.quantity}</td>
        <td>${order.amount}</td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = rowHtml;

  result = extractValue(orders, "amount");
}

// Type Array to differentiate menu
const type = [
  {
    id: 1,
    name: "Traditional",
  },
  {
    id: 2,
    name: "Chienese",
  },
  {
    id: 3,
    name: "Continental",
  },
];

// Menu Array to create menu
const menus = [
  {
    id: 1,
    typeId: 1,
    name: "karahi",
    price: 500,
  },
  {
    id: 2,
    typeId: 1,
    name: "Biryani",
    price: 300,
  },
  {
    id: 8,
    typeId: 1,
    name: "Pulao",
    price: 50,
  },
  {
    id: 3,
    typeId: 2,
    name: "chinnese Rice",
    price: 100,
  },
  {
    id: 7,
    typeId: 2,
    name: "vegi Rice",
    price: 100,
  },
  {
    id: 4,
    typeId: 3,
    name: "Beef Burger",
    price: 100,
  },
  {
    id: 5,
    typeId: 3,
    name: "Chicken Burger",
    price: 100,
  },
  {
    id: 6,
    typeId: 3,
    name: "Grill Burger",
    price: 100,
  },
];
// Menu List for Traditonal Item's
function getTraditional() {
  let html = `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
    <tbody>
  `;

  //loop through the menu array and get the traditional dishes from it - then send it for orderDetail array using onClick function

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].typeId === 1) {
      let rowHtml = `
      <tr class="menus-row" onclick="clicked(${menus[i].id})">
        <td>${menus[i].id}</td>
        <td>${menus[i].name}</td>
        <td>${menus[i].price}</td>
      </tr>
    `;
      html += rowHtml;
    }
  }
  html += `
    </tbody>
    </table>
  `;

  document.getElementById("trd-div").innerHTML = html;
}
// Menu List for Chineese
function getChineese() {
  let html = `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
    <tbody>
  `;

  //loop through the menu array and get the Chinese dishes from it - then send it for orderDetail array using onClick function

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].typeId === 2) {
      let rowHtml = `
      <tr class="menus-row" onclick="clicked(${menus[i].id})">
        <td>${menus[i].id}</td>
        <td>${menus[i].name}</td>
        <td>${menus[i].price}</td>
      </tr>
    `;
      html += rowHtml;
    }
  }
  html += `
    </tbody>
    </table>
  `;

  document.getElementById("trd-div").innerHTML = html;
}
// Menu list for fastFood
function getFastFood() {
  let html = `
    <table class="table">
      <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
      </thead>
    <tbody>
  `;

  //loop through the menu array and get the fastFood dishes from it - then send it for orderDetail array using onClick function

  for (let i = 0; i < menus.length; i++) {
    if (menus[i].typeId === 3) {
      let rowHtml = `
      <tr class="menus-row" onclick="clicked(${menus[i].id})">
        <td>${menus[i].id}</td>
        <td>${menus[i].name}</td>
        <td>${menus[i].price}</td>
      </tr>
    `;
      html += rowHtml;
    }
  }
  html += `
    </tbody>
    </table>
  `;

  document.getElementById("trd-div").innerHTML = html;
}

// print the order given by user. using window.print() method -- optional if not allowed i'll remove it.
// idea taken after research most of the restaurants use print functionality

var style =
  ".table { border: solid #009879 1px; border-radius: 50px; -moz-border-radius: 6px; -webkit-border-radius: 5px; border-collapse: separate; text-align: center; font-size: 0.9em; font-family: sans-serif; width: 90%; margin-left: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); margin-bottom: 30px;}";

//ps => printscreen

var ps;

// print the order by creating a new table.

function printOrder() {
  var ps = window.open("", "PRINT", "height=600,width=400");

  ps.document.write("<html><head><style>" + style + "</style></head><body>");
  ps.document.write("<h1>Order Details</h1>");
  ps.document.write(
    '<button onclick="print();" padding-bottom: 5px;">Print</button>'
  );
  ps.document.write(document.getElementById("order-div").innerHTML);
  ps.document.write("Total Amount: " + sum);
  ps.document.write("</body></html>");

  //ps.document.close();

  ps.window.print();

  document.getElementById("tbody").innerHTML = "";
  orders = [];
}

function print() {
  if (ps != null) {
    ps.print();
  }
}

let sum = 0.0;

//process Order
//for alert's i did not use the built in method alert() - i use third party cdn sweetalert - which provides beautiful UI for alert's.

function processorder() {
  sum = 0;
  if (orders.length > 0) {
    for (let i in result) {
      sum += result[i];
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    //show's total amount of the order and asks permision to process it
    swalWithBootstrapButtons
      .fire({
        title: "SubTotal",
        text: "Total For Your order is : " + sum,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, ProcessOrder",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      // if accepted by the user - order will be processed
      // if rejecetd it will take back to orderscreen
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons
            .fire({
              title: "In Progress!",
              text: "Your order is in process",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Print Receipt",
              cancelButtonText: "close",
              reverseButtons: true,
            })
            .then((r) => {
              if (r.isConfirmed) {
                //window.print();
                printOrder();
              } else {
                document.getElementById("tbody").innerHTML = "";
                orders = [];
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "You cancel the order",
            "error"
          );
        }
      });
  } else {
    Swal.fire("No order given", "You have not orderd any thing", "warning");
  }
}

//Feedback Page - Form Validation

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

let namee = document.getElementById("username");
let emaill = document.getElementById("email");
let phone = document.getElementById("phone");
let messg = document.getElementById("msg");
let form = document.querySelector("form1");

function validateInput() {
  if (namee.value.trim() === "") {
    onError(namee, "User name cannot be empty");
  } else {
    onSuccess(namee);
  }
  if (emaill.value.trim() === "") {
    onError(emaill, "Email cannot be empty");
  } else {
    if (!isValidEmail(email.value.trim())) {
      onError(emaill, "Email is not valid");
    } else {
      onSuccess(emaill);
    }
  }
  if (phone.value.trim() === "") {
    onError(phone, "Phone N0 cannot be empty");
  } else {
    onSuccess(phone);
  }
  if (messg.value.trim() === "") {
    onError(messg, "You must type something");
  } else {
    onSuccess(messg);
  }
}
var sbmt = document.getElementById("sb");
if (sbmt) {
  sbmt.addEventListener("click", (event) => {
    event.preventDefault();
    validateInput();
  });
}
// document.querySelector("button").addEventListener("click", (event) => {
//   event.preventDefault();
//   validateInput();
// });

function onSuccess(input) {
  let parent = input.parentElement;
  let msg = parent.querySelector("small");
  msg.style.visibility = "hidden";
  parent.classList.remove("error");
  parent.classList.add("success");
}
function onError(input, message) {
  let parent = input.parentElement;
  let msg = parent.querySelector("small");
  msg.style.visibility = "visible";
  msg.innerText = message;
  parent.classList.add("error");
  parent.classList.remove("success");
}
function isValidEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
