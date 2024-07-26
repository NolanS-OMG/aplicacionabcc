let tabla = [];

const obtenerTabla = async () => {
  const currentUrl = window.location.href;
  console.log(currentUrl);

  const response = await fetch(`${currentUrl}.netlify/functions/api/tabla`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor' + response.statusText);
  }

  try {
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la tabla: ", error);
    return null
  }
}

const crearTabla = () => {
  const generalDiv = document.createElement("div");
  const div = document.createElement("div");
  div.innerHTML = `
  <span>Número de Departamento</span>
  <span>Nombre de Departamento</span>
  <span>Número de Clase</span>
  <span>Nombre de Clase</span>
  <span>Número de Familia</span>
  <span>Nombre de Familia</span>
  `;
  generalDiv.appendChild(div);
  for (let i = 0; i < tabla.length; i++) {
    for (let j = 0; j < tabla[i].clases.length; j++) {
      for (let k = 0; k < tabla[i].clases[j].familias.length; k++) {
        const div00 = document.createElement("div");
        div00.innerHTML = `
        <span>${tabla[i].numero}</span>
        <span>${tabla[i].nombre}</span>
        <span>${tabla[i].clases[j].numero}</span>
        <span>${tabla[i].clases[j].nombre}</span>
        <span>${tabla[i].clases[j].familias[k].numero}</span>
        <span>${tabla[i].clases[j].familias[k].nombre}</span>
        `;
        generalDiv.appendChild(div00);
      }
    }
  }
  return generalDiv;
}

const dialog = document.getElementById("dialog");
const cancelarDialog = () => {
  dialog.style.display = "none";
  dialog.children[1].innerHTML = "";
}
dialog.children[0].addEventListener("click", cancelarDialog);

const crearBotonCancelar = (texto = "Cancelar") => {
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = texto;
  button.addEventListener("click", cancelarDialog);
  return button;
}

const skuForm = document.getElementById("skuForm");
skuForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const jsonFormData = Object.fromEntries(formData.entries());

  const params = new URLSearchParams(formData).toString();
  const url = `${form.action}?${params}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor' + response.statusText);
    }

    const result = await response.json();
    if (jsonFormData.accion === "alta") {
      if (result) {
        const currentUrl = window.location.href;
        const response00 = await fetch(`${currentUrl}.netlify/functions/api/product/alta`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sku: jsonFormData.sku })
        });

        if (!response00.ok) {
          throw new Error('Error en la respuesta del servidor' + response00.statusText);
        }

        const result00 = await response00.json();
        dialog.children[1].append(mostrarProducto(result00));
        dialog.style.display = "flex";
      } else {
        dialog.children[1].append(await formAlta(jsonFormData.sku, tabla));
        dialog.style.display = "flex";
      }
    } else if (jsonFormData.accion === "baja") {
      if (result) {
        dialog.children[1].append(await formBaja(result));
        dialog.style.display = "flex";
      } else {
        dialog.children[1].append(mostrarMensaje(texto = "El artículo no existe"));
        dialog.style.display = "flex";
      }
    } else if (jsonFormData.accion === "cambio") {
      if (result) {
        dialog.children[1].append(await formCambio(result, tabla));
        dialog.style.display = "flex";
      } else {
        dialog.children[1].append(mostrarMensaje(texto = "El artículo no existe"));
        dialog.style.display = "flex";
      }
    } else if (jsonFormData.accion === "consulta") {
      if (result) {
        dialog.children[1].append(mostrarProducto(result));
        dialog.style.display = "flex";
      } else {
        dialog.children[1].append(mostrarMensaje(texto = "El artículo no existe"));
        dialog.style.display = "flex";
      }
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
});

const crearTablaBoton = document.getElementById("crearTabla");
crearTablaBoton.addEventListener("click", (event) => {
  const contenedorTabla = document.getElementById("contenedorTabla");
  contenedorTabla.innerHTML = "";
  const tablaCreada = crearTabla();
  while (tablaCreada.firstChild) {
    contenedorTabla.appendChild(tablaCreada.firstChild);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  tabla = await obtenerTabla();
  console.log("Tabla: ", tabla);
});