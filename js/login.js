let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuario = {};
localStorage.setItem("usuario", JSON.stringify(usuario));

//Para login-------------------------------------------------
function validar() {
  let inputEmail = document.querySelector("#email");
  let inputPassword = document.querySelector("#password");

  let user = usuarios.find(function (user) {
    return user.email === inputEmail.value;
  });

  if (user !== undefined) {
    let pass = usuarios.find(function (user) {
      return user.password === inputPassword.value;
    });
    if (pass !== undefined) {
      if (pass.activo) {
        alert("Bienvenido");

        usuario = {
          id: user.id, //Guardando id del usuario
          email: user.email,
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));

        if (pass.id === 9999) {
          location.href = "admin.html";
        } else {
          location.href = "home.html";
        }
      } else {
        alert("El usuario está inactivo. Consulte con el administrador");
      }
    } else {
      alert("Usuario o (contraseña) incorrecto");
    }
  } else {
    alert("(Usuario) o contraseña incorrecto");
  }
  document.querySelector("#btnSubmit").reset();
}
//--------------------------------------------------

//----Boton submit formulario login----------------
document
  .querySelector("#btnSubmit")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validar();
  });
