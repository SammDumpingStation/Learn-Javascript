const price = {
  soup: 10,
  burger: 8,
  iceCream: 5,
};

const quantity = {
  soup: 0,
  burger: 0,
  iceCream: 0,
};
let total = 0;
let todoListHTML = "";
const ordersArray = [];

document.querySelector("#soup").innerHTML = price.soup;
document.querySelector("#burger").innerHTML = price.burger;
document.querySelector("#ice-cream").innerHTML = price.iceCream;

function operation(id, element) {
  total =
    quantity.soup * price.soup +
    quantity.burger * price.burger +
    quantity.iceCream * price.iceCream;

  document.querySelector("#total").innerHTML = `$ ${total}.00`;
  document.querySelector(id).innerHTML = `${element}`;
}

function reset() {
  document.querySelector("#total").innerHTML = 0;
  document.querySelector("#quantity-soup").innerHTML = 0;
  document.querySelector("#quantity-burger").innerHTML = 0;
  document.querySelector("#quantity-ice-cream").innerHTML = 0;
  total = 0;
  quantity.soup = 0;
  quantity.burger = 0;
  quantity.iceCream = 0;
}

function save() {
  ordersArray.push({
    Soup: quantity.soup,
    Burger: quantity.burger,
    "Ice Cream": quantity.iceCream,
    Total: total,
  });
  displayOrders();
  reset();
}

function displayOrders() {
  const ordersSection = document.querySelector("#orders-section");
  ordersSection.innerHTML = '';

  // Assuming ordersArray is an array of order objects
  ordersArray.forEach((element, index) => {
    // Create the HTML structure for each order
    const orderHTML = `
      <div class="w-full border border-gray-400 rounded-md p-2 flex justify-between items-center">
            <p>
              Soup: ${element.Soup}, Burger: ${element.Burger}, Ice Cream:
              ${element["Ice Cream"]}
            </p>
            <p>Total: $${element.Total}.00</p>
            <button class=" bg-red-600 text-white rounded-lg py-2 px-4" onclick="deleteTodo(${index})">Delete</button>
          </div>
    `;

    // Append the generated HTML to the ordersSection
    ordersSection.innerHTML += orderHTML;
  });
}

function deleteTodo(index) {
  ordersArray.splice(index, 1);
  displayOrders();
}
