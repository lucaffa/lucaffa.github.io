let carrito = localStorage.getItem("prods-carrito")
carrito = JSON.parse(carrito)

const carritoVacio = document.querySelector("#carrito-vacio")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const productosCarrito = document.querySelector("#productos-carrito")
const acciones = document.querySelector("#acciones")
const compraRealizada = document.querySelector("#compra-realizada")
const total = document.querySelector("#total")
const comprar = document.querySelector("#comprar")
let botonesEliminar = document.querySelectorAll(".delete-product")
const vaciar = document.querySelector("#vaciar")

productosCarrito.innerHTML = ""

const precioTotal = () => {
    const calcularTotal = carrito.reduce((acc, producto)=> acc + (producto.precio * producto.cantidad),0)
    total.innerText = `$${calcularTotal}`
}

const eliminarDelCarrito = (e) => {

    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#c3c6c4",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: "1rem",
          color: "black"
        },
    offset: {
            y: '1.5rem'
          },
        onClick: function(){}
    }).showToast();

    const idBoton = e.target.id
    const index = carrito.findIndex(producto => producto.id === idBoton)

    carrito.splice(index, 1)
    cargarProductosCarrito()

    localStorage.setItem("prods-carrito", JSON.stringify(carrito))
}
const cargarBotonesEliminar = () =>{
    botonesEliminar = document.querySelectorAll(".delete-product")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

const cargarProductosCarrito = () => {
    if(carrito && carrito.length > 0){

        carritoVacio.classList.add("hide")
        vaciarCarrito.classList.remove("hide")
        productosCarrito.classList.remove("hide")
        acciones.classList.remove("hide")
        compraRealizada.classList.add("hide")
    
        const productoCarrito = document.querySelectorAll(".cart-product")
        productoCarrito.forEach(el => {
            el.remove()
        })

        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.className = "cart-product";

            const cantidadId = `cantidad-carrito-${producto.id}`;
            const subtotalId = `subtotal-${producto.id}`;
        
            div.innerHTML = `
                <div class="cart-product-type">
                    <img class="cart-product-img" src="${producto.img}" alt="${producto.nombre}">
                    <div class="cart-product-description">
                        <small class="cart-product-name fs-6 text-uppercase text-wrap fw-bold">${producto.nombre}</small>
                        <p class="cart-product-price fw-bold">$ ${producto.precio}</p>
                    </div>
                </div>
                <div class="cart-product-info">
                    <div class="cart-product-quantity">
                        <small class="cart-txt fw-bold">Cantidad</small>
                        <div class="row">
                            <div class="col col-sm col-padding quantity-row">
                                <button class="delete-btn rounded-circle" id="${producto.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-dash add-icon" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="col col-sm col-padding-num quantity-row">
                            <p id="${cantidadId}" class="cart-txt">${producto.cantidad}</p>
                            </div>
                            <div class="col col-sm col-padding quantity-row">
                                <button class="add-btn rounded-circle" id="${producto.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus add-icon">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="cart-product-subtotal">
                        <small class="cart-txt fw-bold">Subtotal</small>
                        <p id="${subtotalId}" class="cart-txt">$ ${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="delete-product"><i id="${producto.id}"class="bi bi-trash-fill"></i></button>
                </div>
            `;
        
            productosCarrito.append(div);

            const cantidad = document.getElementById(cantidadId);
            const subtotal = document.getElementById(subtotalId);
            const botonesAgregar = div.querySelector(".add-btn");
            const botonesQuitar = div.querySelector(".delete-btn");

            const modificarCantidad = () => {
                cantidad.innerText = producto.cantidad;
                subtotal.innerText = `$ ${producto.precio * producto.cantidad}`;
                precioTotal();
                localStorage.setItem("prods-carrito", JSON.stringify(carrito))
            }

            botonesAgregar.addEventListener("click", () => {
                producto.cantidad++;
                modificarCantidad()
              });
        
              botonesQuitar.addEventListener("click", () => {
                if (producto.cantidad > 1) {
                  producto.cantidad--;
                  modificarCantidad()
                }
              });
    });

    cargarBotonesEliminar();
    precioTotal();
        
    }else{
        carritoVacio.classList.remove("hide")
        vaciarCarrito.classList.add("hide")
        productosCarrito.classList.add("hide")
        acciones.classList.add("hide")
        compraRealizada.classList.add("hide")
    }

}
cargarProductosCarrito()

const comprarCarrito = () => {
    
    carrito.length = 0
    localStorage.setItem("prods-carrito", JSON.stringify(carrito))

    Swal.fire({
        icon: 'success',
        text: 'Su compra ha sido realizada con exito!',
        focusConfirm: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#d15d10'
    })

    carritoVacio.classList.add("hide")
    vaciarCarrito.classList.add("hide")
    productosCarrito.classList.add("hide")
    acciones.classList.add("hide")
    compraRealizada.classList.remove("hide")
}
comprar.addEventListener("click", comprarCarrito)

const botonVaciarCarrito = () => {
    Swal.fire({
        icon: 'question',
        text: `Se eliminaran ${carrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos del carrito. ¿Desea continuar?`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#d15d10',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            localStorage.setItem("prods-carrito", JSON.stringify(carrito))
            cargarProductosCarrito()
        }
      })

}
vaciar.addEventListener("click", botonVaciarCarrito)

