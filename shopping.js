const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list= document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        "id": 1,
        "name": "PRODUCT 1",
        "image":"1.jpg",
        "price": 2000
    },
    {
        "id": 2,
        "name": "PRODUCT 2",
        "image":"2.jpg",
        "price": 2200
    },
    {
        "id": 3,
        "name": "PRODUCT 3",
        "image":"3.jpg",
        "price": 2400
    },
    {
        "id": 4,
        "name": "PRODUCT 4",
        "image":"4.jpg",
        "price": 2600
    },
    {
        "id": 5,
        "name": "PRODUCT 5",
        "image":"5.jpg",
        "price": 1400
    },
    {
        "id": 6,
        "name": "PRODUCT 6",
        "image":"6.jpg",
        "price": 1800
    }
]


let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "img/${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick = "addToCard(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()


const addToCard = key => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);
    }

    reloadCard()
}

// Add this function to calculate the subtotal of the cart
function calculateSubtotal() {
    let subtotal = 0;
    listCards.forEach((value, key) => {
      subtotal += value.price * value.quantity;
    });
    return subtotal;
  }
  
  // Modify the reloadCard function to recalculate and display the totals
  const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;
  
    listCards.forEach((value, key) => {
      totalPrice = totalPrice + value.price * value.quantity;
      count = count + value.quantity;
  
      if (value != null) {
        let newDiv = document.createElement("li");
        newDiv.innerHTML = `
            <div><img src = "img/${value.image}"></div>
            <div class = "cardTitle">${value.name}</div>
            <div class = "cardPrice">${value.price.toLocaleString()}</div>
  
            <div>
                <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class = "count">${value.quantity}</div>
                <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
        `;
        listCard.appendChild(newDiv);
      }
    });
  
    // Recalculate and display the totals
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(); // Implement your discount calculation function
    const vat = calculateVAT(); // Implement your VAT calculation function
    const totalAmount = subtotal - discount + vat;
  
    total.innerText = subtotal.toLocaleString();
    quantity.innerText = count;
  
    // Update the total, discount, and VAT elements
    discountValue.textContent = discount.toFixed(2);
    vatValue.textContent = vat.toFixed(2);
    totalAmountValue.textContent = totalAmount.toFixed(2);
  };
  
  // Modify the changeQuantity function to call reloadCard after changing the quantity
  const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
      delete listCards[key];
    } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    reloadCard(); // Recalculate and display the totals after changing the quantity
  };

const calculateButton = document.getElementById("calculate-button");
const discountValue = document.getElementById("discount-value");
const vatValue = document.getElementById("vat-value");
const totalAmountValue = document.getElementById("total-amount-value");

calculateButton.addEventListener("click", () => {
    // Calculate the discount (you can replace this with your own logic)
    const discount = calculateDiscount(); // Implement your discount calculation function

    // Calculate VAT (you can replace this with your own logic)
    const vat = calculateVAT(); // Implement your VAT calculation function

    // Calculate the total amount
    const totalAmount = calculateTotalAmount(discount, vat);

    // Update the display with the calculated values
    discountValue.textContent = discount.toFixed(2);
    vatValue.textContent = vat.toFixed(2);
    totalAmountValue.textContent = totalAmount.toFixed(2);
});

// Function to calculate the discount (replace with your own logic)
function calculateDiscount() {
    // Example: 10% discount
    return 0.1 * getSubtotal(); // Implement your discount calculation here
}

// Function to calculate VAT (replace with your own logic)
function calculateVAT() {
    // Example: 12% VAT
    return 0.12 * getSubtotal(); // Implement your VAT calculation here
}

// Function to calculate the total amount
function calculateTotalAmount(discount, vat) {
    const subtotal = getSubtotal(); // Implement your subtotal calculation here
    return subtotal - discount + vat;
}

// Function to get the subtotal (replace with your own logic)
function getSubtotal() {
    let subtotal = 0;
    listCards.forEach((value) => {
        subtotal += value.price * value.quantity;
    });
    return subtotal;
}

