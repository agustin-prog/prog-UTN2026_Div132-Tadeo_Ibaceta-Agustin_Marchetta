const contenedor = document.getElementById('contenedor-doctores');

contenedor.addEventListener('click', async (e) => {

    // --- BOTÓN ELIMINAR ---
    if (e.target.classList.contains('btn-eliminar')) {
        const idDoctor = e.target.dataset.id;

        const confirmar = confirm('¿Seguro que querés eliminar este doctor?');
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`/dashboard/doctores/${idDoctor}`, {
                method: 'DELETE'
            });

            if (!respuesta.ok) throw new Error('No se pudo eliminar');

            // Si todo OK, sacamos la card del DOM sin recargar la página
            const card = e.target.closest('.card-doctor');
            card.remove();

        } catch (error) {
            console.error(error);
            alert('Hubo un error al eliminar el doctor');
        }
    }

    // --- BOTÓN MODIFICAR ---
    if (e.target.classList.contains('btn-modificar')) {
        const idDoctor = e.target.dataset.id;

        // Opción simple: traer los datos del doctor y precargar el form de arriba
        try {
            const respuesta = await fetch(`/admin/doctores/${idDoctor}`);
            const doctor = await respuesta.json();

            // Precargamos el form que ya tenés arriba de la página
            document.getElementById('input-nombre').value = doctor.nombre;
            document.getElementById('input-matricula').value = doctor.matricula;
            // etc, según los campos que tenga tu form

            // Guardamos el id en un input hidden, para saber que ahora es un UPDATE y no un CREATE
            document.getElementById('input-id-doctor').value = doctor.id_doctor;

            // Hacemos scroll arriba para que el admin vea el form ya cargado
            document.querySelector('.secccion-doctores').scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error(error);
            alert('Hubo un error al cargar los datos del doctor');
        }
    }

});