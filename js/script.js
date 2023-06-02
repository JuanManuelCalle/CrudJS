
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})



let data = localStorage.getItem("data");
data = JSON.parse(data);

const formulario = document.getElementById('Agregarusuario');
const table = document.getElementById('users');

function encriptarContrasena(contrasena){
  return "*".repeat(contrasena.length);
}

function generarTabla()
{
  table.innerHTML = `
  <tr>
    <th>Nombre</th>
    <th>Correo</th>
    <th>Teléfono</th>
    <th>Usuario</th>
    <th>Contraseña</th>
    <th>Acciones</th>
  </tr>
`;
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.correo}</td>
      <td>${item.telefono}</td>
      <td>${item.usuario}</td>
      <td>${encriptarContrasena(item.contrasena)}</td>
      <td>
        <button class="btn btn-warning w-60" onclick="EditarUsuario(${index})"><i class='bx bxs-edit-alt'></i></button>
        <button class="btn btn-danger w-60" onclick="EliminarUsuario(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
    table.appendChild(row);
  });
}

function EditarUsuario(index) {
  const usuarioId = data[index];
  const nombre = prompt('Nuevo nombre:', usuarioId.nombre);
  const correo = prompt('Nuevo correo:', usuarioId.correo);
  const telefono = prompt('Nuevo Teléfono:', usuarioId.telefono);
  const usuario = prompt('Nuevo usuario:', usuarioId.usuario);
  const contrasena = prompt('Nuevo contraseña:', usuarioId.contrasena);
  
  data[index] = { nombre, correo, telefono, usuario, contrasena };
  localStorage.setItem("data", JSON.stringify(data)); // Actualizar en el localStorage
  generarTabla();
}

function AgregarUsuario(evento) {
  evento.preventDefault();
  let nombre = document.getElementById('nombre').value;
  let correo = document.getElementById('correo').value;
  let telefono = document.getElementById('telefono').value;
  let usuario = document.getElementById('usuario').value;
  let contrasena = document.getElementById('contrasena').value;

  if(nombre == "" || correo == "" || telefono == "" || usuario == "" || contrasena == "")
  {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Debes ingresar datos para registrar un usuario'
    });
  }else{
    const NuevoUsuario = { nombre, correo, telefono, usuario, contrasena};
    data.push(NuevoUsuario);
    localStorage.setItem("data", JSON.stringify(data)); // Agregar al localStorage
    formulario.reset();
    generarTabla();
  }
}

function EliminarUsuario(index) {
  Swal.fire({
    title: "¿Estás seguro de que deseas eliminar este usuario?",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
    icon: "warning",
  }).then((result) => {
    if (result.isConfirmed) {
      data.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(data));
      generarTabla();
      Swal.fire({
        icon: 'success',
        text: 'Usuario eliminado correctamente'
      });
    }
  });
}

generarTabla();

formulario.addEventListener('submit', AgregarUsuario);
