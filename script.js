document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el resumen y los gráficos al cargar la página
    cargarTransacciones();
    actualizarResumen();
    actualizarGraficos();
});

document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;
    const monto = parseFloat(document.getElementById('monto').value);

    // Lógica para agregar la transacción a los datos
    const transaccion = { fecha, categoria, monto };
    guardarTransaccion(transaccion);

    // Actualizar la interfaz de usuario y gráficos
    actualizarResumen();
    actualizarGraficos();
});

function guardarTransaccion(transaccion) {
    let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    transacciones.push(transaccion);
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
}

function cargarTransacciones() {
    let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    transacciones.forEach(transaccion => {
        // Aquí podrías agregar lógica para mostrar cada transacción en la interfaz
    });
}

function actualizarResumen() {
    let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    let resumen = {};

    transacciones.forEach(transaccion => {
        let mes = new Date(transaccion.fecha).getMonth();
        if (!resumen[mes]) {
            resumen[mes] = 0;
        }
        resumen[mes] += transaccion.monto;
    });

    let resumenContenido = document.getElementById('resumen-contenido');
    resumenContenido.innerHTML = '';
    for (let mes in resumen) {
        let mesNombre = new Date(2024, mes, 1).toLocaleString('es-ES', { month: 'long' });
        resumenContenido.innerHTML += `<p>${mesNombre}: $${resumen[mes].toFixed(2)}</p>`;
    }
}

function actualizarGraficos() {
    let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    let categorias = ['Supermercado', 'Estudios', 'Delivery', 'Gym', 'Otros'];
    let datos = [0, 0, 0, 0, 0];

    transacciones.forEach(transaccion => {
        let indice = categorias.indexOf(transaccion.categoria.charAt(0).toUpperCase() + transaccion.categoria.slice(1));
        datos[indice] += transaccion.monto;
    });

    const ctx = document.getElementById('grafico').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categorias,
            datasets: [{
                label: 'Gastos',
                data: datos,
                backgroundColor: [
                    '#2C6DBC',
                    '#2C6DBC',
                    '#2C6DBC',
                    '#2C6DBC',
                    '#2C6DBC'
                ],
                borderColor: [
                    '#1A4A73',
                    '#1A4A73',
                    '#1A4A73',
                    '#1A4A73',
                    '#1A4A73'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
