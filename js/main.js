
let productos= JSON.parse(localStorage.getItem("productos")) || [];
let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
let contenedor=document.querySelector("#contenedor");
let contenedor2=document.querySelector("#contenedor2");

class Producto {

    constructor(codigo,imagen,nombre,precio,stock) {

        this.codigo=codigo;
        this.imagen=imagen;
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;   

    }

}

function agregarProductos() {

    productos.push(new Producto("1","http://conceptoffice.com.ar/images/conceptoffice/muebles/premium/mueble-gerencial-premium-4.jpg","Escritorio Ejecutivos",43000.00,2));
    productos.push(new Producto("2","http://conceptoffice.com.ar/media/widgetkit/elam-director-05-bfc3fba3da9d6541d012606d98f39121.jpg","Silla Director",11500.00,9));
    productos.push(new Producto("3","http://conceptoffice.com.ar/images/conceptoffice/mesas-de-reunion/focus/mesa-reunion-focus.jpg","Mesa de Reunion",68500.00,1));
    localStorage.setItem("productos", JSON.stringify(productos));
    return;
    
}

function cargaCard() {

    for (let i = 0; i < productos.length; i++) {  //revisar
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
        stock: producto.stock,

    });
        // let div=document.createElement("div");
        // div.classList="col";
        // div.innerHTML=` <a href="#" class="list-group-item list-group-item-action">
        // <div class="d-flex w-100 justify-content-between">
        //   <h6 class="mb-1"> ${producto.nombre} </h6>
        //   <small> ${producto.precio} </small>
        //   <a class="btn btn-warning" onclick="eliminaElemento()">Eliminar</a>
        // </div> </a> `
        // contenedor2.appendChild(div);
      
      //localStorage.setItem("carrito", JSON.stringify(carrito));

}


// function limpiarLista() {

//     contenedor2.innerHTML=""; // queda vacio el contenedor
//     contenedor2.innerHTML=`<a class="btn btn-danger" onclick="limpiarLista()"> Limpiar lista </a>`;
//     carrito.splice(0,carrito.length);
// }


cargaCard();