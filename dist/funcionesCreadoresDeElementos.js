const mostrarMensaje = (texto, tipo = "normal") => {
  const div = document.createElement("div");
  div.className = `mensaje-${tipo}`;
  div.innerHTML = `
  <p>${texto}</p>
  `;
  return div;
}

const mostrarProducto = (producto, tieneBoton = true) => {
  const div = document.createElement("div");
  div.className = "mostrar";

  const fechaDeAlta = new Date(producto.fechaAlta);
  const fechaDeBaja = new Date(producto.fechaBaja);
  const fechaProxima = fechaDeAlta > fechaDeBaja ? fechaDeAlta : fechaDeBaja;

  const hoy = new Date(fechaProxima);
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  const fecha = `${año}-${mes}-${dia}`;
  div.innerHTML = `
  <p>${fechaDeAlta > fechaDeBaja ? `El producto está dado de <strong class="type02">alta</strong> desde <strong>${fecha}</strong>` : `El producto está dado de <strong class="type02">baja</strong> desde <strong>${fecha}</strong>`}</p>
  `;

  const llaves = Object.keys(producto);
  for (let i = 0; i < llaves.length; i++) {
    if (llaves[i] === "_id" || llaves[i] === "__v" || llaves[i] === "fechaAlta" || llaves[i] === "fechaBaja") {
      continue;
    }
    if (llaves[i] === "descontinuado") {
      const span = document.createElement("div");
      span.innerHTML = `<strong>${llaves[i].slice(0, 1).toUpperCase() + llaves[i].slice(1, llaves[i].length)}:</strong> <input ${producto.descontinuado ? "checked" : ""} type="checkbox" name="descontinuado" disabled>`;
      div.appendChild(span);
      continue;
    }
    const span = document.createElement("div");
    span.innerHTML = `<strong>${llaves[i].slice(0, 1).toUpperCase() + llaves[i].slice(1, llaves[i].length)}:</strong> <span>${producto[llaves[i]]}</span>`;
    div.appendChild(span);
  }
  if (tieneBoton) {
    div.appendChild(crearBotonCancelar());
  }
  return div;
}

const selectDepartamento = async (tabla, hasValues = false, depNum = "0", claNum = "0", famNum = "0") => {
  const label = document.createElement("label");

  const selectDepartamentos = document.createElement("select");
  selectDepartamentos.id = "selectDepartamento";
  selectDepartamentos.name = "departamento";
  selectDepartamentos.for = "departamento";

  const option00 = document.createElement("option");
  option00.value = "";
  option00.innerText = "N/A";
  selectDepartamentos.appendChild(option00);

  for (let i = 0; i < tabla.length; i++) {
    const option = document.createElement("option");
    option.value = tabla[i].numero;
    option.innerText = tabla[i].nombre.toUpperCase();
    selectDepartamentos.appendChild(option);
  }

  selectDepartamentos.addEventListener("change", (event) => {
    const selectClase = document.getElementById("selectClase");
    const clasesSeleccionadas = tabla.find(dep => dep.numero === parseInt(event.target.value)).clases;
    selectClase.innerHTML = "";

    const selectFamilia = document.getElementById("selectFamilia");
    selectFamilia.innerHTML = "";

    const option00 = document.createElement("option");
    option00.value = "";
    option00.innerText = "N/A";
    selectClase.appendChild(option00);
    const option01 = document.createElement("option");
    option01.value = "";
    option01.innerText = "N/A";
    selectFamilia.appendChild(option01);

    for (let i = 0; i < clasesSeleccionadas.length; i++) {
      const option = document.createElement("option");
      option.value = clasesSeleccionadas[i].numero;
      option.innerText = clasesSeleccionadas[i].nombre.toUpperCase();
      selectClase.appendChild(option);
    }

    selectClase.addEventListener("change", (e) => {
      const selectFamilia = document.getElementById("selectFamilia");
      const familiasSeleccionadas = clasesSeleccionadas.find(clase => {
        return clase.numero === parseInt(e.target.value);
      }).familias;
      selectFamilia.innerHTML = "";

      const option02 = document.createElement("option");
      option02.value = "";
      option02.innerText = "N/A";
      selectFamilia.appendChild(option02);

      for (let j = 0; j < familiasSeleccionadas.length; j++) {
        const option03 = document.createElement("option");
        option03.value = familiasSeleccionadas[j].numero;
        option03.innerText = familiasSeleccionadas[j].nombre.toUpperCase();
        selectFamilia.appendChild(option03);
      }

      if (hasValues) {
        selectFamilia.value = famNum;
        const event00 = new Event('change');
        selectFamilia.dispatchEvent(event00);
      }
    });

    if (hasValues) {
      selectClase.value = claNum;
      const event00 = new Event('change');
      selectClase.dispatchEvent(event00);
    }
  });

  if (hasValues) {
    setTimeout(() => {
      selectDepartamentos.value = depNum;
      const event00 = new Event('change');
      selectDepartamentos.dispatchEvent(event00);
    }, 10);
  }

  label.innerText = "Departamento: ";
  label.appendChild(selectDepartamentos);

  return label;
}

const formAlta = async (sku, tabla) => {
  const form = document.createElement("form");
  form.method = "post";
  form.action = "/.netlify/functions/api/product/alta";

  const generalDiv00 = document.createElement("div");
  generalDiv00.innerHTML = `
  <h4>Crear Producto</h4>
  <p>El sku ingresado no existe, así que se puede proceder a crear el producto relacionado</p>
  <label for="sku">Sku: <input id="skuInputAltaPost" type="text" name="sku" value="${sku}" disabled></label>
  <label for="descontinuado">Descontinuado: <input type="checkbox" name="descontinuado"></label>
  <label for="articulo">Artículo: <input type="text" name="articulo" maxlength="15"></label>
  <label for="marca">Marca: <input type="text" name="marca" maxlength="15"></label>
  <label for="modelo">Modelo: <input type="text" name="modelo" maxlength="20"></label>
  `;
  while (generalDiv00.firstChild) {
    form.appendChild(generalDiv00.firstChild);
  }

  form.appendChild(await selectDepartamento(tabla));

  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  const fechaHoy = `${año}-${mes}-${dia}`;

  const generalDiv01 = document.createElement("div");
  generalDiv01.innerHTML = `
  <label>Clase: <select for="clase" name="clase" id="selectClase"><option value="">N/A</option></select></label>
  <label>Familia: <select for="familia" name="familia" id="selectFamilia"><option value="">N/A</option></select></label>
  <label for="stock">Stock: <input type="text" name="stock" id="stockAlta"></label>
  <label for="cantidad">Cantidad: <input type="text" name="cantidad" id="cantidadAlta"></label>
  <label for="fechaAlta">Fecha Alta: <input id="fechaAltaInputAltaPost" type="date" name="fechaAlta" value="${fechaHoy}" disabled></label>
  <label for="fechaBaja">Fecha Baja: <input id="fechaBajaInputAltaPost" type="date" name="fechaBaja" value="1900-01-01" disabled></label>
  `;
  while (generalDiv01.firstChild) {
    form.appendChild(generalDiv01.firstChild);
  }

  form.appendChild(crearBotonCancelar());

  const generalDiv02 = document.createElement("div");
  generalDiv02.innerHTML = `
  <button type="submit">Enviar</button>
  `;
  while (generalDiv02.firstChild) {
    form.appendChild(generalDiv02.firstChild);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.children[form.children.length - 1];
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonFormData = Object.fromEntries(formData.entries());

    const stockAlta = document.getElementById("stockAlta");
    const cantidadAlta = document.getElementById("cantidadAlta");

    cantidadAlta.addEventListener('input', () => {
      cantidadAlta.setCustomValidity("");
    });

    if (parseInt(cantidadAlta.value) > parseInt(stockAlta.value)) {
      cantidadAlta.setCustomValidity("La cantidad no puede ser mayor que el stock disponible.");
      cantidadAlta.reportValidity();
      submitButton.disabled = false;
      return;
    }

    try {
      const response = await fetch(event.target.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sku: document.getElementById("skuInputAltaPost").value,
          ...jsonFormData,
          fechaAlta: document.getElementById("fechaAltaInputAltaPost").value,
          fechaBaja: document.getElementById("fechaBajaInputAltaPost").value
        })
      });

      if (!response.ok) {
        submitButton.disabled = true;
        throw new Error('Error en la respuesta del servidor' + response.statusText);
      }

      const result = await response.json();
      if (result) {
        dialog.children[1].innerHTML = "";
        dialog.children[1].append(mostrarProducto(result));
      }
      submitButton.disabled = true;
    } catch (error) {
      submitButton.disabled = true;
      console.error('There has been a problem with your fetch operation:', error);
    }

  });

  return form;
}

const formBaja = async (producto) => {
  const form = document.createElement("form");
  form.method = "put";
  form.action = "/.netlify/functions/api/product/baja";

  form.style.position = "relative";
  form.className = "form-baja";

  const div = document.createElement("div");
  div.id = "absolute-cover";
  div.style.display = "none";
  div.style.width = "100%";
  div.style.backgroundColor = "var(--background-color-02)";
  div.innerHTML = `
  <p>¿Estás seguro?</p>
  `;
  div.appendChild(crearBotonCancelar(texto = "No"));
  const button00 = document.createElement("button");
  button00.type = "submit";
  button00.innerText = "Si";
  div.appendChild(button00);
  form.appendChild(div);

  const productoMostrado = mostrarProducto(producto, tieneBoton = false);
  while (productoMostrado.firstChild) {
    form.appendChild(productoMostrado.firstChild);
  }

  const parr = document.createElement("p");
  parr.innerText = "¿Deseas dar de Baja el producto?";
  parr.style.margin = "none";
  form.appendChild(parr);

  form.appendChild(crearBotonCancelar(texto = "No"));
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = "Si";
  button.addEventListener("click", (event) => {
    div.style.display = "flex";
  });
  form.appendChild(button);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.children[form.children.length - 1];
    submitButton.disabled = true;

    try {
      const response = await fetch(event.target.action, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sku: producto.sku })
      });

      if (!response.ok) {
        submitButton.disabled = false;
        throw new Error('Error en la respuesta del servidor' + response.statusText);
      }

      const result = await response.json();
      if (result) {
        dialog.children[1].innerHTML = "";
        dialog.children[1].append(mostrarProducto(result));
      } else {
        dialog.children[1].innerHTML = "";
        dialog.children[1].append(mostrarMensaje(texto = "No se recibió respuesta, hubo un error"));
      }
      submitButton.disabled = false;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  });

  return form;
}

const formCambio = async (producto, tabla) => {
  const form = document.createElement("form");
  form.method = "put";
  form.action = "/.netlify/functions/api/product/cambio";

  const generalDiv00 = document.createElement("div");
  generalDiv00.innerHTML = `
  <h4>Realizar cambios en el Producto</h4>
  <p>Se muestran los campos del producto que pueden actualizarse</p>
  <label for="sku">Sku: <input id="skuInputAltaPost" type="text" name="sku" value="${producto.sku}" disabled></label>
  <label for="descontinuado">Descontinuado: <input type="checkbox" name="descontinuado" ${producto.descontinuado ? "checked" : ""}></label>
  <label for="articulo">Artículo: <input type="text" name="articulo" value="${producto.articulo}"></label>
  <label for="marca">Marca: <input type="text" name="marca" value="${producto.marca}"></label>
  <label for="modelo">Modelo: <input type="text" name="modelo" value="${producto.modelo}"></label>
  `;
  while (generalDiv00.firstChild) {
    form.appendChild(generalDiv00.firstChild);
  }

  form.appendChild(await selectDepartamento(tabla, hasValues = true, depNum = producto.departamento, claNum = producto.clase, famNum = producto.familia));

  const hoy = new Date(producto.fechaAlta);
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  const fechaHoy = `${año}-${mes}-${dia}`;

  const hoy00 = new Date(producto.fechaBaja);
  const año00 = hoy00.getFullYear();
  const mes00 = String(hoy00.getMonth() + 1).padStart(2, '0');
  const dia00 = String(hoy00.getDate()).padStart(2, '0');
  const fechaHoy00 = `${año00}-${mes00}-${dia00}`;

  const generalDiv01 = document.createElement("div");
  generalDiv01.innerHTML = `
  <label for="stock">Clase: <select for="clase" name="clase" id="selectClase"><option value="">N/A</option></select></label>
  <label for="stock">Familia: <select for="familia" name="familia" id="selectFamilia"><option value="">N/A</option></select></label>
  <label for="stock">Stock: <input type="text" name="stock" value="${producto.stock}" id="stockCambio"></label>
  <label for="cantidad">Cantidad: <input type="text" name="cantidad" value="${producto.cantidad}" id="cantidadCambio"></label>
  <label for="fechaAlta">Fecha Alta: <input id="fechaAltaInputAltaPost" type="date" name="fechaAlta" value="${fechaHoy}" disabled></label>
  <label for="fechaBaja">Fecha Baja: <input id="fechaBajaInputAltaPost" type="date" name="fechaBaja" value="${fechaHoy00}" disabled></label>
  `;

  while (generalDiv01.firstChild) {
    form.appendChild(generalDiv01.firstChild);
  }

  form.appendChild(crearBotonCancelar());

  const generalDiv02 = document.createElement("div");
  generalDiv02.innerHTML = `
  <button type="submit">Enviar</button>
  `;
  while (generalDiv02.firstChild) {
    form.appendChild(generalDiv02.firstChild);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.children[form.children.length - 1];
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonFormData = Object.fromEntries(formData.entries());

    const stockCambio = document.getElementById("stockCambio");
    const cantidadCambio = document.getElementById("cantidadCambio");

    cantidadCambio.addEventListener('input', () => {
      cantidadCambio.setCustomValidity("");
    });

    if (parseInt(cantidadCambio.value) > parseInt(stockCambio.value)) {
      cantidadCambio.setCustomValidity("La cantidad no puede ser mayor que el stock disponible.");
      cantidadCambio.reportValidity();
      submitButton.disabled = false;
      return;
    }

    try {
      const response = await fetch(event.target.action, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sku: document.getElementById("skuInputAltaPost").value,
          ...jsonFormData,
          fechaAlta: document.getElementById("fechaAltaInputAltaPost").value,
          fechaBaja: document.getElementById("fechaBajaInputAltaPost").value
        })
      });

      if (!response.ok) {
        submitButton.disabled = false;
        throw new Error('Error en la respuesta del servidor' + response.statusText);
      }

      const result = await response.json();
      if (result) {
        dialog.children[1].innerHTML = "";
        dialog.children[1].append(mostrarProducto(result));
      } else {
        dialog.children[1].innerHTML = "";
        dialog.children[1].append(mostrarMensaje(texto = "No se recibió respuesta, hubo un error"));
      }
      submitButton.disabled = false;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }

  });

  return form;
}