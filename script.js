document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bento-card');

    cards.forEach(card => {
        // Event Listener untuk Klik Mouse & Sentuhan Layar
        card.addEventListener('click', function (e) {
            handleNavigation(this, e);
        });

        // Aksesibilitas Keyboard (Tekan Enter atau Space)
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigation(this, e);
            }
        });
    });

    /**
     * Menangani efek animasi klik/press dan navigasi halaman
     */
    function handleNavigation(cardElement, event) {
        const targetUrl = cardElement.getAttribute('data-url');
        if (!targetUrl) return;

        // 1. Jalankan Efek Press / Bounce
        cardElement.classList.add('is-pressed');

        // 2. Buat Efek Ripple Lembut
        createRipple(cardElement, event);

        // 3. Berpindah Halaman Setelah Animasi Selesai (300ms)
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);
    }

    /**
     * Membuat efek riak (ripple effect) secara dinamis pada kartu
     */
    function createRipple(card, event) {
        const circle = document.createElement('span');
        const diameter = Math.max(card.clientWidth, card.clientHeight);
        const radius = diameter / 2;

        const rect = card.getBoundingClientRect();
        
        // Menghitung posisi klik (jika lewat keyboard, posisikan di tengah)
        const clientX = event.clientX || (rect.left + rect.width / 2);
        const clientY = event.clientY || (rect.top + rect.height / 2);

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${clientX - rect.left - radius}px`;
        circle.style.top = `${clientY - rect.top - radius}px`;
        circle.classList.add('ripple-effect');

        // Hapus elemen ripple lama jika ada
        const existingRipple = card.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }

        card.appendChild(circle);
    }
});