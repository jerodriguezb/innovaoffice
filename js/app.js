//Si no se encuentra logueado el usuario----------------------
let user = JSON.parse(localStorage.getItem("usuario")) || {};
let contenido = document.querySelector("#body");

if (user.email === undefined) {
  body.innerHTML = `
<div class="alert alert-danger" role="alert">
  No se encuentra logueado en la plataforma
</div>
`;

  setTimeout(() => {
    location.href = "login.html";
  }, 2000);
}
//-----------------------------------------------------------------

//Creo arreglo de productos
let productos = JSON.parse(localStorage.getItem("productos")) || [];

//Arreglo para el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Variable que suma los precios del carrito
let sumaCarrito = 0;

//Carrito de usuario----------------

let carritoUser = carrito.filter(function (carrito) {
  return carrito.idUser === user.id;
});

//-------------------------

//Capturo el div de card-deck para poder agregar las tarjetas
let contenedor = document.querySelector("#contenedor");
//Capturo el badge donde aparecerá la cantidad de productos en el carrito
let contadorCarrito = document.querySelector("#countCarrito");

//Obtengo el body del modal donde se mostrarán los productos
let cuerpoModal = document.querySelector(".modal-body");

//Boton para comprar del carrito
let btnComprar = document.querySelector("#btnComprar");

//Si el carrito no tiene nada el botón esta desabilitado
function btnActivo() {
  if (carrito.length <= 0) {
    btnComprar.disabled = true;
  } else {
    btnComprar.disabled = false;
  }
}

//Agrego la cantidad de elementos del arreglo carrito al badge
function cantidadCarrito() {
  //cargo de nuevo el carritoUser con lo guardado en localStorage
  carritoUser = carrito.filter(function (carrito) {
    return carrito.idUser === user.id;
  });

  //---carrito usuario-----
  let sumaCantidad = 0;
  for (let i = 0; i < carritoUser.length; i++) {
    sumaCantidad += carritoUser[i].cantidad;
  }
  contadorCarrito.innerHTML = sumaCantidad;
}

//Funcion que se encarga de cargar las tarjetas con productos
function cargarCard(array) {
  contenedor.innerHTML = "<div></div>";
  for (let i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    div.classList = "col col-md-6 col-lg mb-3";
    div.innerHTML = `<div class="card">
        <img src="${array[i].imagen}" class="card-img-top imgCard" alt="${array[i].nombre}">
        <div class="card-body d-flex">
          <h5 class="card-title">${array[i].nombre}</h5>
          <span class="ml-auto"><b>Stock: </b>${array[i].stock}</span>
          </div>
          <div class="card-footer">
          <p class="card-text"><b>Precio: </b>$${array[i].precio}</p>
          <a href="#" class="btn btn-success" onclick="agregarCarrito(${array[i].codigo},${user.id})"><i class="fa fa-cart-plus" aria-hidden="true"></i></a>
        </div>
      </div>`;

    contenedor.appendChild(div);
  }
}

//Buscar producto
function buscarProducto() {
  let search = document.querySelector("#textSearch").value;
  let array = productos.filter(function (produc) {
    let productoUpperCase = produc.nombre.toUpperCase();
    // return productoUpperCase.indexOf(search.toUpperCase()) > -1;
    return productoUpperCase.includes(search.toUpperCase());
  });

  cargarCard(array);
  document.querySelector("#textSearch").value = "";
}

//funcion para agregar productos al carrito----------
function agregarCarrito(codigo, iduser) {
  let indexProd = productos.findIndex(function (prod) {
    return prod.codigo == codigo;
  });

  if (productos[indexProd].stock >= 1) {
    productos[indexProd].stock -= 1;

    //evaluar si el producto ya existe en el carrito y solo aumentar el precio
    //obtengo el indice del elemento en el carrito que cumpla con dos condiciones:
    // el codigo del producto y el id de usuario
    let indexCar = carrito.findIndex(function (prod) {
      return prod.id == codigo && prod.idUser === iduser;
    });

    if (indexCar >= 0) {
      carrito[indexCar].cantidad += 1;
      carrito[indexCar].precio += productos[indexProd].precio;
    } else {
      carrito.push({
        idUser: user.id, //Agregando id del usuario logueado
        id: productos[indexProd].codigo,
        nombre: productos[indexProd].nombre,
        precio: productos[indexProd].precio,
        imagen: productos[indexProd].imagen,
        cantidad: 1,
      });
    }

    //---------------------------------------

    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cantidadCarrito();

    // cargarCard(productos);
    buscarProducto();
  } else {
    alert("No hay stock disponible para este producto");
  }
}

//Funcion para cargar los productos del carrito al modal
// recibe como parámetro el id del usuario
function cargarCarrito(iduser) {
  cuerpoModal.innerHTML = "";
  let suma = document.querySelector("#totalCarrito");
  sumaCarrito = 0;

  //uso el carritoUser para cargar solo los productos de ese usuario
  if (carritoUser.length <= 0) {
    cuerpoModal.innerHTML = "<h3>No hay elementos en el carrito</h3>";
    sumaCarrito = 0;
    suma.innerHTML = `<b>0</b>`;
    return;
  }

  for (let i = 0; i < carritoUser.length; i++) {
    let div = document.createElement("div");
    div.classList = "card mb-2 ";
    let detalle = `<div class="row no-gutters">
    <div class="col-md-4">
      <img class="imgenCarrito" src="${carritoUser[i].imagen}" alt="${carritoUser[i].nombre}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${carritoUser[i].cantidad} ${carritoUser[i].nombre}</h5>
        <p class="card-text">Precio: $${carritoUser[i].precio}</p>
        <a href="#" class="btn btn-danger" onclick="delElementCarrito(${carritoUser[i].id}, ${iduser})">Eliminar</a>
      </div>
    </div>
  </div>
 `;

    div.innerHTML = detalle;
    cuerpoModal.appendChild(div);
    sumaCarrito += carrito[i].precio;
  }
  suma.innerHTML = `<b>$${sumaCarrito}</b>`;
  cantidadCarrito();
}

//funcion para mostrar modal con productos del carrito
function verCarrito() {
  cargarCarrito(user.id);
  btnActivo();

  $("#modalCarrito").modal("show");
}

//funcion para eliminar un producto del carrito por su código
//Recibe dos parámetros: el código del producto y el id del usuario
function delElementCarrito(codigo, iduser) {
  //obtengo el indice del elemento del carrito que cumple con dos codiciones:
  //el codigo del producto y el id del usuario
  let index = carrito.findIndex(function (prod) {
    return prod.id == codigo && prod.idUser === iduser;
  });
  let cantidad = carrito[index].cantidad;
  carrito.splice(index, 1);
  // sumaCarrito -= carrito[index].precio;
  localStorage.setItem("carrito", JSON.stringify(carrito));

  let indexprod = productos.findIndex(function (prod) {
    return prod.codigo == codigo;
  });

  productos[indexprod].stock += cantidad;

  localStorage.setItem("productos", JSON.stringify(productos));
  cantidadCarrito();
  cargarCarrito(user.id);
  // cargarCard(productos);
  buscarProducto();
  btnActivo();
}

//listener del boton para comprar del modal del carrito
btnComprar.addEventListener("click", function () {
  envioMailCompra(carrito);
});

//Mandar mail de compra----------------------
function envioMailCompra(array) {
  let mensaje = "";
  for (let i = 0; i < array.length; i++) {
    mensaje += `<p><b>Producto: </b>${array[i].nombre} </p>
    <p><b>Precio: </b>$${array[i].precio}<p>
    <hr>
    `;
  }

  let templateParams = {
    destinatario: user.email,
    userEmail: "info@compraya.com",
    title: "Detalle de compra",
    message: mensaje,
    total: sumaCarrito,
  };

  emailjs.send("YOUR SERVICE ID", "YOUR TEMPLATE ID", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);

      carrito = [];
      localStorage.setItem("carrito", JSON.stringify(carrito));
      buscarProducto();
      cantidadCarrito();

      alert("Compra realizada!");
      // location.href = "login.html";
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

//Traer todos los productos y mostrarlos en las tarjetas
// cargarCard(productos);
buscarProducto();
cantidadCarrito();
