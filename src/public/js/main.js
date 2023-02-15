const fechaCalcular = document.getElementById('fechaNacimiento');

const edadCalculada = (fechaNacimiento) => {
  const fechaActual = new Date();
  const anoActual = parseInt(fechaActual.getFullYear());
  const mesActual = parseInt(fechaActual.getMonth()) + 1;
  const diaActual = parseInt(fechaActual.getDate());

  // 2016-07-11
  const anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
  const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
  const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));
  let edad = anoActual - anoNacimiento;
  if (mesActual < mesNacimiento) {
    edad--;
  } else if (mesActual === mesNacimiento) {
    if (diaActual < diaNacimiento) {
      edad--;
    }
  }
  return edad;
}

window.addEventListener('load', async function () {
  if (fechaCalcular) {
    await fechaCalcular.addEventListener('change', async function () {
      if (this.value) {
        if (edadCalculada(this.value) < 100) {
          document.getElementById('edadanadir').value = edadCalculada(this.value);
        }
      }
    })
  }


  let marcado = document.getElementById(`reported`);
  let cambiar = document.getElementById(`reportado`);
  if (marcado) {
    if (marcado.classList.contains('reported-desactive')) {
      cambiar.classList.replace('reportar', 'no-reportar');
    } else {
      cambiar.classList.replace('no-reportar', 'reportar');
    }

    marcado.addEventListener('change', () => {
      if (cambiar.classList.contains('no-reportar')) {
        cambiar.classList.replace('no-reportar', 'reportar');
      } else {
        cambiar.classList.replace('reportar', 'no-reportar');
      }
    })
  }


})

// add hovered class to selected list item
let list = document.querySelectorAll(".navegacion li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navegacion");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

var contenido = '';

function Cambio(valor, id) {
  switch (valor) {
    case '1':
      contenido = 'A+'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    case '2':
      contenido = 'A-'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    case '3':
      contenido = 'B+'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    case '4':
      contenido = 'B-'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    case '5':
      contenido = 'O+'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    case '6':
      contenido = 'O-'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    case '7':
      contenido = 'AB+'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    case '8':
      contenido = 'AB-'
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
    default:
      contenido = ''
      document.getElementById(`spantipoSangre${id}`).innerText = contenido;
      break;
  }
}

const tiposangre = document.getElementById('valorTipoSangre');
if (tiposangre) {
  switch (parseInt(tiposangre.value)) {
    case 1:
      $(`#tipSangre`).val(1);
      break;
    case 2:
      $(`#tipSangre`).val(2);
      break;
    case 3:
      $(`#tipSangre`).val(3);
      break;
    case 4:
      $(`#tipSangre`).val(4);
      break;
    case 5:
      $("#tipSangre").val(5);
      break;
    case 6:
      $(`#tipSangre`).val(6);
      break;
    case 7:
      $(`#tipSangre`).val(7);
      break;
    case 8:
      $(`#tipSangre`).val(8);
      break;
  }

}

function deleteFamily(id, nombre) {
  Swal.fire({
    "title": `¿Desea eliminar a \n${nombre}?`,
    "text": `Una vez eliminado no se puede recuperar`,
    "icon": "question",
    "showCancelButton": true,
    "cancelButtonText": "No",
    "confirmButtonText": "Si",
    "reverseButtons": true,
    "cancelButtonColor": "",
    "confirmButtonColor": "#00b5c5"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/family/delete/" + id;
    }
  })
}

function showTime() {
  myDate = new Date();
  hours = myDate.getHours();
  minutes = myDate.getMinutes();
  if (hours < 10) hours = 0 + hours;
  if (hours < 1) hours = 12;
  if (minutes < 10) minutes = "0" + minutes;
  $("#HoraActual").text(hours + ":" + minutes);
  setTimeout("showTime()", 1000);

}

function initMap() {
  var latitud = -1.058548;
  var longitud = -80.457310;

  coordenadas = {
    lng: longitud,
    lat: latitud
  }

  generarMapa(coordenadas);
}
function generarMapa(coordenadas) {
  var mapa = new google.maps.Map(document.getElementById('mapa'),
    {
      zoom: 12,
      center: new google.maps.LatLng(coordenadas.lat, coordenadas.lng)

    });

  marcador = new google.maps.Marker({
    map: mapa,
    draggable: true,
    position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
  })

  marcador.addListener('dragend', function (event) {
    if( this.getPosition().lat()!=0 && this.getPosition().lng()!=0 ){
      document.getElementById('latitud').value = this.getPosition().lat();
      document.getElementById('longitud').value = this.getPosition().lng();
      let cambiar = document.getElementById(`Mapa`);
      console.log(cambiar.classList.contains('btn-danger'))
      if (cambiar.classList.contains('btn-danger')) {
        cambiar.classList.replace('btn-danger', 'btn-success');
      } else {
        cambiar.classList.replace('btn-success', 'btn-danger');
      }
    }
  })

}

const tipoSexo = document.getElementById('valorSexo');
if (tipoSexo) {
  switch (parseInt(tipoSexo.value)) {
    case 1:
      $(`#sex`).val(1);
      break;
    case 2:
      $(`#sex`).val(2);
      break;
  }
}