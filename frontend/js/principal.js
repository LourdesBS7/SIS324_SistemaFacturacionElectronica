document.addEventListener('DOMContentLoaded', async () => {
    // Verificar sesión
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '/login.html';
        return;
    }

    // Mostrar información del usuario
    const userNameElement = document.querySelector('.nombre-usuario');
    userNameElement.textContent = user.nombre || 'Usuario';
    
    const rolUsuarioElement = document.querySelector('#rol-usuario');
    rolUsuarioElement.textContent = user.rol || 'Usuario';

    // Manejar botón de cerrar sesión
    const logoutButton = document.querySelector('.btn-salir');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = '/login.html';
        });
    }

    // Manejar clics en enlaces del menú
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('href');
            switch (target) {
                case '#clientes':
                    cargarClientes();
                    break;
                case '#vendedores':
                    cargarVendedores();
                    break;
                // Agregar más casos para otros módulos
            }
        });
    });
});