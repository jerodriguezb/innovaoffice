class Producto {
  constructor(codigo, nombre, imagen, precio, stock) {
    this.codigo = codigo;
    this.nombre = nombre;
    (this.imagen = imagen), (this.precio = precio);
    this.stock = stock;
  }
}

let contenedor_principal = document.querySelector("#contenedor_principal");
let user = JSON.parse(localStorage.getItem("usuario"));

if (user.id === 9999) {
  let tablaUsuario = document.querySelector("#tableUser");
  let cuerpoTabla = document.querySelector("#bodyTable");
  let bodyModalModif = document.querySelector("#bodyModificaModal");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  let producto = {};
  let nuevo = false; //variable que determina si un producto es nuevo o no

  function cargarTablaUsuario() {
    tablaUsuario.innerHTML = ""; //Limpiar contenido de tabla

    usuarios.forEach((user) => {
      let contenido = "";
      let tr = document.createElement("tr");
      if (user.usuario === "admin") {
        contenido = `
        <th scope="row">${user.usuario}</th>
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td class="text-center">${user.activo}</td>
        <td class="text-center">
                
        </td>
          
 `;
      } else {
        contenido = `
           <th scope="row">${user.usuario}</th>
           <td>${user.nombre}</td>
           <td>${user.email}</td>
           <td class="text-center">${user.activo}</td>
           <td class="text-center">
           <a href="#" class="boton-${user.activo}" onclick="activarUser(${user.id})"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></a> 
           
           </td>
             
    `;
      }

      tr.innerHTML = contenido;
      tablaUsuario.appendChild(tr);
    });
  }

  function activarUser(id) {
    console.log(id);

    let index = usuarios.findIndex(function (user) {
      return user.id === id;
    });

    console.log(index);

    usuarios[index].activo = !usuarios[index].activo;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    cargarTablaUsuario();
  }

  //Crear tabla al iniciar página-----------------------------
  function cargarTabla() {
    cuerpoTabla.innerHTML = "";

    productos.forEach((prod) => {
      let tr = document.createElement("tr");

      let contenido = `
         <th scope="row">${prod.codigo}</th>
         <td>${prod.nombre}</td>
         <td>$${prod.precio}</td>
         <td class="text-center">${prod.stock}</td>
         <td class="text-center">
         <a href="#" class="btn btn-warning" onclick="modificarProd(${prod.codigo})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> 
         <a href="#" class="btn btn-danger" onclick="borrarProd(${prod.codigo})"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
         </td>
           
  `;
      tr.innerHTML = contenido;
      cuerpoTabla.appendChild(tr);
    });
  }
  //-----------------------------------------------------------------

  //Funcion cuando se hace clic en el botón nuevo de la página
  function newProd() {
    nuevo = true;
    cargarModalModif();

    $("#modificarModal").modal("show");
  }

  //Cargar datos en el modal nuevo producto o de modificación-------------------------
  function cargarModalModif(objeto = null) {
    let contenido = "";
    let title = document.querySelector("#modificarModalLabel");

    //Si el objeto es null significa que es un producto nuevo
    if (objeto === null) {
      contenido = `
      <div class="form-group">
      <label for="nombre">Producto</label>
      <input type="text" class="form-control" id="nombre" value="" autocomplete='off'>
    </div>
    <div class="form-group">
      <label for="imagen">Imagen</label>
      <input type="text" class="form-control" id="imagen" value="" autocomplete='off'>
    </div>
    <div class="form-row">
      <div class="col">
      <label for="precio">Precio</label>
      <input type="number" 
      class="form-control" 
      id="precio" 
      value="0"
      min=0
      autocomplete='off'
      >
      </div>
      <div class="col">
      <label for="stock">Stock</label>
      <input type="number" 
      class="form-control" 
      id="stock" 
      value="0"
      min=0
      autocomplete='off'
      >
      </div>
    </div>
      
      `;
      title.innerHTML = "Nuevo producto";
      //Si el objeto no es null estonces es un producto a modificar
    } else {
      contenido = `
    <div class="form-group">
    <label for="nombre">Producto</label>
    <input type="text" class="form-control" id="nombre" value="${objeto.nombre}">
  </div>
  <div class="form-group">
    <label for="imagen">Imagen</label>
    <input type="text" class="form-control" id="imagen" value="${objeto.imagen}">
  </div>
  <div class="form-row">
    <div class="col">
    <label for="precio">Precio</label>
    <input type="number" 
    class="form-control" 
    id="precio" 
    value="${objeto.precio}"
    min=0
    >
    </div>
    <div class="col">
    <label for="stock">Stock</label>
    <input type="number" 
    class="form-control" 
    id="stock" 
    value="${objeto.stock}"
    min=0
    >
    </div>
  </div>
    
    `;
      title.innerHTML = "Modificar producto";
    }

    bodyModalModif.innerHTML = contenido;
  }
  //----------------------------------------------

  //Mostrar modal del producto a modificar---------
  function modificarProd(codigo) {
    nuevo = false;
    producto = productos.find(function (prod) {
      return prod.codigo == codigo;
    });

    cargarModalModif(producto);

    $("#modificarModal").modal("show");
  }
  //--------------------------------------------------

  //Eliminar producto-----------------------------------
  function borrarProd(codigo) {
    let index = productos.findIndex(function (prod) {
      return prod.codigo === codigo;
    });

    let validar = confirm(`¿Seguro eliminará ${productos[index].nombre}?`);

    if (validar) {
      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      cargarTabla();
    }
  }
  //--------------------------------------------------

  //Submit formulario Modificar o nuevo-----------------------
  document
    .querySelector("#formModif")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      //Genero un codigo random
      let codigo = new Date().getTime();
      let nombre = document.querySelector("#nombre").value;
      let imagen = document.querySelector("#imagen").value;
      let precio = parseFloat(document.querySelector("#precio").value);
      let stock = parseFloat(document.querySelector("#stock").value);

      //si el input de la imagen es vacio le agrego una por defecto
      if (imagen === "") {
        imagen = "https://bitsofco.de/content/images/2018/12/broken-1.png";
      }

      //Si la variable nuevo es true quiere decir que el producto es nuevo
      if (nuevo) {
        let newProducto = new Producto(codigo, nombre, imagen, precio, stock);
        productos.push(newProducto);
      } else {
        //si no es un producto a modificar
        let index = productos.findIndex(function (prod) {
          return prod.codigo === producto.codigo;
        });
        productos[index].nombre = nombre;
        productos[index].imagen = imagen;
        productos[index].precio = precio;
        productos[index].stock = stock;
      }

      localStorage.setItem("productos", JSON.stringify(productos));

      cargarTabla();
      $("#modificarModal").modal("hide");
    });
  //----------------------------------------------------------

  //Al iniciar página se carga la tabla
  cargarTabla();
  cargarTablaUsuario();
} else {
  contenedor_principal.innerHTML = "";
  let contenido = `
  <div class="row">
        <div class="col">
        <div class="alert alert-danger" role="alert">
        Acceso denegado! Debe loguearse como administrador.
      </div>
        </div>
      </div>
  `;
  contenedor_principal.innerHTML = contenido;
}
