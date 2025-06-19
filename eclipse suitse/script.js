// script.js

// Mostrar formulario al hacer clic en el botón
document.getElementById('btnEncuentra').addEventListener('click', () => {
  const formContainer = document.getElementById('formularioContainer');
  formContainer.style.display = 'block';
  formContainer.scrollIntoView({ behavior: 'smooth' });
});

// Manejar envío del formulario y abrir manual según selección
document.getElementById('formularioTrabajo').addEventListener('submit', function(e) {
  e.preventDefault();

  const gusto = document.getElementById('gusto').value;
  const turno = document.getElementById('turno').value;
  const experiencia = document.getElementById('experiencia').value;

  let destino = '';

  if (gusto === 'comida') {
    if (experiencia === 'alta') destino = 'manuales/chef.pdf';
    else if (experiencia === 'media') destino = 'manuales/cocineros.pdf';
    else if (experiencia === 'baja') destino = 'manuales/lavaplatos.pdf';
  } else if (gusto === 'cliente') {
    if (turno === 'noche') destino = 'manuales/recepcionista_nocturno.pdf';
    else if (experiencia === 'alta') destino = 'manuales/recepcionista.pdf';
    else if (experiencia === 'media' || experiencia === 'baja') destino = 'manuales/auxiliar_recepcion.pdf';
  }

  if (destino) {
    window.open(destino, '_blank');
  } else {
    alert('Por favor, completa todas las opciones correctamente.');
  }
});

// Funciones para abrir y cerrar manuales
const manualContainer = document.getElementById('manualContainer');
const manualFrame = document.getElementById('manualFrame');
const nodos = document.querySelectorAll('.nodo');

nodos.forEach(nodo => {
  nodo.addEventListener('click', () => {
    const pdfPath = nodo.getAttribute('data-pdf');
    if (!pdfPath) {
      manualContainer.style.display = 'none';
      return;
    }
    manualFrame.src = pdfPath;
    manualContainer.style.display = 'block';
    manualContainer.scrollIntoView({ behavior: 'smooth' });
  });
});

window.cerrarManual = function() {
  manualContainer.style.display = 'none';
  manualFrame.src = '';
}
document.getElementById('formularioTrabajo').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página

  // Obtener valores seleccionados
  const gusto = document.getElementById('gusto').value;
  const turno = document.getElementById('turno').value;
  const experiencia = document.getElementById('experiencia').value;

  // Variable para mostrar resultado
  let puesto = '';

  // Ejemplo simple de lógica para recomendar puesto
  if (gusto === 'comida' && turno === 'dia' && experiencia === 'alta') {
    puesto = 'Chef';
  } else if (gusto === 'comida' && turno === 'noche' && experiencia !== 'baja') {
    puesto = 'Lavaplatos';
  } else if (gusto === 'cliente' && experiencia === 'alta') {
    puesto = 'Gerente de Atención al Cliente';
  } else if (gusto === 'cliente' && experiencia === 'baja') {
    puesto = 'Auxiliar de Recepción';
  } else {
    puesto = 'Recomendamos que sigas ganando experiencia.';
  }

  // Mostrar resultado
  document.getElementById('resultado').textContent = `Tu puesto ideal es: ${puesto}`;
});
