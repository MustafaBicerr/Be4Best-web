/* js/components/HomeHero.js */
const HomeHero = {
    render: () => {
        // Random Görsel Mantığı
        const totalImages = 20; 
        const randomIndex = Math.floor(Math.random() * totalImages) + 1;
        const heroImage = `assets/images/hero/hero-${randomIndex}.jpg`; 

        return `
            <section class="hero-section">
                <div class="hero-bg">
                    <img src="${heroImage}" alt="Luxury Furniture" class="hero-img">
                    <div class="overlay"></div>
                </div>

                <div class="container hero-content">
                    <h1 class="fade-up" data-i18n="hero.title"></h1>
                    <p class="fade-up delay-1" data-i18n="hero.subtitle"></p>
                    <a href="/shop" class="btn-primary fade-up delay-2" data-i18n="hero.cta"></a>
                </div>

                <div class="scroll-indicator">
                    <span data-i18n="hero.scroll"></span>
                    <div class="line"></div>
                </div>
            </section>
        `;
    },
    afterRender: () => {
        // İleride buraya slider kodları gelirse buraya yazarız.
        // Şu an sadece scroll reveal çalışıyor o da globalde.
    }
};

export default HomeHero;