// Algoritmo con un condicional
function detectarDispositivo() {
    const esMovil = /Mobi|Android/i.test(navigator.userAgent);
    if (esMovil) {
        console.log("Estás navegando desde un dispositivo móvil.");
    } else {
        console.log("Estás navegando desde un ordenador.");
    }
}

detectarDispositivo();

// Algoritmo con un ciclo
function listarProductos() {
    const productos = [
        "Adaptador Bluetooth para auto",
        "Auricular vincha con cable",
        "Auricular vincha bluetooth Janis",
        "Cámara de seguridad WiFi",
        "Fundas acolchadas para celular",
        "Parlante bluetooth 12' Aló Party"
    ];

    console.log("Productos disponibles:");
    for (let i = 0; i < productos.length; i++) {
        console.log(`- ${productos[i]}`);
    }
}

listarProductos();

// Simulador interactivo
let carrito = 0;

function agregarAlCarrito() {
    carrito++;
    alert(`Has agregado un producto al carrito. Total en carrito: ${carrito}`);
}

// Asignar eventos a los botones "Agregar al carrito"
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll("button");
    botones.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
});