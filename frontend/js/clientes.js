// Event listeners para cerrar modales
document.addEventListener('DOMContentLoaded', () => {
    // Cerrar modal al hacer clic en "x"
    document.querySelectorAll('.close').forEach(close => {
        close.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Cerrar modal al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Cerrar modal al presionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
});
/* -------------------------------------------------------------------------- */
// clientes.js
// Constantes
const ENDPOINT = '/api/clientes';
const CONTENEDOR = 'contenidoVacio';

// Función para cargar el formulario
async function cargarFormularioClientes() {
    try {
        const response = await fetch('pages/form_clientes.html');
        if (!response.ok) {
            throw new Error('Error al cargar el formulario');
        }
        
        const html = await response.text();
        const modalContent = document.getElementById('clientesModalContent');
        
        if (!modalContent) {
            throw new Error('No se encontró el contenedor para el formulario');
        }
        
        modalContent.innerHTML = html;
    } catch (error) {
        console.error('Error al cargar el formulario:', error);
        mostrarError('Error al cargar el formulario');
        throw error;
    }
}

// Funciones principales
async function cargarClientes() {
    try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        mostrarClientes(data);
    } catch (error) {
        mostrarError('Error al cargar clientes');
    }
}

function mostrarClientes(clientes) {
    const contenedor = document.getElementById(CONTENEDOR);
    contenedor.innerHTML = `
        <h2>Clientes</h2>
        <button class="btn" onclick="abrirModal('nuevo')">Nuevo Cliente</button>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>NIT</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${clientes.map(cliente => filaCliente(cliente)).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function filaCliente(cliente) {
    return `
        <tr>
            <td>${cliente.nombre || 'N/A'}</td>
            <td>${cliente.NIT || 'N/A'}</td>
            <td>${cliente.direccion || 'N/A'}</td>
            <td>${cliente.telefono || 'N/A'}</td>
            <td>${cliente.email || 'N/A'}</td>
            <td>
                <button class="btn" onclick="abrirModalEditar(${cliente.idCliente})">Editar</button>
                <button class="btn-eliminar-modal" onclick="abrirModalEliminar(${cliente.idCliente})">Eliminar</button>
            </td>
        </tr>
    `;
}

// Modificar abrirModal para asegurar que se limpia el ID
async function abrirModal(accion) {
    try {
        // Cargar el formulario si no existe
        if (!document.getElementById('clienteForm')) {
            await cargarFormularioClientes();
        }
        
        // Esperar un momento para asegurar que los elementos estén disponibles
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const modal = document.getElementById('modal');
        const titulo = document.getElementById('titulo-modal');
        const contenido = document.getElementById('contenido-modal');
        
        if (!modal || !titulo || !contenido) {
            throw new Error('Elementos del modal no encontrados');
        }
        
        // Actualizar título según la acción
        titulo.textContent = accion === 'nuevo' ? 'Nuevo Cliente' : 'Editar Cliente';
        
        // Limpiar el contenido
        contenido.innerHTML = document.getElementById('clientesModalContent').innerHTML;
        
        // Obtener el formulario
        const form = contenido.querySelector('#clienteForm');
        
        if (!form) {
            throw new Error('Formulario no encontrado');
        }
        
        // Resetear el formulario y limpiar el ID
        form.reset();
        form.dataset.clienteId = ''; // Asegurarse de limpiar el ID
        
        // Mostrar el modal
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error al abrir modal:', error);
        mostrarError('Error al abrir el modal');
    }
}
async function abrirModalEditar(id) {
    try {
        // Cargar el formulario si no existe
        if (!document.getElementById('clienteForm')) {
            await cargarFormularioClientes();
        }
        
        // Esperar un momento para asegurar que los elementos estén disponibles
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const modal = document.getElementById('modal');
        const titulo = document.getElementById('titulo-modal');
        const contenido = document.getElementById('contenido-modal');
        
        if (!modal || !titulo || !contenido) {
            throw new Error('Elementos del modal no encontrados');
        }
        
        // Actualizar título
        titulo.textContent = 'Editar Cliente';
        
        // Limpiar el contenido
        contenido.innerHTML = document.getElementById('clientesModalContent').innerHTML;
        
        // Obtener el formulario
        const form = contenido.querySelector('#clienteForm');
        
        if (!form) {
            throw new Error('Formulario no encontrado');
        }
        
        // Cargar datos del cliente antes de mostrar el modal
        await cargarDatosCliente(id);
        
        // Mostrar el modal
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error al abrir modal de edición:', error);
        mostrarError('Error al abrir el modal de edición');
    }
}

function abrirModalEliminar(id) {
    const modal = document.getElementById('modal-eliminar');
    const contenido = modal.querySelector('.contenido-modal-eliminar');
    
    contenido.textContent = `¿Está seguro que desea eliminar este cliente?`;
    
    // Agregar evento al botón de eliminar
    const btnEliminar = modal.querySelector('#btn-confirmar-eliminar');
    btnEliminar.onclick = () => eliminarCliente(id);
    
    // Mostrar el modal
    modal.style.display = 'block';
}

async function eliminarCliente(id) {
    try {
        const response = await fetch(`${ENDPOINT}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            mostrarMensaje('Cliente eliminado exitosamente');
            cargarClientes();
        } else {
            throw new Error('Error al eliminar el cliente');
        }
    } catch (error) {
        mostrarError(error.message);
        console.error('Error:', error);
    }
}

async function cargarDatosCliente(id) {
    try {
        const response = await fetch(`${ENDPOINT}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener datos del cliente');
        }
        
        const cliente = await response.json();
        
        // Llenar el formulario
        const form = document.getElementById('clienteForm');
        if (!form) {
            throw new Error('Formulario no encontrado');
        }
        
        form.nombre.value = cliente.nombre;
        form.NIT.value = cliente.NIT;
        form.direccion.value = cliente.direccion;
        form.telefono.value = cliente.telefono;
        form.email.value = cliente.email;
        
        // Establecer el ID del cliente en el formulario
        form.dataset.clienteId = cliente.idCliente;
        
    } catch (error) {
        console.error('Error al cargar datos del cliente:', error);
        mostrarError('Error al cargar datos del cliente');
        throw error;
    }
}

async function guardarCliente(event) {
    event.preventDefault();
    
    try {
        const form = event.target;
        const cliente = {
            nombre: form.nombre.value,
            NIT: form.NIT.value,
            direccion: form.direccion.value,
            telefono: form.telefono.value,
            email: form.email.value
        };
        
        // Verificar si es nuevo o edición
        const clienteId = form.dataset.clienteId;
        
        if (clienteId) {
            // Es una edición
            const response = await fetch(`${ENDPOINT}/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            
            if (response.ok) {
                mostrarMensaje('Cliente actualizado exitosamente');
            } else {
                throw new Error('Error al actualizar el cliente');
            }
        } else {
            // Es un nuevo cliente
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            
            if (response.ok) {
                mostrarMensaje('Cliente creado exitosamente');
            } else {
                throw new Error('Error al crear el cliente');
            }
        }
        
        // Actualizar la lista y cerrar modal
        cargarClientes();
        cerrarModal('modal');
    } catch (error) {
        mostrarError(error.message);
        console.error('Error:', error);
    }
    
    return false;
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
}

function mostrarMensaje(mensaje) {
    const contenedor = document.getElementById(CONTENEDOR);
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'success-message';
    mensajeDiv.textContent = mensaje;
    contenedor.insertBefore(mensajeDiv, contenedor.firstChild);
    
    setTimeout(() => mensajeDiv.remove(), 3000);
}

function mostrarError(mensaje) {
    const contenedor = document.getElementById(CONTENEDOR);
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'error-message';
    mensajeDiv.textContent = mensaje;
    contenedor.insertBefore(mensajeDiv, contenedor.firstChild);
    
    setTimeout(() => mensajeDiv.remove(), 3000);
}