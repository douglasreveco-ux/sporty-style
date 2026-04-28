// Implementación productos y carrito
// LISTA DE PRODUCTOS
const productos = [
  { id: 1, nombre: "Camiseta deportiva", precio: 10000 },
  { id: 2, nombre: "Pantalón deportivo", precio: 15000 },
  { id: 3, nombre: "Botella deportiva", precio: 5000 }
];

// MOSTRAR PRODUCTOS
const contenedor = document.getElementById("productos");

productos.forEach(p => {
  const div = document.createElement("div");

  div.innerHTML = `
    <h3>${p.nombre}</h3>
    <p>Precio: $${p.precio}</p>
    <button onclick="agregar(${p.id})">Agregar al carrito</button>
  `;

  contenedor.appendChild(div);
});

// AGREGAR AL CARRITO
function agregar(id) {
  let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

  const producto = productos.find(p => p.id === id);

  carrito.push(producto);

  sessionStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}

// MOSTRAR CARRITO
function mostrarCarrito() {
  const div = document.getElementById("carrito");

  let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

  div.innerHTML = "";

  let total = 0;

  carrito.forEach(p => {
    div.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
    total += p.precio;
  });

  div.innerHTML += `<h3>Total: $${total}</h3>`;
}

// FORMULARIO DE COMPRA
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
// Validación formulario compra
  // VALIDACIONES
  if (nombre === "" || direccion === "" || correo === "" || telefono === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!correo.includes("@") || !correo.includes(".")) {
    alert("Correo inválido");
    return;
  }

  if (isNaN(telefono) || telefono.length < 8) {
    alert("Teléfono inválido (solo números y mínimo 8 dígitos)");
    return;
  }

  // OBTENER CARRITO
  let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

  let total = 0;
  let detalle = "";

  carrito.forEach(p => {
    detalle += `${p.nombre} - $${p.precio}\n`;
    total += p.precio;
  });

  // MENSAJE FINAL
  alert(
    "✅ Gracias por tu compra\n\n" +
    "Cliente: " + nombre + "\n" +
    "Dirección: " + direccion + "\n\n" +
    "Productos:\n" + detalle +
    "\nTotal: $" + total
  );

  // LIMPIAR
  sessionStorage.clear();
  mostrarCarrito();
  document.getElementById("form").reset();
});
// Uso de sessionStorage
// LOGIN SIMULADO (tipo Auth0)
function login() {
  const nombre = "Douglas"; // puedes poner tu nombre
  sessionStorage.setItem("usuario", nombre);

  document.getElementById("user").innerText = "Bienvenido " + nombre;
}
// LOGOUT
function logout() {
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("carrito");

  document.getElementById("user").innerText = "";

  mostrarCarrito();
}

// MOSTRAR CARRITO AL INICIAR
mostrarCarrito();

// Mantener sesión activa
const usuario = sessionStorage.getItem("usuario");

if (usuario) {
  document.getElementById("user").innerText = "Bienvenido " + usuario;
}
