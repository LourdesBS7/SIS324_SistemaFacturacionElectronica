document.addEventListener('DOMContentLoaded', () => {
    // Verificar sesión
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '/login.html';
        return;
    }

    // Mostrar información del usuario
    const userNameElement = document.querySelector('.user-name');
    userNameElement.textContent = user.nombre || 'Usuario';

    // Manejar botón de cerrar sesión
    const logoutButton = document.querySelector('.btn-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = '/login.html';
        });
    }

    // Manejar navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Desactivar todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Activar el link clickeado
            link.classList.add('active');
            
            // Cargar el contenido correspondiente
            const page = link.dataset.page;
            loadContent(page);
        });
    });

    // Cargar el contenido inicial
    loadContent('dashboard');
});

async function loadContent(page) {
    try {
        const contentContainer = document.getElementById('content-container');
        
        // Mostrar un spinner o mensaje de carga
        contentContainer.innerHTML = '<div class="message">Cargando...</div>';

        // Cargar el contenido de la página
        const response = await fetch(`/pages/${page}.html`);
        if (!response.ok) {
            throw new Error('Página no encontrada');
        }
        
        const content = await response.text();
        contentContainer.innerHTML = content;

        // Inicializar cualquier script específico de la página
        initializePageScripts(page);
    } catch (error) {
        console.error('Error al cargar el contenido:', error);
        showError('Error al cargar el contenido');
    }
}

function initializePageScripts(page) {
    switch (page) {
        case 'clientes':
            initializeClientes();
            break;
        case 'productos':
            initializeProductos();
            break;
        case 'facturacion':
            initializeFacturacion();
            break;
        case 'categorias':
            initializeCategorias();
            break;
    }
}

function showError(message) {
    const contentContainer = document.getElementById('content-container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message message-error';
    errorDiv.textContent = message;
    contentContainer.insertBefore(errorDiv, contentContainer.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Funciones para manejar modales
function openModal(content) {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            ${content}
        </div>
    `;
    modalContainer.innerHTML = '';
    modalContainer.appendChild(modal);
    
    // Mostrar el modal
    modal.style.display = 'block';
    
    // Cerrar modal al hacer clic fuera
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
    }
}
