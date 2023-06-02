function login() {
    let getData = localStorage.getItem("data");
    let usuarioIngresado = document.getElementById("usuario").value;
    let contrasenaIngresada = document.getElementById("contrasena").value;

    getData = JSON.parse(getData);

    for(let usuario of getData)
    {
        if(usuario.usuario == usuarioIngresado && usuario.contrasena == contrasenaIngresada){
            // Redireccionar a otra vista
            window.location.href = "./views/dashboard.html";
            break;
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario o contraseña no son correctos intente nuevamente'
            });
        }
    }

}


let btn_login = document.getElementById('btn_login');

btn_login.addEventListener("click", login);
