let productosEnCarrito = localStorage.getItem("productos-en-carrito");//traemos la información del localStorage
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}

//Comprar carrito con mp
/*
const mercadopago = new MercadoPago("TEST-28a26f13-997e-492f-9ec4-8c3838be2ce6",{
    locale: "es-AR", //the most common are: "pt-Br", es-AR and "en-US"
   });
checkoutButton.addEventListener("click", comprarCarrito);
function checkoutButton() { //para usar con mp cuando funcione*/
    
/*
    botonComprar.remove();

    const orderData = {
        quantity: 1,
        description: "compra de ecommerce",
        price: totalCalculado,
    };

    fetch("http://localhost:8080/create_preference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    })
        .then(function (response) {
            return response.json();
        })  
        .then(function (preference) {
        createbotonComprar(preference.id);
        })
        .catch(function () {
          alert("Unexpected error");
        });
    });*/

/*function createbotonComprar(preferenceId) {
    //Initialize the checkout
    const bricksBuilder = mercadopago.bricks();

    const renderComponent = async (bricksBuilder) => {
        await bricksBuilder.create(
            "wallet",
            "carrito-acciones-comprar", // class/id where the payment button will be desplayed
            {
                initialization: {
                    preferenceId: preferenceId,
                },
                callbacks: {
                    onError: (error) => console.error(error),
                    onReady: () => {},
                },
            }
        );
    };
    window.botonComprar = renderComponent(bricksBuilder);
};*/

    

/*

const mercadopago = new MercadoPago("TEST-28a26f13-997e-492f-9ec4-8c3838be2ce6",{
    locale: "es-AR", //the most common are: "pt-Br", es-AR and "en-US"
   });

    checkoutButton.addEventListener("click", function () {

    checkoutButton.remove();

    const orderData = {
        quantity: 1,
        description: "compra de ecommerce",
        price: totalCalculado,
    };

    fetch("http://localhost:8080/create_preference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    })
        .then(function (response) {
            return response.json();
        })  
        .then(function (preference) {
        createCheckoutButton(preference.id);
        })
        .catch(function () {
          alert("Unexpected error");
        });
    });

function createCheckoutButton(preferenceId) {
    //Initialize the checkout
    const bricksBuilder = mercadopago.bricks();

    const renderComponent = async (bricksBuilder) => {
        await bricksBuilder.create(
            "wallet",
            "button-checkout", // class/id where the payment button will be desplayed
            {
                initialization: {
                    preferenceId: preferenceId,
                },
                callbacks: {
                    onError: (error) => console.error(error),
                    onReady: () => {},
                },
            }
        );
    };
    window.checkoutButton = renderComponent(bricksBuilder);
};*/