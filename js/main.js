
let productos= JSON.parse(localStorage.getItem("productos")) || [];
let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
let contenedor=document.querySelector("#contenedor");
let contenedor2=document.querySelector("#contenedor2");

class Producto {

    constructor(codigo,imagen,nombre,precio) {

        this.codigo=codigo;
        this.imagen=imagen;
        this.nombre=nombre;
        this.precio=precio;   

    }

}

function agregarProductos() {

    productos.push(new Producto("1","./img/CafeNestle_Negro150GR.jpg","Cafe","439.00"));
    productos.push(new Producto("2","./img/KitKat_Chocolate.jpg","Chocolate","115.00"));
    productos.push(new Producto("3","./img/Pringles_Papas.jpg","Papas Pringles","325.00"));
    localStorage.setItem("productos", JSON.stringify(productos));
    return;
    
}

function cargaCard() {

    for (let i = 0; i < Producto.length; i++) {  //revisar
        let div=document.createElement("div");
        div.classList="col";
        div.innerHTML=` <div class="card">
        <img src="${productos[i].imagen}" class="card-img-top" alt="${productos[i].nombre}">
        <div class="card-body">
          <h5 class="card-title">${productos[i].nombre}</h5>
          <p class="card-text">Precio: $${productos[i].precio}</p>
          <a class="btn btn-info" onclick="agregarProductosCarrito(${productos[i].codigo})"> Agregar a carrito </a>
        </div>
      </div> `
      contenedor.appendChild(div);

    }
}


function agregarProductosCarrito(codigo) {

    let producto=productos.find(function(produc) {
    return produc.codigo == codigo;

    });
    carrito.push ({

        codigo: producto.codigo,
        imagen: producto.imagen,
        nombre: producto.nombre,
        precio: producto.precio,

    });
        let div=document.createElement("div");
        div.classList="col";
        div.innerHTML=` <a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1"> ${producto.nombre} </h6>
          <small> ${producto.precio} </small>
          <a class="btn btn-warning" onclick="eliminaElemento()">Eliminar</a>
        </div> </a> `
        contenedor2.appendChild(div);
      
      //localStorage.setItem("carrito", JSON.stringify(carrito));

}


// function limpiarLista() {

//     contenedor2.innerHTML=""; // queda vacio el contenedor
//     contenedor2.innerHTML=`<a class="btn btn-danger" onclick="limpiarLista()"> Limpiar lista </a>`;
//     carrito.splice(0,carrito.length);
// }


cargaCard();