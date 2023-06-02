let data = JSON.parse(localStorage.getItem("data")) || [];

function registrarUsuario() {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;
    let usuario = document.getElementById('usuario').value;
    let contrasena = document.getElementById('contrasena').value;

    if (nombre === "" || correo === "" || telefono === "" || usuario === "" || contrasena === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Debes ingresar datos para registrar un usuario'
        });
    } else {
        let usuarios = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            usuario: usuario,
            contrasena: contrasena
        };
        data.push(usuarios);

        let jsonConvert = JSON.stringify(data);
        localStorage.setItem("data", jsonConvert);

        document.getElementById('nombre').value = "";
        document.getElementById('correo').value = "";
        document.getElementById('telefono').value = "";
        document.getElementById('usuario').value = "";
        document.getElementById('contrasena').value = "";

        Swal.fire({
            icon: 'success',
            text: '¡Te registraste exitosamente!'
        });
    }
}

let btn_registro = document.getElementById('boton_registro');

btn_registro.addEventListener("click", registrarUsuario);
