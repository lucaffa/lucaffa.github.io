let continuar
let orden
let cantidad
let tipoComida
let precio = 0
let precioTotal = 0

let nombre = prompt("Por favor ingrese su nombre")

const mensajeError = () => {
    alert("Por favor escriba el número de una de las opciones disponibles")
}

const calcularPrecio = () => {
    switch(orden) {
        case "1":
            precio = 530
            break
        case "2":
            precio = 490
            break 
        case "3":
            precio = 540
            break
        default:
            mensajeError()
            precio = 0
            break
    }
    return precio
}
const calcularPrecioTotal = () => {
    if (cantidad >= 1){
        precioTotal = precio * cantidad
        alert("CARRITO:" + "\n" + cantidad + " " + tipoComida + "\n" + "\n" + "El costo TOTAL de su pedido es: $" + precioTotal)

    }
    return precioTotal
}
const confirmacion = () => { 
    alert("Su compra ha sido realizada con éxito. Muchas gracias!")
}
const confirmar = () => {
    switch(continuar) {
        case "1":
            confirmacion()
            break
        case "2":
            continuar == "2"
            break 
        default:
            mensajeError()
            break
    }
}

do {

    do {
        orden = prompt("Hola " + nombre + " ¿Qué desea ordenar?" + "\n" + "1- Hamburguesa - $530" + "\n" + "2- Pizza - $490" + "\n" + "3- Milanesa - $540")

        calcularPrecio()

    } while (orden != "1" && orden != "2" && orden != "3")

    if(orden == "1"){
        tipoComida = "Hamburguesa"
    }else if(orden == "2"){
        tipoComida = "Pizza"
    }else if(orden == "3"){
        tipoComida = "Milanesa"
    }
    
    do {
        cantidad = parseFloat(prompt("¿Qué cantidad desea?"))

        calcularPrecioTotal()

    } while (isNaN(cantidad))

    do{
        continuar = prompt(nombre + " ¿Desea proceder con el pago o realizar un cambio en el pedido?" + "\n" + "1- Pagar" + "\n" + "2- Realizar cambio")
        confirmar()

    }while(continuar != "1" && continuar != "2")

}while (continuar == "2")
