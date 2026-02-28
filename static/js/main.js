async function enviarDatos() {
  // Recoletamos datos de los inputs
  const valorLongitud = parseInt(document.getElementById('longitud').value);
  if (valorLongitud < 8 || valorLongitud > 30) {
    alert("La longitud debe estar entre 8 y 30 caracteres.");
    return; // Detenemos la ejecución si no es válido
  }

// 3. Si la validación pasa, creamos el objeto y enviamos
const datos = {
  longitud: valorLongitud,
  numeros: document.getElementById('numeros').checked,
  simbolos: document.getElementById('simbolos').checked
};


// Enviamos datos a python mediante Fetch APi
const respuesta = await fetch('generar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(datos)
});

const resultado = await respuesta.json();

// Mostrar el resultado sin recargar la pagina
document.getElementById('resultado-texto').innerText = resultado.password;
document.getElementById('contenedor-resultado').style.display = 'block';
}