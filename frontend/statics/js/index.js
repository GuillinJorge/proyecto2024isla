const form = document.getElementById("crear_reserva_form");
const btn = document.getElementById("btn-post");
const successMessage = document.getElementById("success-message");
const URL_API_BASE = "http://127.0.0.1:8000/api/reserva/";

btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(URL_API_BASE, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(res => res.json())
    .then(data => {
        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        // Limpiar formulario
        form.reset();
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
        // Actualizar la lista de películas
        fetchReservas();
    })
    .catch(error => console.log({error}));
});

class Reserva {
    constructor({fecha_release, habitacion, id, nombre, dias}) {
        this.fecha_release = fecha_release;
        this.habitacion = habitacion;
        this.id = id;
        this.nombre = nombre;
        this.dias = dias;
    }

    createDiv() {
        return `
            <div id="reserva-${this.id}">
                <h4>${this.nombre}</h4>
                <hr>
                <ul>
                    <li>Cantidad de días: ${this.dias}</li>
                    <li>Tipo de habitación: ${this.habitacion}</li>
                    <li>Fecha de ingreso: ${this.fecha_release}</li>
                </ul>
                <button onclick="deleteRserva(${this.id})">Eliminar</button>
                <button onclick="toggleEditForm(${this.id})">Editar</button>
                <form id="edit-form-${this.id}" style="display: none;">
                    <label>Nombre:</label>
                    <input type="text" id="edit-nombre-${this.id}" value="${this.nombre}"><br>
                    <label>Cantidad de dias:</label>
                    <input type="text" id="edit-dias-${this.id}" value="${this.dias}"><br>
                    <label>Tipo de habitación:</label>
                    <select id="edit-habitacion-${this.id}">
                        <option value="simple" ${this.habitacion === 'simple' ? 'selected' : ''}>Simple</option>
                        <option value="doble" ${this.habitacion === 'doble' ? 'selected' : ''}>Doble</option>
                        <option value="triple" ${this.habitacion === 'triple' ? 'selected' : ''}>Triple</option>
                        <option value="cuadruple" ${this.habitacion === 'cuadruple' ? 'selected' : ''}>Cuadruple</option>
                        <option value="cabana_simple" ${this.habitacion === 'cabana_simple' ? 'selected' : ''}>Cabaña Simple</option>
                        <option value="cabana_doble" ${this.habitacion === 'cabana_doble' ? 'selected' : ''}>Cabaña Doble</option>
                        <option value="cabana_cuadruple" ${this.habitacion === 'cabana_cuadruple' ? 'selected' : ''}>Cabaña Cuadruple</option>
                        <option value="suite_presidencial" ${this.habitacion === 'suite_presidencial' ? 'selected' : ''}>Suite Presidencial</option>
                    </select><br>
                    <label>Fecha de Ingreso:</label>
                    <input type="date" id="edit-fecha_release-${this.id}" value="${this.fecha_release}"><br>
                    <button type="button" onclick="editReserva(${this.id})">Guardar cambios</button>
                </form>
            </div>
        `;
    }
}

const btnGet = document.getElementById("btn-get");

btnGet.addEventListener("click", fetchReservas);

function fetchReservas() {
    fetch(URL_API_BASE)
    .then(res => res.json())
    .then(data => {
        const ingesta_data = data
            .map(p => new Reserva(p))
            .map(reserva => reserva.createDiv())
            .join('');

        document.getElementById("reservas").innerHTML = ingesta_data;
    })
    .catch(error => console.log({error}));
}

function deleteReserva(id) {
    fetch(`${URL_API_BASE}${id}/`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchReservas(); // Actualiza la lista de reservas después de eliminar una
    })
    .catch(error => console.log({error}));
}

function toggleEditForm(id) {
    const form = document.getElementById(`edit-form-${id}`);
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function editReserva(id) {
    const nombre = document.getElementById(`edit-nombre-${id}`).value;
    const dias = document.getElementById(`edit-dias-${id}`).value;
    const habitacion = document.getElementById(`edit-habitacion-${id}`).value;
    const fecha_release = document.getElementById(`edit-fecha_release-${id}`).value;

    fetch(`${URL_API_BASE}${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            dias,
            habitacion,
            fecha_release
        })
    })
    .then(() => {
        fetchReservas(); // Actualiza la lista de reservas después de editar una
    })
    .catch(error => console.log({error}));
}
