document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;
    const monto = parseFloat(document.getElementById('monto').value);

    // Lógica para agregar la transacción a los datos
    // Aquí puedes agregar la lógica para guardar los datos en el almacenamiento local o una base de datos

    // Actualizar la interfaz de usuario y gráficos
    actualizarResumen();
    actualizarGraficos();
});

function actualizarResumen() {
    // Lógica para actualizar el resumen mensual de finanzas
}

function actualizarGraficos() {
    // Lógica para actualizar los gráficos
    const ctx = document.getElementById('grafico').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Supermercado', 'Estudios', 'Delivery', 'Gym', 'Otros'],
            datasets: [{
                label: 'Gastos',
                data: [12, 19, 3, 5, 2],
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

// Inicializar el resumen y los gráficos al cargar la página
actualizarResumen();
actualizarGraficos();
