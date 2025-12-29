document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-button');
 
    menuButtons.forEach(button => {
        // Cek apakah tombol ini adalah tombol yang sudah aktif (BASE atau COMBAT)
        if (button.classList.contains('base-link') || button.classList.contains('combat')) {
            // Biarkan link berfungsi normal
            return;
        } else {
            // Untuk tombol lain, cegah aksi default
            button.addEventListener('click', (event) => {
                event.preventDefault(); 
                console.log(`Tombol ${button.textContent} belum berfungsi.`);
            });
        }
    });
});
