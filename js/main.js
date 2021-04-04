
let productos= JSON.parse(localStorage.getItem("productos")) || [];
let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
// let baseFooter = JSON.parse(localStorage.getItem("footer")) || [];
let contenedor=document.querySelector("#contenedor");
//let contenedor2=document.querySelector("#contenedor2");

class Producto {

    constructor(codigo,imagen,nombre,precio,stock) {

        this.codigo=codigo;
        this.imagen=imagen;
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;   

    }

}

// class Pie {

//     constructor(email,telfijo,telcelular,domicilio,social1,social2,social3) {

//         this.email=email;
//         this.telfijo=telfijo;
//         this.telcelular=telcelular;
//         this.domicilio=domicilio;
//         this.social1=social1;  
//         this.social2=social2;
//         this.social3=social3; 

//     }

// }


function agregarProductos1() {

    productos.push(new Producto(1,"http://conceptoffice.com.ar/images/conceptoffice/muebles/premium/mueble-gerencial-premium-4.jpg","Escritorio Ejecutivos",43000,2));
    productos.push(new Producto(2,"http://conceptoffice.com.ar/media/widgetkit/elam-director-05-bfc3fba3da9d6541d012606d98f39121.jpg","Silla Director",11500,9));
    productos.push(new Producto(3,"http://conceptoffice.com.ar/images/conceptoffice/mesas-de-reunion/focus/mesa-reunion-focus.jpg","Mesa de Reunion",68500,1));
    localStorage.setItem("productos", JSON.stringify(productos));
    return;
    
}

function cargaCard() {

    for (let i = 0; i < productos.length; i++) {  //revisar
        let div=document.createElement("div");
        div.classList="col-sm-2 col-md-9 col-lg-6";
        div.innerHTML=` <div class="card">
        <img src="${productos[i].imagen}" class="card-img-top" alt="${productos[i].nombre}">
        <div class="card-body">
          <h5 class="card-title">${productos[i].nombre}</h5>
          <h6 class="card-title">Stock: ${productos[i].stock}</h6>
          <p class="card-text">Precio: $${productos[i].precio}</p>
          <a class="btn btn-info" onclick="agregarProductosCarrito(${productos[i].codigo})"> Carrito </a>
        </div>
      </div> ` 
      contenedor.appendChild(div);

    }
}

function agregarProductosCarrito(codigo) {

    let indexProd=productos.findIndex(function(produc) {
    return produc.codigo === codigo;

    });
    if (productos[indexProd].stock >= 1) {

            productos[indexProd].stock-=1;
        
        carrito.push ({

            codigo: productos[indexProd].codigo,
            imagen: productos[indexProd].imagen,
            nombre: productos[indexProd].nombre,
            precio: productos[indexProd].precio,
            stock: 1,

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

        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("productos", JSON.stringify(productos));

        contenedor.innerHTML="";
        cargaCard();
        } else {
            alert ("No hay disponibilidad del producto");
        }

}



// function agregaFooter() {

    

//      let h3=document.createElement("h3") // crea un elem como una etiqueta je h3

//      h3.innerText()="soy un h3 recien creado" // le asigne un txt

//      document.body.appendChild(h3)

//     //let parrafo1=document.querySelector("#parrafo1");
//     //parrafo1.innerText("esto es una prueba ssss");
   
// }



// function limpiarLista() {

//     contenedor2.innerHTML=""; // queda vacio el contenedor
//     contenedor2.innerHTML=`<a class="btn btn-danger" onclick="limpiarLista()"> Limpiar lista </a>`;
//     carrito.splice(0,carrito.length);
// }


//cargaCard();

//agregaFooter();
