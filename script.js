// --- NAVBAR RESPONSIVE ---
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = navMenu.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// --- CARRITO ---
const cartBtn = document.getElementById('cart-btn');
const cartPopup = document.getElementById('cart-popup');
const closeCartBtn = document.getElementById('close-cart');
const clearCartBtn = document.getElementById('clear-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

cartBtn.addEventListener('click', () => {
  cartPopup.classList.toggle('hidden');
});

closeCartBtn.addEventListener('click', () => {
  cartPopup.classList.add('hidden');
});

clearCartBtn.addEventListener('click', () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    const img = btn.dataset.img;

    const existente = carrito.find(p => p.name === name);
    if (existente) existente.cantidad++;
    else carrito.push({ name, price, cantidad: 1, img });

    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion(`${name} agregado al carrito 🛒`);
    animarContador();
  });
});

function actualizarCarrito() {
  cartItemsList.innerHTML = '';
  let total = 0, cantidadTotal = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <img src="${producto.img}" alt="${producto.name}">
      <div class="info">
        <p class="name">${producto.name}</p>
        <p>x${producto.cantidad}</p>
        <p>$${producto.price * producto.cantidad}</p>
      </div>
      <button onclick="eliminarProducto(${index})">🗑️</button>
    `;
    cartItemsList.appendChild(li);
    total += producto.price * producto.cantidad;
    cantidadTotal += producto.cantidad;
  });

  cartTotal.textContent = total;
  cartCount.textContent = cantidadTotal;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarNotificacion(mensaje) {
  const noti = document.createElement('div');
  noti.textContent = mensaje;
  noti.classList.add('notificacion');
  document.body.appendChild(noti);

  setTimeout(() => noti.classList.add('visible'), 50);
  setTimeout(() => {
    noti.classList.remove('visible');
    setTimeout(() => noti.remove(), 300);
  }, 2000);
}

function animarContador() {
  cartCount.classList.add('bump');
  setTimeout(() => cartCount.classList.remove('bump'), 400);
}

// Animación al hacer scroll
const fadeElems = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  fadeElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add('visible');
  });
});

actualizarCarrito();
