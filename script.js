const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = navMenu.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    // accesibilidad
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // sólo cerrar si está activo (es decir, en modo mobile)
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

const cartBtn = document.getElementById('cart-btn');
const cartPopup = document.getElementById('cart-popup');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let carrito = [];

const addButtons = document.querySelectorAll('.btn-add');
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        const img = button.dataset.img;

        const productoExistente = carrito.find(p => p.name === name);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ name, price, cantidad: 1, img });
        }

        actualizarCarrito();
        mostrarNotificacion(`${name} agregado al carrito 🛒`);
    });
});

cartBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    cartPopup.classList.toggle('hidden');
});

closeCartBtn.addEventListener('click', () => {
    cartPopup.classList.add('hidden');
});

cartPopup.addEventListener('click', (e) => {
    e.stopPropagation();
});

function actualizarCarrito() {
    cartItemsList.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        li.innerHTML = `
            <img src="${producto.img}" alt="${producto.name}">
            <div class="info">
                <p class="name">${producto.name}</p>
                <p class="cantidad">x${producto.cantidad}</p>
                <p class="precio">$${producto.price * producto.cantidad}</p>
            </div>
        `;

        cartItemsList.appendChild(li);

        total += producto.price * producto.cantidad;
        cantidadTotal += producto.cantidad;
    });

    cartTotal.textContent = total;
    cartCount.textContent = cantidadTotal;
}

function mostrarNotificacion(mensaje) {
    const noti = document.createElement('div');
    noti.textContent = mensaje;
    noti.classList.add('notificacion');
    document.body.appendChild(noti);

    setTimeout(() => {
        noti.classList.add('visible');
    }, 50);

    setTimeout(() => {
        noti.classList.remove('visible');
        setTimeout(() => noti.remove(), 300);
    }, 2000);
}
