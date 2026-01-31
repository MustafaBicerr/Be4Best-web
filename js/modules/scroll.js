export const initScrollReveal = () => {
    // Observer Ayarları
    const observerOptions = {
        threshold: 0.15, // Elementin %15'i görünce tetikle
        rootMargin: "0px 0px -50px 0px" // Alt kısımdan biraz pay bırak
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Ekrana Girdi mi?
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Animasyonu başlat
            } 
            // Ekrandan Çıktı mı?
            else {
                entry.target.classList.remove('active'); // Animasyonu sıfırla (Böylece tekrar tetiklenebilir)
            }
        });
    }, observerOptions);

    // Hangi elementleri izleyeceğiz?
    // Not: Dinamik eklenen içerikler için bu fonksiyonu tekrar çağırmamız gerekebilir.
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .fade-up');
    revealElements.forEach(el => observer.observe(el));
};