const yearElem = document.querySelector("#currentyear");
const lastModElem = document.querySelector("#lastModified");

yearElem.textContent = new Date().getFullYear();
lastModElem.textContent = document.lastModified;

const menuBtn = document.querySelector('#menu');
const menuNav = document.querySelector('.open-menu');
const headerElem = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    menuNav.classList.toggle('open');
    headerElem.classList.toggle('gap');
});

const apiUrl = 'https://fakestoreapi.com/products';
let cart = JSON.parse(localStorage.getItem('cart')) || [];


document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('shopping.html')) {
    loadProducts();
    document.getElementById('buy-btn').addEventListener('click', buyItems);
  } else if (path.includes('inventory.html')) {
    loadBalance();
  }
});

// Fetch and display products
async function loadProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch products');
    const products = await response.json();

    if (!localStorage.getItem('stock')) {
      initializeStock(products);
    }

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.image}" width="100" alt="${product.title}" loading="lazy"/>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        <a href="#" onclick="showMoreInfo('${product.title}', 'Quality: 5-star rated<br>Approved by FDA')">More Info</a>
      `;
      productList.appendChild(productDiv);
    });
  } catch (error) {
    console.error('Error loading products:', error);
    alert('Failed to load products. Please try again later.');
  }
}

// information modal
function showMoreInfo(title, info) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-info').innerHTML = info;
  document.getElementById('modal').style.display = 'block';
}

document.querySelector('.close').onclick = function() {
  document.getElementById('modal').style.display = 'none';
};

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Here the stock shows based on product list
function initializeStock(products) {
  const initialStock = {};
  products.forEach(product => {
    initialStock[product.id] = 40;
  });
  localStorage.setItem('stock', JSON.stringify(initialStock));
}

// Adding items to cart
function addToCart(productId, productName, productPrice) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';
    cartItemDiv.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
  });
}

function buyItems() {
  const stock = JSON.parse(localStorage.getItem('stock')) || {};
  
  cart.forEach(item => {
    if (stock[item.id] >= item.quantity) {
      stock[item.id] -= item.quantity; // Deduct from stock
    } else {
      alert(`Not enough stock for ${item.name}`);
    }
  });

  localStorage.setItem('stock', JSON.stringify(stock));
  alert('Items bought successfully!');
  cart = []; 
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// remaining stock displaying
async function loadBalance() {
  const stock = JSON.parse(localStorage.getItem('stock')) || {};
  
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const balanceList = document.getElementById('balance-list');

    balanceList.innerHTML = '';
    products.forEach(product => {
      const quantity = stock[product.id] || 0;
      const balanceDiv = document.createElement('div');
      balanceDiv.className = 'balance-item';
      balanceDiv.innerHTML = `
        <h4>${product.title}</h4>
        <img src="${product.image}" width="50" alt="${product.title}" />
        <p>Remaining: ${quantity}</p>
      `;
      balanceList.appendChild(balanceDiv);
    });
  } catch (error) {
    console.error('Error loading balance:', error);
    alert('Failed to load balance. Please try again later.');
  }
}
